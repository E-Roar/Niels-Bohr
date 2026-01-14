import globalBg from '@/assets/global-bg.png';

export const GlobalParallaxBackground = () => {
    return (
        <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none select-none">
            {/* Layer 0: Static Global Background Image - No overlay to keep sections transparent */}
            <div
                className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-opacity duration-1000"
                style={{
                    backgroundImage: `url(${globalBg})`,
                    backgroundAttachment: 'fixed'
                }}
            />
        </div>
    );
};
