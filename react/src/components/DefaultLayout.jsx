import {Link, Navigate, Outlet} from "react-router-dom";
import {useStateContext} from "../contexts/ContextProvider";
import axiosClient from "../axios-client.js";
import {Fragment } from "react";
import {useEffect} from "react";



function DefaultLayout() {

    const { user,token, setUser, notification} = useStateContext();
    if (!token ) {

       return  <Navigate to="/home"/>
      }

    useEffect(() => {
    axiosClient.get('/user')
    .then(({data}) => {
       setUser(data)

          })





  }, [])





  return (
    <div>

    <div id="defaultLayout">
     <aside>
    { user && user.utype === 'ADM' && (
         <Fragment>

        <Link to="/admin/dashboard">Dashboard</Link>
        <Link to="/admin/users">Users</Link>
        <Link to="/admin/products">Products</Link>
        <Link to="/admin/categories">Categories</Link>
        <Link to="/admin/getAllOrders">All Orders</Link>
        </Fragment>
    )}
    <Fragment>
        <Link to="/userOrders/">MyOrders</Link>
        <Link to="/shipping">Shipping</Link>
        <Link to="/wishlist">Wishlist</Link>
        <Link  to="/profile">Profile</Link>

        </Fragment>
      </aside>
      <div className="content">
        <main>
          <Outlet/>
        </main>
        {notification &&
          <div className="notification">
            {notification}
          </div>
        }
      </div>

    </div>
    </div>

  )
}

export default DefaultLayout
