import axiosClient from "../axios-client";

/* ACTION TYPES */
import {
  FETCH_WISHLIST_ERROR,FETCH_WISHLIST_SUCCESS, ADD_TO_WISHLIST_ERROR,
    ADD_TO_WISHLIST_SUCCESS,REMOVE_FROM_WISHLIST_ERROR,REMOVE_FROM_WISHLIST_SUCCESS

} from "./types";

/* ACTION CREATOR USED IN CartScreen COMPONENT */

/* FOR ADDING PRODUCTS TO CART */

// export const addToWishlist = (productId) => {
//     return async (dispatch) => {
//         try {
//             const response = await axios.post('/api/wishlist', { productId });
//             dispatch({ type: 'ADD_TO_WISHLIST_SUCCESS', payload: response.data });
//         } catch (error) {
//             dispatch({ type: 'ADD_TO_WISHLIST_ERROR', payload: error.message });
//         }
//     };
// };
export const addToWishlist = (productId) => async (dispatch, getState) => {

  const { data } = await axiosClient.post('/wishlist', { productId });


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

/* FOR REMOVING PRODUCTS FROM CART */
// export const removeFromWishlist = (id) => (dispatch, getState) => {
//   dispatch({
//     type: Wishlist_REMOVE_ITEM,
//     payload: id,
//   });

//   localStorage.setItem("Items", JSON.stringify(getState().wishlist.Items));
// };

// export const addToWishlists = (productId) => {
//     return async (dispatch) => {
//         try {
//             const response = await axiosClient.post('/wishlist', { productId });
//             console.log(response.data)
//             dispatch({ type: ADD_TO_WISHLIST_SUCCESS, payload: response.data });
//         } catch (error) {
//             dispatch({ type: ADD_TO_WISHLIST_ERROR, payload: error.message });
//         }
//     };
// };

export const fetchWishlist = () => {
    return async (dispatch) => {
        try {
            const data = await axiosClient.get('/wishlist');
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


// export const removeFromWishlist = (wishlistItemId) => {
//     return async (dispatch) => {
//         try {
//             await axiosClient.delete(`/wishlist/${wishlistItemId}`);
//             dispatch({ type: 'REMOVE_FROM_WISHLIST_SUCCESS', payload: wishlistItemId });
//         } catch (error) {
//             dispatch({ type: 'REMOVE_FROM_WISHLIST_ERROR', payload: error.message });
//         }
//     };
// };






// import axios from 'axios';

// export const fetchWishlist = () => {
//     return async (dispatch) => {
//         try {
//             const response = await axios.get('/api/wishlist');
//             dispatch({ type: 'FETCH_WISHLIST_SUCCESS', payload: response.data });
//         } catch (error) {
//             dispatch({ type: 'FETCH_WISHLIST_ERROR', payload: error.message });
//         }
//     };
// };

// export const addToWishlist = (productId) => {
//     return async (dispatch) => {
//         try {
//             const response = await axios.post('/api/wishlist', { productId });
//             dispatch({ type: 'ADD_TO_WISHLIST_SUCCESS', payload: response.data });
//         } catch (error) {
//             dispatch({ type: 'ADD_TO_WISHLIST_ERROR', payload: error.message });
//         }
//     };
// };

export const removeFromWishlist = (wishlistItemId) => {
    return async (dispatch, getState) => {
        try {
         const  data= await axiosClient.get(`/wishlist/remove/${wishlistItemId}`);
            dispatch({ type: REMOVE_FROM_WISHLIST_SUCCESS, payload: wishlistItemId });

        } catch (error) {
            dispatch({ type: REMOVE_FROM_WISHLIST_ERROR, payload: error.message });
        }
    };
};

