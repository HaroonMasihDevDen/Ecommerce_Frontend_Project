import React, { useState, useEffect } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const CircularSlider = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isHovered, setIsHovered] = useState(false);
    const [direction, setDirection] = useState("next"); // Track slide direction

    const images = [
        "/images/hero_2.png",
        "/images/hero_1.png",
        "/images/hero_2.png",
        "/images/hero_1.png",
        "/images/hero_2.png",
        "/images/hero_1.png",
    ];

    const nextSlide = () => {
        setDirection("next");
        setCurrentIndex((prevIndex) =>
            prevIndex === images.length - 1 ? 0 : prevIndex + 1
        );
    };

    const prevSlide = () => {
        setDirection("prev");
        setCurrentIndex((prevIndex) =>
            prevIndex === 0 ? images.length - 1 : prevIndex - 1
        );
    };

    const goToSlide = (index) => {
        setDirection(index > currentIndex ? "next" : "prev");
        setCurrentIndex(index);
    };

    // Auto-slide effect
    useEffect(() => {
        if (!isHovered) {
            const interval = setInterval(nextSlide, 5000);
            return () => clearInterval(interval);
        }
    }, [currentIndex, isHovered]);

    return (
        <div
            className="h-[75vh] w-full flex items-center justify-center relative overflow-hidden"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <div className="w-full h-full relative">
                <div className="relative h-full w-full overflow-hidden">
                    <div className="w-full h-full flex items-center justify-center relative">
                        {/* Image transition effect */}
                        {images.map((image, index) => (
                            <img
                                key={index}
                                src={image}
                                alt={`Slide ${index + 1}`}
                                className={`absolute w-auto max-h-[90%] object-contain transition-transform duration-[1200ms] ${index === currentIndex
                                    ? "translate-x-0 opacity-100"
                                    : direction === "next"
                                        ? "translate-x-full opacity-0"
                                        : "-translate-x-full opacity-0"
                                    }`}
                            />
                        ))}
                    </div>

                    {/* Navigation buttons */}
                    {/* <button
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
                    </button> */}

                    {/* Indicators */}
                    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 flex gap-2 z-10">
                        {images.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => goToSlide(index)}
                                className={`w-2.5 h-2.5 rounded-full transition-colors ${currentIndex === index ? "bg-primary-dark" : "bg-primary-light"
                                    }`}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CircularSlider;
