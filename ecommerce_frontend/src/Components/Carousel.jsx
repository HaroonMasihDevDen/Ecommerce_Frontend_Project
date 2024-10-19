import React, { useState, useEffect } from 'react';

const Carousel = () => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const slides = [
        "https://mdbcdn.b-cdn.net/img/bootstrap-ecommerce/items/detail1/big.webp",
        "https://images.unsplash.com/photo-1525507119028-ed4c629a60a3?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y2xvdGhpbmd8ZW58MHx8MHx8fDA%3D",
        "https://images.unsplash.com/photo-1509319117193-57bab727e09d?q=80&w=2187&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        "https://plus.unsplash.com/premium_photo-1679056835084-7f21e64a3402?q=80&w=2187&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    ];

    // Auto-slide functionality
    useEffect(() => {
        const interval = setInterval(() => {
            nextSlide(); // Go to next slide automatically
        }, 4000); // Change slide every 3 seconds

        return () => clearInterval(interval); // Cleanup on component unmount
    }, [currentSlide]);

    const nextSlide = () => {
        setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
    };

    const prevSlide = () => {
        setCurrentSlide((prevSlide) =>
            prevSlide === 0 ? slides.length - 1 : prevSlide - 1
        );
    };

    return (
        <div className="carousel mx-5 w-[70%] h-[68vh] border-2 rounded-md overflow-hidden relative">
            <div
                className="carousel-inner flex transition-transform ease-in-out"
                style={{
                    transform: `translateX(-${currentSlide * 100}%)`,
                    transitionDuration: '900ms',
                }}
            >
                {slides.map((slide, index) => (
                    <div key={index} className="carousel-item w-full flex-shrink-0">
                        <img
                            src={slide}
                            className="w-full h-full object-cover"  // Makes the image fit the container
                            alt={`Slide ${index + 1}`}
                        />
                    </div>
                ))}
            </div>
            <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
                <button onClick={prevSlide} className="btn btn-circle">❮</button>
                <button onClick={nextSlide} className="btn btn-circle">❯</button>
            </div>
        </div>
    );
};

export default Carousel;
