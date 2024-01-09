import {useEffect, useState} from "react";
import axiosClient from "../axios-client.js";
import './home.css';
import ReactPaginate from 'react-paginate';
import {Link} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import {  addToWishlist,removeFromWishlist,fetchWishlist } from "../actions/wishlistAction.jsx";

// import {
//     FaRegHeart,
//     // FaShoppingBag
//    } from "react-icon";

function Shop() {

  const dispatch = useDispatch();
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [totalPages, setTotalPages] = useState(0);
    const wishlist = useSelector((state) => state.wishlist);
    const { wishlistItems } = wishlist;
    // const wishes = useSelector((state) => state.wishlist);
    // const { Items} = wishes;
    // console.log(wishlist)


    const ITEMS_PER_PAGE = 12;

    const [page, setPage] = useState(0);

     useEffect(() => {
        fetchProducts();
        fetchCategories();
        dispatch(fetchWishlist());

      }, []);
        // Calculate the start and end indices based on the current page
        const startIndex = page * ITEMS_PER_PAGE;
        const endIndex = startIndex + ITEMS_PER_PAGE;
        const visibleData = products.slice(startIndex, endIndex);


        const AddToWishlistHandler = (id) => {
            dispatch(addToWishlist(id));

          };
          const removeFromWishlistHandler = (id) => {
            dispatch(removeFromWishlist(id));
            dispatch(fetchWishlist());

          };


      const fetchProducts = () => {
        let url = '/shop';


        axiosClient.get(url)
        .then(({ data }) => {
            console.log(data);
            setProducts(data[0])
            setTotalPages(Math.ceil(data[0].length/ITEMS_PER_PAGE));

        })

    }




    const handlePage = ({ selected }) => {
        setPage(selected);
      };
      const fetchCategories = () => {
        let url = '/home';


        axiosClient.get(url)
        .then(({ data }) => {
            console.log(data[1]);

            setCategories(data[1])
        })

    }

    const filterItem = (catItem) => {
        let url = '/shop';
        axiosClient.get(url)
        .then(({ data }) => {
            console.log(data);
            const res= data[0].filter((item) => catItem === item.cat_id)
            setProducts(res)
            setTotalPages(Math.ceil(res.length/ITEMS_PER_PAGE));

        })
    }






        return (
          <div>

<section className="price_filter">
		<div className="container pt-5">
			<div className="row">
				<div className="col-sm-3">
					<div className="left-sidebar">
						<h2>Category</h2>
						<div className="panel-group category-products" id="accordian">
							<div className="panel panel-default">


                            {categories.map(c => (

                                <div key={c.id}>
                                <div className="panel-heading">
                                    <h4 className="panel-title">
                                        {/* <a data-toggle="collapse" data-parent="#accordian" >
                                            <span className="badge pull-right"><i className="fa fa-plus"></i></span>
                                            <a href={'/category_products/' + c.id}>{c.name}</a>
                                        </a> */}
                                        {/* <a href={'/category_products/' + c.id}>{c.name}</a> */}
                                        <button onClick={() => filterItem(c.id)}>{c.name}</button>

                                    </h4>
                                </div>

                                {/* <div id={`${c.id}`} className="panel-collapse collapse">
                                <div className="panel-body">

									</div>

                                </div> */}
                                </div>
                            ))}


							</div>


						</div>






					</div>
				</div>


				<div className="col-sm-9 padding-right">

                <h2 className="title text-center">Features Items</h2>

					<div className="features_items ">


                    {visibleData.map(product => (
                    <div key={product.id}>
                        <div className="col-sm-3">
                                    <div className="product-image-wrapper">
                                        <div className="single-products">
                                                <div className="productinfo text-center">
                                                    <img src={'../../products_images/' + product.product_img} alt="" />
                                                    <h2>{product.price}</h2>
                                                    <p>{product.product_title}</p>

                                                    {/* <button style={{color: 'red'}} onClick={() => AddToWishlistHandler(product.id)}>wishlist</button> */}
                                     {wishlistItems.filter((w) => product.id === w.product_id).length !== 0 ?

                     <Link style={{color: 'red'}} onClick={() => removeFromWishlistHandler(product.id)}><i className="fa fa-heart fa-2x"></i></Link>
                     :<Link style={{boxShadow:' #CC9999'}} onClick={() => AddToWishlistHandler(product.id)}><i className="fa fa-heart  fa-2x"></i></Link>
                     }

                                                    <a href="#" className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart"></i>Add to cart</a>
                                                </div>
                                                <div className="product-overlay">
                                                    <div className="overlay-content">
                                                        <h2>{product.price}</h2>
                                                        <p>{product.product_title}</p>
                                                        <a href={`/cart/${product.id}?qty=1`} className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart"></i>Add to cart</a>
                                                    </div>
                                                </div>
                                        </div>

                                    </div>
                        </div>

                    </div>
                    ))}



                    </div>
                    <ReactPaginate

                        previousLabel="Previous"
                        nextLabel="Next"
                        breakLabel="..."
                        pageCount={totalPages}
                        marginPagesDisplayed={1}
                        pageRangeDisplayed={3}
                        onPageChange={handlePage}
                        containerClassName="pagination"
                        previousLinkClassName={"pagination__link"}
                        nextLinkClassName={"pagination__link"}
                        disabledClassName={"pagination__link--disabled"}
                        activeClassName={"pagination__link--active"}
                        // activeClassName="active"
                        />





				</div>
			</div>
		</div>
	</section>



          </div>
        );
      }




export default Shop
