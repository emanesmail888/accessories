
import { useState, useEffect } from "react";

/* REACT ROUTER */
import { Link,useNavigate, useParams } from "react-router-dom";

/* REACT BOOTSTRAP */
import { Row, Col, ListGroup, Image, Card, Button } from "react-bootstrap";



/* PAYPAL BUTTONS */
import {PayPalButton} from "react-paypal-button-v2";

/* COMPONENTS */
import Message from "./Message";
import Loader from "../components/Loader";

/* REACT - REDUX */
import { useDispatch, useSelector } from "react-redux";

/* ACTION CREATORS */
import {
  getOrderDetails,
  payOrder,
  deliverOrder,
} from "../actions/orderAction";
import {useStateContext} from "../contexts/ContextProvider";
import axiosClient from "../axios-client.js";


/* ACTION TYPES */
import {
  ORDER_PAY_RESET,
  ORDER_DELIVER_RESET,
} from "../actions/types";

function Order() {
  const {id} = useParams();


  const dispatch = useDispatch();
  const history = useNavigate();

  const [sdkReady, setSdkReady] = useState(false);
  const { token,user,setUser} = useStateContext();
  const [load, setLoading] = useState(false);



  /* PULLING A PART OF STATE FROM THE ACTUAL STATE IN THE REDUX STORE */
  const orderDetails = useSelector((state) => state.orderDetails);
  const { order, error, loading } = orderDetails;

  const orderPay = useSelector((state) => state.orderPay);
  const { loading: loadingPay, success: successPay } = orderPay;

  const orderDeliver = useSelector((state) => state.orderDeliver);
  const { loading: loadingDeliver, success: successDeliver } = orderDeliver;







  // ITEMS PRICE GETS CALCULATED ONLY IF WE HAVE AN ORDER
  if (!loading && !error) {
  <h2>{order.order.total}</h2>
  console.log(order.orderItems)




}

  // PAYPAL BUTTONS
  const addPayPalScript = () => {
    const script = document.createElement("script");
    script.type = "text/javascript";
    script.src =
      "https://www.paypal.com/sdk/js?client-id=ARiYwLYLJ3zaE5lon6OHBhvcbjqlusbToTzSZx7dWUWiIzE4mqIsOJPGD5_ZfEabO9MmSYBCUWWY1WuI";
    script.async = true;
    script.onload = () => {
      setSdkReady(true);
    };
    document.body.appendChild(script);
  };

  useEffect(() => {
    // IS USER IS NOT LOGGED IN THEN REDIRECT TO LOGIN PAGE
    if (!token) {
      history("/login");
    }

    // CHECK IF WE HAVE THE ORDER DETAILS, IF NOT DISPATCH AN ACTION TO GET THE ORDER DETAILS
    if (
      !order ||
      successPay ||
      order.order.id !== Number(id) ||
      successDeliver
    ) {
      dispatch({ type: ORDER_PAY_RESET });

      dispatch({ type: ORDER_DELIVER_RESET });

      dispatch(getOrderDetails(id));
    }


    else if (!order.order.isPaid) {
      // ACTIVATING PAYPAL SCRIPTS
      if (!window.paypal) {
       addPayPalScript();

      }
       else {
        setSdkReady(true);
      }
    }
    getUser();

  }, [ id, successPay,order, successDeliver, history, token]);

  /* HANDLERS */
  const successPaymentHandler = (paymentResult) => {
    dispatch(payOrder(id, paymentResult));
  };

  const deliverHandler = () => {
    dispatch(deliverOrder(id));
  };


function convertCurrency(egpAmount) {
  const exchangeRate = 0.032; // Fixed exchange rate: 1 EGP = 0.063 USD
  const usdAmount = egpAmount * exchangeRate;
  return usdAmount.toFixed(2); // Rounded to 2 decimal places
}

  const getUser = () => {
    setLoading(true)
    axiosClient.get('/user')
     .then(({data}) => {

        setLoading(false)
        setUser(data)


      })
      .catch(() => {
        setLoading(false)
      })
  }


  return loading ? (
    <Loader />
  ) : error ? (
    <Message variant="alert alert-danger">{error}</Message>
  ) : (
    <div>
      <h1>Order: {order.order.id}</h1>
      <Row>
        <Col md={8}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>Shipping</h2>

              <p>
                <strong>Name: {order.order.firstName}{order.order.lastName}</strong>
              </p>

              <p>
                <strong>Email: </strong>
                {order.order.email}
              </p>

              <p>
                <strong>Shipping Address: </strong>
                {order.order.address}, {order.order.city},{" "}
                {order.order.zipCode},{" "}
                {order.order.country}
              </p>

              {order.order.isDeliver ? (
                <Message variant="alert alert-success">
                  Delivered on{" "}
                  {order.order.deliveredAt
                    ? order.order.deliveredAt.substring(0, 10)
                    : null}
                </Message>
              ) : (
                <Message variant="alert alert-warning">Not Delivered</Message>
              )}
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Payment</h2>

              <p>
                <strong>Payment Method: </strong>
                {order.order.paymentMethod}
              </p>

              {order.order.isPaid ? (

                <Message variant=" alert alert-danger" >
                 Paid on {order.order.paidAt ? order.order.paidAt.substring(0, 10) : null}
                </Message>
              ) : (
                <Message variant="alert alert-warning">Not Paid</Message>
              )}
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>order Items</h2>

              {order.orderItems.length === 0 ? (
                <Message variant="alert alert-info">Order is empty</Message>
              ) : (
                <ListGroup variant="flush">
                  {order.orderItems.map((item, index) => (
                    <ListGroup.Item key={index}>
                      <Row>
                        <Col md={4}>
                          <Image
                            src={`${import.meta.env.VITE_API_BASE_URL}/products/images/`+item.product_img}
                            alt={item.product_title}
                            style={{width:'70px',height:'70px'}}
                            fluid
                            rounded
                          />
                        </Col>

                        <Col md={2}>
                          <Link to={`/pro/${item.id}`}>
                          
                            {item.product_title}
                          </Link>
                        </Col>

                        <Col md={4}>
                          {item.quantity} X EgP{item.price} = EgP
                          {(item.quantity * item.price).toFixed(2)}
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              )}
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

                  <Col>EgP{order.order.subtotal}</Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>Shipping: </Col>

                  <Col> EgP{order.order.shippingPrice}</Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>Tax:</Col>

                  <Col>EgP{order.order.tax}</Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>Total:</Col>

                  <Col>EgP{order.order.total}</Col>
                </Row>
              </ListGroup.Item>


              {!order.order.isPaid && (
                <ListGroup.Item>
                  {loadingPay && <Loader />}
                  {!sdkReady ? (
                    <Loader />
                  ) : (
                    <PayPalButton
                      amount={convertCurrency(order.order.total)}
                      onSuccess={successPaymentHandler}

                    />

                  )}
                </ListGroup.Item>
              )}
            </ListGroup>

            {loadingDeliver && <Loader />}

            {!load && user && user.utype==='ADM' && order.order.isPaid && !order.order.isDeliver && (
              <ListGroup.Item>
                <Button
                  type="button"
                  className="btn w-100"
                  onClick={deliverHandler}
                >
                  Mark As Delivered
                </Button>
              </ListGroup.Item>
            )}
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default Order;


