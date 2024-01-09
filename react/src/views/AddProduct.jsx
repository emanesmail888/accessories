import {useEffect, useState} from "react";
// import axios from 'axios';
 import axiosClient from "../axios-client.js";
  import {useNavigate,useParams} from "react-router-dom";
   import {useStateContext} from "../contexts/ContextProvider";




function AddProduct() {
    const navigate = useNavigate();
    let {id} = useParams();

    const [errors, setErrors] = useState(null)
    const [loading, setLoading] = useState(false)
    const {setNotification} = useStateContext()


  const [product_title, setProduct_title] = useState('')
      const [product_desc, setProduct_desc] = useState('')
      const [product_label, setProduct_label] = useState('')
      const [price, setPrice] = useState('')
      const [product_psp_price, setProduct_psp_price] = useState('')
      const [cat_id, setCat_id] = useState('')
      const [stock, setStock] = useState('')
      const [product_img, setImage] = useState(null);
  const [product_images, setImages] = useState([]);
    const [categories, setCategories] = useState([]);


    useEffect(() => {
        getCategories();
      }, []);
      if (id) {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        useEffect(() => {
        getCategories()
        setLoading(true)
        axiosClient.get(`/admin/products/${id}`)
            .then(({data}) => {
            setLoading(false)
            setProduct_title(data.data.product_title)
            setProduct_desc(data.data.product_desc)
            setProduct_label(data.data.product_label)
            setCat_id(data.data.cat_id)
            setPrice(data.data.price)
            setProduct_psp_price(data.data.product_psp_price)
            setStock(data.data.stock)
            })
            .catch(() => {
            setLoading(false)
            })
        }, [])
    }


  const getCategories = () => {
                    axiosClient.get('/admin/categories')
                      .then(({ data }) => {
                          console.log(data);

                        setCategories(data.data)
                      })
                      .catch(() => {
                      })
                  }
                //   const handleImageChange = (event) => {
                //     const selectedImages = Array.from(event.target.files);
                //     setImages(selectedImages);
                //   };
  const handleFormSubmit = async (e) => {
    e.preventDefault();
                  if (id) {
                    try {
                        const formData = new FormData();
                        formData.append('product_title', product_title);
                        formData.append('product_desc', product_desc);
                        formData.append('product_label', product_label);
                        formData.append('price', price);
                        formData.append('product_psp_price', product_psp_price);
                        formData.append('stock', stock);
                        formData.append('cat_id', cat_id);
                        formData.append('product_img', product_img);
                    //    formData.append('product_images[]', product_images);


                        if (Array.isArray(product_images)) {

                        //   product_images.forEach(function(img1) {

                        //      formData.append('product_images', img1 )
                        //          });
                // formData.append('product_images[]', product_images);

                        product_images.forEach((img) => formData.append('product_images[]', img));

                        } else {
                  product_images.forEach((img) => formData.append('product_images[]', img));

                                            //   formData.append('product_images[]', product_images);
             }

                        const response = await axiosClient.post(`/admin/product/${id}`, formData,
                        {
                            headers: {
                              'Content-Type': 'multipart/form-data',
                            },
                          }
                        ).then(() => {
                    setNotification('Product was successfully updated');
                    navigate('/admin/products');
                })
                .catch((err) => {
                    const response = err.response;
                            if (response && response.status === 422) {
                                setErrors(response.data.errors)
                            }                    });

                        console.log('Product updated:', response.data);
                        // Reset form fields
                        setImage(null);
                      //   setImages([]);
                      } catch (error) {
                        console.error('Product creation error:', error);
                      }
                    }
         else{

    try {
      const formData = new FormData();
      formData.append("_method", "PUT");

      formData.append('product_title', product_title);
      formData.append('product_desc', product_desc);
      formData.append('product_label', product_label);
      formData.append('price', price);
      formData.append('product_psp_price', product_psp_price);
      formData.append('stock', stock);
      formData.append('cat_id', cat_id);
      formData.append('product_img', product_img);
     formData.append('product_images[]', product_images);


      if (Array.isArray(product_images)) {
        product_images.forEach(function(img) {
            formData.append('product_images[]', img )
               });
      // product_images.forEach((img) => formData.append('product_images[]', img));

      } else {
        product_images.forEach(function(img) {
            formData.append('product_images[]', img )
               });
        // formData.append('product_images[]', product_images )
    }
    //   product_images.forEach((img) => formData.append('product_images[]', img));

      const response = await axiosClient.post('/admin/products', formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
      ).then(() => {
                              setNotification('Product was successfully created');
                              navigate('/admin/products');
                            })
                            .catch((err) => {
                                const response = err.response;
                                        if (response && response.status === 422) {
                                          setErrors(response.data.errors)
                                        }                    });

      console.log('Product created:', response.data);
      // Reset form fields
      setImage(null);
    //   setImages([]);
    } catch (error) {
      console.error('Product creation error:', error);
    }
}
  };
  return (
                  <>
                    {id && <h1>Update product: {product_title}</h1>}
                    {!id && <h1>New product</h1>}
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
         <form onSubmit={handleFormSubmit}>
        <div>
        <label>Name:</label>
        <input type="text" value={product_title} onChange={(e) => setProduct_title(e.target.value)} />
      </div>
      <div>
        <label>Description:</label>
        <input type="text" value={product_desc} onChange={(e) => setProduct_desc(e.target.value)} />
      </div>
      <div>
        <label>Price:</label>
        <input type="text" value={price} onChange={(e) => setPrice(e.target.value)} />
      </div>
      <div>
        <label>S_price:</label>
        <input type="text" value={product_psp_price} onChange={(e) => setProduct_psp_price(e.target.value)} />
      </div>
      <div>
        <label>label:</label>
        <input type="text" value={product_label} onChange={(e) => setProduct_label(e.target.value)} />
      </div>
      <div>
        <label>stock:</label>
        <input type="text" value={stock} onChange={(e) => setStock(e.target.value)} />
      </div>
      <div>
        <label>category:</label>
        <select name="cat_id"
         value={cat_id}
         onChange={(e) => setCat_id(e.target.value)}>

         <option value="">Select a category</option>
         {categories.map((category) => (
           <option key={category.id} value={category.id}>
             {category.name}
           </option>
         ))}
       </select>

    </div>

      <div>
        <label>Image:</label>
        <input type="file" name="product_img" onChange={(e) => setImage(e.target.files[0])} />
      </div>
      <div>
        <label>Images:</label>
        <input type="file" multiple name="product_images[]"  onChange={(e) => setImages(Array.from(e.target.files))} />
      </div>
      <button type="submit">Create Product</button>
    </form>
                    )}
                  </div>
                 </>
                )
