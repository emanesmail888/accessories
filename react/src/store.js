// import { createStore } from 'redux';
import { createStore,applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import {thunk} from 'redux-thunk';

// import rootReducer from './reducers';
import { cartReducer } from "./reducers/cartReducer";
import { wishlistReducer } from "./reducers/wishlistReducer";
import { combineReducers } from 'redux';
import {
  orderCreateReducer,
  orderDetailsReducer,
  orderPayReducer,
  orderListMyReducer,
  orderListReducer,
  orderDeliverReducer,
} from "./reducers/orderReducer";



const reducer = combineReducers({

//   auth,

  cart: cartReducer,
  wishlist: wishlistReducer,
  orderCreate: orderCreateReducer,
  orderDetails: orderDetailsReducer,
  orderPay: orderPayReducer,
  MyOrderList: orderListMyReducer,
  orderList: orderListReducer,
  orderDeliver: orderDeliverReducer,

})
const cartItemsFromStorage = localStorage.getItem("cartItems")
  ? JSON.parse(localStorage.getItem("cartItems"))
  : [];
const ItemsFromStorage = localStorage.getItem("Items")
  ? JSON.parse(localStorage.getItem("Items"))
  : [];



const shippingAddressFromStorage = localStorage.getItem("shippingAddress")
  ? JSON.parse(localStorage.getItem("shippingAddress"))
  : {};


const middleware = [thunk];


const initialState = {
  cart: {
    cartItems: cartItemsFromStorage,
    shippingAddress: shippingAddressFromStorage,
  },
//   wishlist:{
//     Items:ItemsFromStorage,
//   }

};


const store = createStore(
    reducer,
     initialState,
    composeWithDevTools(applyMiddleware(...middleware))
);


export default store;

