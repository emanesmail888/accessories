import {useEffect, useState} from "react";
import {useStateContext} from "../../contexts/ContextProvider.jsx";
import axiosClient from "../../axios-client.js";
import {useNavigate,useParams} from "react-router-dom";
function AddCategory() {
        const navigate = useNavigate();
        let {id} = useParams();
        const [category, setCategory] = useState({
          id: null,
          name: '',
          image: null,


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

        // const onSubmit = ev => {
        //   ev.preventDefault()

  const handleImageChange = (ev) => {
    const imageFile = ev.target.files[0];
    setCategory({ ...category, image: imageFile });
  };

  const onSubmit = async(ev) => {
    ev.preventDefault();
    const formData = new FormData();
    formData.append("name", category.name);
    formData.append("image", category.image);

          if (category.id) {
            try {
                const formData = new FormData();
                formData.append("name", category.name);
                formData.append("image", category.image);
                   formData.append("_method", "PUT");

             await  axiosClient.post(`/admin/categories/${category.id}`, formData,
            {
                headers: {
                    // 'Content-Type': 'application/x-www-form-urlencoded',
                    'Content-Type': 'multipart/form-data',

                //   'Content-Type':'application/json',
                },
              }
              )
              .then(() => {
                setNotification('category was successfully updated')
                navigate('/admin/categories')
              })
              .catch((err) => {
                const response = err.response;
                        if (response && response.status === 422) {
                            setErrors(response.data.errors)
                        }                    });
                    } catch (error) {
                        console.error('Product creation error:', error);
                      }
          } else {
            axiosClient.post('/admin/categories', formData)
            // .post("/admin/categories", formData)

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
                <form onSubmit={onSubmit} >
                  <input value={category.name} onChange={ev => setCategory({...category, name: ev.target.value})} placeholder="Name"/>
                  <input
              type="file"
              name="image"
              accept="image/*"
              onChange={handleImageChange}
            />
                       <button  className=" btn btn-danger " style={{marginLeft:'360px'}}>Save</button>
                </form>
              )}
            </div>
          </>
        )
    }

export default AddCategory
