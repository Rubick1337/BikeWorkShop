import React, { useState } from "react";
import "./SliderStyle.scss";


import image1 from '../../images/image.png';
import image2 from '../../images/frameLoading.png';
import image3 from '../../images/image.png';
import image4 from '../../images/image.png';
import image5 from '../../images/image.png';

export default function SliderMain() {
    const [currentSlide, setCurrentSlide] = useState(0);
    const images = [image1, image2, image3, image4, image5];

    // Функции для смены слайдов
    const goToSlide = (index) => {
        setCurrentSlide(index);
    };

    const nextSlide = () => {
        setCurrentSlide((prev) => (prev + 1) % images.length);
    };

    const prevSlide = () => {
        setCurrentSlide((prev) => (prev - 1 + images.length) % images.length);
    };

    return (
        <div className="container__slider">
            <div className="title_section">
                <h3>Bike workshop</h3>
                <div className="line__title"></div>
            </div>
            <h4>Веломастерская позаботиться о вашем велосипеде</h4>

            <div className="slider__container">
                <div className="slider__items">
                    <div className="left-carrect" onClick={prevSlide}></div>
                    {images.map((image, index) => (
                        <div
                            key={index}
                            className={`image__item ${currentSlide === index ? "active" : ""}`}
                            style={{ backgroundImage: `url(${image})` }}
                        ></div>
                    ))}
                    <div className="right-carrect" onClick={nextSlide}></div>
                </div>

                <div className="pagination">
                    {images.map((_, index) => (
                        <div
                            key={index}
                            className={`button ${currentSlide === index ? "active" : ""}`}
                            onClick={() => goToSlide(index)}
                        >
                            <div className="inner"></div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
