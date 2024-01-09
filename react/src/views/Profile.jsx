
// import { Navigate } from 'react-router-dom';

import { Link } from 'react-router-dom'
import {useEffect,useState} from "react";
import axiosClient from "../axios-client.js";
import {useNavigate} from "react-router-dom";
import { Button, Row, Col, ListGroup, Image, Card } from "react-bootstrap";

import {useStateContext} from "../contexts/ContextProvider.jsx";

const Profile = () => {

    const { user,setUser } = useStateContext();
    const [profile, setProfile] = useState([]);

    const [errors, setErrors] = useState(null)
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate();

    useEffect(() => {
        // setLoading(true)

        // axiosClient.get('/user')
        // .then(({data}) => {
        //    setUser(data)
        // })
        axiosClient.get('/profile')
        .then(({data}) => {
            setProfile(data[0])
            console.log(data[0])
           const profile_id=data[0].user_id
           console.log(profile_id)

        //    if ( user.id === profile.user_id ) {
        //    navigate('/profile')
        //    }
        }).catch(() => {
            setLoading(false)
            })


    }, []);

  // if (user.profile) {
    return (

        <>
        {profile && <h1>Profile: </h1>}
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
            <Row>
        <Col md={8}>
          <ListGroup variant="flush">
            <ListGroup.Item>
            <h4>Mobile</h4>
    <p>{profile.mobile}</p>
          
            </ListGroup.Item>
            <h4>Last Name</h4>
      <p>{profile.name}</p>
            <ListGroup.Item>
            <h4>Country</h4>
      <p>{profile.country}</p>
            </ListGroup.Item>

            <ListGroup.Item>
            <h4>City</h4>
      <p>{profile.city}</p>
      <h4>ZipCode</h4>
     <p>{profile.zipCode}</p>

      <h4>Address1</h4>

      <p>{profile.address1}</p>
      <h4>Address2</h4>

      <p>{profile.address2}</p>
            </ListGroup.Item>
          </ListGroup>
        </Col>

        <Col md={4}>
          <Card>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h2>Order Summary</h2>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>Items:</Col>
                  <Col>
                  <Image src={'../../profiles/images/' + profile.image} style={{width: '100px' ,height:'70px'}} alt={profile.name} fluid rounded />

                  </Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>Shipping:</Col>
                  <Col>  </Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>Tax:</Col>
                  <Col></Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>Total:</Col>
                  <Col> </Col>
                </Row>
              </ListGroup.Item>

              {/* <ListGroup.Item>
                {error && <Message variant="danger">{error}</Message>}
              </ListGroup.Item> */}

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
    //  user && user?.profile? (
    //   <div className="col-12 col-md-5">
    // <h4>Mobile</h4>
    // <p>{profile.mobile}</p>
    // <h4>Last Name</h4>
    //   <p>{user.profile.last_name}</p>
    //   <h4>Country</h4>
    //   <p>{user.profile.country}</p>
    //   <h4>City</h4>
    //   <p>{user.profile.city}</p>
    //   <h4>ZipCode</h4>
    //  <p>{user.profile.zipCode}</p>

    //   <h4>Address1</h4>

    //   <p>{user.profile.address1}</p>
    //   <h4>Address2</h4>

    //   <p>{user.profile.address2}</p>

    //   <h4>image</h4>
    //   {user.profile.image ? <img src={user.profile.image} height="300" width="500"/>
    //    :  <img src="/media/accounts/images/default_avatar.jpg" height="300" width="500"/>

    //   }






//       <Link className="btn btn-outline-primary mr-2" to={`/profile/${user.profile.id}`}>Update</Link>




//     </div>



// ) : (


//     <div className="col-12 col-md-5">
//      <h4>First Name</h4>
//      <p>{user.firstName}</p>
//      <p>{user.id}</p>

//      <h4>Email Address</h4>
//      <p>{user.email}</p>


//      <h4>Last Name</h4>
//      <p>{user.lastName}</p>
//      <img src="/media/accounts/images/default_avatar.jpg" height="300" width="500"/>
//      <Link className="btn btn-outline-primary mr-2" to={`/profile/new`}>Add Profile</Link>





//    </div>



//)


    )


    
}






export default Profile
