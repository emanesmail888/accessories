/* ACTION TYPES */
import {
    // Wishlist_ADD_ITEM,
    // Wishlist_REMOVE_ITEM,

    // Wishlist_CLEAR_ITEMS,
     FETCH_WISHLIST_ERROR,
     FETCH_WISHLIST_SUCCESS,ADD_TO_WISHLIST_ERROR,ADD_TO_WISHLIST_SUCCESS,REMOVE_FROM_WISHLIST_ERROR,REMOVE_FROM_WISHLIST_SUCCESS
  } from "../actions/types";






  const initialState = {
    wishlistItems: [],
    loading: false,
    error: null,
    // Items: [],

};

export const wishlistReducer = (state = initialState, action) => {

    switch (action.type) {
        case FETCH_WISHLIST_SUCCESS:
            return {
                ...state,
                wishlistItems: action.payload,
                loading: false,
                error: null,
            };
        case FETCH_WISHLIST_ERROR:
        case ADD_TO_WISHLIST_ERROR:
        case REMOVE_FROM_WISHLIST_ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };

        case ADD_TO_WISHLIST_SUCCESS:{


      const newItem = action.payload;
      console.log(state.wishlistItems)
    //   const y=state.wishlistItems
      const existItem = state.wishlistItems.find((x) => x.id === newItem.id);

              if (existItem) {
                return {
                  ...state,
                  wishlistItems: state.wishlistItems.map((x) =>
                    x.id === existItem.id ? newItem : x
                  ),
                };
              } else {
                return {
                  ...state,
                //   Items: [...state.Items, newItem],
                  wishlistItems: [...state.wishlistItems, newItem],
                  loading: false,
                 error: null,
                };
              }

        // return {
        //     ...state,
        //     wishlistItems: [...state.wishlistItems, newItem],
        //     loading: false,
        //    error: null,
        //   };

    }
    //      // Return the current state without making any changes
    //   }

      // Add the new item to the wishlist
    //   return {
    //     ...state,
    //     wishlistItems: [...state.wishlistItems, newItem],
    //     loading: false,
    //    error: null,
    //   };

        //  const item = action.payload;
        //  const existItem = state.wishlistItems.map((x) =>
        //    {x.product_id});
        //   const y=console.log(existItem)
        //  const y= state.wishlistItems.map((x) =>
        //  {x.product_id}
    //      const existItem = state.wishlistItems.find((x) => x.product_id === item.product);
    //    console.log(existItem)




        //   (x.product_id === item.product){
        //   return {
        //     ...state,
        //     wishlistItems: state.wishlistItems.map((x) =>
        //       x.id === existItem.product ? item : x
        //     ),
        //   };
        // } else {
        //   return {
        //     ...state,
        //     wishlistItems: [...state.wishlistItems, item],
        //     loading: false,
        //     error: null,
        //   };
        // }
        //  )




            // return {
            //     // ...state,
            //     // wishlistItems: [...state.wishlistItems, action.payload],

            //     // loading: false,
            //     // error: null,
            // };

        case REMOVE_FROM_WISHLIST_SUCCESS:
            return {
                ...state,
                wishlistItems: state.wishlistItems.filter(
                    (item) => item.id !== action.payload
                ),
                //   Items: state.Items.filter((x) => x.product !== action.payload),

                loading: false,
                error: null,
            };
        default:
            return state;
    }
};

// export default wishlistReducer;


//   export const wishlistReducer = (



//     state = {
//       Items: [],
//     },
//     action
//   ) => {
//     switch (action.type) {



//       case Wishlist_ADD_ITEM: {
//         const item = action.payload;
//         const existItem = state.Items.find((x) => x.product === item.product);

//         if (existItem) {
//           return {
//             ...state,
//             Items: state.Items.map((x) =>
//               x.product === existItem.product ? item : x
//             ),
//           };
//         } else {
//           return {
//             ...state,
//             Items: [...state.Items, item],
//           };
//         }
//       }

//       case Wishlist_REMOVE_ITEM: {
//         return {
//           ...state,
//           Items: state.Items.filter((x) => x.product !== action.payload),
//         };
//       }



//       case Wishlist_CLEAR_ITEMS:
//         return {
//           ...state,
//           Items: [],
//         };

//       default:
//         return state;
//     }
//   };
