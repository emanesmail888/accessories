import { useEffect } from "react";
import  '../styles/css/font-awesome.min.css';

import  './home.css';

/* REACT ROUTER */
import { Link,useNavigate } from "react-router-dom";
import { useLocation,useParams } from 'react-router';


/* REACT BOOTSTRAP */
import {
  Row,
  Col,
  Image,
  ListGroup,
  Button,
  Card,
  Form,
} from "react-bootstrap";

/* COMPONENTS */
import Message from "../views/Message";

/* REACT - REDUX */
import { useDispatch, useSelector } from "react-redux";

/* ACTION CREATORS */
import { addToCart, removeFromCart } from "../actions/cartAction";
function Cart() {

/* GETTING DATA FROM URL IF PRESENT */
  const {id} = useParams();

  const location = useLocation();

  const qty = location.search ? Number(location.search.split("=")[1]) : 1;

  //qty: '?qty=3' -> ['?qty',3] -> 3

  /* FIRING OFF DISPATCH, BUT ONLY IF WE HAVE A PRODUCT ID & QUANTITY */
  const dispatch = useDispatch();
  const navigate = useNavigate();


  useEffect(() => {
    if (id) {
      dispatch(addToCart(id, qty));
    }
  }, [dispatch, id, qty]);

  /* PULLING A PART OF STATE FROM THE ACTUAL STATE IN THE REDUX STORE */
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  /* HANDLERS */

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id));
  };
  const checkoutHandler = () => {
    navigate("/shipping");
  };
    return (
        <Row>
          <Col md={8}>
            <h1 style={{textAlign:'center',margin:'30px'}}>Shopping Cart</h1>
            {cartItems.length === 0 ? (
              <Message variant="alert alert-danger">
                Your cart is empty. <Link to="/">Go Back</Link>
              </Message>
            ) : (
              <ListGroup variant="flush">
                {cartItems.map((item) => (
                  <ListGroup.Item key={item.product}>
                    <Row>
                      <Col md={3}>
                        <Image src={'../../products_images/' + item.image} style={{width: '100px' ,height:'70px'}} alt={item.name} fluid rounded />
                      </Col>

                      <Col md={2}  >
                        {/* <Link to={`/admin/product/${item.product}/`}>{item.name}</Link> */}
                        <h5>{item.name}</h5>
                      </Col>

                      <Col md={2} >
                      <h5>P{item.price}</h5>
                      </Col>

                      <Col md={2}>
                        <Form.Control
                          as="select"
                          value={item.qty}
                          onChange={(e) =>
                            dispatch(
                              addToCart(item.product, Number(e.target.value))
                            )
                          }
                        >
                          {[...Array(item.countInStock).keys()].map((x) => (
                            <option key={x + 1} value={x + 1}>
                              {x + 1}
                            </option>
                          ))}
                        </Form.Control>
                      </Col>

                      <Col md={3}>
                        <Button
                          type="button"
                          variant="light"
                          onClick={() => removeFromCartHandler(item.product)}
                        >
                          <i className='fa fa-trash text-white'>delete</i>
                        </Button>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                ))}
              </ListGroup>
            )}
          </Col>

          <Col md={4}>
            <Card>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <h2>
                    Subtotal ({cartItems.reduce((acc, item) => acc + item.qty, 0)})
                    items
                  </h2>
                  P
                  {cartItems
                    .reduce((acc, item) => acc + item.qty * item.price, 0)
                    .toFixed(2)}
                </ListGroup.Item>
              </ListGroup>

              <ListGroup.Item>
                <Button
                  type="button"
                  className="w-100"
                  disabled={cartItems.length === 0}
                  onClick={checkoutHandler}
                >
                  Proceed To Checkout
                </Button>
              </ListGroup.Item>
            </Card>
          </Col>
        </Row>
      );
}

export default Cart
