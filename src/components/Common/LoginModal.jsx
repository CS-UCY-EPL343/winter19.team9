import React, { Component } from 'react';
import '../assets/styles/loginStyle.css'
import { Link }             from 'react-router-dom';

class LoginModal extends Component {
    render() {
        return (

            <div id = "LoginModal" tabIndex = "-1" className = "modalBack modal-content animate"
                 role = "dialog" aria-labelledby = "exampleModalLabel" aria-hidden = "true"
            >


                <div className = "imgcontainer">
                    <div className = "cursive">Login With</div>
                    <div className = "row">
                        <div className = "col-lg-12 col-md-12 col-sm-12">
                            <i className = "fab fa-google google brands" />
                            <i className = "fab fa-facebook facebook brands" />
                            <i className = "fab fa-twitter twitter brands" />
                        </div>
                    </div>
                </div>


                <p className = "subtitle fancy"><span className = "cursive2">OR</span></p>


                <div className = "search container">
                    <form action = "#" method = "post" id = "form" className = "form-row needs-validation" noValidate>
                        <div className = "form-group row-lg-12 row-md-12 row-sm-12" id = "addressID">
                            <label htmlFor = "username"> <i className = "fa fa-user coloring" /> <span
                                className = "textFields"
                            >Username or email </span>
                                <span
                                    className = "red"
                                >*</span></label>
                            <input type = "text"
                                   className = "form-control"
                                   id = "username"
                                   pattern = "^ *[a-zA-Z0-9]+.*"
                                   placeholder = "Enter username or email"
                                   required
                            />

                        </div>
                        <div className = "form-group col-lg-12 col-md-12 col-sm-12">
                            <label htmlFor = "pword"> <i className = "fa fa-lock coloring" /> <span
                                className = "textFields"
                            >Password </span><span
                                className = "red"
                            >*</span></label>
                            <input type = "password" className = "form-control" id = "pword" pattern = "^ *[a-zA-Z]+.*"
                                   placeholder = "Enter password" required
                            />

                        </div>
                    </form>


                    <button id = "search" type = "submit" className = "btn btn-primary">Login</button>

                    <div id = "remember-me" className = "">
                        <input type = "checkbox" name = "remember" />
                        <label className = "textFields">Remember me</label>
                    </div>


                    <div className = "container">
                        <div className = "row d-flex justify-content-between login-help">
                            <span id = "signup">Don't have an account? <Link onClick = { this.props.toggle }
                                                                             to = "/register"
                            >Sign Up</Link></span>

                            <span id = "forgot-pass" className = "psw"> <a href = "/">Forgot password?</a></span>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default LoginModal;