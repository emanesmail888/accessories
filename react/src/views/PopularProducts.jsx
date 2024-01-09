import { useEffect, useState } from "react";
import axiosClient from "../axios-client.js";
import "./home.css";

function PopularProducts() {
    const [p_products, setProducts1] = useState([]);
    const [p_products1, setProducts2] = useState([]);

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = () => {
        axiosClient.get("/home").then(({ data }) => {
            console.log(data[1].slice(4, 9));

            //   setLoading(false)
            setProducts1(data[2].slice(0, 4));
            setProducts2(data[2].slice(4, 8));
        });
    };

    return (
        <div>
            <div
                id="carousel-example_1"
                className="carousel slide"
                data-ride="carousel"
            >
                <div className="carousel-inner">
                    <div className="item active">
                        {p_products.map((p1) => (
                            <div key={p1.id} className="col-sm-3">
                                <div className="list_2i text-center clearfix">
                                    <a href="#">
                                        <img
                                            src={
                                                "../../products_images/" +
                                                p1.product_img
                                            }
                                            className="iw"
                                            alt="abc"
                                        />
                                    </a>
                                    <h5>
                                        <a className="button_1" href="#">
                                            SHOP NOW
                                        </a>
                                    </h5>
                                </div>
                            </div>
                        ))}
                        ;
                    </div>
                    <div className="item">
                    {p_products1.map((p2) => (
                            <div key={p2.id} className="col-sm-3">
                                <div className="list_2i text-center clearfix">
                                    <a href="#">
                                        <img
                                            src={
                                                "../../products_images/" +
                                                p2.product_img
                                            }
                                            className="iw"
                                            alt="abc"
                                        />
                                    </a>
                                    <h5>
                                        <a className="button_1" href="#">
                                            SHOP NOW
                                        </a>
                                    </h5>
                                </div>
                            </div>
                        ))}
                        ;
                    </div>
                </div>
            </div>
            <div className="feature_2_last text-center clearfix">
                <div className="col-sm-12">
                    <div className="controls">
                        <a
                            className="left fa fa-chevron-left  btn-success"
                            href="#carousel-example_1"
                            data-slide="prev"
                        ></a>
                        <a
                            className="right fa fa-chevron-right  btn-success"
                            href="#carousel-example_1"
                            data-slide="next"
                        ></a>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PopularProducts;
