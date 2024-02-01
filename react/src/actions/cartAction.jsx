import axiosClient from "../axios-client";

/* ACTION TYPES */
import {
  CART_ADD_ITEM,
  CART_REMOVE_ITEM,
  CART_SAVE_SHIPPING_ADDRESS,
  CART_SAVE_PAYMENT_METHOD,
} from "./types.jsx";

/* ACTION CREATOR USED IN CartScreen COMPONENT */

/* FOR ADDING PRODUCTS TO CART */
export const addToCart = (id, qty) => async (dispatch, getState) => {
  // FETCHING PRODUCT DATA

  const { data } = await axiosClient.get(`/pro/${id}/ `);
  console.log(data.product);



  dispatch({
    type: CART_ADD_ITEM,
    payload: {


      product: data.product.id,
      name: data.product.product_title,
      image: data.product.product_img,
      price: data.product.price,
      countInStock: data.product.stock,
      qty,
    },
  });

  // SETTING VALUE OF CART ITEMS IN LOCAL STORAGE
  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};

/* FOR REMOVING PRODUCTS FROM CART */
export const removeFromCart = (id) => (dispatch, getState) => {
  dispatch({
    type: CART_REMOVE_ITEM,
    payload: id,
  });

  // SETTING VALUE OF CART ITEMS IN LOCAL STORAGE
  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};

//  ACTION CREATOR USED IN ShippingScreen COMPONENT


export const saveShippingAddress = ( data) => (dispatch) => {

    dispatch({
      type: CART_SAVE_SHIPPING_ADDRESS,
      payload: data,
    });

    // SETTING VALUE OF ADDRESS IN LOCAL STORAGE
    localStorage.setItem("shippingAddress", JSON.stringify(data));
  };

  /* ACTION CREATOR USED IN PaymentScreen COMPONENT */
  export const savePaymentMethod = (data) => (dispatch) => {
    dispatch({
      type: CART_SAVE_PAYMENT_METHOD,
      payload: data,
    });

    // SETTING VALUE OF PAYMENT METHOD IN LOCAL STORAGE
    localStorage.setItem("paymentMethod", JSON.stringify(data));
  };
