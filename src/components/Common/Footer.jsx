import React, { Component } from 'react';
import img1                           from '../assets/img/FFNFamily/FamilyPic.jpg';
import LeafletMap           from './LeafletMap';
import {Carousel} from "react-bootstrap";

class Footer extends Component {
    render() {
        return (
            // Footer
            <footer className = "footer">
                <div className = "container-fluid">
                    <div className = "row">
                        <div className = "col-lg-6">
                            <h2><b>Get Social</b></h2>
                            <p>Follow us on the Social Networks to let all the news and win discounts ! </p>
                            <a href = "https://www.facebook.com/fitnessfactorynicosia/">
                                <i className = "styleImage fa fa-facebook" />
                            </a>
                            <a href = "https://www.instagram.com/fitness_factory_nicosia/?hl=en">
                                <i className = "styleImage fa fa-instagram" />
                            </a>
                            <p className= "fa-pull-left">
                                <br/>
                                <br/>
                                &copy;"FitnessFactoryNicosia"
                            </p>
                        </div>
                        <div className = "col-lg-6">
                            <h2><b>About The Club</b></h2>
                            <p>What makes us Different – 3 words
                                <br />
                               “Determination – Commitment – Fun”
                                <br />
                               That is what differentiates us!</p>
                        </div>
                    </div>
                </div>
            </footer>

        );
    }
}

export default Footer;