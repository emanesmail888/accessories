import axiosClient from "../axios-client";


/* ACTION TYPES */
import {
  ORDER_CREATE_REQUEST,
  ORDER_CREATE_SUCCESS,
  ORDER_CREATE_FAIL,
  ORDER_DETAILS_REQUEST,
  ORDER_DETAILS_SUCCESS,
  ORDER_DETAILS_FAIL,
  ORDER_PAY_REQUEST,
  ORDER_PAY_SUCCESS,
  ORDER_PAY_FAIL,
  ORDER_LIST_MY_REQUEST,
  ORDER_LIST_MY_SUCCESS,
  ORDER_LIST_MY_FAIL,
  ORDER_LIST_REQUEST,
  ORDER_LIST_SUCCESS,
  ORDER_LIST_FAIL,
  ORDER_DELIVER_REQUEST,
  ORDER_DELIVER_SUCCESS,
  ORDER_DELIVER_FAIL,
  CART_CLEAR_ITEMS
} from "./types";


/* ACTION CREATOR USED IN CREATING ORDER IN PlaceOrder COMPONENT  */
export const createOrder = (order) => async (dispatch) => {
  try {
    dispatch({
      type: ORDER_CREATE_REQUEST,
    });





    /* MAKING API CALL TO SAVE THE ORDER DETAILS */
    const { data } = await axiosClient.post(`/v1/addOrder`, order);


    /* IF PUT REQUEST SUCCESSFULL WE DISPATCH & SEND THE PAYLOAD TO OUR REDUCER */
    dispatch({
      type: ORDER_CREATE_SUCCESS,
      payload: data,
    });

    // console.log(dispatch.payload);


    // REST CART INFO STORED IN STATE & LOCAL STORAGE AFTER ORDER PLACED
    dispatch({
      type: CART_CLEAR_ITEMS,
      payload: data,
    });

    localStorage.removeItem("cartItems");
  } catch (error) {
    dispatch({
      type: ORDER_CREATE_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

/* ACTION CREATOR USED IN CREATING ORDER IN PlaceOrder COMPONENT  */
export const getOrderDetails = (id) => async (dispatch) => {
  try {
    dispatch({
      type: ORDER_DETAILS_REQUEST,
    });





    /* MAKING API CALL TO GET THE ORDER DETAILS */
    const {data}  = await axiosClient.get(`/v1/getOrders/${id}/`);
    console.log(data);



    /* IF GET REQUEST SUCCESSFULL WE DISPATCH & SEND THE PAYLOAD TO OUR REDUCER */
    dispatch({
      type: ORDER_DETAILS_SUCCESS,
      payload: {order:data[0][0],orderItems:data[1]} ,
    });
  } catch (error) {
    dispatch({
      type: ORDER_DETAILS_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

/* ACTION CREATOR USED IN MAKING PAYMENT IN Order COMPONENT  */
export const payOrder = (id, paymentResult) => async (dispatch) => {
  try {
    dispatch({
      type: ORDER_PAY_REQUEST,
    });



    /* MAKING API CALL TO SAVE THE PAYMENT DETAILS */
    const { data } = await axiosClient.post(`/v1/getOrders/${id}/pay`,paymentResult);

    /* IF PUT REQUEST SUCCESSFULL WE DISPATCH & SEND THE PAYLOAD TO OUR REDUCER */
    dispatch({
      type: ORDER_PAY_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ORDER_PAY_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

/* ACTION CREATOR USED IN FETCHING USERS ORDERS IN ProfileScreen COMPONENT */
export const listMyOrders = () => async (dispatch) => {
  try {
    dispatch({
      type: ORDER_LIST_MY_REQUEST,
    });


    /* MAKING API CALL TO GET THE DETAILS OF THE ORDERS MADE BY THE USER */
    const { data } = await axiosClient.get(`/v1/userOrders/`);
    console.log(data)

    /* IF GET REQUEST SUCCESSFULL WE DISPATCH & SEND THE PAYLOAD TO OUR REDUCER */
    dispatch({
      type: ORDER_LIST_MY_SUCCESS,
      payload: data[0],
    });
  } catch (error) {
    dispatch({
      type: ORDER_LIST_MY_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

/* ACTION CREATOR USED IN FETCHING ALL USERS ORDERS IN OrderListScreen COMPONENT */
export const listOrders = () => async (dispatch) => {
  try {
    dispatch({
      type: ORDER_LIST_REQUEST,
    });


    /* MAKING API CALL TO GET THE DETAILS OF ALL THE ORDERS MADE BY THE ALL THE USERS */
    const { data } = await axiosClient.get(`/v1/admin/getAllOrders`);

    /* IF GET REQUEST SUCCESSFULL WE DISPATCH & SEND THE PAYLOAD TO OUR REDUCER */
    dispatch({
      type: ORDER_LIST_SUCCESS,
      payload: data[0],
    });
  } catch (error) {
    dispatch({
      type: ORDER_LIST_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

/* ACTION CREATOR USED IN MARKING DELIVERY STATUS OF ORDERS IN OrderScreen COMPONENT  */
export const deliverOrder = (id) => async (dispatch) => {
  try {
    dispatch({
      type: ORDER_DELIVER_REQUEST,
    });

    /* MAKING API CALL TO UPDATE ORDER DELIVERY STATUS */

    const { data } = await axiosClient.post(`/v1/admin/getOrders/${id}/deliver`);

    /* IF PUT REQUEST SUCCESSFULL WE DISPATCH & SEND THE PAYLOAD TO OUR REDUCER */
    dispatch({
      type: ORDER_DELIVER_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ORDER_DELIVER_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};
