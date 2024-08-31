import axios from 'axios';
import  { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { cartContext } from '../../context/cartContext';
import Slider from 'react-slick';
import Categories from '../Categories/Categories';
import toast from 'react-hot-toast';  // Ensure toast is imported

export default function ProductDetails() {
  let { addProductToCart } = useContext(cartContext);
  let { id } = useParams();
  const [details, setDetails] = useState(null);

  // Function to add product to cart
  async function addProductItem(id) {
    try {
      let response = await addProductToCart(id);
      if (response.data.status === 'success') {
        toast.success(response.data.message, {
          duration: 4000,
          position: 'top-left',
        });
      } else {
        toast.error(response.data.message, {
          duration: 4000,
          position: 'top-left',
        });
      }
    } catch (error) {
      toast.error("Failed to add product to cart", {
        duration: 4000,
        position: 'top-left',
      });
    }
  }

  // Settings for the image slider
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  // Fetch product details based on the product ID
  function getProductDetails() {
    axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
      .then(({ data }) => {
        setDetails(data.data);
      })
      .catch((error) => {
        toast.error("Failed to fetch product details", {
          duration: 4000,
          position: 'top-left',
        });
      });
  }

  useEffect(() => {
    getProductDetails();
  }, [id]);

  return (
    <>
      <div className='row justify-center items-center my-5'>
        <div className='w-1/4'>
          <Slider {...sliderSettings}>
            {details?.images.map((src, index) => (
              <img key={index} src={src} alt={details?.title} />
            ))}
          </Slider>
        </div>
        <div className='w-3/4 flex flex-col justify-around h-80'>
          <div>
            <h1 className='text-xl font-semibold text-slate-800'>{details?.title}</h1>
            <p>{details?.description}</p>
          </div>
          <div>
            <p className='mt-3'>{details?.category?.name}</p>
            <div className='flex justify-between my-3'>
              <span>{details?.price} EGP</span>
              <span>{details?.ratingsQuantity}<i className='fas fa-star text-yellow-500'></i></span>
            </div>
            <button 
              onClick={() => addProductItem(details?.id)} 
              className='btn bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded'>
              Add To Cart
            </button>
          </div>
        </div>
      </div>
      {details?.category?.name && <Categories categoryName={details.category.name} />}
    </>
  );
}
