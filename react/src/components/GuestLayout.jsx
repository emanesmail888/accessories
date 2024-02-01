/* eslint-disable no-unused-vars */
import {Link,Navigate,Outlet} from "react-router-dom";
import { useStateContext } from "../contexts/ContextProvider";

function GuestLayout() {
    const { user, token,notification } = useStateContext();

    if (token) {
      return <Navigate to="/" />;
    }



  return (
    <div>

    <div id="guestLayout">
   
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
  );
}

export default GuestLayout
