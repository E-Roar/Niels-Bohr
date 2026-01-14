import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { MapPin, Navigation, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import logo from '@/assets/logo.png';

// Custom Icon
const customIcon = new L.Icon({
  iconUrl: logo,
  iconSize: [50, 50],
  iconAnchor: [25, 25],
  popupAnchor: [0, -25],
  className: 'rounded-full border-2 border-white shadow-lg bg-white bg-contain'
});

export const MapSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const position: [number, number] = [33.224903383626256, -8.528850365969577];

  const openGoogleMaps = () => {
    window.open(`https://www.google.com/maps/search/?api=1&query=${position[0]},${position[1]}`, '_blank');
  };

  return (
    <section id="localisation" className="py-20 md:py-32 relative overflow-hidden bg-transparent">
      {/* Background decorations */}
      <div className="absolute top-20 right-10 w-72 h-72 rounded-full bg-melrose-blue/10 blur-3xl" />
      <div className="absolute bottom-20 left-10 w-72 h-72 rounded-full bg-melrose-purple/10 blur-3xl" />

      <div className="container mx-auto px-4" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="bg-white/5 rounded-[2rem] p-6 border border-white/20 backdrop-blur-md inline-block shadow-none">
            <h2 className="text-3xl md:text-5xl font-bold font-display mb-4 text-white drop-shadow-lg">
              Notre <span className="gradient-text brightness-150">Localisation</span>
            </h2>
            <p className="text-lg text-white/90 max-w-2xl mx-auto drop-shadow-md">
              Venez nous rendre visite pour découvrir notre école et rencontrer notre équipe pédagogique.
            </p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Card className="overflow-hidden bg-white/5 backdrop-blur-md border-white/20 shadow-none">
            {/* Map container with neomorphism frame */}
            <div className="relative">
              <div className="aspect-[16/9] md:aspect-[21/9] relative overflow-hidden rounded-t-3xl bg-white/10 z-0">
                <MapContainer
                  center={position}
                  zoom={15}
                  scrollWheelZoom={false}
                  touchZoom={false}
                  doubleClickZoom={false}
                  dragging={false}
                  className="w-full h-full"
                >
                  <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  />
                  <Marker position={position} icon={customIcon}>
                    <Popup>
                      <div className="text-center">
                        <img src={logo} alt="Melrose" className="w-12 h-12 mx-auto mb-2" />
                        <span className="font-bold">Groupe Scolaire Niels Bohr</span><br />
                        ALALLYA, El Jadida, Morocco
                      </div>
                    </Popup>
                  </Marker>
                </MapContainer>
              </div>

              {/* Map overlay with CTA */}
              <div className="p-6 bg-white/5 backdrop-blur-md border-t border-white/10 relative z-10">
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      className="w-12 h-12 rounded-2xl bg-melrose-blue/20 flex items-center justify-center shadow-none"
                    >
                      <MapPin className="w-6 h-6 text-melrose-blue" />
                    </motion.div>
                    <div className="text-white">
                      <p className="font-bold font-display">El Jadida, Maroc</p>
                      <p className="text-sm text-white/70">Facilement accessible</p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <Button
                      variant="outline"
                      className="border-white/20 text-white hover:bg-white/10 hover:text-white"
                      onClick={() => window.open('tel:+212652561659', '_self')}
                    >
                      <Phone className="w-5 h-5" />
                      Appeler
                    </Button>
                    <Button variant="gradient" onClick={openGoogleMaps} className="shadow-none">
                      <Navigation className="w-5 h-5" />
                      Itinéraire
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </motion.div>
      </div>
    </section>
  );
};
