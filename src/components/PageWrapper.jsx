import React, { Component } from 'react';
import Navigation           from './common/Navigation';
import Footer               from './common/Footer';
import history              from '../history';

class PageWrapper extends Component {

    componentDidUpdate(prevProps, prevState, snapshot) {
        localStorage.setItem('path', history.location.pathname);
    }

    render() {
        return (
            <div id = "top-of-page">
                <Navigation />

                { this.props.children }

                <Footer />

                {/* Back To Top Button */ }
                <button data-hash = "top-of-page" id = "to-top" className = "button" type = "button">Top</button>

            </div>
        );
    }
}

export default PageWrapper;