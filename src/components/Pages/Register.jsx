import React, { Component } from 'react';
import '../assets/styles/registerForm.css'
import background           from '../assets/img/Register Background/RegisterPic.jpg';
import FormInput            from '../Common/FormInput';

let styles = {
    body: {
        fontSize       : 13,
        lineHeight     : 1.8,
        color          : '#222222',
        fontWeight     : 600,
        backgroundImage: `url(${ background })`,
        padding        : 0
    }
};

class Register extends Component {

    componentDidMount() {
        for (let i in styles.body) {
            // noinspection JSUnfilteredForInLoop
            document.body.style[i] = styles.body[i];
        }
    }

    componentWillUnmount() {
        for (let i in styles.body) {
            // noinspection JSUnfilteredForInLoop
            document.body.style[i] = null;
        }
    }

    render() {
        return (
            <div id = "register" className = "main">
                <section className = "signup">
                    <div className = "container">
                        <h1 className = "text-center veryBlack">Sign Up Form</h1>
                        <div className = "signup-content">
                            <form method = "POST" id = "signup-form" className = "signup-form was-validated"
                                  noValidate = "novalidate"
                                  // onInput = 're_password.set`CustomValidity(password.value != re_password.value ? "Passwords do not match." : "")'
                            >
                                <div className = "form-row">
                                    <FormInput
                                        id = { 'fname' }
                                        label = { 'First Name' }
                                        classType = { 'form-control' }
                                        placeholder = { 'Enter first name' }
                                        pattern = { '[A-Za-z]{3,}' }
                                        required = { 'required' }
                                        valid = { 'Valid.' }
                                        invalid = { 'Please fill out this field.' }
                                    />

                                    <FormInput
                                        id = { 'lname' }
                                        label = { 'Last Name' }
                                        classType = { 'form-control' }
                                        placeholder = { 'Enter last name' }
                                        pattern = { '[A-Za-z]{3,}' }
                                        required = { 'required' }
                                        valid = { 'Valid.' }
                                        invalid = { 'Please fill out this field.' }
                                    />
                                </div>

                                <div className = "form-row">
                                    <FormInput
                                        id = { 'bday' }
                                        type = { 'date' }
                                        label = { 'Date of Birth' }
                                        classType = { 'form-control' }
                                        placeholder = { 'Date Of Birth' }
                                        max = { '3000-12-31' }
                                        min = { '1000-01-01' }
                                        required = { 'required' }
                                        valid = { 'Valid.' }
                                        invalid = { 'Please fill out this field.' }
                                    />

                                    <div className = "form-radio">
                                        <label htmlFor = "gender"><b>Gender <span style = { { color: 'red' } }>*</span>
                                        </b></label>
                                        <div className = "form-flex">
                                            <input type = "radio" name = "gender" value = "male" id = "male"
                                                   defaultChecked
                                            />
                                            <label htmlFor = "male">Male</label>
                                            <input type = "radio" name = "gender" value = "female" id = "female" />
                                            <label htmlFor = "female">Female</label>
                                            <input type = "radio" name = "gender" value = "=other" id = "other" />
                                            <label htmlFor = "other">Other</label>
                                        </div>
                                    </div>
                                </div>

                                <FormInput
                                    id = { 'phone_number' }
                                    label = { 'Phone number' }
                                    classType = { 'form-control' }
                                    placeholder = { 'Enter phone number' }
                                    pattern = { '[0-9-]{8,}' }
                                    required = { 'required' }
                                    valid = { 'Valid.' }
                                    invalid = { 'Please fill out this field.' }
                                />

                                <FormInput
                                    id = { 'email' }
                                    label = { 'Email' }
                                    classType = { 'form-control' }
                                    placeholder = { 'Enter email' }
                                    pattern = { '[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,}$' }
                                    required = { 'required' }
                                    valid = { 'Valid.' }
                                    invalid = { 'Please fill out this field.' }
                                />

                                <FormInput
                                    id = { 'username' }
                                    label = { 'Username' }
                                    classType = { 'form-control' }
                                    placeholder = { 'Enter username' }
                                    pattern = { '[A-Za-z]{3,}' }
                                    required = { 'required' }
                                    valid = { 'Valid.' }
                                    invalid = { 'Please fill out this field.' }
                                />

                                <div className = "form-row">
                                    <FormInput
                                        id = { 'password' }
                                        label = { 'Password' }
                                        classType = { 'form-control' }
                                        type = { 'password' }
                                        placeholder = { 'Enter password' }
                                        pattern = { '(?=.*\\d)(?=.*[a-z])(?=.*[A-Z]).{8,}' }
                                        required = { 'required' }
                                        valid = { 'Valid.' }
                                        invalid = { 'Must contain at least one number and one uppercase and lowercase '
                                        + 'letter, and at least 8 or more characters.' }
                                    />

                                    <FormInput
                                        id = { 're_password' }
                                        label = { 'Repeat your password' }
                                        type = { 'password' }
                                        classType = { 'form-control' }
                                        placeholder = { 'Repeat your password' }
                                        pattern = { '(?=.*\\d)(?=.*[a-z])(?=.*[A-Z]).{8,}' }
                                        required = { 'required' }
                                        valid = { 'Valid.' }
                                        invalid = { 'Must be the same password.' }
                                    />
                                </div>
                                <div className = "form-row">
                                    <FormInput
                                        id = { 'address' }
                                        label = { 'Address' }
                                        placeholder = { 'Enter Address' }
                                    />

                                    <FormInput
                                        id = { 'ZipCode' }
                                        label = { 'Zip Code' }
                                        placeholder = { 'Enter the Zip code' }
                                    />

                                    <FormInput
                                        id = { 'City' }
                                        label = { 'City' }
                                        placeholder = { 'Enter the city you live in' }
                                    />

                                    <FormInput
                                        id = { 'Number' }
                                        label = { 'Number' }
                                        placeholder = { 'Enter the number of you address' }
                                    />

                                </div>

                                <div id = "term-check" className = "Term Class">
                                    <input type = "checkbox" name = "term"/>
                                    <p><b>By creating an account you agree to our <a data-toggle="modal" href={"#exampleModalLong"}>Terms & Privacy</a>.</b></p>

                                </div>
                                <div className="modal fade" id="exampleModalLong" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLong" aria-hidden="true">>
                                    <div className="modal-dialog" role="document">
                                        <div className="modal-content">
                                            <div className="modal-header">
                                                <h5 className="modal-title" id="exampleModalLongTitle">Terms & Privacy</h5>
                                                <button type="button" className="close" data-dismiss="modal"
                                                        aria-label="Close">
                                                    <span aria-hidden="true">&times;</span>
                                                </button>
                                            </div>
                                            <div className="modal-body">
                                                Terms & Privacy Conditions
                                                <br/>
                                                ...
                                                <br/>
                                                ...
                                                <br/>
                                                ...
                                            </div>
                                            <div className="modal-footer">
                                                <button type="button" className="btn btn-secondary"
                                                        data-dismiss="modal">Close
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className = "form-group">
                                    {/*<form method = "get" action = "#">*/}
                                        <button type = "submit" className = "registerbtn">Register</button>
                                    {/*</form>*/}
                                </div>
                            </form>

                            {/*<p className = "signLink"><b>Already have an account? </b><a href = "#">Sign in</a>.</p>*/}
                        </div>
                    </div>
                </section>
            </div>
        );
    }
}

export default Register;