/* eslint-disable no-unused-vars */
import {useEffect, useState} from "react";
import {useStateContext} from "../../contexts/ContextProvider.jsx";
import axiosClient from "../../axios-client.js";
import {Link} from "react-router-dom";
export default function Categories() {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(false);
    const {setNotification} = useStateContext()

    useEffect(() => {
      getCategories();
    }, [])

    const onDeleteClick = category => {
      if (!window.confirm("Are you sure you want to delete this category?")) {
        return
      }
      axiosClient.delete(`/v1/admin/categories/${category.id}`)
        .then(() => {
          setNotification('Category was successfully deleted')
          getCategories()
        })
    }

    const getCategories = () => {
      setLoading(true)
      axiosClient.get('/v1/admin/categories')
        .then(({ data }) => {
            console.log(data);

          setLoading(false)
          setCategories(data.data)
        })
        .catch(() => {
          setLoading(false)
        })
    }

    return (
      <div>
        <div style={{display: 'flex', justifyContent: "space-between", alignItems: "center"}}>
          <h1>Categories</h1>
          <Link className="btn-add" to="/admin/categories/new">Add new</Link>
        </div>
        <div className="card animated fadeInDown">
          <table>
            <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Create Date</th>
              <th>Actions</th>
            </tr>
            </thead>
            {loading &&
              <tbody>
              <tr>
                <td colSpan="5" className="text-center">
                  Loading...
                </td>
              </tr>
              </tbody>
            }
            {!loading &&
              <tbody>
              {categories.map(c => (
                <tr key={c.id}>
                  <td>{c.id}</td>
                  <td>{c.name}</td>
                  <td>{c.created_at}</td>
                  <td>
                    <Link className="btn-edit" to={'/admin/categories/' + c.id}>Edit</Link>
                    &nbsp;
                    <button className="btn-delete" onClick={ev => onDeleteClick(c)}>Delete</button>
                  </td>
                </tr>
              ))}
              </tbody>
            }
          </table>
        </div>
      </div>
    )
}
