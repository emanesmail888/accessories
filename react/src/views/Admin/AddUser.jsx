/* eslint-disable no-unused-vars */
import {useEffect, useState} from "react";
import {useStateContext} from "../../contexts/ContextProvider.jsx";
import axiosClient from "../../axios-client.js";
import {Link,useNavigate,useParams} from "react-router-dom";
function AddUser() {
    const navigate = useNavigate();
    let {id} = useParams();
    const [user, setUser] = useState({
      id: null,
      name: '',
      email: '',
      password: '',
      password_confirmation: ''
    })
    const [errors, setErrors] = useState(null)
    const [loading, setLoading] = useState(false)
    const {setNotification} = useStateContext()

    if (id) {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      useEffect(() => {
        setLoading(true)
        axiosClient.get(`/admin/users/${id}`)
          .then(({data}) => {
            setLoading(false)
            console.log(data.data)
            setUser(data.data)
          })
          .catch(() => {
            setLoading(false)
          })
      }, [])
    }

    const onSubmit = ev => {
      ev.preventDefault()
      if (user.id) {
        axiosClient.put(`/v1/admin/users/${user.id}`, user)
          .then(() => {
            setNotification('User was successfully updated')
            navigate('/admin/users')
          })
          .catch(err => {
            const response = err.response;
            if (response && response.status === 422) {
              setErrors(response.data.errors)
            }
          })
      } else {
        axiosClient.post('/v1/admin/users', user)
          .then(() => {
            setNotification('User was successfully created')
            navigate('/admin/users')
          })
          .catch(err => {
            const response = err.response;
            if (response && response.status === 422) {
              setErrors(response.data.errors)
            }
          })
      }
    }

    return (
      <>
        {user.id && <h1>Update User: {user.name}</h1>}
        {!user.id && <h1>New User</h1>}
        <div className="card animated fadeInDown">
          {loading && (
            <div className="text-center">
              Loading...
            </div>
          )}
          {errors &&
            <div className="alert">
              {Object.keys(errors).map(key => (
                <p key={key}>{errors[key][0]}</p>
              ))}
            </div>
          }
          {!loading && (
            <form onSubmit={onSubmit}>
              <input value={user.name} onChange={ev => setUser({...user, name: ev.target.value})} placeholder="Name"/>
              <input value={user.email} onChange={ev => setUser({...user, email: ev.target.value})} placeholder="Email"/>
              <input type="password" onChange={ev => setUser({...user, password: ev.target.value})} placeholder="Password"/>
              <input type="password" onChange={ev => setUser({...user, password_confirmation: ev.target.value})} placeholder="Password Confirmation"/>
              <button  className=" btn btn-danger " style={{marginLeft:'360px'}}>Save</button>
            </form>
          )}
        </div>
      </>
    )
}

export default AddUser
