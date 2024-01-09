/* eslint-disable react/prop-types */
// /* eslint-disable react/prop-types */
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

function CategoryProducts() {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(false);

    const [totalPages, setTotalPages] = useState(0);

    const ITEMS_PER_PAGE = 12;

    const [page, setPage] = useState(0);
    const wishlist = useSelector((state) => state.wishlist);
    const { wishlistItems } = wishlist;
    const dispatch = useDispatch();
    const { id } = useParams();
    useEffect(() => {
        fetchProducts();
        fetchCategories();
        fetchData();
        dispatch(fetchWishlist());
    }, [id]);

    // Calculate the start and end indices based on the current page
    const startIndex = page * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    const visibleData = products.slice(startIndex, endIndex);

    const fetchData = async (catItem) => {
        try {
            setLoading(true);

            const res = await axiosClient.get(`/category_products/${catItem}`);

            console.log(res.data[1]);

            console.log(res.data[1]);

            setLoading(false);
            setProducts(res.data[1]);
            setTotalPages(Math.ceil(res.data[1].length / ITEMS_PER_PAGE));
        } catch (error) {
            setLoading(false);
            // console.error('Error fetching data:', error);
        }
    };

    const fetchProducts = async () => {
        try {
            setLoading(true);
            const result = await axiosClient.get(`/category_products/${id}`);

            console.log(result.data[0]);

            console.log(result.data[0]);

            setLoading(false);
            setProducts(result.data[0]);
            setTotalPages(Math.ceil(result.data[0].length / ITEMS_PER_PAGE));
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

    // const handlePageChange = (page) => {
    //     setCurrentPage(page);
    //   };

    //   const renderPageNumbers = () => {
    //     const pageNumbers = [];

    //     for (let i = 1; i <= totalPages; i++) {
    //       pageNumbers.push(
    //         <button
    //           key={i}
    //           onClick={() => handlePageChange(i)}
    //           className={currentPage === i ? 'active' : ''}
    //         >
    //           {i}
    //         </button>
    //       );
    //     }

    //     return pageNumbers;
    //   };

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
                                                        {/* <a data-toggle="collapse" data-parent="#accordian" >
                                            <span className="badge pull-right"><i className="fa fa-plus"></i></span>
                                            <a href={'/category_products/' + c.id}>{c.name}</a>
                                        </a> */}
                                                        {/* <a href={'/category_products/' + c.id}>{c.name}</a> */}
                                                        <button
                                                            onClick={() =>
                                                                fetchData(c.id)
                                                            }
                                                        >
                                                            {c.name}
                                                        </button>
                                                    </h4>
                                                </div>

                                                {/* <div id={`${c.id}`} className="panel-collapse collapse">
                                <div className="panel-body">

									</div>

                                </div> */}
                                            </div>
                                        ))}
                                        ;
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="col-sm-9 padding-right">
                            <h2 className="title text-center">
                                Features Items
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
                            {!loading && (
                                <div className="features_items ">
                                    {visibleData.map((product) => (
                                        <div key={product.id}>
                                            <div className="col-sm-3">
                                                <div className="product-image-wrapper">
                                                    <div className="single-products">
                                                        <div className="productinfo text-center">
                                                            <img
                                                                src={
                                                                    "../../products_images/" +
                                                                    product.product_img
                                                                }
                                                                alt=""
                                                            />
                                                            <h2>
                                                                {product.price}
                                                            </h2>
                                                            <p>
                                                                {
                                                                    product.product_title
                                                                }
                                                            </p>
                                                            {wishlistItems.filter(
                                                                (w) =>
                                                                    product.id ===
                                                                    w.product_id
                                                            ).length !== 0 ? (
                                                                <Link
                                                                    style={{
                                                                        color: "red",
                                                                    }}
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
                                                                    style={{
                                                                        boxShadow:
                                                                            " #CC9999",
                                                                    }}
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
                                                                    {
                                                                        product.product_title
                                                                    }
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
                                // activeClassName="active"
                            />
                        </div>

                        {/* <div className="pagination">
            {renderPageNumbers()}

           </div> */}
                        {/* <div className="pagination">
            {renderPageNumbers1()}

           </div> */}
                    </div>
                </div>
            </section>

            {/* Render your data */}
            {/* {visibleData.map(item => (
        <div key={item.id}>{item.product_title}</div>
      ))} */}
        </div>
    );
}

export default CategoryProducts;
