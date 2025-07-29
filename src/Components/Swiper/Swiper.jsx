// src/components/swiper/SwiperSlider.jsx
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import './Swiper.css';
import watch from '../Assets/watch.png';
import christmas from '../Assets/christmas.png';

const SwiperSlider = () => {
  return (
    <div className='outer-wrapper'>
    <div className="swiper-container-wrapper">
      <Swiper
        modules={[Navigation, Pagination]}
        navigation
        pagination={{ clickable: true }}
        spaceBetween={30}
        slidesPerView={1}
        loop={true}
        className="mySwiper"
      >
        <SwiperSlide>
            <div className="banner-slide1">
    <div className="banner-left">
      <h2>Best Deal Available</h2>
      <p>UPTO 80% OFF</p>
    </div>
    <div className="banner-right">
      <img src={watch}alt="Smartwatch" />
    </div>
  </div>
        </SwiperSlide>
        <SwiperSlide>
         <div className="banner-slide2">
    <div className="banner-left">
      <h2>Christmas offer!</h2>
      <p>UPTO 50% OFF on all sweets</p>
    </div>
    <div className="banner-right">
      <img src={christmas} alt="Smartwatch" />
    </div>
  </div>
        </SwiperSlide>
        <SwiperSlide>
            <div className="banner-slide3">
    <div className="banner-left">
      <h2>Best Deal Available</h2>
      <p>UPTO 80% OFF</p>
    </div>
    <div className="banner-right">
      <img src={watch} alt="Smartwatch" />
    </div>
  </div>
        </SwiperSlide>
      </Swiper>
    </div>
    </div>
  );
};

export default SwiperSlider;
