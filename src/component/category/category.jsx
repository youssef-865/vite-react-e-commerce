import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Loader from '../loader/loader';
import { Link } from 'react-router-dom';


export default function Category(props) {
let category = props.categoryName;
const [isLoading,setLoading] = useState(true)

console.log(props)
  const [product,setDetails] = useState([])
  function getRelatedCategory(){
   axios.get(`https://ecommerce.routemisr.com/api/v1/products`)
   .then(({data})=>{
    setLoading(false)
   let allProducts = data.data;
   let related =allProducts.filter((prod)=>{
   return prod.category.name === category
   })
   console.log(related)
   setDetails(related)
   })
   .catch(()=>{
    setLoading(false)
   })
  }
  
  
  useEffect(()=>{
    getRelatedCategory()
  },[])
  
    return (
      <div className='container'>
      {
       !isLoading ? 
       <div className="row gap-1">
         {product.map((productInfo)=>{
          return <div className='w-2/12 px-4 '>
          <Link to={`/productDetails/${productInfo.id}/${productInfo.category.name}`}>
          <img className='w-full' src={productInfo.imageCover} alt={productInfo.title}/>
            <span className='block text-xl font-light text-green-600'>
             {productInfo.category.name}
            </span>
            <span className='text-lg font-semibold text-gray-700'>
             {productInfo.title.split(' ').slice(0,3).join(' ')}
            </span>
            <div className='flex justify-between my-3'>
               <span>{productInfo.price}EGP</span>
               <span>{productInfo.ratingsQuantity}<i className='fas fa-star text-yellow-500'></i></span>
            </div>
          </Link>
           
          </div>
         
         })}
       </div>:
         <Loader/>
      }
         
      </div>
    )
}
