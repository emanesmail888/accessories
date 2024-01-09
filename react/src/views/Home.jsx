/* eslint-disable no-mixed-spaces-and-tabs */
import ProductCarousel from './Carousel/ProductCarousel';
// import FeatureProducts from './FeatureProducts.jsx';
//  import Slider from './Slider/Slider';
import  '../styles/css/font-awesome.min.css';

import  './home.css';
import  '../styles/css/responsive.css';
import  '../styles/css/animate.css';
// import  '../styles/css/global.css';
import  '../styles/css/index.css';
import  '../styles/css/list.css';
import  '../styles/css/prettyPhoto.css';
import  '../styles/css/jquery-ui.css';
// import  '../styles/css/main.css';
import  '../styles/css/bootstrap.min.css';
import  '../styles/js/jquery';
import  '../styles/js/bootstrap.min.js';
// import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import HomeCategories from './HomeCategories.jsx';

import PopularProducts from './PopularProducts.jsx';




function Home() {

  return (
    <div>




<section id="center" className="center_home mb-5 pb-5">
   <div className="carousel fade-carousel slide " data-ride="carousel" data-interval="4000" id="bs-carousel">
	  <div className="overlay"></div>

	  <ol className="carousel-indicators">
		<li data-target="#bs-carousel" data-slide-to="0" className="active"></li>
		<li data-target="#bs-carousel" data-slide-to="1" className=""></li>
		<li data-target="#bs-carousel" data-slide-to="2" className=""></li>
	  </ol>

	  <div className="carousel-inner">
		<div className="item slides active">
		  <div className="slide-1">
          <img src="images/Types-of-Gold-Metal.jpg" alt="Image 2" />
          </div>
		  <div className="hero">
			<h1 className="mgt">Rd Jewellers</h1>
			<p>Nulla quis sem at nibh elementum imperdiet  lacinia arcu eget nulla!</p>
			<h4><a className="button col" href="#">View More</a></h4>
			<h4><a className="button_1 col" href="#"> Shop Now</a></h4>
		  </div>
		</div>
		<div className="item slides">
		  <div className="slide-2">
          <img src="images/j.jpg" alt="Image 1" />

          </div>
		  <div className="hero hero_1">
			<h1 className="mgt">Dolore Magna</h1>

			<p>Nulla quis sem at nibh elementum imperdiet  lacinia arcu eget nulla!</p>
			<h4><a className="button col" href="#">View More</a></h4>
			<h4><a className="button_1 col" href="#"> Shop Now</a></h4>
		  </div>
		</div>
		<div className="item slides">
		  <div className="slide-3">
          <img src="images/heart.jpg" alt="Image 3" />
          </div>
		  <div className="hero">
			<h1 className="mgt">Fusce  Tellus </h1>

			<p>Nulla quis sem at nibh elementum imperdiet  lacinia arcu eget nulla!</p>
			<h4><a className="button col" href="#">View More</a></h4>
			<h4><a className="button_1 col" href="#"> Shop Now</a></h4>
		  </div>
		</div>
	  </div>
	</div>
</section>

<section className='latest_products'>
     <div className='container'>

    <h2 className='text-center text-bold text-warning'>Latest Products</h2>


      {/* <Slider  /> */}

    <ProductCarousel />


    </div>
 </section>








<section id="center_3" className="clearfix">
 <div className="container">
  <div className="row">
  <div className="price_1 clearfix">
       <div className="col-sm-12">
	     <h2 className="mgt-center">Shop by  <span className="col_1">Your Preference</span></h2>
		<p >Explore our unique daily wear jewellery designs that reflect elegance and exclusivity.</p>
	   </div>
   </div>
   <HomeCategories/>


  </div>
 </div>
</section>





<section id="price">
 <div className="container">
  <div className="row">
   <div className="price_1 text-center clearfix">
       <div className="col-sm-12">
	     <h2 className="mgt text-center"> Stylish Jewellery  <span className="col_1">Affordable Price </span></h2>
		<p>Discover our exclusive jewellery in versatile designs that fits every budget with poise and glamour.</p>
	   </div>
   </div>
   <div className="price_2 clearfix">
       <div className="col-sm-3">
        <div className="price_2i clearfix">
		 <div className="col-sm-8">
		  <h5><a href='/products_price/1/1000' className='text-danger'>Shop Under  <span className="bold"><i className="fa fa-gbp"></i> 1,000</span></a></h5>
		 </div>
		 <div className="col-sm-4 space_all">
         <img src="images/price1.jpg" className="iw" height="80" alt="abc"/>

		 </div>
		</div>
	   </div>
	   <div className="col-sm-3">
        <div className="price_2i clearfix">
		 <div className="col-sm-8">

		  <h5><a href='/products_price/1000/3000' className='text-danger'>Shop Under  <span className="bold"><i className="fa fa-gbp"></i> 1,000 -3,000</span></a></h5>
		 </div>
		 <div className="col-sm-4 space_all">
         <img src="images/price2.jpg" className="iw" height="80" alt="abc"/>
		 </div>
		</div>
	   </div>
	   <div className="col-sm-3">
        <div className="price_2i clearfix">
		 <div className="col-sm-8">
		  <h5> <a href='/products_price/3000/6000' className='text-danger'>Shop Under  <span className="bold"><i className="fa fa-gbp"></i> 3,000 -6,000</span></a></h5>
		 </div>
		 <div className="col-sm-4 space_all">
         <img src="images/price3.jpg" className="iw" height="80" alt="abc"/>

		 </div>
		</div>
	   </div>
	   <div className="col-sm-3">
        <div className="price_2i clearfix">
		 <div className="col-sm-8">
		  <h5><a href='/products_price/6000/50000' className='text-danger'>Shop Above <span className="bold"><i className="fa fa-gbp"></i> 6,000</span></a></h5>
		 </div>
		 <div className="col-sm-4 space_all">
         <img src="images/price4.jpg" className="iw" height="80" alt="abc"/>

		 </div>
		</div>
	   </div>
   </div>
  </div>
 </div>
</section>



<section id="popular">
 <div className="container">
  <div className="row">
   <div className="price_1 text-center clearfix">
       <div className="col-sm-12">
	     <h2 className="mgt">Jewellery That  <span className="col_1">You May Love</span></h2>
		<p>Explore our unique daily wear jewellery designs that reflect elegance and exclusivity.</p>
	   </div>
   </div>
   <div className="popular_1 clearfix">
    <div className="col-sm-4">
	 <div className="popular_1i clearfix">
	  <h4 className="mgt text-center">Online Exclusive </h4>
	  <h6 className="mgt-center">14 KT Lorem Jewellery </h6>
	  <img src="images/q1.jpg" className="iw2" alt="abc"/>
	  <div className="popular_1ii clearfix">
	   <div className="col-sm-6 space_left">
	    <h4><i className="fa fa-rupee"></i> 2266 Onwards</h4>
	   </div>
	   <div className="col-sm-6 space_all">
	    <h5 className="text-right"><a className="button_1 mgt" href="#">SHOP NOW</a></h5>
	   </div>
	  </div>
	 </div>
	</div>
	<div className="col-sm-4">
	 <div className="popular_1i bg_1 clearfix">
	  <h4 className="mgt text-center">Latest Collection </h4>
	  <h6 className="mgt-center">14 KT Lorem Jewellery </h6>
	  <img src="images/q2.jpg" className="iw2" alt="abc"/>
	  <div className="popular_1ii clearfix">
	   <div className="col-sm-6 space_left">
	    <h4><i className="fa fa-rupee"></i> 2746 Onwards</h4>
	   </div>
	   <div className="col-sm-6 space_all">
	    <h5 className="text-right"><a className="button_1 mgt" href="#">SHOP NOW</a></h5>
	   </div>
	  </div>
	 </div>
	</div>
	<div className="col-sm-4">
	 <div className="popular_1i clearfix">
	  <h4 className="mgt text-center">Trending Jewellery </h4>
	  <h6 className="mgt-center">14 KT Lorem Jewellery </h6>
	  <img src="images/q3.jpg" className="iw2" alt="abc"/>
	  <div className="popular_1ii clearfix">
	   <div className="col-sm-6 space_left">
	    <h4><i className="fa fa-rupee"></i> 2986 Onwards</h4>
	   </div>
	   <div className="col-sm-6 space_all">
	    <h5 className="text-right"><a className="button_1 mgt" href="#">SHOP NOW</a></h5>
	   </div>
	  </div>
	 </div>
	</div>
   </div>
   <div className="popular_1 clearfix">
    <div className="col-sm-4">
	 <div className="popular_1i clearfix">
	  <h4 className="mgt text-center">Online Exclusive </h4>
	  <h6 className="mgt-center">14 KT Lorem Jewellery </h6>
	  <img src="images/q4.jpg" className="iw2" alt="abc"/>
	  <div className="popular_1ii clearfix">
	   <div className="col-sm-6 space_left">
	    <h4><i className="fa fa-rupee"></i> 2266 Onwards</h4>
	   </div>
	   <div className="col-sm-6 space_all">
	    <h5 className="text-right"><a className="button_1 mgt" href="#">SHOP NOW</a></h5>
	   </div>
	  </div>
	 </div>
	</div>
	<div className="col-sm-4">
	 <div className="popular_1i bg_1 clearfix">
	  <h4 className="mgt text-center">Latest Collection </h4>
	  <h6 className="mgt-center">14 KT Lorem Jewellery </h6>
	  <img src="images/q5.jpg" className="iw2" alt="abc"/>
	  <div className="popular_1ii clearfix">
	   <div className="col-sm-6 space_left">
	    <h4><i className="fa fa-rupee"></i> 2746 Onwards</h4>
	   </div>
	   <div className="col-sm-6 space_all">
	    <h5 className="text-right"><a className="button_1 mgt" href="#">SHOP NOW</a></h5>
	   </div>
	  </div>
	 </div>
	</div>
	<div className="col-sm-4">
	 <div className="popular_1i clearfix">
	  <h4 className="mgt text-center">Trending Jewellery </h4>
	  <h6 className="mgt-center">14 KT Lorem Jewellery </h6>
	  <img src="images/q6.jpg" className="iw2" alt="abc"/>
	  <div className="popular_1ii clearfix">
	   <div className="col-sm-6 space_left">
	    <h4><i className="fa fa-rupee"></i> 2986 Onwards</h4>
	   </div>
	   <div className="col-sm-6 space_all">
	    <h5 className="text-right"><a className="button_1 mgt" href="#">SHOP NOW</a></h5>
	   </div>
	  </div>
	 </div>
	</div>
   </div>
  </div>
 </div>
</section>





<section id="list_o">
 <div className="container">
  <div className="row">
   <div className="price_1 text-center clearfix">
       <div className="col-sm-12">
	     <h2 className="mgt">Shop by  <span className="col_1">Popular Accessories</span></h2>
		<p>Explore our unique daily wear jewellery designs that reflect elegance and exclusivity.</p>
	   </div>
   </div>
   <PopularProducts/>

  </div>
 </div>
</section>





<section id="list_o_1">
 <div className="container">
  <div className="row">
   <div className="list_1 clearfix">
     <div className="col-sm-9">
	  <div className="list_1l clearfix">
	    <h3 className="mgt">Explore  <span className="col_1">The New Arrivals </span></h3>
		<p>We craft exceptionally fashionable &amp; trendy designs to make you look beautiful every day.</p>
	  </div>
	 </div>
	 <div className="col-sm-3">
	  <div className="list_1r text-right clearfix">
	    <h5 className="mgt"><a className="button mgt" href="#">VIEW ALL</a></h5>
	  </div>
	 </div>
   </div>
   <div className="list_2 clearfix">
     <div id="carousel-example_2" className="carousel slide" data-ride="carousel">
            <div className="carousel-inner">
                <div className="item active">
					<div className="col-sm-3">
					  <div className="list_2i clearfix mgt-center">
					    {/* <a href="#"><img src="img/6.jpg" className="iw" alt="abc"></a> */}
						<h3><i className="fa fa-rupee"></i> 4566</h3>
						<h4><a className="col_1" href="#">Nibh Elementum</a></h4>
						<h6>Product Code: 12LDSJECR03</h6>
					  </div>
					</div>
					<div className="col-sm-3">
					  <div className="list_2i clearfix mgt-center">
					    {/* <a href="#"><img src="img/7.jpg" className="iw" alt="abc"></a> */}
						<h3><i className="fa fa-rupee"></i> 4986</h3>
						<h4><a className="col_1" href="#">Fusce Nec Tellus</a></h4>
						<h6>Product Code: 12LDSJECR03</h6>
					  </div>
					</div>
					<div className="col-sm-3">
					  <div className="list_2i clearfix mgt-center">
					    {/* <a href="#"><img src="img/8.jpg" className="iw" alt="abc"></a> */}
						<h3><i className="fa fa-rupee"></i> 5696</h3>
						<h4><a className="col_1" href="#">Nulla Quis Sem</a></h4>
						<h6>Product Code: 12LDSJECR03</h6>
					  </div>
					</div>
					<div className="col-sm-3">
					  <div className="list_2i clearfix mgt-center">
						<h3><i className="fa fa-rupee"></i> 5836</h3>
						<h4><a className="col_1" href="#">Vestibulum Lacinia</a></h4>
						<h6>Product Code: 12LDSJECR03</h6>
					  </div>
					</div>
                </div>
                <div className="item">
					<div className="col-sm-3">
					  <div className="list_2i clearfix mgt-center">
						<h3><i className="fa fa-rupee"></i> 4566</h3>
						<h4><a className="col_1" href="#">Nibh Elementum</a></h4>
						<h6>Product Code: 12LDSJECR03</h6>
					  </div>
					</div>
					<div className="col-sm-3">
					  <div className="list_2i clearfix mgt-center">
						<h3><i className="fa fa-rupee"></i> 4986</h3>
						<h4><a className="col_1" href="#">Fusce Nec Tellus</a></h4>
						<h6>Product Code: 12LDSJECR03</h6>
					  </div>
					</div>
					<div className="col-sm-3">
					  <div className="list_2i clearfix mgt-center">
						<h3><i className="fa fa-rupee"></i> 5696</h3>
						<h4><a className="col_1" href="#">Nulla Quis Sem</a></h4>
						<h6>Product Code: 12LDSJECR03</h6>
					  </div>
					</div>
					<div className="col-sm-3">
					  <div className="list_2i clearfix mgt-center">
						<h3><i className="fa fa-rupee"></i> 5836</h3>
						<h4><a className="col_1" href="#">Vestibulum Lacinia</a></h4>
						<h6>Product Code: 12LDSJECR03</h6>
					  </div>
					</div>
                </div>
            </div>
        </div>
	 <div className="feature_2_last text-center clearfix">
            <div className="col-sm-12">
                <div className="controls">
                    <a className="left fa fa-chevron-left btn btn-success" href="#carousel-example_2" data-slide="prev"></a><a className="right fa fa-chevron-right btn btn-success" href="#carousel-example_2" data-slide="next"></a>
                </div>
            </div>
        </div>
   </div>
  </div>
 </div>
</section>

<section id="collection_o">
 <div className="container">
  <div className="row">
   <div className="collect_1 clearfix">
    <div className="col-sm-8">
	 <div className="collect_1l clearfix">
	  <div className="col-sm-5 space_all">
	   <div className="collect_1ll clearfix">
	    <h4 className="mgt col_1">Trending Product</h4>
		<h3>Maybe You’ve Earned it</h3>
		<h5><a className="button_1 mgt" href="#"> Shop Now</a></h5>
	   </div>
	  </div>
	  <div className="col-sm-7 space_right">
	   <div className="collect_1lr clearfix">
       <a href="#"><img src="images/trend1.jpg" alt="abc" className="iw2"/></a>

	   </div>
	  </div>
	 </div>
	</div>
    <div className="col-sm-4">
	 <div className="collect_1ln clearfix">
     <a href="#"><img src="images/wedding4.jpg"  alt="abc" className="iw2 "/></a>

	 </div>
	</div>
   </div>
  </div>
 </div>
</section>

<section id="explore">
 <div className="explore_m clearfix">
  <div className="container">
   <div className="row">
    <div className="explore_1 clearfix">

	 <div className="col-sm-6">
	  <div className="explore_1l text-center clearfix">
	   <h1 className="mgt col_1">Wedding Collection</h1>
	   <p className="col">We craft exceptionally fashionable & trendy designs to make you look beautiful every day.</p>
	   <h3 className="col_3">Starting at <i className="fa fa-rupee"></i> 49342 Only</h3>
	   <h4><a className="button_1" href="#">EXPLORE OUR COLLECTIONS</a></h4>
	  </div>
	 </div>
	 <div className="col-sm-6">
	  <div className="explore_1r clearfix">

      </div>
	 </div>
	</div>
   </div>
  </div>
 </div>
</section>

<section id="list_last">
 <div className="container">
  <div className="row">
   <div className="price_1 text-center clearfix">
       <div className="col-sm-12">
	     <h3 className="mgt">The Rd Jewellers  <span className="col_1">Advantage</span></h3>
		<p>Explore our unique daily wear jewellery designs that reflect elegance and exclusivity.</p>
	   </div>
   </div>
   <div className="list_last_1 clearfix">
    <div className="col-sm-3 space_all">
	 <div className="list_last_1i text-center clearfix">
	  <span><i className="fa fa-thumbs-o-up"></i></span>
	  <h4><a href="#">Quality Jewelry</a></h4>

	  <p>We are proud to realease the best products for our beloved customers.</p>
	  <h5 className="normal"><a className="button_1" href="#">READ MORE</a></h5>
	 </div>
	</div>
	<div className="col-sm-3 space_all">
	 <div className="list_last_1i text-center clearfix">
	  <span><i className="fa fa-rocket"></i></span>
	  <h4><a href="#">Delivery</a></h4>

	  <p>We are proud to realease the best products for our beloved customers.</p>
	  <h5 className="normal"><a className="button_1" href="#">READ MORE</a></h5>
	 </div>
	</div>
	<div className="col-sm-3 space_all">
	 <div className="list_last_1i text-center clearfix">
	  <span><i className="fa fa-leaf"></i></span>
	  <h4><a href="#">Best Service</a></h4>
	  <p>We are proud to realease the best products for our beloved customers.</p>
	  <h5 className="normal"><a className="button_1" href="#">READ MORE</a></h5>
	 </div>
	</div>
	<div className="col-sm-3 space_all">
	 <div className="list_last_1i text-center clearfix">
	  <span><i className="fa fa-money"></i></span>
	  <h4><a href="#">Guarantee</a></h4>

	  <p>We are proud to realease the best products for our beloved customers.</p>
	  <h5 className="normal"><a className="button_1" href="#">READ MORE</a></h5>
	 </div>
	</div>
   </div>
  </div>
 </div>
</section>

<section id="footer">
 <div className="container">
  <div className="row">
   <div className="footer_1 mgt clearfix">
    <div className="col-sm-2">
	 <div className="footer_1i clearfix">
	  <h4 className="mgt col_3">Our Story</h4>
	  <h5><a className="hvr-forward col" href="#">The Rd Jewellers</a></h5>
	  <h5><a className="hvr-forward col" href="#">CSR Activities</a></h5>
	  <h5><a className="hvr-forward col" href="#">Get In Touch</a></h5>
	  <h5><a className="hvr-forward col" href="#">Career</a></h5>
	 </div>
	</div>
	<div className="col-sm-2">
	 <div className="footer_1i clearfix">
	  <h4 className="mgt col_3">Our Collections</h4>
	  <h5><a className="hvr-forward col" href="#">Wedding</a></h5>
	  <h5><a className="hvr-forward col" href="#">Diamond</a></h5>
	  <h5><a className="hvr-forward col" href="#">Kids</a></h5>
	  <h5><a className="hvr-forward col" href="#">Semper</a></h5>
	  <h5><a className="hvr-forward col" href="#">Porta</a></h5>
	  <h5><a className="hvr-forward col" href="#">Popular</a></h5>
	 </div>
	</div>
	<div className="col-sm-2">
	 <div className="footer_1i clearfix">
	  <h4 className="mgt col_3">Our Categories</h4>
	  <h5><a className="hvr-forward col" href="#">Premium</a></h5>
	  <h5><a className="hvr-forward col" href="#">Silver</a></h5>
	  <h5><a className="hvr-forward col" href="#">Diamond</a></h5>
	 </div>
	</div>
	<div className="col-sm-6">
	 <div className="footer_1i clearfix">
	  <h4 className="mgt col_3">Join Our Newsletter</h4>
	  <p className="col">Fusce nec tellus sed augue semper porta. Mauris massa. Vestibulum lacinia arcu eget nulla.className aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Curabitursodales ligula in libero.Sed dignissim lacinia nunc.</p>
	  <div className="input-group">
					{/* <input type="text" className="form-control" placeholder="Search"> */}
					<span className="input-group-btn">
						<button className="btn btn-primary" type="button">
							<i className="fa fa-long-arrow-right"></i></button>
					</span>
	  </div>
	 </div>
	</div>
   </div>
   <div className="footer_1 clearfix">
    <div className="col-sm-2">
	 <div className="footer_1i clearfix">
	  <h4 className="mgt col_3">Our Properties</h4>
	  <h5><a className="hvr-forward col" href="#">Semper Porta</a></h5>
	  <h5><a className="hvr-forward col" href="#">Nec Tellus</a></h5>
	 </div>
	</div>
	<div className="col-sm-2">
	 <div className="footer_1i clearfix">
	  <h4 className="mgt col_3">Advertisement</h4>
	  <h5><a className="hvr-forward col" href="#">Print Media</a></h5>
	  <h5><a className="hvr-forward col" href="#">TV Commercials</a></h5>
	  <h5><a className="hvr-forward col" href="#">Photo Gallery</a></h5>
	  <h5><a className="hvr-forward col" href="#">Video Gallery</a></h5>
	  <h5><a className="hvr-forward col" href="#">Press Room</a></h5>
	 </div>
	</div>
	<div className="col-sm-2">
	 <div className="footer_1i clearfix">
	  <h4 className="mgt col_3">Follow Us</h4>
	  <h5><a className="hvr-forward col" href="#">Facebook</a></h5>
	  <h5><a className="hvr-forward col" href="#">Twitter</a></h5>
	  <h5><a className="hvr-forward col" href="#">Instagram</a></h5>
	  <h5><a className="hvr-forward col" href="#">Youtube</a></h5>
	 </div>
	</div>
	<div className="col-sm-6">
	 <div className="footer_1i clearfix">
	  <h4 className="mgt col_3">Social Links</h4>
		 <ul className="social-network social-circle">
							<li><a href="#" className="icoRss" title="Rss"><i className="fa fa-rss"></i></a></li>
							<li><a href="#" className="icoFacebook" title="Facebook"><i className="fa fa-facebook"></i></a></li>
							<li><a href="#" className="icoTwitter" title="Twitter"><i className="fa fa-twitter"></i></a></li>
							<li><a href="#" className="icoGoogle" title="Google +"><i className="fa fa-google-plus"></i></a></li>
							<li><a href="#" className="icoLinkedin" title="Linkedin"><i className="fa fa-linkedin"></i></a></li>
		 </ul>
	 </div>
	</div>
   </div>
  </div>
 </div>
</section>

<section id="footer_bottom">
 <div className="container">
  <div className="row">
   <div className="footer_b clearfix">
	 <div className="col-sm-5 space_left">
	  <div className="footer_br clearfix">
	  <ul className="mgt">
	   <li>
		<a href="#">Our Policy</a>
		<a href="#">Shipping</a>
		<a href="#">Terms & Conditions</a>
		<a className="border_none" href="#">Refund Policy</a>
	   </li>
	  </ul>
	 </div>
	 </div>
	 <div className="col-sm-7 space_left">
	  <div className="footer_bl  text-right clearfix">
	   <p>© 2013 Your Website Name. All Rights Reserved | Design by <a className="col_1" href="http://www.templateonweb.com">TemplateOnWeb</a></p>
	  </div>
	 </div>
   </div>
  </div>
 </div>
</section>







    </div>
  )
}

export default Home
