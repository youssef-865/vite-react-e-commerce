

import axios from 'axios';
import { useEffect, useState } from 'react';
import Loader from '../loader/loader';

export default function Brands() {
  const [categories, setCategories] = useState([]);
  const [isLoading, setLoading] = useState(true);

 
  const getCategories = async () => {
    try {
      const response = await axios.get('https://ecommerce.routemisr.com/api/v1/brands');
      setCategories(response.data.data); // Assuming response structure has data.data
      setLoading(false);
    } catch (error) {
      console.error("Error fetching categories:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    getCategories();
  }, []);

  if (isLoading) {
    return <Loader />;
  } else {
    
    return (
      <div className='px-4'>
      <div className=' py-5'>
      <h1 className="text-4xl font-bold text-center text-green-500 mb-6">All Brands</h1>
          <div className="row gap-5">
            {categories.map((data)=>{
             return <div className='w-3/12  product  overflow-hidden bg-white hover: border-green-500  hover: shadow-xl rounded-md ' key={data.id}>
             <div className=' bg-white gap-5'>
            
             <img className='w-fit ' src={data.image} alt={data.name}/>
             
               <p className=' text-lg font-semibold text-center m-4  text-gray-600'>
                {data.name.split(' ').slice(0,3).join(' ')}
               </p>
               
             </div>
             </div>
            
            })}
          </div>
         </div>
      </div>
      
        
        )
  }
}



