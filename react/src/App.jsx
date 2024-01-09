
import './App.css'

import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
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
// import UpdateProductForm from "./views/UpdateProductForm.jsx";
// import UpdateUser from "./views/UpdateUser.jsx";
import { Provider } from 'react-redux';
import store from './store.js';
function App() {

  return (
   <div className='App'>

  <BrowserRouter>
  {/* <Provider store={store}> */}


    <Routes>
      <Route path="/" element={<DefaultLayout />}>
        <Route path="/" element={<Navigate to="/users" />} />
        <Route path="/users" element={<Users />} />
        <Route path="/users/new" element={<AddUser key="userCreate" />} />
        <Route path="/users/:id" element={<AddUser key="userUpdate" />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/products" element={<Products />} />
        <Route path="/categories/new" element={<AddCategory key="categoryCreate" />} />
        <Route path="/categories/:id" element={<AddCategory key="categoryUpdate" />} />
        <Route path="/products/new" element={<AddProduct key="productCreate" />} />
        <Route path="/products/:id" element={<AddProduct key="productUpdate" />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Route>

      <Route path="/" element={<GuestLayout />}>
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/products_price/:min?/:max?" element={<ProductPriceList />} />
        <Route path="/category_products/:id" element={<CategoryProducts />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/cart/:id" element={<Cart />} />
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
    {/* </Provider> */}

  </BrowserRouter>


   </div>
  )
}

export default App
