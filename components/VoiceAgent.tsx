
import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mic, MicOff, X, MessageSquareText, ShieldCheck, Loader2, Volume2, Waves, AlertCircle, Headphones } from 'lucide-react';
import { GoogleGenAI, Modality } from '@google/genai';

// --- Manual Audio Encoding/Decoding Utilities ---

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
  const [status, setStatus] = useState<'idle' | 'connecting' | 'listening' | 'speaking' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState<string>('');
  
  const inputAudioContextRef = useRef<AudioContext | null>(null);
  const outputAudioContextRef = useRef<AudioContext | null>(null);
  const sessionRef = useRef<any>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const nextStartTimeRef = useRef<number>(0);
  const sourcesRef = useRef<Set<AudioBufferSourceNode>>(new Set());

  const SYSTEM_INSTRUCTION = `
    You are the Five Star Support Services (FSS) AI Concierge. 
    You are professional, articulate, and premium.
    Site Knowledge:
    - FSS specializes in commercial cleaning for Offices, Healthcare (CQC compliant), Schools, and Retail.
    - Coverage: Primarily East London (Ilford, Romford, Canary Wharf, Stratford) and the South East.
    - Since 2008.
    - Features: DBS-vetted staff, £10m insurance, eco-friendly practices.
    - CTA: If users want a quote, tell them to call +44 7917 157506 or use the website forms.
    Keep your voice responses helpful, warm, and concise.
  `;

  const stopSession = useCallback(() => {
    setStatus('idle');
    
    if (sessionRef.current) {
      try { sessionRef.current.close(); } catch (e) {}
      sessionRef.current = null;
    }

    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }

    if (inputAudioContextRef.current) {
      inputAudioContextRef.current.close().catch(() => {});
      inputAudioContextRef.current = null;
    }

    sourcesRef.current.forEach(s => {
      try { s.stop(); } catch (e) {}
    });
    sourcesRef.current.clear();
    nextStartTimeRef.current = 0;
  }, []);

  const startSession = async () => {
    const apiKey = process.env.API_KEY;
    
    if (!apiKey) {
      console.error('API Key missing');
      setStatus('error');
      setErrorMsg('API Key Required');
      return;
    }

    try {
      setStatus('connecting');

      const inputCtx = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 16000 });
      const outputCtx = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });
      inputAudioContextRef.current = inputCtx;
      outputAudioContextRef.current = outputCtx;

      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;

      const ai = new GoogleGenAI({ apiKey });
      
      const sessionPromise = ai.live.connect({
        model: 'gemini-2.5-flash-native-audio-preview-12-2025',
        callbacks: {
          onopen: () => {
            setStatus('listening');
            
            const source = inputCtx.createMediaStreamSource(stream);
            const scriptProcessor = inputCtx.createScriptProcessor(4096, 1, 1);
            
            scriptProcessor.onaudioprocess = (e) => {
              if (status === 'idle' || !sessionRef.current) return;
              const inputData = e.inputBuffer.getChannelData(0);
              const int16 = new Int16Array(inputData.length);
              for (let i = 0; i < inputData.length; i++) {
                int16[i] = inputData[i] * 32768;
              }
              sessionRef.current.sendRealtimeInput({ 
                media: {
                  data: encode(new Uint8Array(int16.buffer)),
                  mimeType: 'audio/pcm;rate=16000'
                }
              });
            };
            
            source.connect(scriptProcessor);
            scriptProcessor.connect(inputCtx.destination);
          },
          onmessage: async (message) => {
            const base64Audio = message.serverContent?.modelTurn?.parts?.[0]?.inlineData?.data;
            if (base64Audio) {
              setStatus('speaking');
              const audioCtx = outputAudioContextRef.current;
              if (!audioCtx) return;

              nextStartTimeRef.current = Math.max(nextStartTimeRef.current, audioCtx.currentTime);
              const audioBuffer = await decodeAudioData(decode(base64Audio), audioCtx, 24000, 1);
              
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
            console.error('Session Error:', e);
            setStatus('error');
            setErrorMsg('Connection Error');
            setTimeout(stopSession, 3000);
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

      sessionRef.current = await sessionPromise;
    } catch (err) {
      console.error('Startup Error:', err);
      setStatus('error');
      setErrorMsg('Mic Access Denied');
      setTimeout(stopSession, 3000);
    }
  };

  const toggleSession = () => {
    if (status !== 'idle' && status !== 'error') {
      stopSession();
    } else {
      startSession();
    }
  };

  useEffect(() => {
    return () => stopSession();
  }, [stopSession]);

  return (
    <div className="fixed bottom-6 right-6 z-[100] flex flex-col items-end gap-5 pointer-events-none">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.9, filter: 'blur(10px)' }}
            animate={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
            exit={{ opacity: 0, y: 30, scale: 0.9, filter: 'blur(10px)' }}
            className="w-[360px] sm:w-[420px] bg-[#0a1a2f]/95 backdrop-blur-3xl border border-white/20 rounded-[3.5rem] shadow-[0_40px_120px_rgba(0,0,0,0.6)] p-10 pointer-events-auto overflow-hidden relative"
          >
            <div className={`absolute -top-32 -left-32 w-80 h-80 rounded-full blur-[100px] transition-colors duration-1000 ${
              status === 'speaking' ? 'bg-amber-500/40' : 
              status === 'listening' ? 'bg-blue-500/40' : 
              status === 'error' ? 'bg-red-500/30' : 'bg-white/5'
            }`}></div>
            
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-12">
                <div className="flex items-center gap-4">
                  <div className={`p-3 rounded-2xl transition-all duration-700 ${
                    status !== 'idle' && status !== 'error' ? 'bg-amber-500 text-[#0a1a2f] shadow-[0_0_20px_rgba(245,158,11,0.4)]' : 'bg-white/10 text-white'
                  }`}>
                    <ShieldCheck className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="text-white font-black text-sm uppercase tracking-[0.2em]">FSS Concierge</h4>
                    <div className="flex items-center gap-2 mt-0.5">
                      <div className={`w-1.5 h-1.5 rounded-full ${
                        status === 'idle' ? 'bg-slate-600' : 
                        status === 'error' ? 'bg-red-500 shadow-[0_0_10px_red]' : 'bg-amber-500 animate-pulse shadow-[0_0_10px_#f59e0b]'
                      }`}></div>
                      <span className="text-[10px] text-slate-400 font-black uppercase tracking-widest">
                        {status === 'error' ? errorMsg : status.toUpperCase()}
                      </span>
                    </div>
                  </div>
                </div>
                <button 
                  onClick={() => setIsOpen(false)}
                  className="p-3 hover:bg-white/10 rounded-full transition-all text-slate-400 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="flex flex-col items-center py-8">
                <div className="relative mb-14">
                  <AnimatePresence>
                    {(status === 'speaking' || status === 'listening') && (
                      <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: [1, 1.5, 1], opacity: [0.1, 0.4, 0.1] }}
                        transition={{ repeat: Infinity, duration: 2.5 }}
                        className={`absolute inset-0 rounded-full blur-3xl ${
                          status === 'speaking' ? 'bg-amber-500' : 'bg-blue-500'
                        }`}
                      />
                    )}
                  </AnimatePresence>

                  <motion.button
                    whileHover={{ scale: 1.08 }}
                    whileTap={{ scale: 0.92 }}
                    onClick={toggleSession}
                    disabled={status === 'connecting'}
                    className={`relative w-32 h-32 rounded-full flex items-center justify-center transition-all duration-500 z-10 border-[6px] ${
                      status === 'error' ? 'bg-red-500/20 border-red-500/50 text-red-400' :
                      status !== 'idle' 
                        ? 'bg-amber-500 border-white/30 text-[#0a1a2f] shadow-[0_0_50px_rgba(245,158,11,0.3)]' 
                        : 'bg-white/5 border-white/10 text-white hover:bg-white/10 hover:border-white/20'
                    }`}
                  >
                    {status === 'connecting' ? (
                      <Loader2 className="w-12 h-12 animate-spin" />
                    ) : status === 'speaking' ? (
                      <div className="flex gap-1.5 items-end">
                        {[1, 2, 3].map(i => (
                          <motion.div 
                            key={i}
                            animate={{ height: [12, 32, 12] }}
                            transition={{ repeat: Infinity, duration: 0.6, delay: i * 0.2 }}
                            className="w-2 bg-[#0a1a2f] rounded-full"
                          />
                        ))}
                      </div>
                    ) : status === 'listening' ? (
                      <Waves className="w-12 h-12 animate-pulse" />
                    ) : status === 'error' ? (
                      <AlertCircle className="w-12 h-12" />
                    ) : (
                      <Mic className="w-12 h-12 opacity-80" />
                    )}
                  </motion.button>
                </div>

                <div className="text-center px-6">
                  <h3 className="text-white text-3xl font-black mb-4 tracking-tight">
                    {status === 'idle' ? 'Live Assistant' : 
                     status === 'connecting' ? 'Establishing Link' :
                     status === 'listening' ? 'Listening...' : 
                     status === 'speaking' ? 'AI Speaking' : 'System Offline'}
                  </h3>
                  <p className="text-slate-400 text-sm font-light leading-relaxed mb-6">
                    {status === 'idle' 
                      ? "Tap to begin a real-time voice consultation with our facility experts." :
                      status === 'error' ? "Connection error. Please try again shortly."
                      : "Discussing premium cleaning solutions for your facilities."}
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-center gap-3 pt-8 border-t border-white/10 opacity-60">
                <Headphones className="w-4 h-4 text-amber-500" />
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em]">
                  Secure AI Channel
                </span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.05, y: -5 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="w-18 h-18 bg-amber-500 rounded-3xl shadow-[0_25px_60px_rgba(245,158,11,0.5)] flex items-center justify-center text-[#0a1a2f] pointer-events-auto border-4 border-[#0a1a2f] group relative"
      >
        <AnimatePresence mode="wait">
          {isOpen ? <X className="w-8 h-8" key="x" /> : <MessageSquareText className="w-8 h-8" key="msg" />}
        </AnimatePresence>
        
        {!isOpen && (
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="absolute right-24 bg-white text-[#0a1a2f] px-6 py-3 rounded-2xl text-xs font-black uppercase tracking-widest whitespace-nowrap shadow-2xl border border-slate-100 hidden sm:block"
          >
            Talk to an Expert
            <div className="absolute right-[-8px] top-1/2 -translate-y-1/2 border-l-[10px] border-l-white border-y-[10px] border-y-transparent"></div>
          </motion.div>
        )}
      </motion.button>
    </div>
  );
};

export default VoiceAgent;
