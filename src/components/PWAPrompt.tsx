import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Download, X, Share } from 'lucide-react';
import { Button } from '@/components/ui/button';
import logo from '@/assets/logo.png';

export const PWAPrompt = () => {
    const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
    const [isVisible, setIsVisible] = useState(false);
    const [isIOS, setIsIOS] = useState(false);

    useEffect(() => {
        // Check if iOS
        const isIosDevice = /iPad|iPhone|iPod/.test(navigator.userAgent) && !(window as any).MSStream;
        setIsIOS(isIosDevice);

        const handleBeforeInstallPrompt = (e: any) => {
            e.preventDefault();
            setDeferredPrompt(e);
            setTimeout(() => setIsVisible(true), 1500);
        };

        window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

        // Special handling for iOS
        if (isIosDevice && !(window.navigator as any).standalone) {
            setTimeout(() => setIsVisible(true), 1500);
        }

        return () => {
            window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
        };
    }, []);

    const handleInstallClick = async () => {
        if (!deferredPrompt) {
            return;
        }

        try {
            deferredPrompt.prompt();
            const { outcome } = await deferredPrompt.userChoice;

            if (outcome === 'accepted') {
                setIsVisible(false);
            }
            setDeferredPrompt(null);
        } catch (error) {
            // Silently fail or handle gracefully in production
        }
    };

    const handleDismiss = () => {
        setIsVisible(false);
    };

    // If not iOS and no prompt is available, we shouldn't show the UI as the button won't work
    if (!isVisible || (!isIOS && !deferredPrompt)) return null;

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0, y: 50, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 50, scale: 0.95 }}
                transition={{ type: 'spring', damping: 20, stiffness: 300 }}
                className="fixed bottom-6 left-4 right-4 md:left-auto md:right-6 md:w-[400px] z-[10000] light-neo-theme"
            >
                <div className="glass-card p-6 relative overflow-hidden">
                    {/* Soft gradient Overlay */}
                    <div className="absolute inset-0 bg-transparent pointer-events-none" />
                    <div className="absolute -top-24 -right-24 w-48 h-48 bg-primary/5 blur-3xl rounded-full pointer-events-none" />

                    <button
                        onClick={handleDismiss}
                        className="absolute top-4 right-4 p-2 rounded-full hover:bg-black/5 transition-all active:scale-95 z-10"
                        aria-label="Close"
                    >
                        <X className="w-4 h-4 text-foreground/60" />
                    </button>

                    <div className="flex items-start gap-5 relative z-0">
                        <div className="w-20 h-20 flex items-center justify-center p-0 shrink-0">
                            <img src={logo} alt="Niels Bohr Logo" className="w-full h-full object-contain drop-shadow-lg" />
                        </div>
                        <div className="flex-1 pt-1">
                            <h3 className="font-bold text-xl tracking-tight mb-2 text-foreground font-display">
                                Groupe Scolaire Niels Bohr
                            </h3>
                            <p className="text-sm text-foreground/80 leading-relaxed font-medium">
                                {isIOS
                                    ? "Ajoutez l'application à votre écran d'accueil pour un accès instantané."
                                    : "Installez notre application pour une expérience fluide et hors-ligne."}
                            </p>
                        </div>
                    </div>

                    <div className="mt-8 flex gap-3 relative z-0">
                        {isIOS ? (
                            <div className="text-[13px] text-foreground/90 bg-background/50 backdrop-blur-sm p-4 rounded-xl w-full border border-border flex items-center justify-center gap-2">
                                <Share className="w-4 h-4 text-primary" />
                                <span>Appuyez sur "Partager" puis "Sur l'écran d'accueil"</span>
                            </div>
                        ) : (
                            <>
                                <Button
                                    variant="ghost"
                                    onClick={handleDismiss}
                                    className="flex-1 h-12 rounded-xl text-foreground/70 hover:text-foreground hover:bg-black/5 border border-border transition-all font-semibold"
                                >
                                    Plus tard
                                </Button>
                                <Button
                                    variant="gradient"
                                    onClick={handleInstallClick}
                                    className="flex-1 h-12 rounded-xl shadow-xl shadow-bohr-purple/20 transition-all hover:scale-[1.02] active:scale-[0.98] font-bold text-base"
                                >
                                    <Download className="w-5 h-5 mr-2" />
                                    Installer
                                </Button>
                            </>
                        )}
                    </div>
                </div>
            </motion.div>
        </AnimatePresence>
    );
};

