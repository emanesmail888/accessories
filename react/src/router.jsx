import {Navigate,createBrowserRouter} from "react-router-dom";
import Login from "./views/Login.jsx";
import Signup from "./views/Signup.jsx";
import Users from "./views/Users.jsx";
import Categories from "./views/categories.jsx";
import AddCategory from "./views/AddCategory.jsx";
import AddUser from "./views/AddUser.jsx";
import NotFound from "./views/Notfound.jsx";
import DefaultLayout from "./components/DefaultLayout.jsx";
import GuestLayout from "./components/GuestLayout.jsx";
import Dashboard from "./views/Dashboard.jsx";
import Products from "./views/products.jsx";
import AddProduct from "./views/AddProduct.jsx";
import Home from "./views/Home.jsx";
import ProductPriceList from "./views/ProductPriceList.jsx";
import CategoryProducts from "./views/CategoryProducts.jsx";
import Shop from "./views/Shop.jsx";
import Cart from "./views/Cart.jsx";
import Shipping from "./views/Shipping.jsx";
import Payment from "./views/Payment.jsx";
import PlaceOrder from "./views/PlaceOrder.jsx";
import Order from "./views/Order.jsx";
import UserOrderList from "./views/UserOrderList.jsx";
import AdminLayout from "./components/AdminLayout.jsx";
import Wishlist from "./views/wishlist.jsx";
import AddProfile from "./views/AddProfile.jsx";
import Profile from "./views/Profile.jsx";
// import Nav from "./views/Nav.jsx";
// import UpdateProductForm from "./views/UpdateProductForm.jsx";
// import UpdateUser from "./views/UpdateUser.jsx";


const router=createBrowserRouter( [
    {


        path: '/',
        element: <DefaultLayout/>,
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


        ]
    },
    {


        path: '/',
        element: <AdminLayout/>,
        children:[


            {
                path: '/admin/users',
                element: <Users/>

            },
            {
                path: '/',
                element: <Users/>

            },
            {
                path: '/admin/users',
                element: <Users/>

            },
            {
                path: '/admin/users/new',
                element: <AddUser key="userCreate" />
              },
              {
                path: '/admin/users/:id',
                element: <AddUser key="userUpdate" />
              },
              {
                path: '/admin/categories',
                element: <Categories/>

            },
            {
                path: '/admin/products',
                element: <Products/>

            },
            {
                path: '/admin/categories/new',
                element: <AddCategory key="categoryCreate" />
              },
              {
                path: '/admin/categories/:id',
                element: <AddCategory key="categoryUpdate" />
              },
            {
                path: '/admin/products/new',
                element: <AddProduct key="productCreate" />
              }
              ,
              {
                path: '/admin/products/:id',
                element: <AddProduct key="productUpdate" />
              }




        ]
    },

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

   ])



export default router;


