import React, { useState, useEffect, useRef } from 'react';
import images from '../images'; // Ensure you have an array of your 5 images

const ImageCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const intervalRef = useRef(null);
  const imageList = [images.back1, images.back2, images.back3, images.back4, images.back5]; // Replace with your images

  const startInterval = () => {
    intervalRef.current = setInterval(handleNextSlide, 4000);
  };

  const resetInterval = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    startInterval();
  };

  const handleNextSlide = () => {
    if (!isAnimating) {
      setIsAnimating(true);
      setCurrentIndex((prevIndex) => (prevIndex + 1) % imageList.length);
    }
  };

  const handlePrevSlide = () => {
    if (!isAnimating) {
      setIsAnimating(true);
      setCurrentIndex((prevIndex) => (prevIndex - 1 + imageList.length) % imageList.length);
    }
  };

  useEffect(() => {
    startInterval();
    return () => clearInterval(intervalRef.current);
  }, []);

  useEffect(() => {
    if (isAnimating) {
      const timeout = setTimeout(() => {
        setIsAnimating(false);
      }, 500); // Match the transition duration
      return () => clearTimeout(timeout);
    }
  }, [isAnimating]);

  useEffect(() => {
    return () => {
      clearInterval(intervalRef.current);
    };
  }, []);

  const handleManualChange = (direction) => {
    if (!isAnimating) {
      resetInterval();
      if (direction === 'next') {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % imageList.length);
      } else {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + imageList.length) % imageList.length);
      }
      setIsAnimating(true);
    }
  };

  return (
    <div className="relative w-full overflow-hidden rounded-md" style={{ height: '30rem' }}>
      <div
        className={`absolute inset-0 flex transition-transform duration-500 ease-in-out`}
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {imageList.map((image, index) => (
          <img key={index} src={image} alt={`Slide ${index}`} className="w-full h-full object-cover flex-shrink-0" />
        ))}
      </div>
      <button
        onClick={() => handleManualChange('prev')}
        className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-md z-10"
      >
        &#8592;
      </button>
      <button
        onClick={() => handleManualChange('next')}
        className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-md z-10"
      >
        &#8594;
      </button>
    </div>
  );
};

export default ImageCarousel;
