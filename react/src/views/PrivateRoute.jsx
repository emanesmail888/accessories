import {  Navigate } from "react-router-dom";

import {useStateContext} from "../contexts/ContextProvider.jsx";
import axiosClient from "../axios-client.js";
import {Fragment } from "react";
import {useEffect, useState} from "react";


const PrivateRoute = ({ element: Element, ...rest }) => {
    const { user, setUser} = useStateContext();
    // eslint-disable-next-line no-unused-vars
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        getUser();

      }, [])
    const getUser = () => {
        setLoading(true)
        axiosClient.get('/user')
         .then(({data}) => {

            setLoading(false)
            setUser(data)


          })
          .catch(() => {
            setLoading(false)
          })
      }

  return user.utype==='ADM' ? (
    <Fragment {...rest} element={<Element />} />

  ) : (
    <Navigate to="/dashboard" />
  );
};

export default PrivateRoute;
