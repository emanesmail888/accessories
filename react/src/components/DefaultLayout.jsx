import {Link, Navigate, Outlet} from "react-router-dom";
import {useStateContext} from "../contexts/ContextProvider";
import axiosClient from "../axios-client.js";
import {Fragment } from "react";
import  {useEffect}  from "react";


function DefaultLayout() {

    const { user,token, setUser, notification} = useStateContext();
    if (!token ) {

       return  <Navigate to="/home"/>
      }

      if (user && user.utype === 'USR') {
        axiosClient.get('/user')
        .then(({data}) => {
           setUser(data)
        })

    }
    // else{
    //     return <Navigate to="/admin/users"/>

    // }

//   useEffect(() => {
//     if (user && user.utype === 'USR') {
//         axiosClient.get('/user')
//         .then(({data}) => {
//            setUser(data)
//         })


//     }
//     else{
//         return <Navigate to="/admin/users"/>

//     }
      //  }, [])


  return (
    <div>

    <div id="defaultLayout">
     <aside>

    { user && user.utype === 'USR' && (
         <Fragment>
        <Link to="/userOrders/">MyOrders</Link>
        <Link to="/shipping">Shipping</Link>
        <Link to="/wishlist">Wishlist</Link>
        <Link  to="/profile/new">Profile</Link>
       
        </Fragment>
    )}
      </aside>
      <div className="content">
      <h1>DefaultLayout{user.utype}</h1>

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
