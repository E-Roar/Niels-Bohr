import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay, EffectCoverflow } from 'swiper/modules';
import { ChevronLeft, ChevronRight, ZoomIn } from 'lucide-react';
import { useSiteContent } from '@/contexts/SiteContext';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-coverflow';

export const GallerySection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const navigationPrevRef = useRef(null);
  const navigationNextRef = useRef(null);
  const { content } = useSiteContent();
  const { gallery } = content;

  return (
    <section id="galerie" className="py-24 bg-transparent overflow-hidden" dir="ltr">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6 }}
          >
            <div className="bg-white/5 rounded-[2rem] p-6 border border-white/20 backdrop-blur-md inline-block shadow-none">
              <h2 className="text-3xl md:text-4xl font-display font-bold mb-4 text-white drop-shadow-lg">
                {gallery.title} <span className="gradient-text brightness-150">{gallery.highlight}</span>
              </h2>
              <p className="text-lg text-white/90 font-quicksand rtl:font-tajawal drop-shadow-md">
                {gallery.subtitle}
              </p>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative px-4 sm:px-12"
        >
          {/* Custom Navigation Buttons */}
          <button
            ref={navigationPrevRef}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 md:w-12 md:h-12 bg-background/80 backdrop-blur-md rounded-full shadow-neo flex items-center justify-center text-primary hover:bg-white hover:scale-110 transition-all duration-300 border border-white/50"
          >
            <ChevronLeft className="w-6 h-6 rtl:rotate-180" />
          </button>

          <button
            ref={navigationNextRef}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 md:w-12 md:h-12 bg-background/80 backdrop-blur-md rounded-full shadow-neo flex items-center justify-center text-primary hover:bg-white hover:scale-110 transition-all duration-300 border border-white/50"
          >
            <ChevronRight className="w-6 h-6 rtl:rotate-180" />
          </button>

          <Swiper
            modules={[Navigation, Pagination, Autoplay, EffectCoverflow]}
            effect={'coverflow'}
            grabCursor={true}
            centeredSlides={true}
            loop={true}
            slidesPerView={1}
            coverflowEffect={{
              rotate: 0,
              stretch: 0,
              depth: 100,
              modifier: 2.5,
              slideShadows: false,
            }}
            autoplay={{
              delay: 4000,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            pagination={{
              el: '.swiper-pagination',
              clickable: true,
              dynamicBullets: true,
            }}
            navigation={{
              prevEl: navigationPrevRef.current,
              nextEl: navigationNextRef.current,
            }}
            onBeforeInit={(swiper) => {
              // @ts-expect-error - Swiper ref typing issue
              swiper.params.navigation.prevEl = navigationPrevRef.current;
              // @ts-expect-error - Swiper ref typing issue
              swiper.params.navigation.nextEl = navigationNextRef.current;
            }}
            breakpoints={{
              320: {
                slidesPerView: 1.1,
                spaceBetween: 10,
              },
              640: {
                slidesPerView: 1.5,
                spaceBetween: 20,
              },
              1024: {
                slidesPerView: 2.5,
                spaceBetween: 30,
              },
            }}
            touchRatio={0.8}
            resistanceRatio={0.85}
            className="w-full py-8"
          >
            {gallery.images.map((image) => (
              <SwiperSlide key={image.id} className="w-[300px] sm:w-[400px]">
                <div className="relative group rounded-[2rem] overflow-hidden bg-white/5 backdrop-blur-md aspect-[4/3] border border-white/20 shadow-none">
                  <img
                    src={image.src}
                    alt={image.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col justify-end p-6 translate-y-4 group-hover:translate-y-0">
                    <span className="text-white/60 text-sm font-medium mb-1 transform -translate-y-4 group-hover:translate-y-0 transition-transform duration-500 delay-100">
                      {image.title}
                    </span>
                    <h3 className="text-white text-xl font-bold font-display transform -translate-y-4 group-hover:translate-y-0 transition-transform duration-500 delay-200">
                      {image.description}
                    </h3>
                    <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-md p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-300">
                      <ZoomIn className="w-5 h-5 text-white" />
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          <div className="swiper-pagination !relative !bottom-0 mt-8 flex justify-center gap-2"></div>
        </motion.div>
      </div>
    </section>
  );
};
