
import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mic, MicOff, X, MessageSquareText, ShieldCheck, Loader2, Volume2, Waves } from 'lucide-react';
import { GoogleGenAI, Modality } from '@google/genai';

// --- Audio Utilities (Manual implementation per guidelines) ---

function decode(base64: string) {
  const binaryString = atob(base64);
  const bytes = new Uint8Array(binaryString.length);
  for (let i = 0; i < binaryString.length; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes;
}

function encode(bytes: Uint8Array) {
  let binary = '';
  for (let i = 0; i < bytes.byteLength; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary);
}

async function decodeAudioData(
  data: Uint8Array,
  ctx: AudioContext,
  sampleRate: number,
  numChannels: number,
): Promise<AudioBuffer> {
  const dataInt16 = new Int16Array(data.buffer);
  const frameCount = dataInt16.length / numChannels;
  const buffer = ctx.createBuffer(numChannels, frameCount, sampleRate);

  for (let channel = 0; channel < numChannels; channel++) {
    const channelData = buffer.getChannelData(channel);
    for (let i = 0; i < frameCount; i++) {
      channelData[i] = dataInt16[i * numChannels + channel] / 32768.0;
    }
  }
  return buffer;
}

const VoiceAgent: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [status, setStatus] = useState<'idle' | 'connecting' | 'listening' | 'speaking'>('idle');
  
  // Audio Refs
  const inputAudioContextRef = useRef<AudioContext | null>(null);
  const outputAudioContextRef = useRef<AudioContext | null>(null);
  const sessionPromiseRef = useRef<Promise<any> | null>(null);
  const sessionRef = useRef<any>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const nextStartTimeRef = useRef<number>(0);
  const sourcesRef = useRef<Set<AudioBufferSourceNode>>(new Set());

  const SYSTEM_INSTRUCTION = `
    You are the Five Star Support Services (FSS) AI Concierge. 
    You are professional, polite, and helpful. 
    Knowledge:
    - FSS provides premium commercial cleaning in East London (Ilford, Romford, Canary Wharf, Stratford) and South East.
    - Founded in 2008.
    - Specialized in: Offices, Schools (Education), Medical (Healthcare/CQC Compliant), Retail, Leisure.
    - Features: DBS-vetted staff, £10m insurance, eco-friendly chemicals, 24/7 flexibility.
    - Goal: Help users understand our services. If they want a quote, tell them to use the "Get Free Quote" button on our site or call +44 7917 157506.
    Keep responses concise and spoken in a human-like, helpful tone.
  `;

  const stopSession = useCallback(() => {
    setStatus('idle');
    
    if (sessionRef.current) {
      sessionRef.current.close?.();
      sessionRef.current = null;
    }
    sessionPromiseRef.current = null;

    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }

    if (inputAudioContextRef.current) {
      inputAudioContextRef.current.close();
      inputAudioContextRef.current = null;
    }

    sourcesRef.current.forEach(s => {
      try { s.stop(); } catch (e) {}
    });
    sourcesRef.current.clear();
    nextStartTimeRef.current = 0;
  }, []);

  const startSession = async () => {
    try {
      setStatus('connecting');

      // Initialize contexts on user gesture
      const inputCtx = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 16000 });
      const outputCtx = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });
      inputAudioContextRef.current = inputCtx;
      outputAudioContextRef.current = outputCtx;

      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;

      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      
      const sessionPromise = ai.live.connect({
        model: 'gemini-2.5-flash-native-audio-preview-12-2025',
        callbacks: {
          onopen: () => {
            setStatus('listening');
            
            const source = inputCtx.createMediaStreamSource(stream);
            const scriptProcessor = inputCtx.createScriptProcessor(4096, 1, 1);
            
            scriptProcessor.onaudioprocess = (e) => {
              if (setStatus === undefined) return; // Guard against stale closures
              const inputData = e.inputBuffer.getChannelData(0);
              const int16 = new Int16Array(inputData.length);
              for (let i = 0; i < inputData.length; i++) {
                int16[i] = inputData[i] * 32768;
              }
              const pcmBlob = {
                data: encode(new Uint8Array(int16.buffer)),
                mimeType: 'audio/pcm;rate=16000',
              };
              
              // Only send if session is active
              sessionPromise.then(session => {
                session.sendRealtimeInput({ media: pcmBlob });
              }).catch(() => {});
            };
            
            source.connect(scriptProcessor);
            scriptProcessor.connect(inputCtx.destination);
          },
          onmessage: async (message) => {
            const base64 = message.serverContent?.modelTurn?.parts?.[0]?.inlineData?.data;
            if (base64) {
              setStatus('speaking');
              const audioCtx = outputAudioContextRef.current;
              if (!audioCtx) return;

              nextStartTimeRef.current = Math.max(nextStartTimeRef.current, audioCtx.currentTime);
              const audioBuffer = await decodeAudioData(decode(base64), audioCtx, 24000, 1);
              
              const source = audioCtx.createBufferSource();
              source.buffer = audioBuffer;
              source.connect(audioCtx.destination);
              
              source.onended = () => {
                sourcesRef.current.delete(source);
                if (sourcesRef.current.size === 0) {
                  setStatus('listening');
                }
              };

              source.start(nextStartTimeRef.current);
              nextStartTimeRef.current += audioBuffer.duration;
              sourcesRef.current.add(source);
            }

            if (message.serverContent?.interrupted) {
              sourcesRef.current.forEach(s => {
                try { s.stop(); } catch (e) {}
              });
              sourcesRef.current.clear();
              nextStartTimeRef.current = 0;
              setStatus('listening');
            }
          },
          onerror: (e) => {
            console.error('Voice Agent Error:', e);
            stopSession();
          },
          onclose: () => {
            stopSession();
          }
        },
        config: {
          responseModalities: [Modality.AUDIO],
          speechConfig: {
            voiceConfig: { prebuiltVoiceConfig: { voiceName: 'Kore' } }
          },
          systemInstruction: SYSTEM_INSTRUCTION
        }
      });

      sessionPromiseRef.current = sessionPromise;
      sessionRef.current = await sessionPromise;
    } catch (err) {
      console.error('Failed to start voice session:', err);
      stopSession();
    }
  };

  const toggleSession = () => {
    if (status !== 'idle') {
      stopSession();
    } else {
      startSession();
    }
  };

  useEffect(() => {
    return () => stopSession();
  }, [stopSession]);

  return (
    <div className="fixed bottom-6 right-6 z-[100] flex flex-col items-end gap-4 pointer-events-none">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.9, filter: 'blur(10px)' }}
            animate={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
            exit={{ opacity: 0, y: 30, scale: 0.9, filter: 'blur(10px)' }}
            className="w-[340px] sm:w-[400px] bg-[#0a1a2f]/90 backdrop-blur-2xl border border-white/20 rounded-[3rem] shadow-[0_30px_100px_rgba(0,0,0,0.5)] p-8 pointer-events-auto overflow-hidden relative"
          >
            {/* Dynamic Background Glows */}
            <div className={`absolute -top-24 -left-24 w-64 h-64 rounded-full blur-[80px] transition-colors duration-1000 ${
              status === 'speaking' ? 'bg-amber-500/30' : 
              status === 'listening' ? 'bg-blue-500/30' : 'bg-white/5'
            }`}></div>
            
            <div className="relative z-10">
              {/* Header */}
              <div className="flex items-center justify-between mb-10">
                <div className="flex items-center gap-3">
                  <div className={`p-2.5 rounded-2xl transition-all duration-500 ${
                    status !== 'idle' ? 'bg-amber-500 text-[#0a1a2f] shadow-lg shadow-amber-500/20' : 'bg-white/10 text-white'
                  }`}>
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-white font-black text-sm uppercase tracking-widest">FSS Intelligence</h4>
                    <div className="flex items-center gap-2">
                      <div className={`w-1.5 h-1.5 rounded-full ${
                        status === 'idle' ? 'bg-slate-600' : 'bg-amber-500 animate-pulse'
                      }`}></div>
                      <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">
                        {status === 'idle' ? 'Ready to Assist' : status.toUpperCase()}
                      </span>
                    </div>
                  </div>
                </div>
                <button 
                  onClick={() => setIsOpen(false)}
                  className="p-2 hover:bg-white/10 rounded-full transition-colors text-slate-400 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Main Interaction Area */}
              <div className="flex flex-col items-center py-6">
                <div className="relative mb-12">
                  {/* Outer Rings */}
                  <AnimatePresence>
                    {(status === 'speaking' || status === 'listening') && (
                      <>
                        <motion.div
                          initial={{ scale: 0.8, opacity: 0 }}
                          animate={{ scale: [1, 1.4, 1], opacity: [0.1, 0.3, 0.1] }}
                          transition={{ repeat: Infinity, duration: 2 }}
                          className={`absolute inset-0 rounded-full blur-2xl ${
                            status === 'speaking' ? 'bg-amber-500' : 'bg-blue-400'
                          }`}
                        />
                        <motion.div
                          initial={{ scale: 0.8, opacity: 0 }}
                          animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.4, 0.2] }}
                          transition={{ repeat: Infinity, duration: 1.5, delay: 0.2 }}
                          className={`absolute inset-0 rounded-full blur-xl ${
                            status === 'speaking' ? 'bg-amber-400' : 'bg-blue-300'
                          }`}
                        />
                      </>
                    )}
                  </AnimatePresence>

                  {/* Core Mic Button */}
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={toggleSession}
                    disabled={status === 'connecting'}
                    className={`relative w-28 h-28 rounded-full flex items-center justify-center transition-all duration-500 z-10 border-4 ${
                      status !== 'idle' 
                        ? 'bg-amber-500 border-white/20 text-[#0a1a2f] shadow-2xl shadow-amber-500/40' 
                        : 'bg-white/5 border-white/10 text-white hover:bg-white/10'
                    }`}
                  >
                    {status === 'connecting' ? (
                      <Loader2 className="w-10 h-10 animate-spin" />
                    ) : status === 'speaking' ? (
                      <Volume2 className="w-10 h-10 animate-bounce" />
                    ) : status === 'listening' ? (
                      <Waves className="w-10 h-10 animate-pulse" />
                    ) : (
                      <MicOff className="w-10 h-10 opacity-40" />
                    )}
                  </motion.button>
                </div>

                <div className="text-center px-4">
                  <h3 className="text-white text-2xl font-black mb-3 tracking-tight">
                    {status === 'idle' ? 'Start Conversation' : 
                     status === 'connecting' ? 'Establishing Secure Link' :
                     status === 'listening' ? 'Listening to You...' : 'Agent is Speaking'}
                  </h3>
                  <p className="text-slate-400 text-sm font-light leading-relaxed mb-8">
                    {status === 'idle' 
                      ? "Tap the mic to talk with our AI Concierge about cleaning schedules, sectors, or quotes." 
                      : "I'm connected and ready to discuss our Five Star services in East London."}
                  </p>
                </div>
              </div>

              {/* Footer Info */}
              <div className="flex items-center justify-center gap-2 pt-6 border-t border-white/10">
                <ShieldCheck className="w-3.5 h-3.5 text-amber-500" />
                <span className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">
                  Encrypted Voice Channel
                </span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Toggle Button */}
      <motion.button
        whileHover={{ scale: 1.05, y: -5 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="w-16 h-16 bg-amber-500 rounded-2xl shadow-[0_20px_50px_rgba(245,158,11,0.4)] flex items-center justify-center text-[#0a1a2f] pointer-events-auto border-4 border-[#0a1a2f] group relative"
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
            >
              <X className="w-7 h-7" />
            </motion.div>
          ) : (
            <motion.div
              key="chat"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
            >
              <MessageSquareText className="w-7 h-7" />
            </motion.div>
          )}
        </AnimatePresence>
        
        {!isOpen && (
          <div className="absolute right-20 bg-white text-[#0a1a2f] px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest whitespace-nowrap shadow-xl border border-slate-100 hidden sm:block">
            Voice Assistant Active
            <div className="absolute right-[-6px] top-1/2 -translate-y-1/2 border-l-8 border-l-white border-y-8 border-y-transparent"></div>
          </div>
        )}
      </motion.button>
    </div>
  );
};

export default VoiceAgent;
