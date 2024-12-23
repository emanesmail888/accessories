import axiosClient from "../axios-client";

/* ACTION TYPES */
import {
  FETCH_WISHLIST_ERROR,FETCH_WISHLIST_SUCCESS, ADD_TO_WISHLIST_ERROR,
    ADD_TO_WISHLIST_SUCCESS,REMOVE_FROM_WISHLIST_ERROR,REMOVE_FROM_WISHLIST_SUCCESS

} from "./types";


export const addToWishlist = (productId) => async (dispatch, getState) => {

  const { data } = await axiosClient.post('/v1/wishlist', { productId });


  console.log(data[0])
try{

  dispatch({
    type: ADD_TO_WISHLIST_SUCCESS,
    payload:data[0]


  });

} catch (error) {
    dispatch({
      type: ADD_TO_WISHLIST_ERROR,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }

};



export const fetchWishlist = () => {
    return async (dispatch) => {
        try {
            const data = await axiosClient.get('/v1/wishlist');
            console.log(data.data[0])
            dispatch({ type: FETCH_WISHLIST_SUCCESS, payload: data.data[0] });
        } catch (error) {
            dispatch({ type: FETCH_WISHLIST_ERROR,
                payload:
                error.response && error.response.data.detail
                  ? error.response.data.detail
                  : error.message,});
        }
    };
};





export const removeFromWishlist = (wishlistItemId) => {
    return async (dispatch, getState) => {
        try {
         const  data= await axiosClient.get(`/v1/wishlist/remove/${wishlistItemId}`);
            dispatch({ type: REMOVE_FROM_WISHLIST_SUCCESS, payload: wishlistItemId });

        } catch (error) {
            dispatch({ type: REMOVE_FROM_WISHLIST_ERROR, payload: error.message });
        }
    };
};

