
// import { Navigate } from 'react-router-dom';

import { Link } from 'react-router-dom'
import {useEffect,useState} from "react";
import axiosClient from "../axios-client.js";
import {useNavigate} from "react-router-dom";
import {  Row, Col, ListGroup, Image, Card } from "react-bootstrap";

import {useStateContext} from "../contexts/ContextProvider.jsx";

const Profile = () => {

    const { user,setUser } = useStateContext();
    const [profile, setProfile] = useState([]);
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate();

    useEffect(() => {
        setLoading(true)
        axiosClient.get('/v1/user')
        .then(({data}) => {
           setUser(data)
        })
        axiosClient.get('/v1/profile')
        .then(({data}) => {
            if (!data.id) {
                console.log('Data is null');
                navigate('/profile/new');
                setLoading(false)

              }
           
           else{
                setProfile(data)
                setLoading(false)

                
                console.log(data)
               const profile_id=data.user_id
               console.log(profile_id)
            }
           

        }).catch(() => {
            setLoading(false)
            })


    }, []);

    return (

        <>
        {profile && <h1>Profile: {user.name} </h1>}
        <div className="card animated fadeInDown">
          {loading && (
            <div className="text-center">
              Loading...
            </div>
          )}
          {/* {errors &&
            <div className="alert">
              {Object.keys(errors).map(key => (
                <p key={key}>{errors[key][0]}</p>
              ))}
            </div>
          } */}
          {!loading && (
            <Row>
        <Col md={8}>
          <ListGroup variant="flush">
            <ListGroup.Item>
            <h4>Mobile</h4>
         <p>{profile.mobile}</p>

            </ListGroup.Item>
            <ListGroup.Item>

            <h4> Name</h4>
          <p>{user.name}</p>
            </ListGroup.Item>
            <ListGroup.Item>
            <h4>Country</h4>
      <p>{profile.country}</p>
            </ListGroup.Item>

            <ListGroup.Item>
            <h4>City</h4>
         <p>{profile.city}</p>
         </ListGroup.Item>

         <ListGroup.Item>
         <h4>ZipCode</h4>
     <p>{profile.zipCode}</p>
            
         </ListGroup.Item>

         <ListGroup.Item>
         <h4>Address2</h4>

<p>{profile.address2}</p>

         </ListGroup.Item>
         <ListGroup.Item>
         <h4>Address1</h4>

<p>{profile.address1}</p>

         </ListGroup.Item>
         

     
    
          </ListGroup>
        </Col>

        <Col md={4}>
          <Card>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h2>Your Image</h2>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>
                  <Image src={`${import.meta.env.VITE_API_BASE_URL}/profiles/images/`+profile.image} style={{width: '100px' ,height:'70px'}} alt={profile.name} fluid rounded />

                  </Col>
                </Row>
              </ListGroup.Item>

              
            
              <ListGroup.Item>
              <Link className="btn-edit" to={'/profile/' + profile.id}>Update Profile</Link>

              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
        )}
      </div>
     </>
 

    )



}






export default Profile
