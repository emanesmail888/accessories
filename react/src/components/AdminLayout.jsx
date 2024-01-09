import {Link, Navigate, Outlet} from "react-router-dom";
import {useStateContext} from "../contexts/ContextProvider";
import axiosClient from "../axios-client.js";
import {Fragment} from "react";


function AdminLayout() {

    const {user, token, setUser, notification} = useStateContext();

  if (!token) {
    return <Navigate to="/home"/>
  }


 if ( user && user.utype === 'ADM') {
        axiosClient.get('/user')
        .then(({data}) => {
           setUser(data)
        })


      }
      else{
        return <Navigate to="/userOrders/"/>


      }



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
        </Fragment>
    )}
      </aside>
      <div className="content">
      <h1>AdminLayout{user.utype}</h1>

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

export default AdminLayout
