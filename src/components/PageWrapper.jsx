import React, { Component } from 'react';
import Navigation           from './Common/Navigation';
// Images
import logo_img             from './assets/img/logos/ffLogoTransparent.png';
import Footer               from './Common/Footer';

class PageWrapper extends Component {
    render() {
        return (
            <div id = "top-of-page">
                <Navigation signed_in = { this.props.signed_in }
                            level = { this.props.level }
                            onSignin = { this.props.onSignin }
                            onSignout = { this.props.onSignout }
                            img = { logo_img }
                />

                { this.props.children }

                <Footer />

                {/* Back To Top Button */ }
                <button data-hash = "top-of-page" id = "to-top" className = "button" type = "button">Top</button>

            </div>
        );
    }
}

export default PageWrapper;