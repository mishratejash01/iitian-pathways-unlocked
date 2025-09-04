import React, { useState, useEffect, useRef } from "react";

const carouselImages = [
  {
    src: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&q=80&w=2000&h=500",
    alt: "Educational technology and programming",
  },
  {
    src: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&q=80&w=2000&h=500",
    alt: "Coding and software development education",
  },
  {
    src: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&q=80&w=2000&h=500",
    alt: "Student working on laptop",
  },
];

const HeroCarousel = () => {
  const [current, setCurrent] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [currentTranslate, setCurrentTranslate] = useState(0);
  const [prevTranslate, setPrevTranslate] = useState(0);
  const [animationId, setAnimationId] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const length = carouselImages.length;

  const nextSlide = () => {
    setCurrent(current === length - 1 ? 0 : current + 1);
  };

  const prevSlide = () => {
    setCurrent(current === 0 ? length - 1 : current - 1);
  };

  const goToSlide = (index: number) => {
    setCurrent(index);
  };

  // Auto-advance the carousel every 3 seconds
  useEffect(() => {
    if (!isDragging) {
      const interval = setInterval(() => {
        nextSlide();
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [current, isDragging]);

  // Touch/Mouse event handlers for swipe/drag functionality
  const handleStart = (clientX: number) => {
    setIsDragging(true);
    setStartX(clientX);
    setAnimationId(0);
    if (containerRef.current) {
      containerRef.current.style.cursor = 'grabbing';
    }
  };

  const handleMove = (clientX: number) => {
    if (!isDragging) return;
    const currentPosition = clientX;
    const diff = currentPosition - startX;
    setCurrentTranslate(prevTranslate + diff);
  };

  const handleEnd = () => {
    setIsDragging(false);
    const movedBy = currentTranslate - prevTranslate;
    
    // If moved enough negative then go to next slide
    if (movedBy < -100) {
      nextSlide();
    }
    
    // If moved enough positive then go to previous slide
    if (movedBy > 100) {
      prevSlide();
    }
    
    setCurrentTranslate(0);
    setPrevTranslate(0);
    
    if (containerRef.current) {
      containerRef.current.style.cursor = 'grab';
    }
  };

  // Mouse events
  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    handleStart(e.clientX);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    handleMove(e.clientX);
  };

  const handleMouseUp = () => {
    handleEnd();
  };

  const handleMouseLeave = () => {
    if (isDragging) {
      handleEnd();
    }
  };

  // Touch events
  const handleTouchStart = (e: React.TouchEvent) => {
    handleStart(e.touches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    handleMove(e.touches[0].clientX);
  };

  const handleTouchEnd = () => {
    handleEnd();
  };

  if (!carouselImages.length) {
    return null;
  }

  return (
    <div
      ref={containerRef}
      className="relative w-full h-[300px] sm:h-[350px] mt-16 cursor-grab select-none overflow-hidden"
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseLeave}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Carousel images */}
      {carouselImages.map((image, index) => (
        <div
          key={index}
          className={`absolute w-full h-full transition-all duration-700 ease-in-out ${
            index === current ? "opacity-100 scale-100" : "opacity-0 scale-105"
          }`}
          style={{ 
            zIndex: index === current ? 1 : 0,
            transform: isDragging && index === current ? `translateX(${currentTranslate - prevTranslate}px)` : 'none'
          }}
        >
          <img
            src={image.src}
            alt={image.alt}
            className="object-cover w-full h-full pointer-events-none"
            draggable={false}
          />
          <div className="absolute inset-0 bg-black/10"></div>
        </div>
      ))}
      
      {/* Navigation dots - positioned below carousel */}
      <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2 z-10">
        {carouselImages.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              index === current 
                ? "bg-royal scale-125 shadow-md" 
                : "bg-gray-400 hover:bg-gray-600"
            }`}
          ></button>
        ))}
      </div>
    </div>
  );
};

export default HeroCarousel;
