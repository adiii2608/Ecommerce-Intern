import React from 'react'
import SwiperSlider from '../Components/Swiper/Swiper'
import CategoryGrid from '../Components/CategoryGrid/CategoryGrid'
import CategoryOffers from '../Components/CategoryOffers/CategoryOffers';
import './home.css';


const Home = () => {
  return (
    <div className='temp1'>
      <SwiperSlider/>
      <CategoryGrid/>
      <CategoryOffers/>
    </div>
  )
}

export default Home

