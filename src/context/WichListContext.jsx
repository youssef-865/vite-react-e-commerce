import axios from "axios";
import { createContext, useState } from "react";

let headers = {
  token: localStorage.getItem('userToken')
}

export let WichListContext = createContext();

export default function WichListContextProvider(props) {

  const [wichListNumber, setWhichListNumber] = useState(0);

  async function addProductToWhichList(productId) {
    return axios.post(`https://ecommerce.routemisr.com/api/v1/wishlist`,
      {
        productId: productId
      },
      {
        headers: headers
      }).then((response) => {
        setWhichListNumber(response.data.numOfCartItems);
        return response;
      })
      .catch((err) => err);
  }

  async function getProductToWhichList() {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/wishlist`,
      {
        headers: headers
      }).then((response) => {
        setWhichListNumber(response.data.numOfCartItems);
        return response;
      })
      .catch((err) => err);
  }

  async function updateProductInWhichList(productId, count) {
    return axios.put(`https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`,
      {
        count: count
      },
      {
        headers: headers
      }).then((response) => response)
      .catch((err) => err);
  }

  async function removeProductToWhichList(productId) {
    return axios.delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`,
      {
        headers: headers
      }).then((response) => {
        setWhichListNumber(response.data.numOfCartItems);
        return response;
      })
      .catch((err) => err);
  }

  return (
    <WichListContext.Provider value={{ addProductToWhichList, getProductToWhichList, updateProductInWhichList, removeProductToWhichList, wichListNumber }}>
      {props.children}
    </WichListContext.Provider>
  );
}
