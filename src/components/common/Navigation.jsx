import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import ToggleModal from './ToggleModal';
import LoginModal from './LoginModal';
import { Button } from 'reactstrap';
import { isAuthenticated } from '../../repository';
import logo_img from '../assets/img/logos/ffLogoTransparent.png';

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

    logOut() {
        localStorage.removeItem('x-access-token');
    };

    render() {
        return (
            // Navigation
            <nav className="navbar navbar-expand-lg navbar-dark fixed-top" id="mainNav">
                <div className="container-fluid mx-auto">
                    <NavLink className="navbar-brand" to="/" exact={true}>
                        <span className="gym-name">Fitness Factory Nicosia&nbsp;</span>
                        <img id={'logo'} src={logo_img} alt='Logo' height={64} width={64} />
                    </NavLink>
                    <button className="navbar-toggler navbar-toggler-right"
                        type="button"
                        data-toggle="collapse"
                        data-target="#navbarResponsive"
                        aria-controls="navbarResponsive"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        Menu
                        <i className="fas fa-bars" />
                    </button>
                    <div className="collapse navbar-collapse" id="navbarResponsive">
                        <ul className="navbar-nav text-uppercase ml-auto">
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/" exact={true}>Home</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/classes">Classes</NavLink>
                            </li>
                            {isAuthenticated() &&
                                <li className="nav-item">
                                    <NavLink className="nav-link" to="/profile">Profile</NavLink>
                                </li>
                            }
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/about">About Us</NavLink>
                            </li>
                            {
                                (isAuthenticated()) ?
                                    <li className="nav-item">
                                        <NavLink to="/" className={'nav-link logout btn btn-secondary'} onClick={this.logOut}>
                                            Logout <i className="fas fa-sign-out-alt" />
                                        </NavLink>
                                    </li>
                                    :
                                    <li className="nav-item">
                                        <Button className={'nav-link login btn btn-secondary'} onClick={this.toggle}>
                                            Login/Register <i className="fas fa-sign-in-alt" />
                                        </Button>
                                        <ToggleModal
                                            modal={this.state.modal}
                                            toggle={this.toggle}
                                            modalSize={'md'}
                                            modalHeader={'Login Form'}
                                            modalBody={<LoginModal />}
                                        />
                                    </li>
                            }
                        </ul>
                    </div>
                </div>
            </nav>
        );
    }
}

export default Navigation;