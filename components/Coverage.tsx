import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import { REGIONS } from '../constants.tsx';
import { motion } from 'framer-motion';
import { Users, Building, MapPin, Search } from 'lucide-react';

// Custom Marker Component
const MapMarker: React.FC<{ region: any }> = ({ region }) => {
  if (!region || typeof region.lat !== 'number' || typeof region.lng !== 'number' || isNaN(region.lat) || isNaN(region.lng)) {
    return null;
  }

  const customIcon = L.divIcon({
    className: 'custom-marker',
    html: `
      <div class="relative flex items-center justify-center">
        <div class="absolute w-8 h-8 bg-amber-500 rounded-full opacity-40 animate-ping"></div>
        <div class="w-4 h-4 bg-amber-500 border-2 border-[#0a1a2f] rounded-full shadow-lg"></div>
      </div>
    `,
    iconSize: [32, 32],
    iconAnchor: [16, 16],
  });

  return (
    <Marker position={[region.lat, region.lng]} icon={customIcon}>
      <Popup className="premium-popup">
        <div className="p-2">
          <h4 className="font-bold text-[#0a1a2f] text-lg mb-2">{region.name} Hub</h4>
          <div className="space-y-2 text-sm text-slate-600">
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 text-amber-500" />
              <span>{region.staff} Professionals</span>
            </div>
            <div className="flex items-center gap-2">
              <Building className="w-4 h-4 text-amber-500" />
              <span>{region.clients} Contracts</span>
            </div>
            <button className="w-full mt-2 bg-[#0a1a2f] text-white py-2 rounded-lg text-xs font-bold">
              Check Capacity
            </button>
          </div>
        </div>
      </Popup>
    </Marker>
  );
};

// Component to handle map focus
const MapFocus = ({ center }: { center: [number, number] }) => {
  const map = useMap();
  
  useEffect(() => {
    if (center && Array.isArray(center) && center.length === 2) {
      const lat = Number(center[0]);
      const lng = Number(center[1]);
      
      if (!isNaN(lat) && !isNaN(lng)) {
        try {
          // Wrap in requestAnimationFrame to ensure map is ready to receive commands
          requestAnimationFrame(() => {
             map.flyTo([lat, lng] as L.LatLngExpression, 12, { duration: 1.5 });
          });
        } catch (e) {
          console.warn("Leaflet FlyTo suppressed:", e);
        }
      }
    }
  }, [center, map]);
  
  return null;
};

