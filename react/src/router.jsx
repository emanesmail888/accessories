import {Navigate} from "react-router-dom";
import Login from "./views/Login.jsx";
import Signup from "./views/Signup.jsx";
import Users from "./views/Admin/Users.jsx";
import Categories from "./views/Admin/categories.jsx";
import AddCategory from "./views/Admin/AddCategory.jsx";
import AddUser from "./views/Admin/AddUser.jsx";
import NotFound from "./views/Notfound.jsx";
import DefaultLayout from "./components/DefaultLayout.jsx";
import GuestLayout from "./components/GuestLayout.jsx";
import Dashboard from "./views/User/Dashboard.jsx";
import Products from "./views/Admin/products.jsx";
import AddProduct from "./views/Admin/AddProduct.jsx";
import Home from "./views/Home.jsx";
import ProductPriceList from "./views/ProductPriceList.jsx";
import CategoryProducts from "./views/CategoryProducts.jsx";
import Shop from "./views/Shop.jsx";
import Cart from "./views/Cart.jsx";
import Shipping from "./views/User/Shipping.jsx";
import Payment from "./views/User/Payment.jsx";
import PlaceOrder from "./views/User/PlaceOrder.jsx";
import Order from "./views/Order.jsx";
import UserOrderList from "./views/User/UserOrderList.jsx";
import AdminLayout from "./components/AdminLayout.jsx";
import Wishlist from "./views/Wishlist.jsx";
import AddProfile from "./views/User/AddProfile.jsx";
import Profile from "./views/Profile.jsx";
import PrivateRoute from "./views/PrivateRoute.jsx";
import AllOrders from "./views/Admin/allOrders.jsx";
import SearchResult from "./views/SearchResult.jsx";
import ContactUs from "./views/ContactUs.jsx";
import AboutUs from "./views/AboutUs.jsx";
import Details from "./views/Details.jsx";
import ResetPassword from "./views/ResetPassword.jsx";
import ForgotPassword from "./views/ForgotPassword.jsx";





// const router=createBrowserRouter(
const router=


    [


    {

        path: '/',
        element:<DefaultLayout/> ,
        children:[


             {
                path: '/',
                element: <Navigate to="/dashboard"/>
              },


            {
                path: '/dashboard',
                element: <Dashboard/>

            },

              {
                path: '/userOrders/',
                element: <UserOrderList/>
              },


            {
                path: '/shipping',
                element: <Shipping/>

            },
            {
                path:"/wishlist/:id?",
                element:<Wishlist />

             },
            {
                path: '/payment',
                element: <Payment/>

            },
            {
                path: '/placeorder',
                element: <PlaceOrder/>

            }

            ,{
               path:"/getOrders/:id/",
                element:<Order/>

            },
            {
                path: '/profile',
                element: <Profile  />
              },
            {
                path: '/profile/new',
                element: <AddProfile key="profileCreate" />
              },
              {
                path: '/profile/:id',
                element: <AddProfile key="profileUpdate" />
              },

              {
                path: '/admin/users',
                element:<PrivateRoute><Users/></PrivateRoute>


            },
            {
                path: '/',
                element:<PrivateRoute> <Navigate to="/admin/users"/></PrivateRoute>

            },

            {
                path: '/admin/users/new',
                element: <PrivateRoute><AddUser key="userCreate" /></PrivateRoute>
              },
              {
                path: '/admin/users/:id',
                element:<PrivateRoute> <AddUser key="userUpdate" /></PrivateRoute>
              },
              {
                path: '/admin/categories',
                element: <PrivateRoute><Categories/></PrivateRoute>

            },
            {
                path: '/admin/products',
                element:<PrivateRoute> <Products/></PrivateRoute>

            },
            {
                path: '/admin/categories/new',
                element: <PrivateRoute><AddCategory key="categoryCreate" /></PrivateRoute>
              },
              {
                path: '/admin/categories/:id',
                element: <PrivateRoute><AddCategory key="categoryUpdate" /></PrivateRoute>
              },
            {
                path: '/admin/products/new',
                element: <PrivateRoute><AddProduct key="productCreate" /></PrivateRoute>
              }
              ,
              {
                path: '/admin/products/:id',
                element: <PrivateRoute><AddProduct key="productUpdate" /></PrivateRoute>
              }
              ,
              {
                path: '/admin/getAllOrders',
                element: <PrivateRoute><AllOrders  /></PrivateRoute>

              }


        ]



    }
    ,


    {
        path: '/',
        element: <GuestLayout/>,
        children:[

            {
                path:'/login',
                element:<Login/>

            },
            {
                path: '/signup',
                element: <Signup/>
            },
            {
                path: '/forgot-password',
                element: <ForgotPassword/>
            }
            ,
            {
                path: '/reset-password/:token?',
                element: <ResetPassword/>
            }


        ]
    },



    {
        path: "*",
        element: <NotFound/>
      },

      {
         path:"/cart/:id?",
          element:<Cart />

      },
      { path:"/shop",
      element:<Shop/>


     },
     {
        path: '/home',
        element: <Home/>
      },
      {    path:"/products_price/:min?/:max?",
      element:<ProductPriceList/>


     },
     {    path:"/category_products/:id",
      element:<CategoryProducts/>


     },
     {    path:"/search/:query?",
      element:<SearchResult/>


     },
     {    path:"/contact_us",
      element:<ContactUs/>


     },
     {path:"/about_us",
      element:<AboutUs/>


     },
     {path:"/pro/:id",
      element:<Details/>


     },



   ];

   export default router;




