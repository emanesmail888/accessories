// import Slider from 'react-slick';
import './Carousel.css';
// import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

// const ProductCarousel = () => {
//     const responsive = {
//         desktop: {
//           breakpoint: { max: 3000, min: 1024 },
//           items: 3,
//           slidesToSlide: 3, // optional, default to 1.
//         },
//         tablet: {
//           breakpoint: { max: 1024, min: 464 },
//           items: 2,
//           slidesToSlide: 2, // optional, default to 1.
//         },
//         mobile: {
//           breakpoint: { max: 464, min: 0 },
//           items: 1,
//           slidesToSlide: 1, // optional, default to 1.
//         },
//       };

//       const items = [
//         {
//           id: 1,
//           title: 'Item 1',
//         },
//         {
//           id: 2,
//           title: 'Item 2',
//         },
//         {
//           id: 3,
//           title: 'Item 3',
//         },
//         {
//           id: 3,
//           title: 'Item 3',
//         },
//         {
//           id: 3,
//           title: 'Item 3',
//         },
//         {
//           id: 3,
//           title: 'Item 3',
//         },
//         {
//           id: 3,
//           title: 'Item 3',
//         },
//         // Add more items as needed
//       ];

//       return (
//         // <Carousel responsive={responsive}>
//         //   {items.map((item) => (
//         //     <div key={item.id}>
//         //       <h2>{item.title}</h2>
//         //     </div>
//         //   ))}
//         // </Carousel>
//         <Carousel responsive={responsive} itemClass="carousel-item-padding-40-px" containerClass="carousel-container">
//       {items.map((item) => (
//         <div key={item.id}>
//           <h2>{item.title}</h2>
//         </div>
//       ))}
//     </Carousel>
//       );
//     };


// export default ProductCarousel;






import {Swiper,SwiperSlide} from "swiper/react";
import "swiper/swiper.min.css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/autoplay";
import SwiperCore,{
    EffectCoverflow,
    Pagination,
    Navigation,Autoplay

}from "swiper/core";
SwiperCore.use([EffectCoverflow,Pagination,Navigation,Autoplay]);
import './Carousel.css';
import {useEffect, useState} from "react";
import axiosClient from "../../axios-client";


const ProductCarousel = () => {
    const [products, setProducts] = useState([]);


    useEffect(() => {
        fetchProducts();
      }, []);


    const fetchProducts = () => {

        let url = `/home`;



        axiosClient.get(url)
        .then(({ data }) => {
            console.log(data[0]);
            setProducts(data[0])
        })

    }
  return (
    <>

      <Swiper

style={{
  "--swiper-pagination-color": "rgb(88, 2, 2)",
  "--swiper-pagination-bullet-inactive-color": "rgb(143, 84, 84) ",
  "--swiper-pagination-bullet-inactive-opacity": "1",
  "--swiper-pagination-bullet-size": "16px",
  "--swiper-pagination-bullet-horizontal-gap": "6px",
  "--swiper-navigation-color": "rgb(88, 2, 2)",
  "--swiper-navigation-size": "40px",

}}
      rows={2}
    navigation={true}
    //   effect={"coverflow"}
      centeredSlides={true}
    //   slidesPerView={window.innerWidth<768 ? 1:"auto"}
      loop={true}
      autoplay={
        {
          delay: 2000,
          disableOnInteraction: false,
        }
        }
        coverflowEffect={{
        rotate:50,
        stretch:0,
        depth:100,
        modifier:1,
        slideShadows:true
      }}
      pagination={{
        clickable:true,
      }}

        spaceBetween={10}
        slidesPerView={4}
        slidesPerColumn={2}
      allowTouchMove={true}
      >

        {products.map(product => (
                    <div key={product.id}>
                    <SwiperSlide>

                                    <div className="product-image-wrapper">
                                        <div className="single-products">
                                                <div className="productinfo text-center">
                                                    <img src={'../../products_images/' + product.product_img} alt="" />
                                                    <h2>{product.price}</h2>
                                                    <p>{product.product_title}</p>
                                                    <a href="#" className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart"></i>Add to cart</a>
                                                </div>
                                                { /*<div className="product-overlay">
                                                    <div className="overlay-content">
                                                        <h2>{product.price}</h2>
                                                        <p>{product.product_title}</p>
                                                        <a href="#" className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart"></i>Add to cart</a>
                                                    </div>
                                                </div>*/ }
                                        </div>
                                        <div className="choose">
                                            <ul className="nav nav-pills nav-justified">
                                                <li><a href="#"><i className="fa fa-plus-square"></i>Add to wishlist</a></li>
                                                <li><a href="#"><i className="fa fa-plus-square"></i>Add to compare</a></li>
                                            </ul>
                                        </div>
                                    </div>
                                    </SwiperSlide>


                    </div>
                    ))}


      </Swiper>
      <div className="swiper-pagination"></div>


    </>
  );
};

export default ProductCarousel;


