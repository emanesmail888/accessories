import {createRef, useState} from "react";
import axiosClient from "../axios-client.js";
// import { useStateContext } from "../contexts/ContextProvider.jsx";


function ForgotPassword() {
//   const [email, setEmail] = useState('');
  const emailRef = createRef()
  const [errors, setErrors] = useState(null)




  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = {
        email: emailRef.current.value,

      }
      axiosClient.post('/v1/forgot-password', payload

      )
        .then(({data}) => {
          console.log(data)
        })
        .catch(err => {
          const response = err.response;
          if (response && response.status === 422) {
            setErrors(response.data.errors)
          }
        })
  };

  return (
    <div className="login-signup-form animated fadeInDown">
    <div className="form">
    <form onSubmit={handleSubmit}>
      <div>
        {errors &&
            <div className="alert">
              {Object.keys(errors).map(key => (
                <p key={key}>{errors[key][0]}</p>
              ))}
            </div>
          }
          <input ref={emailRef} type="email" placeholder="Email Address"/>
      </div>
      <div>
        <button className="btn btn-block">Send Password Reset Link</button>
      </div>
    </form>
    </div>
    </div>
  );
}

export default ForgotPassword;
