/* eslint-disable react/prop-types */
// import { useState } from 'react';
// import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import './Slider.css';

// import Carousel from 'react-bootstrap/Carousel';

function Slider() {
//   return (
//     <Carousel data-bs-theme="dark">
//       <Carousel.Item>
//         <img
//           className="d-block w-100"
//           src="images/go-pro.jpg"
//           alt="First slide"
//         />
//         <Carousel.Caption>
//           <h5>First slide label</h5>
//           <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
//         </Carousel.Caption>
//       </Carousel.Item>
//       <Carousel.Item>
//         <img
//           className="d-block w-100"
//           src="images/diamond.jpg"
//           alt="Second slide"
//         />
//         <Carousel.Caption>
//           <h5>Second slide label</h5>
//           <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
//         </Carousel.Caption>
//       </Carousel.Item>
//       <Carousel.Item>
//         <img
//           className="d-block w-100"
//           src="images/heart.jpg"
//           alt="Third slide"
//         />
//         <Carousel.Caption>
//           <h5>Third slide label</h5>
//           <p>
//             Praesent commodo cursus magna, vel scelerisque nisl consectetur.
//           </p>
//         </Carousel.Caption>
//       </Carousel.Item>
//     </Carousel>
//   );

  return(
    <Carousel>
      <div>
        <img src="images/go-pro.jpg" alt="Image 1" />
        <p className="legend">Image 1 description</p>
      </div>
      <div>
        <img src="images/diamond.jpg" alt="Image 2" />
        <p className="legend">Image 2 description</p>
      </div>
      <div>
        <img src="images/heart.jpg" alt="Image 3" />
        <p className="legend">Image 3 description</p>
      </div>
    </Carousel>
  );
}

export default Slider;

// const Slider = ({ images }) => {
//   const [currentImageIndex, setCurrentImageIndex] = useState(0);

//   const handlePrevClick = () => {
//     setCurrentImageIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
//   };

//   const handleNextClick = () => {
//     setCurrentImageIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
//   };

//   return (
//     <div className="slider">
//       <div className="slider-image">
//         <img src={images[currentImageIndex]} alt="Slider" />
//       </div>
//       <button className="slider-prev"  onClick={handlePrevClick}>
//       {">>"}
//       </button>
//       <button className="slider-next"  onClick={handleNextClick}>
//       {"<<"}
//       </button>
//     </div>
//   );
// };

// export default Slider;
