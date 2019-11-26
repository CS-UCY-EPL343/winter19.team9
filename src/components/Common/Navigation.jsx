import React, { Component } from 'react';
import { Link }             from 'react-router-dom';
import ToggleModal          from './ToggleModal';
import LoginModal           from './LoginModal';
import { Button }           from 'reactstrap';

class Navigation extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modal: false
        };
        this.toggle = this.toggle.bind(this);
    };

    toggle = () => {
        this.setState({ modal: !this.state.modal });
    };

    render() {
        // noinspection HtmlUnknownAnchorTarget,HtmlUnknownTarget
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
                                <Link className = "nav-link" to = "/">Home</Link>
                            </li>
                            <li className = "nav-item">
                                <a className = "nav-link" href = '/#our-services'>Services</a>
                            </li>
                            <li className = "nav-item">
                                <Link className = "nav-link" to = "/classes">Classes</Link>
                            </li>
                            <li className = "nav-item">
                                <Link className = "nav-link" to = "/profile">Profile</Link>
                            </li>
                            <li className = "nav-item">
                                <Link className = "nav-link" to = "/about">About</Link>
                            </li>
                            <li className = "nav-item">
                                <a className = "nav-link" href = '/about#contact'>Contact&nbsp;Us</a>
                            </li>
                            <li className = "nav-item">
                                <Button className = { 'nav-link' } onClick = { this.toggle }>
                                    Login/Register <i className = "fas fa-sign-in-alt" />
                                </Button>
                                <ToggleModal
                                    modal = { this.state.modal }
                                    toggle = { this.toggle }
                                    modalSize = { 'md' }
                                    modalHeader = { 'Login Form' }
                                    modalBody = { <LoginModal /> }
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