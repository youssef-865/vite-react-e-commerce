import axios from "axios";
import { createContext, useState } from "react";

let headers = {
  token: localStorage.getItem('userToken')
}

export let cartContext = createContext();

export default function CartContextProvider(props) {

  const [cartNumber, setCartNumber] = useState(0);

  async function addProductToCart(productId) {
    return axios.post(`https://ecommerce.routemisr.com/api/v1/cart`,
      {
        productId: productId
      },
      {
        headers: headers
      }).then((response) => {
        setCartNumber(response.data.numOfCartItems);
        return response;
      })
      .catch((err) => err);
  }

  async function getProductToCart() {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/cart`,
      {
        headers: headers
      }).then((response) => {
        setCartNumber(response.data.numOfCartItems);
        return response;
      })
      .catch((err) => err);
  }

  async function updateProductInCart(productId, count) {
    return axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
      {
        count: count
      },
      {
        headers: headers
      }).then((response) => response)
      .catch((err) => err);
  }

  async function removeProductInCart(productId) {
    return axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
      {
        headers: headers
      }).then((response) => {
        setCartNumber(response.data.numOfCartItems);
        return response;
      })
      .catch((err) => err);
  }

  return (
    <cartContext.Provider value={{ addProductToCart, getProductToCart, updateProductInCart, removeProductInCart, cartNumber }}>
      {props.children}
    </cartContext.Provider>
  );
}
