import React, { Component } from 'react';
import LeafletMap           from './Common/LeafletMap';
import Navigation           from './Common/Navigation';
// Images
import logo_img             from '../logo.svg';

class PageWrapper extends Component {
    render() {
        return (
            <div id = "top-of-page">
                <Navigation img = { logo_img } />

                { this.props.children }

                {/* Insert Footer Here*/ }
                <footer className = "footer">
                    <div className = "container-fluid">
                        <div className = "row">
                            <div className = "col-lg-4">
                                <h2><b>Get Social</b></h2>
                                <p>Follow us on the Social Networks to let all the news and win discounts ! </p>
                                <a href = "https://www.facebook.com/fitnessfactorynicosia/">
                                    <i className = "styleImage fa fa-facebook" />
                                </a>
                                <a href = "https://www.instagram.com/fitness_factory_nicosia/?hl=en">
                                    <i className = "styleImage fa fa-instagram" />
                                </a>
                            </div>
                            <div className = "col-lg-4">
                                <h2><b>Where you can find us</b></h2>
                                <LeafletMap
                                    markerPosition = { [{ lat: 35.166279 }, { lng: 33.326951 }] }
                                    zoom = { 16 }
                                />
                            </div>
                            <div className = "col-lg-4">
                                <h2><b>About The Club</b></h2>
                                <p>What makes us Different – 3 words
                                    <br />
                                    <br />
                                   “Determination – Commitment – Fun”
                                    <br />
                                    <br />
                                   That is what differentiates us!</p>

                            </div>
                        </div>
                    </div>
                </footer>

                {/* Back To Top Button */ }
                <button data-hash = "top-of-page" id = "to-top" className = "button" type = "button">Top</button>

            </div>
        );
    }
}

export default PageWrapper;