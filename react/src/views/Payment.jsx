import  { useState } from "react";

/* REACT BOOTSTRAP */
import { Button, Form, Col } from "react-bootstrap";

/* COMPONENTS */
import FormContainer from "../components/FormContainer";
import CheckoutSteps from "../components/CheckoutSteps";

/* REACT - REDUX */
import { useDispatch, useSelector } from "react-redux";

/* ACTION CREATORS */
import { savePaymentMethod } from "../actions/cartAction";
import { Navigate, useNavigate } from "react-router-dom";
import './home.css';


function Payment() {
  // PULLING OUT SHIPPING ADDRESS FROM CART
  const cart = useSelector((state) => state.cart);

  const { shippingAddress } = cart;
  const history = useNavigate();

  // STATE
  const [paymentMethod, setPaymentMethod] = useState("PayPal");
  const [paymentCreated, setPaymentCreated] = useState(false);

  /* IF NO SHIPPING ADDRESS THEN REDIRECT TO ShippingAddress SCREEN */
  if (!shippingAddress.address) {
    history("/shipping");
  }

  // HANDLERS

  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();

    dispatch(savePaymentMethod(paymentMethod));
    setPaymentCreated(true);



    // AFTER CHOSING THE PAYMENT METHOD REDIRECT USER TO PlaceOrder SCREEN
  };





if (paymentCreated) {
  return <Navigate to='/placeorder' />


}

  return (
    <FormContainer>
      <CheckoutSteps step1 step2 step3 />

      <Form onSubmit={submitHandler}>
        <Form.Group >
          <Form.Label >Select Method</Form.Label>
          <Col >
         <p>PayPal or Credit Card</p>

            <Form.Check
              type="radio"
            //   label="PayPal or Credit Card"
              id="paypal"
              name="paymentMethod"
              checked
              onChange={(e) => setPaymentMethod(e.target.value)}

            ></Form.Check>
          </Col>
        </Form.Group>

        <Button type="submit" variant="danger" className="my-3">
          Continue
        </Button>
      </Form>
    </FormContainer>
  );
}

export default Payment;
