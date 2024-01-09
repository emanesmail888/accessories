/* eslint-disable no-undef */
import  { useState, useEffect } from 'react';
import axiosClient from "../axios-client.js";
import {useParams} from "react-router-dom";
function UpdateProductForm() {
    let {id} = useParams();

  const [productData, setProductData] = useState({
    cat_id: '',
    product_title: '',
    product_desc: '',
    product_label: '',
    price: '',
    product_psp_price: '',
    stock: '',
    product_img: null,
    product_images: [],
  });

  useEffect(() => {
    // Fetch product data from the server based on the productId
       // Example using axios:
       axiosClient.get(`/products/${id}`)
       .then(response => {
           const product = response.data.data;
           setProductData(product);
         })
         .catch(error => {
           console.error('Error fetching product data:', error);
         });


  }, []);


//   const changeUserFieldHandler = (e) => {
//     setUserField({
//         ...userField,
//         [e.target.name]: e.target.value
//     });
//     console.log(userField);
// }
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setProductData(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setProductData(prevData => ({
      ...prevData,
      product_img: file,
    }));
  };

  const handleImagesChange = (event) => {
    const files = event.target.files;
    setProductData(prevData => ({
      ...prevData,
      product_images: files,
    }));
  };


//   const onSubmitChange = async (e) => {
//     e.preventDefault();
//     try {
//         await axios.put("http://127.0.0.1:8000/api/usersupdate/"+id, userField);
//         navigate('/');  
//     } catch (err) {
//         console.log("Something Wrong");
//     }
// }

  const handleSubmit = (event) => {
    event.preventDefault();

    // Create form data object
    const formData = new FormData();
    formData.append('cat_id', productData.cat_id);
    formData.append('product_title', productData.product_title);
    formData.append('product_desc', productData.product_desc);
    formData.append('product_label', productData.product_label);
    formData.append('price', productData.price);
    formData.append('product_psp_price', productData.product_psp_price);
    formData.append('stock', productData.stock);
    if (productData.product_img) {
      formData.append('product_img', productData.product_img);
    }
    for (let i = 0; i < productData.product_images.length; i++) {
      formData.append('product_images[]', productData.product_images[i]);
    }

    // Perform an API request to update the product data
    // You can use a library like axios to make the API request

    // Example using axios:
   
    axiosClient.put(`/products/${id}`, formData),
    {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
    }
    // axiosClient.put(`/products/${id}`, formData)
      .then(response => {
        // Handle successful update
        console.log('Product updated successfully:', response.data);
      })
      .catch(error => {
        // Handle error
        console.error('Error updating product:', error);
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Category ID:
        <input
          type="text"
          name="cat_id"
          value={productData.cat_id}
          onChange={handleInputChange}
        />
      </label>
      <label>
        title:
        <input
          type="text"
          name="product_title"
          value={productData.product_title}
          onChange={handleInputChange}
        />
      </label>
      <label>
      description:
        <input
          type="text"
          name="product_desc"
          value={productData.product_desc}
          onChange={handleInputChange}
        />
      </label>
      <label>
      price:
        <input
          type="text"
          name="price"
          value={productData.price}
          onChange={handleInputChange}
        />
      </label>
      <label>
      product_psp_price:
        <input
          type="text"
          name="product_psp_price"
          value={productData.product_psp_price}
          onChange={handleInputChange}
        />
      </label>
      <label>
      product_label :
        <input
          type="text"
          name="product_label"
          value={productData.product_label}
          onChange={handleInputChange}
        />
      </label>
      <label>
      stock :
        <input
          type="text"
          name="stock"
          value={productData.stock}
          onChange={handleInputChange}
        />
      </label>

      {/* Render other input fields for other product properties */}

      <label>
        Product Image:
        <input
          type="file"
          name="product_img"
          onChange={handleImageChange}
        />
      </label>

      <label>
        Product Images:
        <input
          type="file"
          name="product_images"
          multiple
          onChange={handleImagesChange}
        />
      </label>

      <button type="submit">Update Product</button>
    </form>
  );
}


export default UpdateProductForm;
