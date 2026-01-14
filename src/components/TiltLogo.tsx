import { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from 'framer-motion';
import logoWeb from '@/assets/logo-web.png';
import frame from '@/assets/frame.png';
import frameBg from '@/assets/frame-bg.png';

const TiltLogo = () => {
    // 1. Motion Values for Input (Mouse/Gyro)
    // Range: -1 to 1
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    // 2. Physics / Smoothness (Springs)
    // Low stiffness = "Delay" / "Heavy" feel.
    // Damping = Resistance to stop oscillating.
    const springConfig = { damping: 20, stiffness: 100, mass: 1 };

    // Smooth inputs
    const xSpring = useSpring(x, springConfig);
    const ySpring = useSpring(y, springConfig);

    // 3. Output Transforms (Rotations)
    // Max tilt angle (degrees)
    const MAX_TILT = 15;

    // Map -1..1 to Rotation Degrees
    // Mouse X -> Rotate Y (Inverted for "look at")
    const rotateY = useTransform(xSpring, [-1, 1], [-MAX_TILT, MAX_TILT]);
    // Mouse Y -> Rotate X (Inverted: Up is positive Y in screen, but Negative RotateX looks up)
    const rotateX = useTransform(ySpring, [-1, 1], [MAX_TILT, -MAX_TILT]);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            // Detect input device type to avoid conflict
            // Normalized coordinates (-1 to 1)
            // Center is (0,0)
            const width = window.innerWidth;
            const height = window.innerHeight;

            const normX = (e.clientX - width / 2) / (width / 2);
            const normY = (e.clientY - height / 2) / (height / 2);

            x.set(normX);
            y.set(normY);
        };

        const handleDeviceOrientation = (e: DeviceOrientationEvent) => {
            if (!e.gamma || !e.beta) return;

            // Beta: Front/Back tilt [-180, 180] -> Map -45 to 45 to -1..1
            // Gamma: Left/Right tilt [-90, 90] -> Map -45 to 45 to -1..1

            const MAX_ANGLE = 45;
            const normX = Math.min(Math.max(e.gamma, -MAX_ANGLE), MAX_ANGLE) / MAX_ANGLE;
            const normY = Math.min(Math.max(e.beta, -MAX_ANGLE), MAX_ANGLE) / MAX_ANGLE;

            x.set(normX);
            // Invert Y for natural feel on mobile
            y.set(normY);
        };

        // Add Listeners
        window.addEventListener('mousemove', handleMouseMove);

        // Request visual permission if needed (iOS 13+) - usually handled by click, skipping for auto
        window.addEventListener('deviceorientation', handleDeviceOrientation);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('deviceorientation', handleDeviceOrientation);
        };
    }, [x, y]);

    return (
        <motion.div
            style={{
                rotateX,
                rotateY,
                transformStyle: "preserve-3d",
                perspective: 1000
            }}
            // Base sizes kept from previous edit
            className="relative w-[240px] h-[240px] sm:w-[280px] sm:h-[280px] lg:w-[340px] lg:h-[340px] flex items-center justify-center -mb-8 sm:mb-0"
        >
            {/* 1. Frosted glass circle (Deepest) */}
            <div
                className="absolute w-[240px] h-[240px] sm:w-[290px] sm:h-[290px] lg:w-[350px] lg:h-[350px] rounded-full bg-white/10 backdrop-blur-sm border border-white/20 shadow-none"
                style={{ transform: 'translateZ(-40px)' }}
            />

            {/* 2. Background Layer */}
            <div
                className="absolute inset-0 flex items-center justify-center opacity-80"
                style={{ transform: 'translateZ(20px)' }}
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
                style={{ transform: 'translateZ(50px)' }}
            />

            {/* 4. Frame (Top) */}
            <div
                className="absolute inset-0 z-20 flex items-center justify-center"
                style={{ transform: 'translateZ(80px)' }}
            >
                <img
                    src={frame}
                    alt=""
                    className="w-[115%] h-[115%] object-contain opacity-90 scale-105"
                />
                {/* Shine effect */}
                <div className="absolute inset-0 bg-gradient-to-tr from-white/20 via-transparent to-transparent rounded-full opacity-40 mix-blend-overlay" />
            </div>
        </motion.div>
    );
};

export default TiltLogo;
