import React, { Component } from 'react';
import { Link }             from 'react-router-dom';

class Navigation extends Component {
    render() {
        return (
            // Navigation
            <nav className = "navbar navbar-expand-lg navbar-dark fixed-top" id = "mainNav">
                <div className = "container-fluid mx-auto">
                    <Link className = "navbar-brand js-scroll-trigger" to = "/">
                        Fitness Factory Nicosia&nbsp;
                        <img id = { 'logo' } src = { this.props.img } alt = 'Logo' height = { 48 } width = { 48 } />
                    </Link>
                    <button className = "navbar-toggler navbar-toggler-right"
                            type = "button"
                            data-toggle = "collapse"
                            data-target = "#navbarResponsive"
                            aria-controls = "navbarResponsive"
                            aria-expanded = "false"
                            aria-label = "Toggle navigation"
                    >
                        Menu
                        <i className = "fas fa-bars" />
                    </button>
                    <div className = "collapse navbar-collapse" id = "navbarResponsive">
                        <ul className = "navbar-nav text-uppercase ml-auto">
                            <li className = "nav-item">
                                <Link className = "nav-link js-scroll-trigger" to = "/">Services</Link>
                            </li>
                            <li className = "nav-item">
                                <Link className = "nav-link js-scroll-trigger" to = "/">Classes</Link>
                            </li>
                            <li className = "nav-item">
                                <Link className = "nav-link js-scroll-trigger" to = "/">About</Link>
                            </li>
                            <li className = "nav-item">
                                <Link className = "nav-link js-scroll-trigger" to = "/">Team</Link>
                            </li>
                            <li className = "nav-item">
                                <Link className = "nav-link js-scroll-trigger" to = "/">Contact&nbsp;Us</Link>
                            </li>
                            <li className = "nav-item">
                                <Link className = "nav-link js-scroll-trigger"
                                      to = "/"
                                >Login/Register <i className = "fas fa-sign-in-alt" /></Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        );
    }
}

export default Navigation;