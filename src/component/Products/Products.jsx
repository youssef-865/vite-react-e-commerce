import axios from 'axios';
import  { useContext, useState } from 'react';
import Loader from '../loader/loader';
import { Link } from 'react-router-dom';
import CategorySlider from '../categorySlider/categorySlider';
import { cartContext } from './../../context/cartContext';
import toast from 'react-hot-toast';
import MainSlider from '../mainSlider/mainSlider';
import { useQuery } from '@tanstack/react-query';
import { WichListContext } from '../../context/WichListContext';

export default function Products() {
  // State to keep track of clicked heart icons
  const [clickedHearts, setClickedHearts] = useState({});
  const [searchQuery, setSearchQuery] = useState(''); // State for search query

  let { addProductToWhichList } = useContext(WichListContext);
  let { data, isLoading,  } = useQuery({
    queryKey: ['recentProduct'],
    queryFn: getProducts,
    refetchInterval: 5000,
    staleTime: 4000,
    select: (data) => data?.data
  });

  let { addProductToCart } = useContext(cartContext);

  async function addProductItem(id) {
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
  }

  async function addProductItemToWish(id) {
    let response = await addProductToWhichList(id);
    if (response.data.status === 'success') {
      toast.success(response.data.message, {
        duration: 4000,
        position: 'top-left',
      });
      setClickedHearts(prev => ({ ...prev, [id]: !prev[id] }));
    } else {
      toast.error(response.data.message, {
        duration: 4000,
        position: 'top-left',
      });
    }
  }

  function getProducts() {
    return axios.get('https://ecommerce.routemisr.com/api/v1/products')
      .then(({ data }) => {
        return data;
      });
  }

  // Filter products based on the search query
  const filteredProducts = data?.filter(product =>
    product.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (isLoading) {
    return <Loader />;
  } else {
    return (
      <div className='px-4'>
        <MainSlider />
        <CategorySlider />
        <h1 className='text-3xl font-medium'>All Products</h1>

        {/* Search Input */}
        <div className='py-5'>
          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className='w-2/3 mx-auto px-4 py-2 border border-gray-300 rounded row'
          />
        </div>

        <div className='py-5'>
          <div className="row gap-1">
            {filteredProducts.map((productInfo) => {
              const isHeartClicked = clickedHearts[productInfo.id];

              return (
                <div className='w-2/12 px-4 my-2 product' key={productInfo.id}>
                  <div className='bg-slate-200 p-5'>
                    <Link to={`/productDetails/${productInfo.id}/${productInfo.category.name}`}>
                      <div>
                        <img className='w-full' src={productInfo.imageCover} alt={productInfo.title} />
                        <span className='block text-xl font-light text-green-600'>
                          {productInfo.category.name}
                        </span>
                        <span className='text-lg font-semibold text-gray-700'>
                          {productInfo.title.split(' ').slice(0, 3).join(' ')}
                        </span>
                      </div>
                    </Link>
                    <div className='flex justify-between my-3'>
                      <span>{productInfo.price}EGP</span>
                      <span>{productInfo.ratingsQuantity}<i className='fas fa-star text-yellow-500'></i></span>
                    </div>
                    <div className='flex justify-around'>
                      <button onClick={() => addProductItem(productInfo.id)} className='btn'>+ Add</button>
                      <span>
                        <i
                          onClick={() => addProductItemToWish(productInfo.id)}
                          className={`fas fa-2x fa-heart py-3 ${isHeartClicked ? 'text-red-500' : 'text-black-500'}`}
                        ></i>
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }
}
