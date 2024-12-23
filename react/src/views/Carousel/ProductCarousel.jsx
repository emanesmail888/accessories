import './Carousel.css';
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper.min.css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/autoplay";
import SwiperCore, {
    EffectCoverflow,
    Pagination,
    Navigation,
    Autoplay
} from "swiper/core";
import { useEffect, useState } from "react";
import axiosClient from "../../axios-client";

SwiperCore.use([EffectCoverflow, Pagination, Navigation, Autoplay]);

const ProductCarousel = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = () => {
        let url = `/v1/home`;
        axiosClient.get(url)
            .then(({ data }) => {
                console.log(data.products);
                setProducts(data.products);
            });
    };

    return (
        <>
            <Swiper
                style={{
                    "--swiper-pagination-color": "rgb(88, 2, 2)",
                    "--swiper-pagination-bullet-inactive-color": "rgb(143, 84, 84)",
                    "--swiper-pagination-bullet-inactive-opacity": "1",
                    "--swiper-pagination-bullet-size": "16px",
                    "--swiper-pagination-bullet-horizontal-gap": "6px",
                    "--swiper-navigation-color": "rgb(88, 2, 2)",
                    "--swiper-navigation-size": "40px",
                }}
                navigation={true}
                centeredSlides={true}
                loop={true}
                autoplay={{
                    delay: 2000,
                    disableOnInteraction: false,
                }}
                coverflowEffect={{
                    rotate: 50,
                    stretch: 0,
                    depth: 100,
                    modifier: 1,
                    slideShadows: true,
                }}
                pagination={{
                    clickable: true,
                }}
                spaceBetween={10}
                slidesPerView={4}
                allowTouchMove={true}
            >
                {products.map(product => (
                    <SwiperSlide key={product.id}>
                        <div className="product-image-wrapper">
                            <div className="single-products">
                                <div className="productinfo text-center">
                                    <img src={`${import.meta.env.VITE_API_BASE_URL}/products/images/${product.product_img}`} alt="" />
                                    <h2>{product.price}</h2>
                                    <p>
                                        <a href={`/v1/pro/${product.id}`} style={{ color: 'gray' }}>{product.product_title}</a>
                                    </p>
                                    <a href={`/cart/${product.id}?qty=1`} className="btn btn-default add-to-cart">
                                        <i className="fa fa-shopping-cart"></i>Add to cart
                                    </a>
                                </div>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
            <div className="swiper-pagination"></div>
        </>
    );
};

export default ProductCarousel;