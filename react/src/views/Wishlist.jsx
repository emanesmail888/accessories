import { useEffect } from "react";
// import { connect } from 'react-redux';
import { useDispatch, useSelector } from "react-redux";

import { Link } from "react-router-dom";

import {
    addToWishlist,
    removeFromWishlist,
    fetchWishlist,
} from "../actions/wishlistAction.jsx";

const Wishlist = () => {
    const wishlist = useSelector((state) => state.wishlist);
    const { wishlistItems, loading } = wishlist;
    console.log(wishlist);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchWishlist());
    }, [fetchWishlist]);

    if (loading) {
        return <div>Loading...</div>;
    }

    // const handleRemoveFromWishlist = (itemId) => {
    //     dispatch(removeFromWishlist(itemId));
    //     dispatch(
    //         fetchWishlist());
    // };
    const AddToWishlistHandler = (id) => {
        dispatch(addToWishlist(id));
    };
    const removeFromWishlistHandler = (id) => {
        dispatch(removeFromWishlist(id));
        dispatch(fetchWishlist());
    };

    return (
        <div>
            <h2>My Wishlist</h2>
            {wishlistItems.map((item) => (
                <div key={item.id}>
                    <div className="col-sm-3">
                        <div className="product-image-wrapper">
                            <div className="single-products">
                                <div className="productinfo text-center">
                                    <img
                                        src={`${import.meta.env.VITE_API_BASE_URL}/products/images/`+item.product_img}
                                        alt=""
                                    />
                                    <h2>{item.price}</h2>
                                    <p><a href={`/pro/${item.id}`}>{item.product_title}</a></p>
                                    {wishlistItems.filter(
                                        (w) => item.id === w.product_id
                                    ).length !== 0 ? (
                                        <Link
                                            style={{color: '#d93d3d'}}
                                            onClick={() =>
                                                removeFromWishlistHandler(
                                                    item.id
                                                )
                                            }
                                        >
                                            <i className="fa fa-heart fa-2x"></i>
                                        </Link>
                                    ) : (
                                        <Link
                                            style={{color:' rgb(233, 144, 144)'}}
                                            onClick={() =>
                                                AddToWishlistHandler(item.id)
                                            }
                                        >
                                            <i className="fa fa-heart  fa-2x"></i>
                                        </Link>
                                    )}
                                    <a
                                        href={`/cart/${item.id}?qty=1`}
                                        className="btn btn-default add-to-cart"
                                    >
                                        <i className="fa fa-shopping-cart"></i>
                                        Add to cart
                                    </a>
                                </div>
                                <div className="product-overlay">
                                    <div className="overlay-content">
                                        <h2>{item.price}</h2>
                                        <p><a href={`/pro/${item.id}`}>{item.product_title}</a></p>
                                        {/* <Link style={{color: 'red'}} onClick={() => AddToWishlistHandler(product.id)}>wishlist</Link> */}
                                        {/* <button onClick={() => handleRemoveFromWishlist(item.product_id)}>
                                                            Remove
                                                        </button> */}
                                        <a
                                            href={`/cart/${item.id}?qty=1`}
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
    );
};

export default Wishlist;
