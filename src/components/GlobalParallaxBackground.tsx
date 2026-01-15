import { useEffect, useRef, useState } from 'react';
import bgVideo from '@/assets/bg.mp4';

let videoReadyCallback: ((ready: boolean) => void) | null = null;

export const onVideoReady = (callback: (ready: boolean) => void) => {
    videoReadyCallback = callback;
};

export const GlobalParallaxBackground = () => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [isVideoReady, setIsVideoReady] = useState(false);
    const currentTimeRef = useRef(0);
    const targetTimeRef = useRef(0);
    const animationFrameRef = useRef<number | null>(null);

    useEffect(() => {
        const video = videoRef.current;
        if (!video) return;

        const markReady = () => {
            setIsVideoReady(true);
            if (videoReadyCallback) videoReadyCallback(true);
        };

        const handleCanPlayThrough = () => markReady();
        const handleLoadedData = () => { if (video.readyState >= 2) markReady(); };

        const lerp = (start: number, end: number, factor: number) => start + (end - start) * factor;

        const animateVideoTime = () => {
            if (!video || !video.duration || isNaN(video.duration)) {
                animationFrameRef.current = requestAnimationFrame(animateVideoTime);
                return;
            }
            const smoothFactor = 0.08;
            currentTimeRef.current = lerp(currentTimeRef.current, targetTimeRef.current, smoothFactor);
            const timeDiff = Math.abs(video.currentTime - currentTimeRef.current);
            if (timeDiff > 0.03) video.currentTime = currentTimeRef.current;
            animationFrameRef.current = requestAnimationFrame(animateVideoTime);
        };

        const updateTargetTime = () => {
            if (!video || !video.duration || isNaN(video.duration)) return;
            const scrollTop = window.scrollY;
            const docHeight = document.documentElement.scrollHeight - window.innerHeight;
            if (docHeight <= 0) return;
            const scrollProgress = Math.max(0, Math.min(1, scrollTop / docHeight));
            targetTimeRef.current = scrollProgress * video.duration;
        };

        const handleScroll = () => updateTargetTime();

        video.addEventListener('canplaythrough', handleCanPlayThrough);
        video.addEventListener('loadeddata', handleLoadedData);
        window.addEventListener('scroll', handleScroll, { passive: true });

        if (video.readyState >= 2) {
            markReady();
            updateTargetTime();
            currentTimeRef.current = targetTimeRef.current;
        }

        animationFrameRef.current = requestAnimationFrame(animateVideoTime);

        return () => {
            video.removeEventListener('canplaythrough', handleCanPlayThrough);
            video.removeEventListener('loadeddata', handleLoadedData);
            window.removeEventListener('scroll', handleScroll);
            if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
        };
    }, []);

    return (
        <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none select-none">
            <video ref={videoRef} className="absolute inset-0 w-full h-full object-cover" src={bgVideo} muted playsInline preload="auto" />
            {!isVideoReady && <div className="absolute inset-0 bg-slate-900" />}
        </div>
    );
};
