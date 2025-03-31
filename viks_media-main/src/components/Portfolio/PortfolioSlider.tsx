// PortfolioSlider.tsx
import React, { useState, useRef, useEffect } from 'react';
import PortfolioCard from './PortfolioCard';
import styles from './PortfolioSlider.module.css';

// Assume PortfolioItem interface is defined/imported
interface PortfolioItem {
    id: string;
    category: string;
    imageUrl: string;
    title: string;
    description: string;
    clientInfo?: string | null;
    detailsLink: string;
}

interface PortfolioSliderProps {
    items: PortfolioItem[];
    slidesToShow?: number; // How many cards visible at once
}

// Simple SVG Arrow Icon Component
const ArrowIcon = ({ direction = 'right' }: { direction?: 'left' | 'right' }) => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        {direction === 'left' ? <path d="M15 18l-6-6 6-6" /> : <path d="M9 18l6-6-6-6" />}
    </svg>
);


const PortfolioSlider: React.FC<PortfolioSliderProps> = ({ items, slidesToShow = 2 }) => { // Default to showing 2 slides
    const [currentIndex, setCurrentIndex] = useState(0);
    const trackRef = useRef<HTMLDivElement>(null);
    const sliderContainerRef = useRef<HTMLDivElement>(null);
    const [slideWidth, setSlideWidth] = useState(0);

    const totalItems = items.length;
    // Calculate the maximum index based on slidesToShow
    // e.g., 4 items, show 2 -> max index is 4 - 2 = 2 (indices 0, 1, 2)
    const maxScrollIndex = Math.max(0, totalItems - slidesToShow);

    // Update slide width on resize or initial load
    useEffect(() => {
        const updateWidth = () => {
            if (sliderContainerRef.current) {
                const containerWidth = sliderContainerRef.current.offsetWidth;
                // Calculate width for one slide based on container width and number to show
                // Includes basic gap calculation (adjust gap value as needed, should match CSS)
                const gap = 30; // Matches gap in .slide padding * 2
                setSlideWidth((containerWidth - (slidesToShow - 1) * gap) / slidesToShow);
            }
        };

        updateWidth(); // Initial width
        window.addEventListener('resize', updateWidth);
        return () => window.removeEventListener('resize', updateWidth);
    }, [slidesToShow, items]); // Recalculate if items or slidesToShow change


    // Update transform based on currentIndex and slideWidth
    useEffect(() => {
        if (trackRef.current) {
            // Calculate the actual step distance including the gap
            const gap = 30; // Should match gap calculation
            const step = slideWidth + gap;
            const transformValue = -(currentIndex * step);
            trackRef.current.style.transform = `translateX(${transformValue}px)`;
        }
    }, [currentIndex, slideWidth]);

    // Reset index when items change (e.g., due to filtering)
    useEffect(() => {
        setCurrentIndex(0);
    }, [items]);

    // Adjust index if it becomes invalid after items/slidesToShow change
    useEffect(() => {
        const currentMaxIndex = Math.max(0, items.length - slidesToShow);
        if (currentIndex > currentMaxIndex) {
            setCurrentIndex(currentMaxIndex);
        } else if (currentIndex < 0) {
            setCurrentIndex(0);
        }
    }, [items, slidesToShow, currentIndex]);


    const goToPrev = () => {
        setCurrentIndex(prevIndex => (prevIndex === 0 ? maxScrollIndex : prevIndex - 1));
    };

    const goToNext = () => {
        setCurrentIndex(prevIndex => (prevIndex === maxScrollIndex ? 0 : prevIndex + 1));
    };

    if (!items || totalItems === 0) {
        return <div className={styles.noItemsMessage}>Нет работ для отображения.</div>;
    }

    // Calculate track width dynamically
    const trackWidth = totalItems * slideWidth + (totalItems > 0 ? (totalItems - 1) * 30 : 0) ; // 30 is gap


    return (
        <div className={styles.sliderWrapper}>
            <div className={styles.sliderContainer} ref={sliderContainerRef}>
                <div
                    className={styles.sliderTrack}
                    ref={trackRef}
                    style={{ width: `${trackWidth}px` }} // Dynamic track width
                >
                    {items.map((item) => (
                        <div
                            key={item.id}
                            className={styles.slide}
                            // Set explicit width for each slide
                            style={{ width: `${slideWidth}px` }}
                        >
                            {/* Render the existing PortfolioCard */}
                            <PortfolioCard item={item} />
                        </div>
                    ))}
                </div>
            </div>

            {/* Navigation: Only show if more items than slides visible */}
            {totalItems > slidesToShow && (
                <div className={styles.sliderNavigation}>
                    <button
                        className={styles.navButton}
                        onClick={goToPrev}
                        aria-label="Previous slide"
                        disabled={currentIndex === 0} // Disable at start
                    >
                        <ArrowIcon direction="left" />
                    </button>
                    <button
                        className={styles.navButton}
                        onClick={goToNext}
                        aria-label="Next slide"
                        disabled={currentIndex === maxScrollIndex} // Disable at end
                    >
                        <ArrowIcon direction="right" />
                    </button>
                </div>
            )}
        </div>
    );
};

export default PortfolioSlider;