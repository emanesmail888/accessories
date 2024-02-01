
import '../styles/css/font-awesome.min.css';
import  '../styles/css/responsive.css';
 import  '../styles/css/bootstrap.min.css';

import '../styles/css/global.css';

import  '../styles/css/jquery-ui.css';
import  '../styles/js/jquery';
import  '../styles/js/bootstrap.min.js';
import {useStateContext} from "../contexts/ContextProvider";
import axiosClient from "../axios-client";
import {useEffect,useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Message from './Message';
// import useNavigation from './useNavigation';



import { removeFromCart } from "../actions/cartAction";


import { fetchWishlist } from "../actions/wishlistAction.jsx";
import { useNavigate } from 'react-router-dom';
import SearchResult from './SearchResult.jsx';

// import { useHistory } from 'react-router-dom';




const Nav = () => {
    const {user, token, setUser, setToken} = useStateContext();
    const [categories, setCategories] = useState([]);
    const wishlist = useSelector((state) => state.wishlist);
    const { wishlistItems } = wishlist;
    const itemCount = wishlistItems.length;
    const [search, setSearch] = useState('')
    const [results, setResults] = useState([]);

    const navigate = useNavigate();

// const history = useHistory();





    const dispatch = useDispatch();



     /* PULLING A PART OF STATE FROM THE ACTUAL STATE IN THE REDUX STORE */
    const cart = useSelector((state) => state.cart);
    const { cartItems } = cart;
    const removeFromCartHandler = (id) => {
        dispatch(removeFromCart(id));
      };


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


    const onLogout = ev => {
      ev.preventDefault()

      axiosClient.post('/logout')
        .then(() => {
          setUser({})
          setToken(null)
        })
    }
    const fetchCategories = () => {
        let url = '/home';


        axiosClient.get(url)
        .then(({ data }) => {
            console.log(data.categories);

            setCategories(data.categories)
        })

    }
    useEffect(() => {

    if (token) {

      axiosClient.get('/user')
        .then(({data}) => {
           setUser(data)
        })
        dispatch(fetchWishlist());

    }
    fetchCategories();

    }, [])




const handleSubmit = (event) => {
    event.preventDefault();
    navigate(`/search/${search}`);


  };

//   const handleChange = (event) => {
//     setSearch(event.target.value);
//   };
    return (


        <div>

            <section id="header">
                <div className="container">
                    <div className="row">
                        <div className="header_1 clearfix">
                            <div className="col-sm-2">
                                <div className="header_1l text-center clearfix">
                                    <h2 className="mgt"><a className="col_1" href="index.html">RD <span className="span_1">JEWELLERS</span>  <span className="span_2">JEWELRY WORLD</span></a></h2>
                                </div>
                            </div>
                            <div className="col-sm-10">
                                <div className="header_1r clearfix">
                                    <div className="header_1ri border_none clearfix">
                                    <form onSubmit={handleSubmit}>
                                             <input value={search} onChange={(e) => setSearch(e.target.value)} name="search"  placeholder="Search..." style={{width:'250px'}}/>
                                             <button  className=" btn btn-danger " style={{marginLeft:'5px',padding:'11px 11px'}}> <i className="fa fa-search"></i></button>
                                                {/* <input type="text" value={search} onChange={handleChange} /> */}
                                             </form>

                                    </div>

                                    {!token?
                                        <div className="header_1ri clearfix">
                                        <span className="span_1"><a className="col_1" href="/login"><i className="fa fa-user"></i></a></span>
                                        <h5 ><a href="/login"> Login /</a>
                                           <a href="/signup"> Sign Up</a></h5>
                                       </div>

                                           :

                                        <div className="header_1ri clearfix">
                                        <span className="span_1"><a className="col_1" href="#"><i className="fa fa-user"></i></a></span>
                                        <h5 ><a href="#">({user.utype}){user.name}</a>
                                        <a onClick={onLogout} className=" btn" href="#">Logout</a>                                           </h5>
                                       </div>

                                    }


                                    <div className="header_1ri border_none clearfix">
                                        <span className="span_1"><a className="col_1" href="#"><i className="fa fa-heart-o"></i></a></span>
                                        <h5><a href="/wishlist">My  Wishlist  {token?(itemCount):(0) } items
                                        </a></h5>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section id="menu" className="clearfix cd-secondary-nav">
                <nav className="navbar nav_t">
                    <div className="container">
                        <div className="navbar-header page-scroll">
                            <button type="button" className="navbar-toggle" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1">
                                <span className="sr-only">Toggle navigation</span>
                                <span className="icon-bar"></span>
                                <span className="icon-bar"></span>
                                <span className="icon-bar"></span>
                            </button>
                            <a className="col_1 navbar-brand" href="index.html">RD <span className="span_1">JEWELLERS</span>  <span className="span_2">JEWELRY WORLD</span></a>
                        </div>

                        <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                            <ul className="nav navbar-nav">

                                <li><a className="m_tag active_tab" href="/home">Home</a></li>
                                <li><a className="m_tag " href="/shop">Shop</a></li>


                                <li className="dropdown">
                                    <a className="m_tag" href="#" data-toggle="dropdown" role="button" aria-expanded="false">Categories<span className="caret"></span></a>

                                    <ul  className="dropdown-menu drop_3" role="menu">
                                    {categories.map(c => (

                                        <li key={c.id} ><a href={'/category_products/' + c.id}>{c.name}</a></li>
                                    ))};
                                    </ul>

                                </li>



                                <li><a className="m_tag" href="/about_us">About Us</a></li>
                                <li><a className="m_tag" href="/contact_us">Contact</a></li>
                                <li className="dropdown">
                                    <a className="m_tag" href="#" data-toggle="dropdown" role="button" aria-expanded="false">Pages<span className="caret"></span></a>
                                    <ul className="dropdown-menu drop_3" role="menu">
                                        <li><a href="/profile">My Account</a></li>
                                        <li><a href="/cart">Shopping Cart</a></li>
                                        <li><a className="border_none" href="/shipping">Checkout</a></li>
                                    </ul>
                                </li>
                                {/* <li className="dropdown dropdown-large">
                                    <a href="#" className="dropdown-toggle m_tag" data-toggle="dropdown">Dropdown<b className="caret"></b></a>

                                    <ul className="dropdown-menu dropdown-menu-large row">
                                        <li className="col-sm-2">
                                            <ul>
                                                <li className="dropdown-header">BRACELETS</li>
                                                <li><a href="#">Available</a></li>
                                                <li><a href="#">Examples</a></li>
                                                <li><a href="#">Jewelry</a></li>
                                                <li><a href="#">Aligninment</a></li>
                                                <li><a href="#">Headers</a></li>
                                            </ul>
                                            <ul>
                                                <li className="dropdown-header">BY METAL</li>
                                                <li><a href="#">Available</a></li>
                                                <li><a href="#">Examples</a></li>
                                                <li><a href="#">Jewelry</a></li>
                                            </ul>
                                        </li>
                                        <li className="col-sm-2">
                                            <ul>
                                                <li className="dropdown-header">EARRINGS</li>
                                                <li><a href="#">Available</a></li>
                                                <li><a href="#">Examples</a></li>
                                                <li><a href="#">Jewelry</a></li>
                                                <li><a href="#">Aligninment</a></li>
                                                <li><a href="#">Headers</a></li>
                                            </ul>
                                            <ul>
                                                <li className="dropdown-header">BY METAL</li>
                                                <li><a href="#"> Glyphs</a></li>
                                                <li><a href="#">Examples</a></li>
                                                <li><a href="#">Jewelry</a></li>
                                            </ul>
                                        </li>
                                        <li className="col-sm-2">
                                            <ul>
                                                <li className="dropdown-header">PENDANTS</li>
                                                <li><a href="#">Available</a></li>
                                                <li><a href="#">Examples</a></li>
                                                <li><a href="#">Jewelry</a></li>
                                                <li><a href="#">Aligninment</a></li>
                                                <li><a href="#">Headers</a></li>
                                            </ul>
                                            <ul>
                                                <li className="dropdown-header">BY METAL</li>
                                                <li><a href="#"> Glyphs</a></li>
                                                <li><a href="#">Examples</a></li>
                                                <li><a href="#">Jewelry</a></li>
                                            </ul>
                                        </li>
                                        <li className="col-sm-2">
                                            <ul>
                                                <li className="dropdown-header">PENDANTS</li>
                                                <li><a href="#">Available</a></li>
                                                <li><a href="#">Examples</a></li>
                                                <li><a href="#">Jewelry</a></li>
                                                <li><a href="#">Aligninment</a></li>
                                                <li><a href="#">Headers</a></li>
                                            </ul>
                                            <ul>
                                                <li className="dropdown-header">BY METAL</li>
                                                <li><a href="#"> Glyphs</a></li>
                                                <li><a href="#">Examples</a></li>
                                                <li><a href="#">Jewelry</a></li>
                                            </ul>
                                        </li>
                                        <li className="col-sm-4">
                                            <ul>
                                            </ul>
                                            <ul>
                                            </ul>
                                        </li>
                                    </ul>

                                </li> */}
                                <li className="dropdown drop_cart">
                                    <a className="m_tag" href="#" data-toggle="dropdown" role="button" aria-expanded="false"><i className="glyphicon glyphicon-shopping-cart"></i></a>
                                    <ul className="dropdown-menu drop_1" role="menu">
                                        <li>
                                            <div className="drop_1i clearfix">
                                                <div className="col-sm-6">
                                                    <div className="drop_1il clearfix"><h5 className="mgt">{cartItems.reduce((acc, item) => acc + item.qty, 0)} ITEMS</h5></div>
                                                </div>

                                                <div className="col-sm-6">
                                                    <div className="drop_1il text-right clearfix"><h5 className="mgt"><a href="/cart">VIEW CART</a></h5></div>
                                                </div>
                                            </div>


                                            {cartItems.length === 0 ? (
                                                    <Message variant="alert alert-danger">
                                                        Your cart is empty
                                                    </Message>
                                                ) : (
                                                <div>
                                                {cartItems.map((item) => (
                                                <>
                                                <div className="drop_1i1 clearfix">

                                                <div className="col-sm-6">
                                                        <div className="drop_1i1l clearfix"><h6 className="mgt bold "><a href="#">{item.name}</a>
                                                        </h6></div>
                                                </div>
                                                <div className="col-sm-4">
                                                <span className="normal">{item.qty}x{item.price}</span>

                                                </div>

                                                <div className="col-sm-2">
                                                <div className="drop_1i1l text-right clearfix"><button className=' btn text-white' onClick={() => removeFromCartHandler(item.product)}>x</button></div>
                                                </div>
                                                </div>



                                            </>

                                            ))}


                                            </div>



                                            )}

                                            <div className="drop_1i2 clearfix">
                                                <div className="col-sm-5">
                                                    <div className="drop_1il clearfix"><h5 className="mgt">TOTAL</h5></div>
                                                </div>
                                                <div className="col-sm-7">

                                                    <div className="drop_1il text-right clearfix"><h5 className="mgt">Eg/P {cart.totalPrice}</h5></div>
                                                </div>
                                            </div>




                                            <div className="drop_1i3 text-center clearfix">
                                                <div className="col-sm-12">
                                                    <h5><a className="button_1 block" href="/shipping">CHECKOUT</a></h5>
                                                    <h5><a className="button block" href="/cart">VIEW CART</a></h5>
                                                </div>
                                            </div>
                                        </li>
                                    </ul>
                                </li>

                            </ul>



                        </div>

                    </div>


                </nav>

            </section>
        </div>
    )
}

export default Nav
