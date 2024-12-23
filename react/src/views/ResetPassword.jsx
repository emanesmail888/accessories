import {createRef, useState} from "react";
import axiosClient from "../axios-client.js";
import {useStateContext} from "../contexts/ContextProvider.jsx";
import { useParams } from 'react-router';

function ResetPassword() {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [confirmPassword, setConfirmPassword] = useState('');
  const emailRef = createRef()
  const passwordRef = createRef()
  const passwordConfirmationRef = createRef()
  const {setUser, setToken} = useStateContext()
  const [errors, setErrors] = useState(null)
  const {token} = useParams();


  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = {
        email: emailRef.current.value,
        password: passwordRef.current.value,
        password_confirmation: passwordConfirmationRef.current.value,
        token:token

      }
      axiosClient.post('/v1/reset-password', payload)
        .then(({data}) => {
          setUser(data.user)
          setToken(data.token);
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
          <input ref={passwordRef} type="password" placeholder="New Password"/>
          <input ref={passwordConfirmationRef} type="password" placeholder="Repeat New Password"/>

      </div>
      <div>
        <button className="btn btn-block">Reset Password</button>
      </div>
    </form>
    </div>
    </div>
  );
}

export default ResetPassword;
