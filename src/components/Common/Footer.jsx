import React, {Component} from 'react';

class Footer extends Component {
    render() {
        return (
            // Footer
            <footer className="footer">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-lg-3">
                            <h2><b>Get Social</b></h2>
                            <p>Follow us on the Social Networks to let all the news and win discounts !</p>
                            <a href="https://www.facebook.com/fitnessfactorynicosia/">
                                <i className="styleImage fa fa-facebook"/>
                            </a>
                            <a href="https://www.instagram.com/fitness_factory_nicosia/?hl=en">
                                <i className="styleImage fa fa-instagram"/>
                            </a>
                        </div>
                        <div className="col-lg-3">
                            <div className="getHelp">
                            <h2 className="mb-4 font-weight-bold">ABOUT US</h2>
                                <div className="AboutUs">
                                <ul className="f-address">
                                    <li>
                                        <div className="row">
                                            <div className="col-1">
                                                <h6><i className="fa fa-map-marker about-icon"/>Address:</h6>
                                                <p>Pindou4,Egkomi(2408),Cyprus</p>
                                            </div>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="row">
                                            <div className="col-1">
                                                <h6><i className="fa fa-envelope-o about-icon"/>Questions?</h6>
                                                <p>Support@userthemes.com</p>
                                            </div>
                                        </div>
                                    </li>
                                </ul>
                        </div>
                        </div>
                        </div>
                        <div className="col-lg-3">
                            <h2 className="mb-4 font-weight-bold">Get Help</h2>
                            <ul className="getHelp" id="gHelp">
                                <li>
                                    <a href="">Contact Us</a>
                                </li>
                                <li>
                                    <a href="">Register Account</a>
                                </li>
                                <li>
                                    <a href="">See the classes</a>
                                </li>
                            </ul>
                        </div>
                        <div className="col-lg-3">
                            <h2><b>About The Club</b></h2>
                            <p>What makes us Different – 3 words
                                <br/>
                                “Determination – Commitment – Fun”
                                <br/>
                                That is what differentiates us!</p>
                        </div>
                    </div>
                    <div className="containers">
                        <p className="fa-pull-left">
                            &copy;"FitnessFactoryNicosia"
                        </p>
                    </div>
                </div>
            </footer>



        );
    }
}

export default Footer;