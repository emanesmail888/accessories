import  { useState } from "react";

/* REACT BOOTSTRAP */
import { Button, Form } from "react-bootstrap";

/* COMPONENTS */
import FormContainer from "../components/FormContainer";
import CheckoutSteps from "../components/CheckoutSteps";
import './home.css';


/* REACT - REDUX */
import { useDispatch, useSelector } from "react-redux";

/* ACTION CREATORS */
import { saveShippingAddress } from "../actions/cartAction";
import { Navigate } from "react-router-dom";

function Shipping() {
  // PULLING OUT SHIPPING ADDRESS FROM CART
  const cart = useSelector((state) => state.cart);

  const { shippingAddress } = cart;

  // STATE
  const [address, setAddress] = useState(shippingAddress.address);
  const [firstName, setFirstName] = useState(shippingAddress.firstName);
  const [lastName, setLastName] = useState(shippingAddress.lastName);
  const [city, setCity] = useState(shippingAddress.city);
  const [email, setEmail] = useState(shippingAddress.email);
  const [mobile, setMobile] = useState(shippingAddress.mobile);
  const [zipCode, setZipCode] = useState(shippingAddress.zipCode);
  const [country, setCountry] = useState(shippingAddress.country);
  const [shippingCreated, setShippingCreated] = useState(false);





  const dispatch = useDispatch();

  // HANDLERS
  const submitHandler = (e) => {
    e.preventDefault();

    /* FIRING OFF THE ACTION CREATORS USING DISPATCH TO SAVE ADDRESS */
    dispatch(
      saveShippingAddress({
        firstName,
        lastName,
        email,mobile
        ,address,
        city,
        zipCode,
        country,
      })
    );
    setShippingCreated(true);


    // PUSHING USER TO PAYMENTS PAGE AFTER SAVING ADDRESS
  };
  // history("/payment");
  if (shippingCreated) {
    return <Navigate to='/payment' />


}


  return (
    <FormContainer>
      <CheckoutSteps step1 step2 />
      <h1 style={{textAlign:'center',marginBottom:"20px"}}>Shipping</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group controlId="firstName">
          <Form.Label>FirstName</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="Enter firstName"
            value={firstName ? firstName : ""}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="lastName">
          <Form.Label>LastName</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="Enter LastName"
            value={lastName ? lastName : ""}
            onChange={(e) => setLastName(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="mobile">
          <Form.Label>mobile</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="Enter Mobile"
            value={mobile ? mobile : ""}
            onChange={(e) => setMobile(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="Enter Email"
            value={email ? email : ""}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="address">
          <Form.Label>Address</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="Enter Address"
            value={address ? address : ""}
            onChange={(e) => setAddress(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="city">
          <Form.Label>City</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="Enter City"
            value={city ? city : ""}
            onChange={(e) => setCity(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="zipcode">
          <Form.Label>zipCode</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="Enter Postal Code"
            value={zipCode ? zipCode : ""}
            onChange={(e) => setZipCode(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="country">
          <Form.Label>Country</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="Enter Country"
            value={country ? country : ""}
            onChange={(e) => setCountry(e.target.value)}
          />
        </Form.Group>

        <Button className=" my-3  mx-5 " style={{alignContent:"center"}} type="submit" variant="primary">
          Continue
        </Button>
      </Form>
    </FormContainer>
  );
}

export default Shipping;
