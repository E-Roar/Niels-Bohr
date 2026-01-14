import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { useSmoothScroll } from '@/hooks/use-smooth-scroll';
import { ArrowRight, Sparkles } from 'lucide-react';
import TiltLogo from '@/components/TiltLogo';
import { useSiteContent } from '@/contexts/SiteContext';

const HeroSection = () => {
  const { scrollToSection: smoothScroll } = useSmoothScroll();
  const { content } = useSiteContent();

  return (
    <section id="accueil" className="min-h-screen pt-32 pb-20 px-4 md:px-12 relative overflow-hidden flex flex-col items-center justify-center bg-transparent">

      {/* 1. Main Title - Top Centered */}
      <div className="relative z-20 mb-8 w-full text-center">
        <div className="inline-flex items-center gap-2 px-6 py-2 rounded-full bg-white/20 backdrop-blur-md border border-white/30 shadow-sm mb-6">
          <Sparkles className="w-5 h-5 text-melrose-yellow animate-pulse" />
          <span className="text-sm font-bold text-white tracking-wide uppercase">{content.hero.bannerText}</span>
        </div>
        <h1 className="text-5xl md:text-8xl lg:text-9xl font-display font-black leading-tight tracking-tight drop-shadow-xl">
          <span className="block text-white/90" style={{ textShadow: '0 4px 20px rgba(0,0,0,0.1)' }}>
            {content.hero.title}
          </span>
          <span className="block mt-2 bg-clip-text text-transparent bg-gradient-to-b from-white/90 to-white/30 backdrop-blur-sm"
            style={{
              WebkitTextStroke: '1px rgba(255, 255, 255, 0.8)',
              filter: 'drop-shadow(0 0 25px rgba(255, 255, 255, 0.3))',
            }}
          >
            {content.hero.highlight}
          </span>
        </h1>
      </div>

      {/* 2. Middle Row: Text (Left) & Logo (Right) - Row on ALL devices */}
      {/* Full width container allowing natural responsive spacing */}
      {/* 2. Middle Row: Text & Logo */}
      {/* Mobile: Vertical (Logo top, Text bottom). Desktop: Horizontal (Text left, Logo right) */}
      <div className="w-full flex flex-col md:flex-row items-center justify-between gap-8 md:gap-24 mb-12 px-4 md:px-20 lg:px-40">

        {/* Logo - Mobile Order 1, Desktop Order 2 */}
        <div className="flex-1 flex justify-center md:justify-start order-1 md:order-2">
          <div className="transform scale-[0.9] sm:scale-75 md:scale-100 origin-center md:origin-left">
            <TiltLogo />
          </div>
        </div>

        {/* Text - Mobile Order 2, Desktop Order 1 */}
        <div className="flex-1 text-center md:text-left flex justify-center md:justify-end order-2 md:order-1">
          <p className="text-xl md:text-2xl text-white/95 font-semibold font-quicksand rtl:font-tajawal drop-shadow-md leading-relaxed max-w-lg">
            {content.hero.subtitle}
          </p>
        </div>
      </div>

      {/* 3. Bottom Row: Buttons - Side by Side Centered */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 md:gap-8 w-full order-3">
        <Button
          className="w-full sm:w-auto h-14 md:h-16 px-8 md:px-10 text-lg md:text-xl shadow-xl rounded-full hover:scale-105 transition-all duration-300 bg-[hsl(350,80%,40%)] hover:bg-[hsl(350,80%,30%)] text-white border-2 border-white/20"
          onClick={() => smoothScroll('#contact')}
        >
          {content.hero.ctaPrimary}
          <ArrowRight className="ml-2 w-4 h-4 md:w-6 md:h-6 transition-transform group-hover:translate-x-1 rtl:group-hover:-translate-x-1 rtl:rotate-180" />
        </Button>
        <Button
          className="w-full sm:w-auto h-14 md:h-16 px-8 md:px-10 text-lg md:text-xl shadow-xl rounded-full hover:scale-105 transition-all duration-300 bg-[hsl(215,70%,35%)] hover:bg-[hsl(215,70%,25%)] text-white border-2 border-white/20"
          onClick={() => smoothScroll('#programmes')}
        >
          {content.hero.ctaSecondary}
        </Button>
      </div>

    </section>
  );
};

export default HeroSection;
