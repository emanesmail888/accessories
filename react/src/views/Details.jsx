import  '../styles/css/detail.css';
import  '../styles/css/global.css';
import  '../styles/css/bootstrap.min.css';

import  '../styles/js/jquery';
import  '../styles/js/bootstrap.min.js';
import {useEffect, useState} from "react";
// import axios from 'axios';
import axiosClient from "../axios-client.js";
import {useParams} from "react-router-dom";
import {useStateContext} from "../contexts/ContextProvider.jsx";
import {Link} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {  addToWishlist,removeFromWishlist,fetchWishlist } from "../actions/wishlistAction.jsx";





function Details() {
    const [product, setProduct] = useState([]);
    const [images, setImages] = useState([]);
    const [errors, setErrors] = useState(null)
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(false);
    const { user,token, setUser,setNotification,notification} = useStateContext();
    const [rating, setRating] = useState(0);
    const [review, setReview] = useState('');
    const [reviews, setReviews] = useState('');
    const [avg_reviews, setAvgReviews] = useState('');
    const [reviewsCount, setReviewsCount] = useState(0);
    const [best_products, setBestProducts] = useState([]);
    const [related_products, setRelatedProducts] = useState([]);
    const [qty, setQty] = useState(1);



    const dispatch = useDispatch();

    let {id} = useParams();
    const wishlist = useSelector((state) => state.wishlist);
    const { wishlistItems } = wishlist;
    const AddToWishlistHandler = (id) => {
        dispatch(addToWishlist(id));

      };
      const removeFromWishlistHandler = (id) => {
        dispatch(removeFromWishlist(id));
        dispatch(fetchWishlist());

      };
      const removeReview = async(id) => {
        await axiosClient.get(`/v1/review/delete/${id}`)
        .then(() => {
            setNotification('Review was successfully Removed');
            window.location.reload();

        })
        .catch((err) => {
          const response = err.response;
                if (response && response.status === 422) {
                    setErrors(response.data.errors)
                }
            });
      };


    const fetchUser = () => {
    axiosClient.get('/v1/user')
    .then(({data}) => {
       setUser(data)

          })
        }

    useEffect(() => {
        fetchCategories();
        if (token) {
            dispatch(fetchWishlist());
            fetchUser();

        }
      }, []);
      if (id) {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        useEffect(() => {

        fetchCategories();
        setLoading(true)
        axiosClient.get(`/v1/pro/${id}`)
            .then(({data}) => {
            // console.log(data.product)
            // console.log(data.reviews)
            // console.log(data.reviewsAvg)
            console.log(data.best_products)
            setLoading(false)

            setProduct(data.product)
            const parsedData = JSON.parse(data.product.product_images); // Parsing the JSON string
            setImages(parsedData)
            setReviews(data.reviews)
            setAvgReviews(data.reviewsAvg)
            setReviewsCount(data.reviewsCount)
            setBestProducts(data.best_products)
            setRelatedProducts(data.related_products)

            })
            .catch(() => {
            setLoading(false)
            })
            if (token) {
                fetchUser();

                dispatch(fetchWishlist());
            }
        }, [])
    }

    const fetchCategories = () => {
        let url = '/v1/home';
        axiosClient.get(url)
        .then(({ data }) => {
            console.log(data.categories);

            setCategories(data.categories)
        })

    }

  const handleStarHover = (hoveredRating) => {
    setRating(hoveredRating);
    console.log (rating)
  };
  const handleStarOut = (Rating) => {
    setRating(Rating);

    console.log ("out")
    console.log (rating)

  };

//   const handleStarClick = (selectedRating) => {
//     setRating(selectedRating);

//     console.log (rating)
//   };
const handleFormSubmit = async (e) => {
    if(token){

    e.preventDefault();
       const user_id=user.id ;
       const product_id=id ;

    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    const body = JSON.stringify({ product_id, rating,review,user_id });

    try {
        const res = await axiosClient.post(`/v1/add_review`, body, config).then(() => {
            setNotification('Review was successfully Added');
            window.location.reload();

        })
        .catch((err) => {
            const response = err.response;
                    if (response && response.status === 422) {
                        setErrors(response.data.errors)
                    }
                });

                console.log('Review Added:', res.data);

              } catch (error) {
                console.error('Review creation error:', error);
                setNotification('Review creation error:', error)

              }
            }

            else{
                setNotification('Review creation error:You need to login')
            }

}


  const fullStars = Math.floor(avg_reviews);
//   const halfStar = (avg_reviews - fullStars) >= 0.5;
//   const emptyStars = 5 - fullStars - halfStar;
  const halfStar = (avg_reviews - fullStars) >= 0.5;
const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

const incrementQty = () => {
    setQty(qty + 1);
  };

  const decrementQty = () => {
    setQty(qty - 1);
  };














    return (
        <div>

            <section id="center" className="clearfix center_prod">
                <div className="container">
                    <div className="row">
                        <div className="center_prod_1 clearfix">
                            <div className="col-sm-12">
                                <h6 className="mgt col_1 normal">
                                    <a href="#">Home</a>{" "}
                                    <i
                                       
                                        className="fa fa-chevron-right"
                                    ></i>{" "}
                                    Product Detail
                                </h6>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section id="product">
                <div className="container">
                    <div className="row">
                        <div className="product_1 clearfix">
                            <div className="col-sm-3">
                                <div className="product_1l clearfix">
                                    <div className="center_shop_1li clearfix">
                                        <h5 className="mgt">CATEGORY</h5>
                                        {categories.map(c => (

                                            <div key={c.id}>
                                            <a href={`/category_products/${c.id}` }><h3 >

                                                {c.name}

                                            </h3>
                                            </a>
                                            </div>

                                        ))}




                                        </div>
                                    <div className="product_1i clearfix">
                                        <h5 className="mgt">SEARCH</h5>
                                        <div className="input-group">
                                            <input
                                                type="text"
                                                className="form-control form_2"
                                                placeholder="Search Here..."
                                            />
                                            <span className="input-group-btn">
                                                <button
                                                    className="btn btn-primary"
                                                    type="button"
                                                >
                                                    <i className="fa fa-search"></i>
                                                </button>
                                            </span>
                                        </div>
                                    </div>
                                    <div className="blog_1li1 clearfix">
                                        <h5 className="mgt heading">
                                            BEST PRODUCTS
                                        </h5>
                                        {best_products.map((b_product) => (
                                        <div className="blog_1li1i clearfix" key={b_product.id}>
                                        <div className="col-sm-4 space_left">
                                                <img
                                                    src={`${import.meta.env.VITE_API_BASE_URL}/products/images/`+b_product.product_img}
                                                    className="iw"
                                                    alt="abc"
                                                />
                                            </div>
                                            <div className="col-sm-8 space_all">
                                                <h5 className="mgt">
                                                    <a href={`/pro/${b_product.id}`}>
                                                      {b_product.product_title}
                                                    </a>
                                                </h5>
                                                <h4> {b_product.product_psp_price}</h4>
                                                <h6>
                                                    <a
                                                        className="col_1"
                                                        href={`/pro/${b_product.id}`}
                                                    >
                                                        Read More
                                                    </a>
                                                </h6>
                                            </div>
                                        </div> 
                                        ))}

                                       
                                    </div>
                                </div>
                            </div>
                            <div className="col-sm-9">
                                <div className="detail_1l clearfix">
                                    <div className="col-sm-5 space_left">
                                        <div className="detail_1ll clearfix">
                                            <div
                                                className="carousel slide article-slide"
                                                id="article-photo-carousel"
                                            >
                                                <div className="carousel-inner cont-slider">
                                                    <div className="item active">
                                                        <div className="mag">
                                                            <div className="magnify">
                                                                <div className="magnify">
                                                                <img src={`${import.meta.env.VITE_API_BASE_URL}/products/images/`+product.product_img} alt="" data-toggle="magnify" />

                                                                    <div
                                                                        className="magnify-large"
                                                                        style={{backgroundImage:`url(${import.meta.env.VITE_API_BASE_URL}/images/${product.product_img}} )`,backgroundRepeat:'no-repeat' }}
                                                                    ></div>
                                                                </div>
                                                                <div className="magnify-large"></div>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    {images.map((imageName, index) => (

                                                        <div className="item"  key={index} >
                                                        <div className="mag">
                                                            <div className="magnify">

                                                                <div className="magnify" >
                                                                    <img
                                                                 src={`${import.meta.env.VITE_API_BASE_URL}/images/`+imageName} alt="" data-toggle="magnify" />

                                                                    <div
                                                                        className="magnify-large"
                                                                        style={{backgroundImage:`url(${import.meta.env.VITE_API_BASE_URL}/images/${imageName}} )`,backgroundRepeat:'no-repeat' }}
                                                                        // style='background: url("img/54.jpg") no-repeat;'
                                                                    ></div>
                                                                </div>

                                                                <div className="magnify-large"></div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    ))
                                                        }



                                                </div>
                                                <ol className="carousel-indicators">
                                                    <li
                                                        className="active"
                                                        data-slide-to="0"
                                                        data-target="#article-photo-carousel"
                                                    >
                                              <img src={`${import.meta.env.VITE_API_BASE_URL}/products/images/`+product.product_img} alt=""  />

                                                    </li>
                                                    {images.map((imageName, index) => (

                                                    <li key={index}
                                                        className=""
                                                        data-slide-to={index+1}
                                                          data-target="#article-photo-carousel"
                                                    >
                                                     <img src={`${import.meta.env.VITE_API_BASE_URL}/images/`+imageName} alt="" data-toggle="magnify" />

                                                    </li>
                                                    ))}

                                                </ol>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-sm-7 space_left">
                                        <div className="detail_1lr clearfix">
                                            <div className="detail_1lri clearfix">
                                                <h4 className="mgt">
                                               {product.product_title}
                                              </h4>
                                                <h6>
                                                    <span className="span_1">
                                                    {[...Array(fullStars)].map((_, index) => (
                                                        <i key={index} className="fa fa-star" ></i>
                                                        ))}
                                                        {halfStar && (
                                                        <i className="fa fa-star-half-o" ></i>
                                                        )}
                                                        {[...Array(emptyStars)].map((_, index) => (
                                                        <i key={index} className="fa fa-star-o" ></i>
                                                        ))}

                                                    </span>
                                                    <span className="span_2 col_2">
                                                       {reviewsCount} Review(s)
                                                    </span>
                                                </h6>
                                                <ul>
                                                    <li>
                                                       {product.product_desc}
                                                    </li>

                                                </ul>
                                                <h3>
                                                    <span className="span_1 col_1">
                                                    {product.product_psp_price}EGP
                                                    </span>{" "}
                                                    <span className="span_2">
                                                    {product.price}EGP
                                                    </span>{" "}
                                                    <span className="span_3 pull-right">
                                                        In stock SKU: {product.stock}
                                                    </span>
                                                </h3>
                                            </div>

                                            <div className="detail_1lri1 clearfix">
                                                {/* <h5>Select Size:</h5>
                                                <select
                                                    className="form-control"
                                                    id="subject"
                                                    name="subject"
                                                >
                                                    <option>
                                                        No additional charge
                                                    </option>
                                                    <option>
                                                        S No additional charge
                                                    </option>
                                                    <option>M +$1.10</option>
                                                    <option>L +$2.20</option>
                                                </select> */}
                                            </div>
                                            <div className="detail_1lri2 clearfix">
                                                {/* <h5>Select Color:</h5>
                                                <ul>
                                                    <li className="bg_1"></li>
                                                    <li className="bg_2"></li>
                                                    <li className="bg_3"></li>
                                                </ul> */}
                                            </div>
                                            <div className="detail_1lri3 clearfix">
                                                <div className="col-sm-6 space_left">
                                                    <div className="detail_1lri3l clearfix">
                                                        <h5 className="mgt">
                                                            Quantity:
                                                        </h5>
                                                        <div className="input-group number-spinner">
                                                            <span className="input-group-btn">
                                                                <button
                                                                    className="btn btn-default"
                                                                    data-dir="dwn"
                                                                    onClick={decrementQty}
                                                                >
                                                                    <span className="glyphicon glyphicon-minus"></span>
                                                                </button>
                                                            </span>
                                                            <input
                                                                type="text"
                                                                className="form-control text-center"
                                                                value={qty}
                                                                width={30}
                                                            />
                                                            <span className="input-group-btn">
                                                                <button
                                                                    className="btn btn-default"
                                                                    data-dir="up"
                                                                    onClick={incrementQty}


                                                                >
                                                                    <span className="glyphicon glyphicon-plus"></span>
                                                                </button>
                                                            </span>{" "}
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-sm-6 space_right">
                                                    <div className="detail_1lri3r clearfix">
                                                        <h5 className="mgt text-right">
                                                            <a
                                                                className="button mgt"
                                                                href={`/cart/${product.id}?qty=${qty}`}
                                                            >
                                                                ADD TO CART
                                                            </a>
                                                        </h5>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="detail_1lri4 clearfix ">
                                                <ul >
                                                    <li>
                                                        <a href="#">
                                                            <i className="fa fa-repeat"></i>{" "}
                                                            Add to Compare
                                                        </a>
                                                    </li>
                                                    {wishlistItems.filter((w) => product.id === w.product_id).length !== 0 ?



                                                    <li>
                                                        <Link onClick={() => removeFromWishlistHandler(product.id)} >
                                                            <i className="fa fa-heart-o" style={{backgroundColor:'#d93d3d',color:'#fff'}}></i>{" "}
                                                            Remove from Wishlist

                                                            </Link>
                                                    </li>:
                                                    <li>
                                                        <Link onClick={() => AddToWishlistHandler(product.id)} >
                                                            <i className="fa fa-heart-o"></i>{" "}
                                                            Add to Wishlist

                                                            </Link>
                                                    </li>
                                                    }

                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>




                                <div className="product_detail_1 clearfix">
                                    <ul className="nav nav-tabs tab_1">
                                        <li className="active">
                                            <a data-toggle="tab" href="#home">
                                                <i className="fa fa-globe"></i>{" "}
                                                Description
                                            </a>
                                        </li>
                                        <li className="">
                                            <a data-toggle="tab" href="#menu1">
                                                <i className="fa fa-photo"></i>{" "}
                                                Additional Information
                                            </a>
                                        </li>
                                        <li className="">
                                            <a data-toggle="tab" href="#menu2">
                                                <i className="fa fa-cog"></i>{" "}
                                                Product Review
                                            </a>
                                        </li>
                                    </ul>
                                    <div className="tab-content clearfix">
                                        <div
                                            id="home"
                                            className="tab-pane fade clearfix active in"
                                        >
                                            <div className="click clearfix">
                                                <div className="col-sm-12">
                                                    <div className="home_i">
                                                        <p className="mgt">
                                                          {product.product_desc}.
                                                        </p>

                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div
                                            id="menu1"
                                            className="tab-pane fade clearfix"
                                        >
                                            <div className="click clearfix">
                                                <div className="col-sm-12">
                                                    <div className="menu_i clearfix">
                                                        <table>
                                                            <tbody>
                                                                <tr>
                                                                    <td>
                                                                        Pricing
                                                                    </td>
                                                                    <td>
                                                                    <h3>
                                                                    <span className="span_1 col_1">
                                                                    {product.product_psp_price}EGP
                                                                    </span>{" "}
                                                                    <span className="span_2">
                                                                    {product.price}EGP
                                                                    </span>{" "}
                                                                    </h3>
                                                                    </td>
                                                                </tr>
                                                                <tr>
                                                                    <td>
                                                                        Stock
                                                                        Availability
                                                                    </td>
                                                                    <td>
                                                                      {product.stock>0 ?"AVAILABLE" :"NOT AVAILABLE"}
                                                                    </td>
                                                                </tr>
                                                                <tr>
                                                                    <td>
                                                                        Rating
                                                                    </td>
                                                                    <td>
                                                                <span className="span_1">
                                                                {[...Array(fullStars)].map((_, index) => (
                                                                    <i key={index} className="fa fa-star" ></i>
                                                                    ))}
                                                                    {halfStar && (
                                                                    <i className="fa fa-star-half-o" ></i>
                                                                    )}
                                                                    {[...Array(emptyStars)].map((_, index) => (
                                                                    <i key={index} className="fa fa-star-o" ></i>
                                                                    ))}

                                                                </span>
                                                                    </td>
                                                                </tr>
                                                            </tbody>
                                                        </table>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div
                                            id="menu2"
                                            className="tab-pane fade clearfix"
                                        >
                                            <div className="click clearfix">
                                                <div className="col-sm-12">
                                                    <div className="menu1i clearfix">


                                                        {reviews.length !==0 &&reviews.map((rev) => (
                                                        <div className="menu1ii clearfix" key={rev.id}>
                                                            <div className="col-sm-9">


                                                        {rev.image !== null?
                                                         <img src={`${import.meta.env.VITE_API_BASE_URL}/profiles/images/`+rev.image} alt="" className="thumbnail"  />
                                                         :<img src={`${import.meta.env.VITE_API_BASE_URL}/profiles/images/dummy.jpg`} alt="" className="thumbnail"  />
                                                         }
                                            


                                                                <h5 className="mgt">

                                                                    <span className="bold col_1">
                                                                       {rev.name}
                                                                    </span>{" "}

                                                                    {/* ))} */}
                                                                    <span className="date">
                                                                        <i className="fa fa-clock-o"></i>{" "}
                                                                       {rev.created_at}
                                                                    </span>
                                                                </h5>
                                                                <p>
                                                                   {rev.review}

                                                                </p>
                                                                
                                                            </div>


                                                            <div className="col-sm-3 text-right">
                                                            {[1, 2, 3, 4, 5].map((star) => (


                                                                <span className="col_1" key={star}>
                                                                {star <= rev.rating ? <i className='fa fa-star' ></i> : <i className='fa fa-star-o '  ></i>}


                                                                </span>
                                                                ))}
                                                            </div>


                                                            {rev.user_id === user.id &&
                                                               <h5 className="mgt text-right"  style={{margin:'15px 15px'}}>
                                                               <Link onClick={() => removeReview(rev.id)} >
                                                              
                                                              <i className="fa fa-trash-o fa-2x"></i>
                                                              </Link>
                                                              </h5>
                                                                
                                                                }
                                                                {notification &&
                                                                <div className="notification">
                                                                    {notification}
                                                                </div>
                                                                }
                                                                {errors &&
                                                            <div className="alert">
                                                            {Object.keys(errors).map(key => (
                                                                <p key={key}>{errors[key][0]}</p>
                                                            ))}
                                                            </div>
                                                        }
                                                            
                                                        </div>
                                                        ))}

                                                        <div className="menu1i1 clearfix">
                                                            <div className="col-sm-6 space_left">
                                                            {notification &&
                                                                <div className="notification">
                                                                    {notification}
                                                                </div>
                                                                }
                                                                {errors &&
                                                            <div className="alert">
                                                            {Object.keys(errors).map(key => (
                                                                <p key={key}>{errors[key][0]}</p>
                                                            ))}
                                                            </div>
                                                        }
                                                                <h4>
                                                                    ADD A REVIEW
                                                                </h4>
                                                    
                                                                <form onSubmit={handleFormSubmit}>

                                                                <ul className="ratings">
                                                                    {[1, 2, 3, 4, 5].map((star) => (
                                                                    <li
                                                                        key={star}

                                                                        className={`star ${star <= rating ? 'selected' : ''}`}
                                                                        onMouseOver={() => handleStarHover(star)}
                                                                        onMouseOut={() => handleStarOut(rating)}
                                                                        // onClick={() => handleStarClick(star)}
                                                                    ><i className='fa fa-star '></i></li>
                                                                    ))}
                                                                    {rating}
                                                                </ul>
                                                                <h5>
                                                                    Your Review
                                                                </h5>
                                                                <textarea className="form-control form_1"
                                                                 value={review} onChange={(e) => setReview(e.target.value)}></textarea>
                                                                <h5 className="bg">
                                                                <button type="submit"  className=" btn btn-md  button " style={{marginLeft:'20px'}}>Submit</button>


                                                                </h5>
                                                            </form>
                                                            </div>
                                                            <div className="col-sm-6">
                                                                <div className="grid clearfix">
                                                                    <figure className="effect-jazz">
                                                                        <a href="#">
                                                                            <img
                                                                                src="/public/images/pinkimage.jpg"
                                                                                height="280"
                                                                                className="iw"
                                                                                alt="img25"
                                                                            />
                                                                        </a>
                                                                    </figure>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section id="list">
                <div className="container">
                    <div className="row">
                        <div className="price_1 clearfix">
                            <div className="col-sm-12">
                                <h3 className="mgt">
                                    {" "}
                                    Related{" "}
                                    <span className="col_1">Products </span>
                                </h3>
                            </div>
                        </div>
                        <div className="list_2 clearfix">
                            <div className="item">
                            {related_products.map(r_product => (
                                <div className="col-sm-3" key={r_product}>
                                    <div className="list_2i clearfix mgt-center">

                               <img src={`${import.meta.env.VITE_API_BASE_URL}/products/images/`+r_product.product_img}   className="iw " style={{width:'100%'}} alt="abc" />

                                        <h4>
                                            EGp {r_product.product_psp_price}
                                        </h4>
                                        <h6>
                                            <a className="col_1" href={`/pro/${r_product.id}`}>
                                                {r_product.product_title}
                                            </a>
                                        </h6>
                                    </div>
                                </div>
                            ))}

                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default Details;
