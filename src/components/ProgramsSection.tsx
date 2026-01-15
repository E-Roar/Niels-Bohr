import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Baby, BookOpen, Calculator, Globe, Check, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useSmoothScroll } from '@/hooks/use-smooth-scroll';
import { useSiteContent } from '@/contexts/SiteContext';

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Baby, BookOpen, Calculator, Globe
};

export const ProgramsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { scrollToSection: smoothScrollTo } = useSmoothScroll();
  const { content } = useSiteContent();
  const { programs } = content;

  return (
    <section id="programmes" className="py-20 px-4 relative overflow-hidden bg-transparent">
      {/* Decorative Blobs removed to keep background clean */}

      <div className="container mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6 }}
          >
            <div className="glass-card p-6 inline-block shadow-none">
              <h2 className="text-3xl md:text-5xl font-display font-bold mb-6">
                {programs.title} <span className="gradient-text">{programs.highlight}</span>
              </h2>
              <p className="text-xl font-quicksand rtl:font-tajawal">
                {programs.subtitle}
              </p>
            </div>
          </motion.div>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {programs.programs.map((program, index) => {
            const Icon = iconMap[program.icon] || BookOpen;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="relative glass-card p-10 transition-all duration-300 shadow-none overflow-hidden group"
              >
                <div className={`absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-white/10 to-transparent rounded-bl-[100px] rounded-tr-[2.5rem] transition-opacity opacity-50 group-hover:opacity-100`} />

                <div className="relative z-10">
                  <div className={`w-20 h-20 rounded-2xl bg-white/10 flex items-center justify-center mb-8 border border-white/20 group-hover:scale-110 transition-transform shadow-lg`}>
                    <Icon className={`w-10 h-10 text-slate-700`} />
                  </div>

                  <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 mb-6">
                    <h3 className="text-3xl font-bold">{program.title}</h3>
                    <span className="px-4 py-1.5 rounded-full bg-slate-200/50 border border-slate-300/30 text-xs font-bold text-slate-600 uppercase tracking-widest">
                      {program.age}
                    </span>
                  </div>

                  <p className="text-slate-700 text-lg mb-8 font-quicksand rtl:font-tajawal">
                    {program.description}
                  </p>

                  <ul className="space-y-4 mb-10">
                    {program.features.map((feature, i) => (
                      <li key={i} className="flex items-center gap-4 text-sm font-semibold text-slate-700">
                        <div className={`w-7 h-7 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0 border border-white/20 shadow-sm`}>
                          <Check className={`w-4 h-4 text-slate-600`} />
                        </div>
                        <span className="font-quicksand rtl:font-tajawal">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <Button
                    variant="ghost"
                    className={`p-0 h-auto hover:bg-transparent text-slate-800 font-bold text-lg group-hover:translate-x-3 rtl:group-hover:-translate-x-3 transition-all`}
                    onClick={() => smoothScrollTo('#contact')}
                  >
                    {programs.ctaText} <ArrowRight className="ml-3 w-6 h-6 rtl:rotate-180" />
                  </Button>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
