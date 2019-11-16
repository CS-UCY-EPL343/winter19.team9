import React, {Component} from 'react';
import '../assets/styles/registerForm.css'

class Register extends Component {
    render() {
        return (
            <div id="register" className="main">
                <section className="signup">
                    <div className="container">
                        <h1 className="text-center">Sign Up Form</h1>
                        <div className="signup-content">
                            <form method="POST" id="signup-form" className="signup-form was-validated"
                                  noValidate="novalidate"
                                  onInput='re_password.set`CustomValidity(password.value != re_password.value ? "Passwords do not match." : "")'>
                                <div className="form-row">
                                    <div className="form-group">
                                        <label htmlFor="fname"><b>First Name *</b></label>
                                        <input type="text" className="form-control" id="fname"
                                               placeholder="Enter first name" name="fname" pattern="[A-Za-z]{3,}"
                                               required/>
                                        <div className="valid-feedback">Valid.</div>
                                        <div className="invalid-feedback">Please fill out this field.</div>
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="lname"><b>Last Name *</b></label>
                                        <input type="text" className="form-control" id="lname"
                                               placeholder="Enter last name" name="lname" pattern="[A-Za-z]{3,}"
                                               required/>
                                        <div className="valid-feedback">Valid.</div>
                                        <div className="invalid-feedback">Please fill out this field.</div>
                                    </div>
                                </div>

                                <div className="form-row">
                                    <div className="form-group">
                                        <label htmlFor="bday"><b>Date of Birth *</b></label>
                                        <input type="date" name="bday" id="bday" placeholder="Date Of Birth"
                                               max="3000-12-31"
                                               min="1000-01-01" className="form-control" required/>
                                        <div className="valid-feedback">Valid.</div>
                                        <div className="invalid-feedback">Please fill out this field.</div>
                                    </div>
                                    <div className="form-radio">
                                        <br/>
                                        <label htmlFor="gender"><b>Gender *</b></label>
                                        <div className="form-flex">
                                            <input type="radio" name="gender" value="male" id="male"
                                                   checked="checked"/>
                                            <label htmlFor="male">Male</label>
                                            <input type="radio" name="gender" value="female" id="female"/>
                                            <label htmlFor="female">Female</label>
                                            <input type="radio" name="gender" value="=other" id="other"/>
                                            <label htmlFor="other">Other</label>
                                        </div>
                                    </div>
                                </div>

                                <div className="form-group">
                                    <label htmlFor="phone_number"><b>Phone number *</b></label>
                                    <input type="text" className="form-control" id="phone_number"
                                           placeholder="Enter phone number" name="phone_number" pattern="[0-9-]{8,}"
                                           required/>
                                    <div className="valid-feedback">Valid.</div>
                                    <div className="invalid-feedback">Please fill out this field.</div>
                                </div>

                                <div className="form-group">
                                    <label htmlFor="email"><b>Email *</b></label>
                                    <input type="text" className="form-control" id="email" placeholder="Enter email"
                                           name="email" pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$" required/>
                                    <div className="valid-feedback">Valid.</div>
                                    <div className="invalid-feedback">Please fill out this field.</div>
                                </div>

                                <div className="form-group">
                                    <label htmlFor="username"><b>Username  *</b></label>
                                    <input type="text" className="form-control" name="username" id="username" placeholder="Enter username"
                                           pattern="[A-Za-z]{3,}" required/>
                                    <div className="valid-feedback">Valid.</div>
                                    <div className="invalid-feedback">Please fill out this field.</div>
                                </div>

                                <div className="form-row">
                                    <div className="form-group">
                                        <label htmlFor="password">Password *</label>
                                        <input type="password" className="form-control" name="password" id="password"
                                               placeholder="Enter password" pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}" required/>
                                        <div className="valid-feedback">Valid.</div>
                                        <div className="invalid-feedback">Must contain at least one number and one
                                            uppercase and lowercase letter, and at least 8 or more characters.
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="re_password">Repeat your password *</label>
                                        <input type="password" className="form-control" name="re_password"
                                               id="re_password" placeholder="Repeat your password" required/>
                                        <div className="valid-feedback">Valid.</div>
                                        <div className="invalid-feedback">Must be the same password.</div>
                                    </div>
                                </div>
                                <div className="form-row">
                                    <div className="form-group">
                                        <label htmlFor="address">Address </label>
                                        <input type="text"  name="address" id="address" placeholder="Enter Address"/>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="ZipCode">Zip Code</label>
                                        <input type="text"  name="ZipCode" placeholder="Enter the Zip code"/>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="City">City</label>
                                        <input type="text"  name="City" placeholder="Enter the city you live in"/>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="Number">Number</label>
                                        <input type="text"  name="Number" placeholder="Enter the number of you address"/>
                                    </div>
                                </div>
                                <p><b>By creating an account you agree to our <a href="#">Terms & Privacy</a>.</b></p>
                                <div className="form-group">
                                    <form method="get" action="#">
                                        <button type="submit" className="registerbtn">Register</button>
                                    </form>
                                </div>
                            </form>
                            <p className="signLink"><b>Already have an account? </b><a href="#">Sign in</a>.</p>
                        </div>
                    </div>
                </section>
            </div>
        );
    }
}

export default Register;