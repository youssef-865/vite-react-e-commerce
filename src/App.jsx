import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Layout from './component/Layout/Layout';
import Products from './component/Products/Products';
import Login from './component/Login/Login';
import Register from './component/Register/Register';
import Brands from './component/Brands/Brands';
import Carts from './component/Carts/Carts';
import CheckOut from './component/checkOut/checkOut';
import Notfound from './component/notfound/notfound';
import UserContextProvider from './context/userContext';
import ProtectedRoute from './component/protectedRoute/protectedRoute';
import Productdetails from './component/productdetails/productdetails';
import  CartContextProvider  from './context/cartContext';
import { Toaster } from 'react-hot-toast';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import AllOrder from './component/allOrder/AllOrder';
import { Offline, Online } from 'react-detect-offline';
import ForgetPassword from './component/forgetPassword/ForgetPassword';
import Wishlist from './component/WishList/WishList';
import Categories from './component/Categories/Categories';
import WichListContextProvider from './context/WichListContext';
import ResetPassword from './component/ResetPassword/ResetPassowrd';
import ProductOnly from './component/Product/ProductOnly';

let query =new QueryClient()

let routes=createBrowserRouter([
{path:'',element:<Layout/>,children:[
{index:true,element:<ProtectedRoute><Products/></ProtectedRoute>},
{path:'login',element:<Login/>},
{path:'Register',element:<Register/>},

{path:'ProductOnly',element:<ProductOnly/>},
{path:'ForgetPassword',element:<ForgetPassword/>},
{path:'ResetPassword',element:<ResetPassword/>},

{path:'brands',element:<ProtectedRoute><Brands/></ProtectedRoute>},
{path:'Categories',element:<ProtectedRoute><Categories/></ProtectedRoute>},


{path:'WichList',element:<ProtectedRoute><Wishlist/></ProtectedRoute>},
{path:'CheckOut/:cartId',element:<ProtectedRoute><CheckOut/></ProtectedRoute>},
{path:'AllOrder',element:<ProtectedRoute><AllOrder/></ProtectedRoute>},
{path:'productDetails/:id/:category',element:<ProtectedRoute><Productdetails/></ProtectedRoute>},
{path:'cart',element:<ProtectedRoute><Carts/></ProtectedRoute>},
{path:'*',element:<Register/>},
]}
])


function App() {
  return (
    <WichListContextProvider>
  <CartContextProvider>
   <UserContextProvider>
   <QueryClientProvider  client={query}>
     <ReactQueryDevtools></ReactQueryDevtools>
   <RouterProvider router={routes}></RouterProvider>
   <Offline>
    <div className='bg-yellow-200 fixed bottom-4 rounded-md p-2'>
        Only shown offline (surprise!)
    </div>
   </Offline>
   <Toaster />
   </QueryClientProvider>
    </UserContextProvider>
  </CartContextProvider>
  </WichListContextProvider>
   
  )
}

export default App
