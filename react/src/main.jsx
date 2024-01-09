import React from 'react'
import ReactDOM from 'react-dom/client'
import router from "./router.jsx";
import {ContextProvider} from './contexts/ContextProvider.jsx';


import './index.css'
// import App from './App.jsx';
import {RouterProvider} from "react-router-dom";
import { Provider } from 'react-redux';
import store from './store.js';
import Nav from "./views/Nav.jsx";



ReactDOM.createRoot(document.getElementById('root')).render(
<React.StrictMode>
{/* <Provider store={store}>


       <ContextProvider>

       <App />
       </ContextProvider>
       </Provider> */}

    <Provider store={store}>

      <ContextProvider>
      <Nav></Nav>


<RouterProvider router={router} />

</ContextProvider>

    </Provider>







</React.StrictMode>
);

