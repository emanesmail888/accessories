import  { useEffect } from "react";

/* REACT ROUTER BOOTSTRAP */
import { LinkContainer } from "react-router-bootstrap";


/* REACT BOOTSTRAP */
import { Table, Button } from "react-bootstrap";

/* COMPONENTS */
import Message from "../Message.jsx";
import Loader from "../../components/Loader.jsx";

/* REACT - REDUX */
import { useDispatch, useSelector } from "react-redux";

/* ACTION CREATORS */
import { listMyOrders } from "../../actions/orderAction.jsx";
import { useNavigate } from "react-router-dom";
import {useStateContext} from "../../contexts/ContextProvider.jsx";
import axiosClient from "../../axios-client.js";

function UserOrderList( ) {
    const dispatch = useDispatch();
    const history = useNavigate();

    /* PULLING OUT STATE */
    const orderList = useSelector((state) => state.MyOrderList);
    const { orders, loading, error } = orderList;

    const {user, token} = useStateContext();
    const {setNotification} = useStateContext()


    // if (!token) {
    //   return <Navigate to="/home"/>
    // }


    useEffect(() => {
      // WE DON'T WANT NON Auth user TO ACCESS THIS PAGE SO REDIRECT IF SOMEBODY TRIES TO

      if (user && token) {
        dispatch(listMyOrders());
      } else {
        history("/login");
      }
    }, [token]);



    const onDeleteClick = order => {
        if (!window.confirm("Are you sure you want to delete this order?")) {
          return
        }
        axiosClient.get(`/orders/remove/${order.id}`)
          .then(() => {
            setNotification('Order was successfully deleted')
            dispatch(listMyOrders());
        })
      }

    /* HANDLER */

    return (
      <div>
        <h1>Orders</h1>

        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant="alert alert-danger">{error}</Message>
        ) : (
          <Table striped bordered hover responsive className="table-sm">
            <thead>
              <tr>
                <th>ID</th>
                <th>USER</th>
                <th>DATE</th>
                <th>TOTAL</th>
                <th>PAID</th>
                <th>DELIVERED</th>
                <th></th>
              </tr>
            </thead>

            <tbody>
              {orders.map((order) => (
                <tr key={order.id}>
                  <td>{order.id}</td>
                  <td>{order.firstName}  {order.lastName}</td>
                  <td>{order.created_at && order.created_at.substring(0, 10)}</td>
                  <td>{order.total}</td>

                  <td>
                    {order.isPaid ? (
                      order.paidAt.substring(0, 10)
                    ) : (
                      <i className="fa fa-times" style={{ color: "red" }}></i>
                    )}
                  </td>

                  <td>
                    {order.isDeliver ? (
                      order.deliveredAt.substring(0, 10)
                    ) : (
                      <i className="fa fa-times" style={{ color: "red" }}></i>
                    )}
                  </td>

                  <td>


                    <LinkContainer to={`/getOrders/${order.id}/`}>
                      <Button variant="alert alert-dark" className="btn-sm">
                        Details
                      </Button>

                    </LinkContainer>

                      {order.user_id=== user.id && !order.isPaid && !order.isDeliver && (

                      // eslint-disable-next-line no-unused-vars
                      <Button variant="alert alert-dark" onClick={ev => onDeleteClick(order)} className="btn-sm " style={{marginLeft:'20px'}}>
                        Delete Order
                      </Button>
                      )}
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </div>
    );
  }


export default UserOrderList;
