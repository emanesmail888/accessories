/* eslint-disable react/prop-types */
import {createContext, useContext, useState} from "react";
import axiosClient from "../axios-client.js";

const StateContext = createContext({
  currentUser: null,
  token: null,
  notification: null,
  setUser: () => {},
  setToken: () => {},
  setNotification: () => {}
})



export const ContextProvider = ({children}) => {
  const [user, setUser] = useState({});
  const [token, _setToken] = useState(localStorage.getItem('ACCESS_TOKEN'));
  const [notification, _setNotification] = useState('');
  const csrf= ()=> axiosClient.get("/sanctum/csrf-cookie");

  const setToken = (token) => {
    _setToken(token)
    if (token) {
      localStorage.setItem('ACCESS_TOKEN', token);
    } else {
      localStorage.removeItem('ACCESS_TOKEN');
    }
  }

  const setNotification = message => {
    _setNotification(message);

    setTimeout(() => {
      _setNotification('')
    }, 1000)
  }

  return (
    <StateContext.Provider value={{
      user,
      setUser,
      token,
      setToken,
      notification,
      setNotification,csrf,
    }}>
      {children}
    </StateContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export const useStateContext = () => useContext(StateContext);
