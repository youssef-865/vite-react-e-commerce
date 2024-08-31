import { useContext, useEffect } from 'react'
import img from '../../assets/img/freshcart-logo.svg';
import { NavLink, useNavigate } from 'react-router-dom';
import { userContext } from '../../context/userContext';
import { cartContext } from '../../context/cartContext';

export default function Navbar() {

 let {cartNumber,getProductToCart} = useContext(cartContext);
let navigate=useNavigate()
let  {isLogin,setLogin}=useContext(userContext)

function logOut(){
localStorage.removeItem('userToken');
setLogin(null);
navigate('/login')
}

async function getProducts(){
  await getProductToCart()
}
 useEffect(()=>{
  getProducts()
 },[])
  return (
    <>
   <nav className='bg-slate-300 shadow-sm p-4'>
  <div className='flex justify-between items-center flex-col lg:flex-row'>
    
    <div className='logo flex items-center mx-auto lg:mx-0'>
      <img className='me-4' src={img} width={110} alt="frech-cart-logo"/>
    </div>

    <div className='flex-1 flex justify-center'>
      {isLogin && (
        <ul className='flex flex-col lg:flex-row items-center'>
          <li className='px-3 py-2'><NavLink to={''}>Home</NavLink></li>
          <li className='px-3 py-2'><NavLink to={'/ProductOnly'}>Products</NavLink></li>
          <li className='px-3 py-2'><NavLink to={'brands'}>Brands</NavLink></li>
          <li className='px-3 py-2'><NavLink to={'Categories'}>Categories</NavLink></li>
          <li className='px-3 py-2'><NavLink to={'WichList'}>WichList</NavLink></li>
          <li className='px-3 py-2 relative'>
            <NavLink to={'cart'}>
              <span className="bg-yellow-100 text-yellow-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-yellow-900 dark:text-yellow-300 absolute top-0 left-10">{cartNumber}</span>
              Cart
            </NavLink>
          </li>
        </ul>
      )}
    </div>

    <div className='social flex items-center'>
      <ul className='flex flex-col lg:flex-row items-center'>
        {!isLogin ? (
          <>
            <li className='px-2'><NavLink to={'register'}>Register</NavLink></li>
            <li className='px-2'><NavLink to={'login'}>Login</NavLink></li>
            <li className='px-2'>
              <i className='fab px-2 fa-facebook'></i>
              <i className='fab px-2 fa-youtube'></i>
              <i className='fab px-2 fa-instagram'></i>
            </li>
          </>
        ) : (
          <li className='px-2 cursor-pointer'>
            <span onClick={() => { logOut() }}>LogOut</span>
          </li>
        )}
      </ul>
    </div>
    
  </div>
</nav>

    
    </>
  )
}
