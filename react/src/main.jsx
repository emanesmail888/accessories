import React from 'react'
import ReactDOM from 'react-dom/client'
import router from "./router.jsx";
// import Router from "./router.jsx";
import {ContextProvider} from './contexts/ContextProvider.jsx';
import { BrowserRouter as Router, Routes } from 'react-router-dom';



import './index.css'
// import App from './App.jsx';
import { Route } from 'react-router-dom';

// import {RouterProvider} from "react-router-dom";
import { Provider } from 'react-redux';
import store from './store.js';
import Nav from './views/Nav.jsx';

// import Nav from "./views/Nav.jsx";



ReactDOM.createRoot(document.getElementById('root')).render(

<React.StrictMode>


    <Provider store={store}>
    

      <ContextProvider>
      {/* <Router>


<Nav></Nav>
</Router>

<RouterProvider


 router={router}/> */}

 <Router>
          <Nav />
          <Routes>
            {router.map((route, index) => (
              <Route
                key={index}
                path={route.path}
                element={route.element}
              >
                {route.children && route.children.map((childRoute, childIndex) => (
                  <Route
                    key={`${index}-${childIndex}`}
                    path={childRoute.path}
                    element={childRoute.element}
                  />
                ))}
              </Route>
            ))}
          </Routes>
        </Router>

</ContextProvider>

    </Provider>



</React.StrictMode>
);

