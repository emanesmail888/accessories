import  { useEffect } from "react";

/* REACT ROUTER BOOTSTRAP */
import { LinkContainer } from "react-router-bootstrap";


/* REACT BOOTSTRAP */
import { Table, Button } from "react-bootstrap";

/* COMPONENTS */
import Message from "../Message";
import Loader from "../../components/Loader";

/* REACT - REDUX */
import { useDispatch, useSelector } from "react-redux";

/* ACTION CREATORS */
import { listOrders } from "../../actions/orderAction";
import { useNavigate } from "react-router-dom";
import {useStateContext} from "../../contexts/ContextProvider";

function AllOrders( ) {
    const dispatch = useDispatch();
    const history = useNavigate();

    /* PULLING OUT STATE */
    const orderList = useSelector((state) => state.orderList);
    const { orders, loading, error } = orderList;

    const {user, token} = useStateContext();

    // if (!token) {
    //   return <Navigate to="/home"/>
    // }


    useEffect(() => {
      // WE DON'T WANT NON Auth user TO ACCESS THIS PAGE SO REDIRECT IF SOMEBODY TRIES TO

      if (user && token) {
        dispatch(listOrders());
      } else {
        history("/login");
      }
    }, [token]);

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
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </div>
    );
  }


export default AllOrders;
