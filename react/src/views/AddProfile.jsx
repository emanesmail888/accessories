import {useEffect, useState,useMemo} from "react";
// import axios from 'axios';
 import axiosClient from "../axios-client.js";
  import {useNavigate,useParams} from "react-router-dom";
   import {useStateContext} from "../contexts/ContextProvider.jsx";
   import countryList from 'react-select-country-list'




function AddProfile() {
    const navigate = useNavigate();
    let {id} = useParams();
    const { user, setUser } = useStateContext();
    const [profile, setProfile] = useState([]);


    const options = useMemo(() => countryList().getData(), [])

    const [errors, setErrors] = useState(null)
    const [loading, setLoading] = useState(false)
    const {setNotification} = useStateContext()



      const [mobile, setMobile] = useState('')
      const [address1, setAddress1] = useState('')
      const [address2, setAddress2] = useState('')
      const [city, setCity] = useState('')
      const [country, setCountry] = useState('')
      const [zipCode, setZipCode] = useState('')
      const [image, setImage] = useState(null);

    //   const getInfo = () => {
    //     axiosClient.get('/admin/categories')
    //       .then(({ data }) => {
    //           console.log(data);

    //         setCategories(data.data)
    //       })
         
    //   }

    useEffect(() => {
        setLoading(true)

        axiosClient.get('/user')
        .then(({data}) => {
           setUser(data)
        })
        axiosClient.get('/profile')
        .then(({data}) => {
            setProfile(data[0])
            console.log(data[0].user_id)
           const profile_id=data[0].user_id
           console.log(profile_id)

           if ( user.id === profile.user_id ) {
           navigate('/profile')
           }
        }).catch(() => {
            setLoading(false)
            })


    }, []);
      if (id) {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        useEffect(() => {
        // axiosClient.get('/user')
        //   .then(({data}) => {
        //      setUser(data)
        //   })
        setLoading(true)
        axiosClient.get(`/profile/${id}`)
            .then(({data}) => {
            setLoading(false)
            setMobile(data.data.mobile)
            setAddress1(data.data.address1)
            setAddress2(data.data.address2)
            setCity(data.data.city)
            setCountry(data.data.country)
            setZipCode(data.data.zipCode)
            })
            .catch(() => {
            setLoading(false)
            })
        }, [])
    }



  const handleFormSubmit = async (e) => {
    e.preventDefault();
                  if (id) {
                    try {
                        const formData = new FormData();
                        formData.append('mobile', mobile);
                        formData.append('address1', address1);
                        formData.append('address2', address2);
                        formData.append('country', country);
                        formData.append('zipCode', zipCode);
                        formData.append('city', city);
                        formData.append('image', image);



                        const response = await axiosClient.post(`/profile/${id}`, formData,
                        {
                            headers: {
                              'Content-Type': 'multipart/form-data',
                            },
                          }
                        ).then(() => {
                    setNotification('Profile was successfully updated');
                    navigate('/admin/products');
                })
                .catch((err) => {
                    const response = err.response;
                            if (response && response.status === 422) {
                                setErrors(response.data.errors)
                            }                    });

                        console.log('Profile updated:', response.data);
                        // Reset form fields
                        setImage(null);
                      } catch (error) {
                        console.error('Product creation error:', error);
                      }
                    }
         else{

    try {
      const formData = new FormData();
      formData.append('mobile', mobile);
      formData.append('address1', address1);
      formData.append('address2', address2);
      formData.append('country', country);
      formData.append('zipCode', zipCode);
      formData.append('city', city);
      formData.append('image', image);



      const response = await axiosClient.post('/profile', formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
      ).then(() => {
                              setNotification('Profile was successfully created');
                              navigate('/wishlist');
                            })
                            .catch((err) => {
                                const response = err.response;
                                        if (response && response.status === 422) {
                                          setErrors(response.data.errors)
                                        }                    });

      console.log('Profile created:', response.data);
      // Reset form fields
      setImage(null);
    //   setImages([]);
    } catch (error) {
      console.error('Profile creation error:', error);
    }
}
  };
  return (
                  <>
                    {id && <h1>Update Profile: {user.firstName}</h1>}
                    {!id && <h1>New Profile</h1>}
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
        <label>Mobile:</label>
        <input type="text" value={mobile} onChange={(e) => setMobile(e.target.value)} />
      </div>
      <div>
        <label>Address1:</label>
        <input type="text" value={address1} onChange={(e) => setAddress1(e.target.value)} />
      </div>
      <div>
        <label>Address2:</label>
        <input type="text" value={address2} onChange={(e) => setAddress2(e.target.value)} />
      </div>
      <div>
        <label>City:</label>
        <input type="text" value={city} onChange={(e) => setCity(e.target.value)} />
      </div>
      <div>
        {/* <label>Country:</label>
        <input type="text" value={country} onChange={(e) => setCountry(e.target.value)} /> */}
 <select name='country'  className='form-control form-control-lg'  value={country}
 onChange={(e) => setCountry(e.target.value)}>
<option value="All">All</option>
{ options.map((op) => (
     // eslint-disable-next-line react/jsx-key
     <option value={op.value}>{op.label}</option>))}


</select>

</div>
      <div>
        <label>ZipCode:</label>
        <input type="text" value={zipCode} onChange={(e) => setZipCode(e.target.value)} />
      </div>


      <div>
        <label>Image:</label>
        <input type="file" name="image" onChange={(e) => setImage(e.target.files[0])} />
      </div>

      <button type="submit">Create Profile</button>
    </form>
                    )}
                  </div>
                 </>
                )


}

export default AddProfile;
