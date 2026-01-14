import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { BookOpen, Users, Star, Award, Palette, Music } from 'lucide-react';
import { useSiteContent } from '@/contexts/SiteContext';

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  BookOpen, Users, Star, Award, Palette, Music
};

export const AboutSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { content } = useSiteContent();
  const { about } = content;

  return (
    <section id="apropos" className="py-20 px-4 bg-transparent">
      <div className="container mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6 }}
          >
            <div className="bg-white/5 rounded-[2rem] p-6 border border-white/20 backdrop-blur-md inline-block shadow-none">
              <h2 className="text-3xl md:text-5xl font-display font-bold mb-6 text-white drop-shadow-lg">
                {about.title} <span className="gradient-text brightness-150">{about.highlight}</span> ?
              </h2>
              <p className="text-xl text-white/90 font-quicksand rtl:font-tajawal drop-shadow-md">
                {about.subtitle}
              </p>
            </div>
          </motion.div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {about.features.map((feature, index) => {
            const Icon = iconMap[feature.icon] || Star;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="bg-white/5 rounded-[2rem] p-8 border border-white/20 backdrop-blur-md transition-all duration-300 shadow-none"
              >
                <div className={`w-16 h-16 rounded-2xl bg-white/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 border border-white/10 shadow-lg`}>
                  <Icon className={`w-9 h-9 text-white`} />
                </div>
                <h3 className="text-2xl font-bold mb-3 text-white drop-shadow-sm">{feature.title}</h3>
                <p className="text-white/80 leading-relaxed font-quicksand rtl:font-tajawal drop-shadow-sm">
                  {feature.description}
                </p>
              </motion.div>
            );
          })}
        </div>

        {/* Mission Statement */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="mt-20 p-10 md:p-12 bg-white/5 rounded-[2.5rem] border border-white/20 backdrop-blur-md text-center relative overflow-hidden shadow-none"
        >
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-melrose-yellow via-melrose-red to-melrose-purple" />
          <div className="relative z-10 max-w-2xl mx-auto">
            <h3 className="text-2xl md:text-4xl font-display font-bold mb-6 text-white drop-shadow-lg">{about.missionTitle}</h3>
            <p className="text-xl md:text-2xl font-bold leading-relaxed text-white drop-shadow-md italic">
              "{about.missionText}"
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