//   return (

//     <div className="App">
//       <h1>Create Product</h1>
//       <form onSubmit={handleFormSubmit}>
//         <div>
//           <label>Name:</label>
//           <input type="text" value={product_title} onChange={(e) => setProduct_title(e.target.value)} />
//         </div>
//         <div>
//           <label>Description:</label>
//           <input type="text" value={product_desc} onChange={(e) => setProduct_desc(e.target.value)} />
//         </div>
//         <div>
//           <label>Price:</label>
//           <input type="text" value={price} onChange={(e) => setPrice(e.target.value)} />
//         </div>
//         <div>
//           <label>S_price:</label>
//           <input type="text" value={product_psp_price} onChange={(e) => setProduct_psp_price(e.target.value)} />
//         </div>
//         <div>
//           <label>label:</label>
//           <input type="text" value={product_label} onChange={(e) => setProduct_label(e.target.value)} />
//         </div>
//         <div>
//           <label>stock:</label>
//           <input type="text" value={stock} onChange={(e) => setStock(e.target.value)} />
//         </div>
//         <div>
//           <label>category:</label>
//           <select name="cat_id"
//            value={cat_id}
//            onChange={(e) => setCat_id(e.target.value)}>

//            <option value="">Select a category</option>
//            {categories.map((category) => (
//              <option key={category.id} value={category.id}>
//                {category.name}
//              </option>
//            ))}
//          </select>

//       </div>

//         <div>
//           <label>Image:</label>
//           <input type="file" onChange={(e) => setImage(e.target.files[0])} />
//         </div>
//         <div>
//           <label>Images:</label>
//           <input type="file" multiple onChange={(e) => setImages(Array.from(e.target.files))} />
//         </div>
//         <button type="submit">Create Product</button>
//       </form>
//     </div>
//   );
}

export default AddProduct;
