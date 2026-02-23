import React, { useState, useEffect, type ReactNode } from 'react';

interface AutoCarouselProps {
  items: ReactNode[]; 
  interval?: number;
}

const AutoCarousel: React.FC<AutoCarouselProps> = ({ items, interval = 3000 }) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  useEffect(() => {
    if (items.length === 0) return;

    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === items.length - 1 ? 0 : prevIndex + 1
      );
    }, interval);

    return () => clearInterval(timer);
  }, [items.length, interval]);

  return (
    <div style={{ overflow: 'hidden', position: 'relative' }}>
      <div
        style={{
          display: 'flex',
          transition: 'transform 0.5s ease-in-out',
          transform: `translateX(-${currentIndex * 100}%)`,
        }}
      >
        {items.map((item, index) => (
          <div 
            key={index} 
          >
            {item}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AutoCarousel;