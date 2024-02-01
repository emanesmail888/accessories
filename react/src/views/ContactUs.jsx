import  '../styles/css/contact.css';
import  '../styles/css/global.css';
import { useState} from "react";
import {useStateContext} from "../contexts/ContextProvider.jsx";
import axiosClient from "../axios-client.js";
import {useNavigate} from "react-router-dom";
function ContactUs() {
    const navigate = useNavigate();
    const [contact, setContact] = useState({
      id: null,
      name: '',
      email: '',
      subject: '',
      message: ''
    })

    const {setNotification,notification} = useStateContext()
    const [errors, setErrors] = useState(null)


    const onSubmit = ev => {
        ev.preventDefault()

          axiosClient.post('/contact_us', contact)
            .then(() => {
              setNotification('Your Message was successfully created')
              navigate('/home')
            })
            .catch(err => {
              const response = err.response;
              if (response && response.status === 422) {
                setErrors(response.data.errors)
              }
            })

      }

    return (
        <div>
            <section id="center" className="clearfix center_prod">
                <div className="container">
                    <div className="row">
                        <div className="center_prod_1 clearfix">
                            <div className="col-sm-12">
                                <h6 className="mgt col_1 normal">
                                    <a href="#">Home</a>{" "}
                                    <i
                                        // style={{font-size:14px, margin-left:5p, margin-right:5px}}
                                        className="fa fa-chevron-right"
                                    ></i>{" "}
                                    Contact Us
                                </h6>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section id="contact">
                <div className="container">
                    <div className="row">
                        <div className="contact_1 clearfix">
                            <div className="col-sm-6">
                                <div className="contact_1l clearfix">
                                    <h1 className="mgt">How to find Us?</h1>
                                    <p>
                                        Accessories website shop
                                        service. Created by developers for serving customers.
                                        sollicitudin, lorem quis bibendum dis.
                                    </p>
                                    <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d54695.26706152339!2d31.424039608709894!3d31.041453146912133!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14f79db7a9053547%3A0xf8dab3bbed766c97!2z2KfZhNmF2YbYtdmI2LHYqdiMINin2YTZhdmG2LXZiNix2KkgKNmC2LPZhSAyKdiMINin2YTZhdmG2LXZiNix2KnYjCDYp9mE2K_ZgtmH2YTZitip!5e0!3m2!1sar!2seg!4v1672844673446!5m2!1sar!2seg" width="100%" height="400px"  style={{border:'0',frameborder:'0'}} allowfullscreen=""></iframe>
                                </div>
                            </div>
                            <div className="col-sm-6">
                                <div className="contact_1r text-center clearfix">
                                    <h1 className="mgt col_1">Get in Touch!</h1>
                                    {errors &&
                                        <div className="alert">
                                            {Object.keys(errors).map(key => (
                                            <p key={key}>{errors[key][0]}</p>
                                            ))}
                                        </div>
                                        }
                                        {notification &&
                                            <div className="notification">
                                                {notification}
                                            </div>
                                            }
                                    <form onSubmit={onSubmit}>

                                    <input
                                        className="form-control"
                                        placeholder="Your Name"
                                        type="text"
                                        name="name"
                                        value={contact.name} onChange={ev => setContact({...contact, name: ev.target.value})}
                                    />
                                    <input
                                        className="form-control"
                                        placeholder="Your Email"
                                        type="text"
                                        name="email"
                                        value={contact.email} onChange={ev => setContact({...contact, email: ev.target.value})}

                                    />
                                    <input
                                        className="form-control"
                                        placeholder="Your Subject"
                                        type="text"
                                        name="subject"
                                        value={contact.subject} onChange={ev => setContact({...contact, subject: ev.target.value})}

                                    />
                                    <textarea
                                        className="form-control form_1"
                                        placeholder="Your Message"
                                        name="message"
                                        value={contact.message} onChange={ev => setContact({...contact, message: ev.target.value})}

                                    ></textarea>
                                    <h4>

                                        <button className="button_1">
                                            Submit
                                        </button>
                                    </h4>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section id="contact_us">
                <div className="container">
                    <div className="row">
                        <div className="contact_us_1 clearfix">
                            <div className="col-sm-4">
                                <div className="contact_us_1l clearfix">
                                    <h3 className="mgt">Alexandria Office</h3>
                                    <h5>
                                        <a href="#">
                                            <i className="fa fa-phone col_1"></i>{" "}
                                            (255) 456-789
                                        </a>
                                    </h5>
                                    <h5>
                                        <a href="#">
                                            <i className="fa fa-envelope col_1"></i>{" "}
                                            info@gmail.com
                                        </a>
                                    </h5>
                                    <h5>
                                        <a href="#">
                                            <i className="fa fa-map-marker col_1"></i>{" "}
                                            292 Main Eollins Street
                                        </a>
                                    </h5>
                                </div>
                            </div>
                            <div className="col-sm-4">
                                <div className="contact_us_1l clearfix">
                                    <h3 className="mgt">Cairo Office</h3>
                                    <h5>
                                        <a href="#">
                                            <i className="fa fa-phone col_1"></i>{" "}
                                            (123) 456-789
                                        </a>
                                    </h5>
                                    <h5>
                                        <a href="#">
                                            <i className="fa fa-envelope col_1"></i>{" "}
                                            info@gmail.com
                                        </a>
                                    </h5>
                                    <h5>
                                        <a href="#">
                                            <i className="fa fa-map-marker col_1"></i>{" "}
                                            292 Main Eollins Street
                                        </a>
                                    </h5>
                                </div>
                            </div>
                            <div className="col-sm-4">
                                <div className="contact_us_1l clearfix">
                                    <h3 className="mgt">Mansoura Office</h3>
                                    <h5>
                                        <a href="#">
                                            <i className="fa fa-phone col_1"></i>{" "}
                                            (255) 456-789
                                        </a>
                                    </h5>
                                    <h5>
                                        <a href="#">
                                            <i className="fa fa-envelope col_1"></i>{" "}
                                            info@gmail.com
                                        </a>
                                    </h5>
                                    <h5>
                                        <a href="#">
                                            <i className="fa fa-map-marker col_1"></i>{" "}
                                            292 Main Eollins Street
                                        </a>
                                    </h5>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default ContactUs;
