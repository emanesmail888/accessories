
import { useState, useEffect } from "react";

/* REACT ROUTER */
import { Link,useNavigate, useParams } from "react-router-dom";

/* REACT BOOTSTRAP */
import { Row, Col, ListGroup, Image, Card, Button } from "react-bootstrap";



/* PAYPAL BUTTONS */
import { PayPalButton } from "react-paypal-button-v2";

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
  const { token} = useStateContext();


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
    } else if (!order.order.isPaid) {
      // ACTIVATING PAYPAL SCRIPTS
      if (!window.paypal) {
        addPayPalScript();
      } else {
        setSdkReady(true);
      }
    }
  }, [ id, successPay,order, successDeliver, history, token]);

  /* HANDLERS */
  const successPaymentHandler = (paymentResult) => {
    dispatch(payOrder(id, paymentResult));
  };

  const deliverHandler = () => {
    dispatch(deliverOrder(order));
  };

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
                    {item.product_id}
                      <Row>
                        <Col md={1}>
                          <Image
                            src={item.image}
                            alt={item.name}
                            fluid
                            rounded
                          />
                        </Col>

                        <Col>
                          <Link to={`/admin/product/${item.product}/`}>
                            {item.name}
                          </Link>
                        </Col>

                        <Col md={4}>
                          {item.quantity} X Eg P{item.price} = Eg P
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

                  <Col>Eg P{order.order.subtotal}</Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>Shipping: </Col>

                  <Col> Eg P{order.order.shippingPrice}</Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>Tax:</Col>

                  <Col>Eg P{order.order.tax}</Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>Total:</Col>

                  <Col>Eg P{order.order.total}</Col>
                </Row>
              </ListGroup.Item>

              {!order.order.isPaid && (
                <ListGroup.Item>
                  {loadingPay && <Loader />}
                  {!sdkReady ? (
                    <Loader />
                  ) : (
                    <PayPalButton
                      amount={order.order.total}
                      onSuccess={successPaymentHandler}
                    />

                  )}
                </ListGroup.Item>
              )}
            </ListGroup>

            {loadingDeliver && <Loader />}

            {/* {user && user.is_staff && order.isPaid && !order.isDeliver && ( */}
              <ListGroup.Item>
                <Button
                  type="button"
                  className="btn w-100"
                  onClick={deliverHandler}
                >
                  Mark As Delivered
                </Button>
              </ListGroup.Item>
            {/* )} */}
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default Order;


