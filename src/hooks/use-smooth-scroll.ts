import { useCallback } from 'react';

// Easing function - easeInOutCubic for smooth acceleration/deceleration
const easeInOutCubic = (t: number): number => {
    return t < 0.5
        ? 4 * t * t * t
        : 1 - Math.pow(-2 * t + 2, 3) / 2;
};

// Alternative easing functions
const easeInOutQuart = (t: number): number => {
    return t < 0.5
        ? 8 * t * t * t * t
        : 1 - Math.pow(-2 * t + 2, 4) / 2;
};

const easeOutExpo = (t: number): number => {
    return t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
};

interface SmoothScrollOptions {
    duration?: number;
    offset?: number;
    easing?: (t: number) => number;
}

export const useSmoothScroll = () => {
    const smoothScrollTo = useCallback((
        target: string | HTMLElement | number,
        options: SmoothScrollOptions = {}
    ) => {
        const {
            duration = 1000, // 1 second default
            offset = -100, // Account for navbar height
            easing = easeInOutCubic
        } = options;

        let targetPosition: number;

        if (typeof target === 'number') {
            targetPosition = target;
        } else if (typeof target === 'string') {
            const element = document.querySelector(target);
            if (!element) return;
            targetPosition = element.getBoundingClientRect().top + window.scrollY + offset;
        } else {
            targetPosition = target.getBoundingClientRect().top + window.scrollY + offset;
        }

        const startPosition = window.scrollY;
        const distance = targetPosition - startPosition;
        let startTime: number | null = null;

        const animation = (currentTime: number) => {
            if (startTime === null) startTime = currentTime;
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);

            const easedProgress = easing(progress);
            window.scrollTo(0, startPosition + distance * easedProgress);

            if (progress < 1) {
                requestAnimationFrame(animation);
            }
        };

        requestAnimationFrame(animation);
    }, []);

    const scrollToSection = useCallback((href: string) => {
        smoothScrollTo(href, { duration: 800, offset: -100 });
    }, [smoothScrollTo]);

    const scrollToTop = useCallback(() => {
        smoothScrollTo(0, { duration: 600, offset: 0 });
    }, [smoothScrollTo]);

    return { smoothScrollTo, scrollToSection, scrollToTop };
};

export { easeInOutCubic, easeInOutQuart, easeOutExpo };
