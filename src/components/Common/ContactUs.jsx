import React, {Component} from 'react';
import '../assets/styles/About.css'

class ContactUs extends Component {
    render() {
        return (
            <section className="page-section" id="contact">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12 text-center col-md-12 col-sm-12">
                            <h1 className="section-heading">Let's keep in touch</h1>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-3">
                            <h2>Contact Us</h2>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-12 col-md-12 col-sm-12 text-center">
                            <form className=" needs-validation" id="contactForm" name="sentMessage"
                                  noValidate="novalidate">
                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <input className="form-control" id="name" type="text" placeholder="Name"
                                                   required="required" pattern="^ *[a-zA-Z0-9]+.*"/>
                                            <p className="help-block text-danger"/>
                                            <div className="invalid-feedback" id="colored">Please enter your name!</div>
                                        </div>
                                        <div className="form-group">
                                            <input className="form-control" id="name" type="text" placeholder="Email"
                                                   required="required" pattern="^ *[a-zA-Z0-9]+.*"/>
                                            <p className="help-block text-danger"/>
                                            <div className="invalid-feedback" id="colored">Please enter your
                                                email!
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <input className="form-control" id="phone" type="tel" placeholder="Phone"
                                                   required="required" pattern="^ *[0-9]+.*"/>
                                            <p className="help-block text-danger"/>
                                            <div className="invalid-feedback" id="colored">Please enter your
                                                phone!
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <textarea className="form-control" id="message" placeholder="Message"
                                                      required="required" pattern="^ *[a-zA-Z0-9]+.*"/>
                                            <p className="help-block text-danger"/>
                                            <div className="invalid-feedback" id="colored">Please enter your message!
                                            </div>
                                        </div>
                                    </div>
                                    <div className="clearfix"/>
                                    <div className="col-lg-3 ">
                                        <div id="success"/>
                                        <button id="sendMessageButton" className="btn btn-primary btn-xl text-uppercase"
                                                type="submit">Submit Message
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-6">
                            <h2>Contact Information</h2>
                            <p> Address: Engomi 2409 - Nicosia
                                <br/>Phone: 22-260001
                                <br/>
                                Email: info@fitnessfactorynic.com.cy
                            </p>
                            <a href="https://www.facebook.com/fitnessfactorynicosia/">
                                <i className="fab fa-twitter"/>
                            </a>
                            <a href="https://www.facebook.com/fitnessfactorynicosia/">
                                <i className="fab fa-facebook-f"/>
                            </a>
                            <a href="https://www.instagram.com/fitness_factory_nicosia/">
                                <i className="fab fa-instagram"/>
                            </a>
                            <a href="https://cy.linkedin.com/in/constantinos-christou-ba56b6187">
                                <i className="fab fa-linkedin"/>
                            </a>
                        </div>
                        <div className="col-lg-6 text-center">
                            <div className="mapouter">
                                <div className="gmap_canvas">
                                    <iframe title='gmap_canvas' width="550" height="400" id="gmap_canvas"
                                            src="https://maps.google.com/maps?q=fitness%20factory%20nicosia&t=&z=13&ie=UTF8&iwloc=&output=embed"
                                            frameBorder="0" scrolling="no" marginHeight="0" marginWidth="0"/>
                                    <a href="https://www.embedgooglemap.net/blog/divi-discount-code-elegant-themes-coupon/">embedgooglemap.net</a>
                                </div>

                            </div>
                        </div>

                    </div>
                    <p/>
                </div>

            </section>
        );
    }
}

export default ContactUs;