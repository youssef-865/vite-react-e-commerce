import React from 'react'
import Slider from "react-slick";
import img1 from '../../assets/img/slider-image-1.jpeg';
import img2 from '../../assets/img/slider-image-2.jpeg';
import img3 from '../../assets/img/grocery-banner.png';
import img4 from '../../assets/img/grocery-banner-2.jpeg';
export default function MainSlider() {

  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows:false
  };
  
  return (
    <div className='conteiner'>
      <div className="row">
       <div className='w-1/3'>
         <img src={img1} className='w-full secondImg' />
         <img src={img2} className='w-full secondImg' />
       </div>
       <div className='w-2/3'>
       <Slider {...settings}>
       <img src={img3} className='w-full mainImg' />
       <img src={img4} className='w-full mainImg' /> 
       </Slider>
       </div>
        
      </div>
    </div>
  )
}
