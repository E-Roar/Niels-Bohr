import React from 'react';
import { cn } from '@/lib/utils';

interface AtomWrapperProps {
    children: React.ReactNode;
    size?: 'sm' | 'md' | 'lg' | 'xl';
    className?: string;
}

const AtomWrapper = ({ children, size = 'md', className }: AtomWrapperProps) => {
    // Size mappings
    const sizeClasses = {
        sm: 'w-[180px] h-[180px]', // For Preloader
        md: 'w-[300px] h-[300px]', // Default
        lg: 'w-[500px] h-[500px] sm:w-[600px] sm:h-[600px]', // Custom for Hero
        xl: 'w-[700px] h-[700px]',
    };

    // Ring classes
    const ringBaseClass = "atom-ring absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none";

    return (
        <div className={cn("relative flex items-center justify-center", sizeClasses[size], className)}>
            {/* 3 Orbiting Rings - Visual Only - z-0 to be behind content but visible if content is transparent */}
            <div className={cn(ringBaseClass, "w-full h-full atom-ring-1")}>
                <div className="atom-particle" />
            </div>

            <div className={cn(ringBaseClass, "w-full h-full atom-ring-2")}>
                <div className="atom-particle" />
            </div>

            <div className={cn(ringBaseClass, "w-full h-full atom-ring-3")}>
                <div className="atom-particle" />
            </div>

            {/* The Actual Content (Logo) - z-10 to stay strictly in center */}
            <div className="relative z-10 flex items-center justify-center">
                {children}
            </div>
        </div>
    );
};

export default AtomWrapper;
