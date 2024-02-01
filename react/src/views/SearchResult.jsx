import { useEffect, useState } from "react";
import axiosClient from "../axios-client.js";
import { useParams } from "react-router-dom";
import "./home.css";
import ReactPaginate from "react-paginate";
// import 'react-paginate/dist/react-paginate.css';
import { useDispatch, useSelector } from "react-redux";

import { Link } from "react-router-dom";

import {
    addToWishlist,
    removeFromWishlist,
    fetchWishlist,
} from "../actions/wishlistAction.jsx";
import {useStateContext} from "../contexts/ContextProvider";

function SearchResult() {
    const [results, setResults] = useState([]);
    const {query} = useParams();
    const dispatch = useDispatch();

    const [errors, setErrors] = useState(null)
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(false);
    const { token} = useStateContext();




    const [totalPages, setTotalPages] = useState(0);

    const ITEMS_PER_PAGE = 12;

    const [page, setPage] = useState(0);
    const wishlist = useSelector((state) => state.wishlist);
    const { wishlistItems } = wishlist;

        // eslint-disable-next-line react-hooks/rules-of-hooks

            // Calculate the start and end indices based on the current page
    const startIndex = page * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    const visibleData = results.slice(startIndex, endIndex);
        useEffect(() => {
            fetchData();
            fetchCategories();
            fetchProducts();

           if (token) {
            dispatch(fetchWishlist());
        }
        // setLoading(true)
        // axiosClient.get(`/search/${query}`).then(({ data }) => {
        //     setLoading(false)
        //     console.log(data);
        //     setResults(data);
        //     setTotalPages(Math.ceil(data.length / ITEMS_PER_PAGE));


        //                 })
        //     .catch(err => {
        //         const response = err.response;
        //         if (response && response.status === 422) {
        //             setErrors(response.data.errors)
        //         }
        //         })
        }, [query])

        const fetchData = async (catItem) => {
            try {
                setLoading(true);
    
                const res = await axiosClient.get(`/category_products/${catItem}`);
                console.log(res.data[1]);
                setResults(res.data[1]);
                setLoading(false);
    
                setTotalPages(Math.ceil(res.data[1].length / ITEMS_PER_PAGE));
    
            } catch (error) {
                setLoading(false);
                const response = error.response;
                        if (response && response.status === 422) {
                            setErrors(response.data.errors)
                        }            }
        };
        const fetchProducts = async () => {
            try {
                setLoading(true);
                const result = await axiosClient.get(`/search/${query}`);
    
                console.log(result.data);
                setLoading(false);
                setResults(result.data);
                setTotalPages(Math.ceil(result.data.length / ITEMS_PER_PAGE));
            } catch (error) {
                setLoading(false);
                // console.error('Error fetching data:', error);
            }
        };
        const handlePage = ({ selected }) => {
            setPage(selected);
        };

        const fetchCategories = async () => {
            let url = "/home";
            await axiosClient.get(url).then(({ data }) => {
                console.log(data[1]);
    
                setCategories(data[1]);
            });
        };
    
        const AddToWishlistHandler = (id) => {
            dispatch(addToWishlist(id));
        };
        const removeFromWishlistHandler = (id) => {
            dispatch(removeFromWishlist(id));
            dispatch(fetchWishlist());
        };
    
    
   

  return (
    <div>

<section className="price_filter">
                <div className="container pt-5">
                    <div className="row">
                        <div className="col-sm-3">
                            <div className="left-sidebar">
                                <h2>Category</h2>
                                <div
                                    className="panel-group category-products"
                                    id="accordian"
                                >
                                    <div className="panel panel-default">
                                        {categories.map((c) => (
                                            <div key={c.id}>
                                                <div className="panel-heading">
                                                    <h4 className="panel-title">

                                                        <button
                                                            onClick={() =>
                                                                fetchData(c.id)
                                                            }
                                                        >
                                                            {c.name}
                                                        </button>
                                                    </h4>
                                                </div>


                                            </div>
                                        ))}
                                        ;
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="col-sm-9 padding-right">
                            <h2 className="title text-center">
                                Search Result Items
                            </h2>
                            {loading && (
                                <table>
                                    <tbody>
                                        <tr>
                                            <td
                                                colSpan="5"
                                                className="text-center"
                                            >
                                                Loading...
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            )}
                            {errors &&
                        <div className="alert">
                          {Object.keys(errors).map(key => (
                            <p key={key}>{errors[key][0]}</p>
                          ))}
                        </div>
                      }
                            {!loading && (
                                <div className="features_items ">
                                    {visibleData.map((product) => (
                                        <div key={product.id}>
                                            <div className="col-sm-3">
                                                <div className="product-image-wrapper">
                                                    <div className="single-products">
                                                        <div className="productinfo text-center">
                                                            <img
                                                                src={`${import.meta.env.VITE_API_BASE_URL}/products/images/`+product.product_img}
                                                                alt=""
                                                            />
                                                            <h2>
                                                                {product.price}
                                                            </h2>
                                                            <p>
                                                            <a href={`/pro/${product.id}`}>{product.product_title}</a>
                                                            </p>
                                                            {wishlistItems.filter(
                                                                (w) =>
                                                                    product.id ===
                                                                    w.product_id
                                                            ).length !== 0 ? (
                                                                <Link
                                                                    style={{color: '#d93d3d'}}
                                                                    onClick={() =>
                                                                        removeFromWishlistHandler(
                                                                            product.id
                                                                        )
                                                                    }
                                                                >
                                                                    <i className="fa fa-heart fa-2x"></i>
                                                                </Link>
                                                            ) : (
                                                                <Link
                                                                    style={{color:' rgb(233, 144, 144)'}}
                                                                    onClick={() =>
                                                                        AddToWishlistHandler(
                                                                            product.id
                                                                        )
                                                                    }
                                                                >
                                                                    <i className="fa fa-heart  fa-2x"></i>
                                                                </Link>
                                                            )}
                                                            <a
                                                                href={`/cart/${product.id}?qty=1`}
                                                                className="btn btn-default add-to-cart"
                                                            >
                                                                <i className="fa fa-shopping-cart"></i>
                                                                Add to cart
                                                            </a>
                                                        </div>
                                                        <div className="product-overlay">
                                                            <div className="overlay-content">
                                                                <h2>
                                                                    {
                                                                        product.price
                                                                    }
                                                                </h2>
                                                                <p>
                                                                <a href={`/pro/${product.id}`}>{product.product_title}</a>
                                                                </p>
                                                                <a
                                                                    href={`/cart/${product.id}?qty=1`}
                                                                    className="btn btn-default add-to-cart"
                                                                >
                                                                    <i className="fa fa-shopping-cart"></i>
                                                                    Add to cart
                                                                </a>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                            {/* Render the pagination component */}

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
                            />
                        </div>


                    </div>
                </div>
            </section>
   
    </div>
  );
}

export default SearchResult;
