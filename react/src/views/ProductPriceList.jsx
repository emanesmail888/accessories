import { useEffect, useState } from "react";
import axiosClient from "../axios-client.js";
import { useParams } from "react-router-dom";
import "./home.css";
import { useDispatch, useSelector } from "react-redux";

import { Link } from "react-router-dom";

import {
    addToWishlist,
    removeFromWishlist,
    fetchWishlist,
} from "../actions/wishlistAction.jsx";

function ProductPriceList() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const itemsPerPage = 20;
    const { min, max } = useParams();
    const wishlist = useSelector((state) => state.wishlist);
    const { wishlistItems } = wishlist;
    const dispatch = useDispatch();
    useEffect(() => {
        fetchProducts();
        dispatch(fetchWishlist());
    }, [min, max, currentPage]);

    const fetchProducts = () => {
        setLoading(true);

        let url = `/products_price?page=${currentPage}&limit=${itemsPerPage}&min=${min}&max=${max}`;

        // if (min && max) {
        //   url += `?min=${min}&max=${max}`;
        // }

        axiosClient
            .get(url)
            .then(({ data }) => {
                console.log(data);
                console.log(data.total);
                console.log(data.links.length);
                setLoading(false);
                setProducts(data.data);
                setTotalPages(data.links.length);
            })
            .catch(() => {
                setLoading(false);
            });
    };

    const AddToWishlistHandler = (id) => {
        dispatch(addToWishlist(id));
    };
    const removeFromWishlistHandler = (id) => {
        dispatch(removeFromWishlist(id));
        dispatch(fetchWishlist());
    };
    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const renderPageNumbers = () => {
        const pageNumbers = [];

        for (let i = 1; i <= totalPages; i++) {
            pageNumbers.push(
                <button
                    key={i}
                    onClick={() => handlePageChange(i)}
                    className={currentPage === i ? "active" : ""}
                >
                    {i}
                </button>
            );
        }

        return pageNumbers;
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
                                        <div className="panel-heading">
                                            <h4 className="panel-title">
                                                <a
                                                    data-toggle="collapse"
                                                    data-parent="#accordian"
                                                    href="#sportswear"
                                                >
                                                    <span className="badge pull-right">
                                                        <i className="fa fa-plus"></i>
                                                    </span>
                                                    Sportswear
                                                </a>
                                            </h4>
                                        </div>
                                        <div
                                            id="sportswear"
                                            className="panel-collapse collapse"
                                        >
                                            <div className="panel-body">
                                                <ul>
                                                    <li>
                                                        <a href="#">Nike </a>
                                                    </li>
                                                    <li>
                                                        <a href="#">
                                                            Under Armour{" "}
                                                        </a>
                                                    </li>
                                                    <li>
                                                        <a href="#">Adidas </a>
                                                    </li>
                                                    <li>
                                                        <a href="#">Puma</a>
                                                    </li>
                                                    <li>
                                                        <a href="#">ASICS </a>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="panel panel-default">
                                        <div className="panel-heading">
                                            <h4 className="panel-title">
                                                <a
                                                    data-toggle="collapse"
                                                    data-parent="#accordian"
                                                    href="#mens"
                                                >
                                                    <span className="badge pull-right">
                                                        <i className="fa fa-plus"></i>
                                                    </span>
                                                    Mens
                                                </a>
                                            </h4>
                                        </div>
                                        <div
                                            id="mens"
                                            className="panel-collapse collapse"
                                        >
                                            <div className="panel-body">
                                                <ul>
                                                    <li>
                                                        <a href="#">Fendi</a>
                                                    </li>
                                                    <li>
                                                        <a href="#">Guess</a>
                                                    </li>
                                                    <li>
                                                        <a href="#">
                                                            Valentino
                                                        </a>
                                                    </li>
                                                    <li>
                                                        <a href="#">Dior</a>
                                                    </li>
                                                    <li>
                                                        <a href="#">Versace</a>
                                                    </li>
                                                    <li>
                                                        <a href="#">Armani</a>
                                                    </li>
                                                    <li>
                                                        <a href="#">Prada</a>
                                                    </li>
                                                    <li>
                                                        <a href="#">
                                                            Dolce and Gabbana
                                                        </a>
                                                    </li>
                                                    <li>
                                                        <a href="#">Chanel</a>
                                                    </li>
                                                    <li>
                                                        <a href="#">Gucci</a>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="panel panel-default">
                                        <div className="panel-heading">
                                            <h4 className="panel-title">
                                                <a
                                                    data-toggle="collapse"
                                                    data-parent="#accordian"
                                                    href="#womens"
                                                >
                                                    <span className="badge pull-right">
                                                        <i className="fa fa-plus"></i>
                                                    </span>
                                                    Womens
                                                </a>
                                            </h4>
                                        </div>
                                        <div
                                            id="womens"
                                            className="panel-collapse collapse"
                                        >
                                            <div className="panel-body">
                                                <ul>
                                                    <li>
                                                        <a href="#">Fendi</a>
                                                    </li>
                                                    <li>
                                                        <a href="#">Guess</a>
                                                    </li>
                                                    <li>
                                                        <a href="#">
                                                            Valentino
                                                        </a>
                                                    </li>
                                                    <li>
                                                        <a href="#">Dior</a>
                                                    </li>
                                                    <li>
                                                        <a href="#">Versace</a>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="panel panel-default">
                                        <div className="panel-heading">
                                            <h4 className="panel-title">
                                                <a href="#">Kids</a>
                                            </h4>
                                        </div>
                                    </div>
                                    <div className="panel panel-default">
                                        <div className="panel-heading">
                                            <h4 className="panel-title">
                                                <a href="#">Fashion</a>
                                            </h4>
                                        </div>
                                    </div>
                                    <div className="panel panel-default">
                                        <div className="panel-heading">
                                            <h4 className="panel-title">
                                                <a href="#">Households</a>
                                            </h4>
                                        </div>
                                    </div>
                                    <div className="panel panel-default">
                                        <div className="panel-heading">
                                            <h4 className="panel-title">
                                                <a href="#">Interiors</a>
                                            </h4>
                                        </div>
                                    </div>
                                    <div className="panel panel-default">
                                        <div className="panel-heading">
                                            <h4 className="panel-title">
                                                <a href="#">Clothing</a>
                                            </h4>
                                        </div>
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
                                    {products.map((product) => (
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
                            <div className="pagination">
                                {renderPageNumbers()}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default ProductPriceList;
