import React, {Component} from "react";

// export const ResetPassword = ({ match }) => ( <div> <h3>ID: {match.params.id}</h3> </div> );

import '../assets/styles/resetPassword.css';
import {resetPass} from "../../repository";
import Swal from "sweetalert2";

class ResetPassword extends Component{
    constructor(props){
        super(props);
        this.state ={
            username:'',
            password:'',
            confirmPassword:'',
            confirm:false,
            isLoading: false,
        };

        this.handleChange = this.handleChange.bind(this);
    }
    handleChange =(e)=>{
        this.setState({[e.target.name]: e.target.value})
    };

    getID =()=>{
        const { id } = this.props.match.params;
        this.setState({confirm: false});
        if(this.state.password !== this.state.confirmPassword){
            Swal.fire(
                'The password and confirm Password dont match',
                '',
                'warning',
            ).then();
        }else if (!this.state.password.match(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/,)){
            Swal.fire(
                'The password mus have 8 character small and caps letters and 1 number',
                '',
                'warning',
            ).then();
        }else {
            const crypto = require('crypto');
            const hashCode = crypto.createHmac('sha256', 'ffn_private_key_!!!!')
                .update(this.state.password)
                .digest('hex');

            const data = {
                token: id,
                username: this.state.username,
                password: hashCode,
            };
            this.setState({isLoading: true});
            resetPass(data)
                .then(() => {
                    Swal.fire(
                        'Successfully reset password',
                        '',
                        'success',
                    ).then(() => {window.location.replace('/');});
                })

        }
    };
    render() {
        return(
            <div id={"ResetPassword"}>
                <div className={"newPassword"}>
                    <div className={"newHeading"}>
                        <h1>Reset Your Password</h1>
                    </div>
                    <p>Please fill the boxes below to reset your <i>password</i>.</p>
                    <form className={"newPassword"}>
                        <input type={"text"} placeholder={"Username"} name={"username"} onChange={this.handleChange} required/>
                        <input type={"password"} placeholder={"New Password"} name={"password"} onChange={this.handleChange} required/>
                        <input type={"password"} placeholder={"Confirm Password"} name={"confirmPassword"} onChange={this.handleChange} required/>
                        <input type={"submit"} value={"Submit"} onClick={this.getID}/>
                    </form>
                </div>
            </div>
        );
    }
}
export default ResetPassword;