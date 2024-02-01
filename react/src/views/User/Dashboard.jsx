import { Navigate, } from "react-router-dom";
import {useStateContext} from "../../contexts/ContextProvider.jsx";
import axiosClient from "../../axios-client.js";
import {useEffect} from "react";


function Dashboard() {
    const { user, setUser} = useStateContext();

    axiosClient.get('/user')
    .then(({data}) => {
       setUser(data)


    })

    useEffect(() => {
        axiosClient.get('/user')
          .then(({data}) => {
             setUser(data)
             if (user.utype === 'ADM') {
                <Navigate to="/admin/users"/>

              }
              else{
                return <Navigate to="/dashboard"/>


              }
                })




      }, [])
  return (
    <div>Dashboard
    {user &&user.utype === 'ADM'?
          <Navigate to="/admin/users"/>:
          <Navigate to="/dashboard"/>

        }

    </div>
  )
}

export default Dashboard

