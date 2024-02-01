import  { useEffect } from "react";

/* REACT ROUTER */
import { useNavigate } from "react-router-dom";

/* REACT BOOTSTRAP */
import { Button, Row, Col, ListGroup, Image, Card } from "react-bootstrap";

/* COMPONENTS */
import CheckoutSteps from "../../components/CheckoutSteps";
import Message from "../Message";

/* REACT - REDUX */
import { useDispatch, useSelector } from "react-redux";

/* ACTION CREATORS */
import { createOrder } from "../../actions/orderAction";

/* ACTION TYPES */
import { ORDER_CREATE_RESET } from "../../actions/types";

function PlaceOrder() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  /* PULLING A PART OF STATE FROM THE ACTUAL STATE IN THE REDUX STORE */
  const orderCreate = useSelector((state) => state.orderCreate);


  const { order, error, success } = orderCreate;

  const cart = useSelector((state) => state.cart);

  // PRICE CALCULATIONS, WE ARE SETTING AN ATTRIBUTE TO OUR CART OBJECT BUT IT WON'T UPDATE OUR STATE, IT'S JUST FOR THIS PAGE
  cart.itemsPrice = cart.cartItems
    .reduce((acc, item) => acc + item.price * item.qty, 0)
    .toFixed(2);

  cart.shippingPrice = (cart.itemsPrice > 100 ? 0 : 10).toFixed(2);

  cart.taxPrice = Number(0.082 * cart.itemsPrice).toFixed(2);

  cart.totalPrice = (
    Number(cart.itemsPrice) +
    Number(cart.shippingPrice) +
    Number(cart.taxPrice)
  ).toFixed(2);

  // REDIRECT
  if (!cart.paymentMethod) {
    navigate("/payment");
  }

  /* IF ORDER SUCCESSFULL AND WE HAVE ORDER ID, SEND USER TO USERS ACCOUNT TO VIEW THE ORDER */
  useEffect(() => {
    if (success) {
        console.log(order)
      navigate(`/getOrders/${order.id}`);

      // RESET STATE
      dispatch({
        type: ORDER_CREATE_RESET,
      });
    }
  }, [success ,navigate]);

  // HANDLERS

  const placeorder = () => {
    dispatch(
      createOrder({
        orderItems: cart.cartItems,
        shippingAddress: cart.shippingAddress,
        paymentMethod: cart.paymentMethod,
        itemsPrice: cart.itemsPrice,
        shippingPrice: cart.shippingPrice,
        taxPrice: cart.taxPrice,
        totalPrice: cart.totalPrice,
      })
    );
  };

  return (
    <div>
      <CheckoutSteps step1 step2 step3 step4 />

      <Row>
        <Col md={8}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>Shipping</h2>

              <p>
                <strong>Shipping Address: </strong>
                {cart.shippingAddress.address}, {cart.shippingAddress.city},{" "}
                {cart.shippingAddress.zipCode},{" "}
                {cart.shippingAddress.country}
              </p>
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Payment</h2>

              <p>
                <strong>Payment Method:</strong>
                {cart.paymentMethod}
              </p>
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Order Items</h2>

              {cart.cartItems.length === 0 ? (
                <Message variant="info">Your cart is empty</Message>
              ) : (
                <ListGroup variant="flush">
                  {cart.cartItems.map((item, index) => (
                    <ListGroup.Item key={index}>
                      <Row>
                        <Col md={4}>
                          <Image src={`${import.meta.env.VITE_API_BASE_URL}/products/images/`+item.image} style={{width: '100px' ,height:'70px'}} alt={item.name} fluid rounded />

                        </Col>

                        <Col md={2}  >
                        {/* <Link to={`/admin/product/${item.product}/`}>{item.name}</Link> */}
                        {item.name}
                      </Col>

                        <Col md={4}>
                          {item.qty} X EGP{item.price} = EGP
                          {(item.qty * item.price).toFixed(2)}
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
                  <Col> EGP{cart.itemsPrice}</Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>Shipping:</Col>
                  <Col>  EGP{cart.shippingPrice}</Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>Tax:</Col>
                  <Col>EGP{cart.taxPrice}</Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>Total:</Col>
                  <Col>EGP{cart.totalPrice} </Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                {error && <Message variant="danger">{error}</Message>}
              </ListGroup.Item>

              <ListGroup.Item>
                <Button
                  type="button"
                  className="w-100"
                  disabled={cart.cartItems === 0}
                  onClick={placeorder}
                >
                  Place Order
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default PlaceOrder;