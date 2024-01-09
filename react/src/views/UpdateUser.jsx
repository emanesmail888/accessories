import {useEffect, useState} from "react";
import {useStateContext} from "../contexts/ContextProvider";
import axiosClient from "../axios-client.js";
import {useNavigate,useParams} from "react-router-dom";
function UpdateUser() {
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
        axiosClient.put(`/admin/users/${user.id}`, user)
          .then(() => {
            setNotification('User was successfully updated')
            navigate('/users')
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
        <h1>Update User: {user.name}</h1>
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
              <button className="btn">Save</button>
            </form>
          )}
        </div>
      </>
    )
}


export default UpdateUser
