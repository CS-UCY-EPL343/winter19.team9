import React, { Component } from 'react';
import { Link }             from 'react-router-dom';
import ToggleModal          from './ToggleModal';
import LoginModal           from './LoginModal';

class Navigation extends Component {
    render() {
        return (
            // Navigation
            <nav className = "navbar navbar-expand-lg navbar-dark fixed-top" id = "mainNav">
                <div className = "container-fluid mx-auto">
                    <Link className = "navbar-brand" to = "/">
                        Fitness Factory Nicosia&nbsp;
                        <img id = { 'logo' } src = { this.props.img } alt = 'Logo' height = { 64 } width = { 64 } />
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
                                <Link className = "nav-link" to = "/">Services</Link>
                            </li>
                            <li className = "nav-item">
                                <Link className = "nav-link" to = "/">Classes</Link>
                            </li>
                            <li className = "nav-item">
                                <Link className = "nav-link" to = "/about">About</Link>
                            </li>
                            <li className = "nav-item">
                                <Link className = "nav-link" to = "/">Team</Link>
                            </li>
                            <li className = "nav-item">
                                <Link className = "nav-link" to = "/">Contact&nbsp;Us</Link>
                            </li>
                            <li className = "nav-item">
                                <ToggleModal
                                    btnClass = { 'nav-link' }
                                    btnText = { ['Login/Register ', <i className = "fas fa-sign-in-alt" key={Math.random()}/>] }
                                    modalSize = { 'md' }
                                    modalHeader = { 'Login Form' }
                                    modalBody={<LoginModal/>}
                                />
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        );
    }
}

export default Navigation;