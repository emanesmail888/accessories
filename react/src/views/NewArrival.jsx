import { useEffect, useState } from "react";
import axiosClient from "../axios-client.js";
import "./home.css";

function NewArrival() {
    const [n_products, setNProducts1] = useState([]);
    const [n_products1, setNProducts2] = useState([]);

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = () => {
        axiosClient.get("/home").then(({ data }) => {
            console.log(data.newArrival_products.slice(4, 9));

            //   setLoading(false)
            setNProducts1(data.newArrival_products.slice(0, 4));
            setNProducts2(data.newArrival_products.slice(4, 8));
        });
    };

    return (
        <div>
         <div className="list_2 clearfix">
          <div id="carousel-example_2" className="carousel slide" data-ride="carousel">
            <div className="carousel-inner">
                <div className="item active">
                {n_products.map((p1) => (
                    <div key={p1.id} className="col-sm-3">

                        <div className="list_2i clearfix mgt-center">
                        <a href={`/pro/${p1.id}`}>
                                        <img
                                            src={`${import.meta.env.VITE_API_BASE_URL}/products/images/`+p1.product_img}
                                            className="iw"
                                            alt="abc"
                                        />
                                    </a>
                            <h5><p style={{textDecorationLine:'line-through'}}>{p1.price}</p> {p1.product_psp_price}</h5>
                            <h5><a className="col_1" href={`/pro/${p1.id}`}>{p1.product_title}</a></h5>
                        </div>
					</div>
                    ))};

                </div>
                <div className="item">
                {n_products1.map((p2) => (
                    <div key={p2.id} className="col-sm-3">

                        <div className="list_2i clearfix mgt-center">
                        <a href={`/pro/${p2.id}`}>
                                        <img
                                            src={`${import.meta.env.VITE_API_BASE_URL}/products/images/`+p2.product_img}
                                            className="iw"
                                            alt="abc"
                                        />
                                    </a>
                            <h5><p style={{textDecorationLine:'line-through'}}>{p2.price}</p> {p2.product_psp_price}</h5>
                            <h5><a className="col_1" href={`/pro/${p2.id}`}>{p2.product_title}</a></h5>

                        </div>
					</div>
                    ))};
                </div>
            </div>
        </div>
        <div className="feature_2_last text-center clearfix">
                <div className="col-sm-12">
                    <div className="controls">
                        <a className="left fa fa-chevron-left  btn-success" href="#carousel-example_2" data-slide="prev"></a><a className="right fa fa-chevron-right  btn-success" href="#carousel-example_2" data-slide="next"></a>
                    </div>
                </div>
        </div>
   </div>




        </div>
    );
}

export default NewArrival;
