import React, { useState } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const CircularSlider = () => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const images = [
        "/images/hero_woman.png",
        "/images/hero_man.png",
        "/images/hero_woman.png",
        "/images/hero_man.png",
        "/images/hero_woman.png",
        "/images/hero_man.png",
    ];

    const nextSlide = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === images.length - 1 ? 0 : prevIndex + 1
        );
    };

    const prevSlide = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === 0 ? images.length - 1 : prevIndex - 1
        );
    };

    const goToSlide = (index) => {
        setCurrentIndex(index);
    };

    return (
        <div className="h-[75vh] border-l-indigo-900 w-full flex items-center justify-center">
            <div className="w-full h-full relative">
                <div className="relative h-full w-full overflow-hidden">
                    <div className="w-full h-full flex items-center justify-center">
                        <img
                            src={images[currentIndex]}
                            alt={`Slide ${currentIndex + 1}`}
                            className="max-h-[90%] w-auto object-contain transition-opacity duration-300"
                            key={currentIndex}
                        />
                    </div>

                    {/* Navigation buttons */}
                    <button
                        onClick={prevSlide}
                        className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/20 hover:bg-black/40 p-2 rounded-full shadow-md transition-colors z-10"
                    >
                        <FaChevronLeft className="w-6 h-6 text-white" />
                    </button>
                    <button
                        onClick={nextSlide}
                        className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/20 hover:bg-black/40 p-2 rounded-full shadow-md transition-colors z-10"
                    >
                        <FaChevronRight className="w-6 h-6 text-white" />
                    </button>

                    {/* Indicators */}
                    <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2 z-10">
                        {images.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => goToSlide(index)}
                                className={`w-2.5 h-2.5 rounded-full transition-colors 
                                    ${currentIndex === index ? 'bg-primary-dark' : 'bg-primary-light'}`}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CircularSlider;