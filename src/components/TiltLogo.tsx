import { useEffect, useRef } from 'react';
import VanillaTilt from 'vanilla-tilt';
import logoWeb from '@/assets/logo-web.png';
import frame from '@/assets/frame.png';
import frameBg from '@/assets/frame-bg.png';

const TiltLogo = () => {
    const tiltRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const tiltNode = tiltRef.current;
        if (tiltNode) {
            VanillaTilt.init(tiltNode, {
                max: 15,
                speed: 400,
                glare: true,
                "max-glare": 0.5,
                scale: 1.05,
                perspective: 1000,
                easing: "cubic-bezier(.03,.98,.52,.99)",
                gyroscope: true,
                gyroscopeMinAngleX: -45,
                gyroscopeMaxAngleX: 45,
                gyroscopeMinAngleY: -45,
                gyroscopeMaxAngleY: 45,
            });
        }

        // Cleanup function
        return () => {
            if (tiltNode && (tiltNode as any).vanillaTilt) {
                (tiltNode as any).vanillaTilt.destroy();
            }
        };
    }, []);

    return (
        <div
            ref={tiltRef}
            className="title-logo relative w-[240px] h-[240px] sm:w-[280px] sm:h-[280px] lg:w-[340px] lg:h-[340px] flex items-center justify-center cursor-pointer -mb-8 sm:mb-0"
            style={{ transformStyle: 'preserve-3d' }}
        >
            {/* 1. Frosted glass circle (Deepest) */}
            <div
                className="absolute w-[240px] h-[240px] sm:w-[290px] sm:h-[290px] lg:w-[350px] lg:h-[350px] rounded-full bg-white/10 backdrop-blur-sm border border-white/20 shadow-none"
                style={{ transform: 'translateZ(20px)' }}
            />

            {/* 2. Background Layer */}
            <div
                className="absolute inset-0 flex items-center justify-center opacity-80"
                style={{ transform: 'translateZ(40px)' }}
            >
                <img
                    src={frameBg}
                    alt=""
                    className="w-[145%] h-[145%] object-contain max-w-none mix-blend-screen"
                />
            </div>

            {/* 3. Logo (Float Middle) */}
            <img
                src={logoWeb}
                alt="Logo"
                className="relative z-10 w-[50%] max-w-[80px] sm:max-w-[160px] lg:max-w-[200px] object-contain"
                style={{ transform: 'translateZ(80px)' }}
            />

            {/* 4. Frame (Top) */}
            <div
                className="absolute inset-0 z-20 flex items-center justify-center"
                style={{ transform: 'translateZ(100px)' }}
            >
                <img
                    src={frame}
                    alt=""
                    className="w-[115%] h-[115%] object-contain opacity-90 scale-105"
                />
                {/* Shine effect handled by vanilla-tilt 'glare' option usually, but keeping custom overlay if needed */}
                <div className="absolute inset-0 bg-gradient-to-tr from-white/20 via-transparent to-transparent rounded-full opacity-40 mix-blend-overlay pointer-events-none" />
            </div>
        </div>
    );
};

export default TiltLogo;
