/* eslint-disable no-unused-vars */
import {Link,Navigate,Outlet} from "react-router-dom";
import { useStateContext } from "../contexts/ContextProvider";

function GuestLayout() {
    const { user, token } = useStateContext();

    if (token) {
      return <Navigate to="/" />;
    }



  return (
    <div id="guestLayout">
    {/* <aside>
        <Link to="/login">Login</Link>
        <Link to="/signup">SignUp</Link>
      </aside> */}
      <div className="content">
      
        <main>
          <Outlet/>
        </main>
    </div>
    </div>
  );
}

export default GuestLayout
