//  import 'bootstrap/dist/css/bootstrap.min.css';
//  import { Alert, AlertHeading } from "react-bootstrap";



function Message({variant,children}) {
  return (
      <div className={variant} style={{ width: "20rem",height:"4rem" }}>  
      {children}   
      </div>

  );

}

export default Message