const Coverage: React.FC = () => {
  // Ensure we have a valid initial region
  const initialRegion = REGIONS && REGIONS.length > 0 ? REGIONS[0] : { name: 'London', lat: 51.505, lng: -0.09, staff: 0, clients: 0 };
  const [activeRegion, setActiveRegion] = useState(initialRegion);

  return (
    <section id="coverage" className="py-20 sm:py-32 bg-[#0a1a2f] text-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16">
          <div className="lg:w-1/3">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center gap-3 text-amber-400 font-bold uppercase tracking-widest text-[10px] sm:text-xs mb-6">
                <MapPin className="w-4 h-4" />
                East London Priority Areas
              </div>
              <h2 className="text-4xl sm:text-5xl font-black mb-8 leading-tight tracking-tight">
                Our Primary <br className="hidden sm:block" /><span className="text-amber-500">Service Hubs</span>.
              </h2>
              <p className="text-slate-400 text-base sm:text-lg mb-8 sm:mb-12 leading-relaxed font-light">
                Five Star Support Services focuses on East London and surrounding areas to ensure rapid response times.
              </p>

              <div className="grid grid-cols-1 gap-3">
                {REGIONS.map((region) => (
                  <button
                    key={region.name}
                    onClick={() => setActiveRegion(region)}
                    className={`flex items-center justify-between p-4 sm:p-6 rounded-2xl sm:rounded-[2rem] border transition-all duration-300 ${
                      activeRegion.name === region.name
                        ? 'bg-amber-500 border-amber-500 text-[#0a1a2f] shadow-[0_10px_30px_rgba(245,158,11,0.2)]'
                        : 'bg-white/5 border-white/5 text-slate-400 hover:bg-white/10'
                    }`}
                  >
                    <span className="font-bold text-base sm:text-lg">{region.name}</span>
                    <div className="flex items-center gap-2 text-[8px] sm:text-[10px] font-black uppercase">
                      <span className={activeRegion.name === region.name ? 'text-[#0a1a2f]/70' : 'text-amber-500/80'}>
                        {region.clients}+ Sites
                      </span>
                    </div>
                  </button>
                ))}
              </div>

              <div className="mt-10 p-6 sm:p-8 rounded-2xl sm:rounded-[2.5rem] bg-white/5 border border-white/10 relative overflow-hidden hidden sm:block">
                <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/10 rounded-full -mr-16 -mt-16"></div>
                <h4 className="font-bold text-white mb-2 relative z-10">Local Teams</h4>
                <p className="text-sm text-slate-400 leading-relaxed relative z-10">All our cleaners live within 5 miles of our hubs, ensuring reliability and punctuality.</p>
              </div>
            </motion.div>
          </div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="lg:w-2/3 h-[450px] sm:h-[600px] lg:h-[750px] relative rounded-3xl sm:rounded-[4rem] overflow-hidden border border-white/10 shadow-2xl"
          >
            <MapContainer
              center={[51.54, 0.05]}
              zoom={11}
              scrollWheelZoom={false}
              className="z-0 h-full w-full"
            >
              <TileLayer
                attribution='&copy; <a href="https://carto.com/attributions">CARTO</a>'
                url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
              />
              {REGIONS.map((region) => (
                <MapMarker key={region.name} region={region} />
              ))}
              {activeRegion && !isNaN(activeRegion.lat) && !isNaN(activeRegion.lng) && (
                <MapFocus center={[activeRegion.lat, activeRegion.lng]} />
              )}
            </MapContainer>

            {/* Overlays */}
            <div className="hidden sm:flex absolute top-8 left-8 z-10 bg-[#0a1a2f]/80 backdrop-blur-lg border border-white/10 p-4 sm:p-6 rounded-2xl sm:rounded-3xl items-center gap-4">
              <div className="p-3 bg-amber-500 rounded-xl sm:rounded-2xl">
                <Search className="w-4 h-4 sm:w-5 sm:h-5 text-[#0a1a2f]" />
              </div>
              <div>
                <p className="text-[8px] sm:text-[10px] font-black text-amber-400 uppercase tracking-widest leading-none mb-1">Priority Hub</p>
                <p className="font-bold text-white text-xs sm:text-base">East London Status</p>
              </div>
            </div>
            
            <div className="absolute bottom-4 sm:bottom-8 left-4 right-4 sm:left-auto sm:right-8 z-10 flex gap-3 sm:gap-4">
               <div className="flex-1 sm:flex-none bg-[#0a1a2f]/80 backdrop-blur-lg border border-white/10 p-4 sm:p-8 rounded-2xl sm:rounded-3xl text-center sm:min-w-[160px]">
                  <p className="text-2xl sm:text-4xl font-black text-amber-500">24/7</p>
                  <p className="text-[8px] sm:text-[10px] font-black text-white/50 uppercase tracking-widest mt-1 sm:mt-2">Available</p>
               </div>
               <div className="flex-1 sm:flex-none bg-[#0a1a2f]/80 backdrop-blur-lg border border-white/10 p-4 sm:p-8 rounded-2xl sm:rounded-3xl text-center sm:min-w-[160px]">
                  <p className="text-2xl sm:text-4xl font-black text-white">4.9/5</p>
                  <p className="text-[8px] sm:text-[10px] font-black text-white/50 uppercase tracking-widest mt-1 sm:mt-2">Rating</p>
               </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Coverage;