import axios from 'axios';
import React, { useEffect, useState } from 'react';

import "react-multi-carousel/lib/styles.css";
import Slider from 'react-slick';


export default function CategorySlider() {

  const [Category,setCategory]=useState([])
  
  function getCategorys(){
  axios.get('https://ecommerce.routemisr.com/api/v1/categories')
  .then(({data})=>{
  setCategory(data.data)
  })
  .catch(()=>{
  })
  }
  
  useEffect(()=>{
  getCategorys()
  },[])


  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 1,
  };

  

  return (
    <div className='py-5 overflow-hidden'>
     <h1 className='text-slate-700 my-4 text-3xl font-medium'>shop popular Category</h1>
   <Slider {...settings}>
    {Category.map((img)=>{
    return <img src={img.image} alt={img.name} className='w-100 category-img'/>
    })}
   </Slider>
</div>
  )
}
