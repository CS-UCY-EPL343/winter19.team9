import React, {Component} from "react";

// export const ResetPassword = ({ match }) => ( <div> <h3>ID: {match.params.id}</h3> </div> );

import '../assets/styles/resetPassword.css';
import {resetPass} from "../../repository";
import Swal from "sweetalert2";

class ResetPassword extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            confirmPassword: '',
            confirm: false,
            isLoading: false,
        };

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange = (e) => {
        this.setState({[e.target.name]: e.target.value})
    };

    getID = (e) => {
        e.preventDefault();
        const {id} = this.props.match.params;
        this.setState({confirm: false});
        if (this.state.password !== this.state.confirmPassword) {
            Swal.fire(
                'The password and confirm Password dont match',
                '',
                'warning',
            ).then(() => {
                return 1;
            });
        } else if (!this.state.password.match(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/,)) {
            Swal.fire(
                'The password must have 8 characters small and caps letters and 1 number',
                '',
                'warning',
            ).then(() => {
                return 1;
            });
        } else {
            const crypto = require('crypto');
            const hashCode = crypto.createHmac('sha256', 'ffn_private_key_!!!!')
                .update(this.state.password)
                .digest('hex');
            this.setState({isLoading: true});
            const data = {
                token: id,
                username: this.state.username,
                password: hashCode,
            };
            resetPass(data)
                .then(() => console.log("HERE"))
                .catch(()=> console.log("catch"))
                .finally(()=> console.log("blabla"));
        }
    };

    render() {
        return (
            <div id={"ResetPassword"}>
                <div className={"newPassword"}>
                    <div className={"newHeading"}>
                        <h1>Reset Your Password</h1>
                    </div>
                    <p>Please fill the boxes below to reset your <i>password</i>.</p>
                    <form className={"newPassword"}>
                        <input type={"text"} placeholder={"Username"} name={"username"} onChange={this.handleChange}
                               required/>
                        <input type={"password"} placeholder={"New Password"} name={"password"}
                               onChange={this.handleChange} required/>
                        <input type={"password"} placeholder={"Confirm Password"} name={"confirmPassword"}
                               onChange={this.handleChange} required/>
                        <input type={"submit"} value={"Submit"} onClick={this.getID}/>
                    </form>
                </div>
            </div>
        );
    }
}

export default ResetPassword;