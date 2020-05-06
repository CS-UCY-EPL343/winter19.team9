import React, {Component} from 'react';
import $ from 'jquery';
import Navigation from './common/Navigation';
import Footer from './common/Footer';

class PageWrapper extends Component {

    componentDidMount() {
        this.handleClick();
    }

    handleClick = () => {
        // Scroll to top
        $('#to-top').on('click', function () {
            let hash = $(this).data('hash');
            if (hash) {
                $('html, body').animate({
                    scrollTop: $(document.getElementById(hash)).offset().top,
                }, 800, function () {
                    window.location.hash = hash;
                });
            }
        });
    };

    render() {
        // noinspection JSCheckFunctionSignatures
        const childrenWithProps = React.Children.map(this.props.children, child =>
            React.cloneElement(child, {userLevel: this.props.userLevel}),
        );
        return (

            <div id="top-of-page">
                {!(navigator.userAgent.match(/Android/i)) &&
                <Navigation userLevel={this.props.userLevel}
                            setUserLevel={this.props.setUserLevel}
                />
                }

                {childrenWithProps}

                {!(navigator.userAgent.match(/Android/i)) &&
                <Footer stylesheetData={this.props.stylesheetData['Footer']}/>
                }

                {/* Back To Top Button */}
                <button data-hash="top-of-page"
                        id="to-top"
                        className="button"
                        type="button"
                >Top
                </button>
            </div>
        );
    }
}

export default PageWrapper;