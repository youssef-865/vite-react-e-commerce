

import axios from 'axios';
import { useEffect, useState } from 'react';
import Loader from '../loader/loader';

export default function Categories() {
  const [categories, setCategories] = useState([]);
  const [isLoading, setLoading] = useState(true);

  // Fetch categories from the API
  const getCategories = async () => {
    try {
      const response = await axios.get('https://ecommerce.routemisr.com/api/v1/categories');
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
      
          <div className="row gap-5">
        
            {categories.map((data)=>{
             return <div className='w-3/12  product  overflow-hidden bg-white hover: border-green-500  hover: shadow-xl rounded-md ' key={data.id}>
             <div className=' bg-white gap-5'>
            
             <img className='w-fit categories-img ' src={data.image} alt={data.name}/>
             
               <p className=' text-xl font-bold text-center m-4  text-green-700'>
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



// return (
//   <div className="px-4">
//     <div className="py-5">
//       <div className="row gap-1">
//         {categories.map((category) => (
//           <div className="w-2/12 px-4 my-2 product" key={category._id}>
//             <span className="block text-xl font-light text-green-600">
//               {category.name}
//             </span>
//           </div>
//         ))}
//       </div>
//     </div>
//   </div>
// );