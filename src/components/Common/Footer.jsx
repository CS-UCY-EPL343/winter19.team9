import React, {Component} from 'react';

class Footer extends Component {
    render() {
        // noinspection HtmlUnknownTarget
        return (
            // Footer
            <footer>
                <div id="footer" className="information container-fluid">
                    <div className="row justify-content-center">
                        <div id="socials-footer" className="col-lg-3 col-md-12 col-sm-12">
                            <h2>Get Social</h2>
                            <p>Follow us on the Social Network to learn all the news and win discounts!</p>
                            <a href="https://www.facebook.com/fitnessfactorynicosia/">
                                <i className="fab fa-facebook footer-icon"/>
                            </a>
                            <a href="https://www.instagram.com/fitness_factory_nicosia/?hl=en">
                                <i className="fab fa-instagram footer-icon"/>
                            </a>
                        </div>
                        <div id="about-footer" className="col-lg-3 col-md-12 col-sm-12">
                            <h2>About Us</h2>
                            <p>
                                <i className="fas fa-map-marker footer-icon"/> Address:
                                <span className="about-footer-text"> Pindou4,Egkomi(2408),Cyprus</span>
                            </p>
                            <p>
                                <i className="far fa-envelope footer-icon"/> Questions?
                                <span className="about-footer-text"> Support@userthemes.com</span>
                            </p>
                        </div>
                        <div id="help-footer" className="col-lg-3 col-md-12 col-sm-12">
                            <h2>Get Help</h2>
                            <p><i className="fa fa-phone footer-icon"/> <a href="/winter19.team9/about#contact">Contact Us</a></p>
                            <p><i className="fa fa-user footer-icon"/> <a href="/winter19.team9/register">Register Account</a></p>
                            <p><i className="fa fa-info footer-icon"/> <a href="/winter19.team9/classes">See the classes</a></p>
                        </div>
                        <div id="about-club" className="col-lg-3 col-md-12 col-sm-12">
                            <h2>About The Club</h2>
                            <p>What makes us Different – 3 words</p>
                            <p>“Determination – Commitment – Fun”</p>
                            <p>That is what differentiates us!</p>
                        </div>
                    </div>
                </div>
                <div id="copyrights" className="container-fluid">
                    <div className="row justify-content-center">
                        <p><i className="fas fa-copyright"/> Copyrights Fitness Factory Nicosia</p>
                    </div>
                </div>
            </footer>


        );
    }
}

export default Footer;