import React, {Component} from 'react';
import {Link} from 'react-router-dom';
// Images
import logo_img from '../logo.svg';
import LeafletMap from "./Common/LeafletMap";

class PageWrapper extends Component {
    render() {
        return (
            <div id="top-of-page">
                {/* Navigation */}
                <nav className="navbar navbar-expand-lg navbar-dark fixed-top" id="mainNav">
                    <div className="container-fluid mx-auto">
                        <Link className="navbar-brand js-scroll-trigger" to="/">
                            Fitness Factory Nicosia&nbsp;
                            <img id={'logo'} src={logo_img} alt='Logo' height={48} width={48}/>
                        </Link>
                        <button className="navbar-toggler navbar-toggler-right"
                                type="button"
                                data-toggle="collapse"
                                data-target="#navbarResponsive"
                                aria-controls="navbarResponsive"
                                aria-expanded="false"
                                aria-label="Toggle navigation"
                        >
                            Menu
                            <i className="fas fa-bars"/>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarResponsive">
                            <ul className="navbar-nav text-uppercase ml-auto">
                                <li className="nav-item">
                                    <Link className="nav-link js-scroll-trigger" to="/">Services</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link js-scroll-trigger" to="/">Classes</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link js-scroll-trigger" to="/">About</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link js-scroll-trigger" to="/">Team</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link js-scroll-trigger" to="/">Contact&nbsp;Us</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link js-scroll-trigger"
                                          to="/"
                                    >Login/Register <i className="fas fa-sign-in-alt"/></Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>

                {this.props.children}

                {/* Insert Footer Here*/}
                <footer className="footer">
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-lg-4">
                                <h2><b>Get Social</b></h2>
                                <p>Follow us on the Social Networks to let all the news and win discounts ! </p>
                                <a href="https://www.facebook.com/fitnessfactorynicosia/">
                                    <i className="styleImage fa fa-facebook"/>
                                </a>
                                <a href="https://www.instagram.com/fitness_factory_nicosia/?hl=en">
                                    <i className="styleImage fa fa-instagram"/>
                                </a>
                            </div>
                            <div className="col-lg-4">
                                <h2><b>Where you can find us</b></h2>
                                <LeafletMap
                                    markerPosition={[{lat: 35.166226}, {lng: 33.326983}]}
                                    zoom={16}
                                />
                            </div>
                            <div className="col-lg-4">
                                <h2><b>About The Club</b></h2>
                                <p>What makes us Different – 3 words
                                    <br/>
                                    <br/>
                                    “Determination – Commitment – Fun”
                                    <br/>
                                    <br/>
                                    That is what differentiates us!</p>

                            </div>
                        </div>
                    </div>
                </footer>

                {/* Back To Top Button */}
                <button data-hash="top-of-page" id="to-top" className="button" type="button">Top</button>

            </div>
        );
    }
}

export default PageWrapper;