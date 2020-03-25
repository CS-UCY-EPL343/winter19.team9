import React, { Component } from 'react';
import Navigation           from './common/Navigation';
import Footer               from './common/Footer';

class PageWrapper extends Component {
    render() {
        // noinspection JSCheckFunctionSignatures
        const childrenWithProps = React.Children.map(this.props.children, child =>
            React.cloneElement(child, { userLevel: this.props.userLevel })
        );
        return (
            <div id = "top-of-page">
                <Navigation userLevel = { this.props.userLevel } setUserLevel = { this.props.setUserLevel } />

                { childrenWithProps }

                <Footer  stylesheetData = { this.props.stylesheetData['Footer'] } />

                {/* Back To Top Button */ }
                <button data-hash = "top-of-page" id = "to-top" className = "button" type = "button">Top</button>

            </div>
        );
    }
}

export default PageWrapper;