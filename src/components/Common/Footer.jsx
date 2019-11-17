import React, { Component } from 'react';
import LeafletMap           from './LeafletMap';

class Footer extends Component {
    render() {
        return (
            // Footer
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
                            <p>Address : Pindou 4</p>
                            <p>Post Code : 2409</p>
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
        );
    }
}

export default Footer;