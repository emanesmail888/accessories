import {useEffect, useState} from "react";
import {useStateContext} from "../contexts/ContextProvider";
import axiosClient from "../axios-client.js";
import {useNavigate,useParams} from "react-router-dom";
function AddCategory() {
        const navigate = useNavigate();
        let {id} = useParams();
        const [category, setCategory] = useState({
          id: null,
          name: '',

        })
        const [errors, setErrors] = useState(null)
        const [loading, setLoading] = useState(false)
        const {setNotification} = useStateContext()

        if (id) {
          // eslint-disable-next-line react-hooks/rules-of-hooks
          useEffect(() => {
            setLoading(true)
            axiosClient.get(`/admin/categories/${id}`)
              .then(({data}) => {
                setLoading(false)
                setCategory(data.data)
              })
              .catch(() => {
                setLoading(false)
              })
          }, [])
        }

        const onSubmit = ev => {
          ev.preventDefault()
          if (category.id) {
            axiosClient.put(`/admin/categories/${category.id}`, category)
              .then(() => {
                setNotification('category was successfully updated')
                navigate('/admin/categories')
              })
              .catch(err => {
                const response = err.response;
                if (response && response.status === 422) {
                  setErrors(response.data.errors)
                }
              })
          } else {
            axiosClient.post('/admin/categories', category)
              .then(() => {
                setNotification('Category was successfully created')
                navigate('/admin/categories')
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
            {category.id && <h1>Update Category: {category.name}</h1>}
            {!category.id && <h1>New Category</h1>}
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
                  <input value={category.name} onChange={ev => setCategory({...category, name: ev.target.value})} placeholder="Name"/>
                       <button className="btn">Save</button>
                </form>
              )}
            </div>
          </>
        )
    }

export default AddCategory
