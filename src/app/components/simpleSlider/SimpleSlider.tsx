import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./simple-slider.scss";

export default function SimpleSlider({images}: any) {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    arrows: true,
    slidesToShow: 5,
    slidesToScroll: 4,
  };
  return (
    <Slider {...settings}>
      {images.map((img: any, index: number) => {
        return (
          <div>
            <img
              key={`slider-${index}`} 
              src={img}
            />
          </div>
        )
      })}
    </Slider>
  );
}