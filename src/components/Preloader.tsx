import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import logo from '@/assets/logo.png';

export const Preloader = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [canSkip, setCanSkip] = useState(false);

  useEffect(() => {
    // Detect connection speed
    const connection = (navigator as any).connection;
    const isSlowConnection = connection?.effectiveType === 'slow-2g' || connection?.effectiveType === '2g';
    const delay = isSlowConnection ? 1000 : 1500;

    // Show skip button after delay
    const showSkipTimer = setTimeout(() => setCanSkip(true), delay);

    // Hide preloader
    const hideTimer = setTimeout(() => {
      setIsLoading(false);
    }, delay + 500);

    return () => {
      clearTimeout(showSkipTimer);
      clearTimeout(hideTimer);
    };
  }, []);

  const skipPreloader = () => {
    setIsLoading(false);
  };

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4, ease: 'easeInOut' }}
          className="fixed inset-0 z-[100] flex items-center justify-center preloader-bg"
        >
          <div className="flex flex-col items-center gap-6">
            {/* Simplified animated logo */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
              className="relative"
            >
              {/* Logo container with neomorphism */}
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                className="relative z-10 p-6 rounded-full logo-gradient-bg"
              >
                <img
                  src={logo}
                  alt="Groupe Scolaire Niels Bohr"
                  className="w-28 h-28 md:w-36 md:h-36 object-contain brightness-0 invert"
                />
              </motion.div>
            </motion.div>

            {/* Loading text */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-center"
            >
              <h2 className="text-xl md:text-2xl font-bold font-display gradient-text mb-1">
                Groupe Scolaire Niels Bohr
              </h2>
              <p className="text-sm text-muted-foreground">Établissement Privé à El Jadida</p>
            </motion.div>

            {/* Loading dots - simplified */}
            <div className="flex gap-2">
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  animate={{ y: [0, -8, 0] }}
                  transition={{
                    duration: 0.5,
                    repeat: Infinity,
                    delay: i * 0.12,
                    ease: 'easeInOut',
                  }}
                  className="w-2 h-2 rounded-full bg-gradient-to-r from-melrose-purple to-melrose-blue"
                />
              ))}
            </div>

            {/* Skip button */}
            {canSkip && (
              <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                onClick={skipPreloader}
                className="text-xs text-muted-foreground hover:text-foreground underline transition-colors"
              >
                Passer
              </motion.button>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
