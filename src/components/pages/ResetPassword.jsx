import React, {Component} from "react";

// export const ResetPassword = ({ match }) => ( <div> <h3>ID: {match.params.id}</h3> </div> );

import '../assets/styles/resetPassword.css';
import {resetPass} from "../../repository";

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
            alert("Passwords don't match");
        }
        const data ={
            token: id,
            username:this.state.username,
            password: this.state.password,
        };
        //ResetPassword is working, but i need to fix the submit button
        //so it can goes to home. However, it must shows if it was success or not.
        //Last, users creds are at URL not sure why.
        //Today, i need to fix Verification!!!.
        this.setState({isLoading: true});
        resetPass(data)
            .then(() => {
                alert("Error.")
            })
            // .then((response) => {
            //         if(response.data ==='Success reset.'){
            //             alert("Password changed successfully. Proceed to log in. ")
            //         }else if(response.data ==='Failed to reset.'){
            //             alert("There was an error! Please check your credentials.")
            //         }
            // })
            // .catch((error)=>{
            //     console.log(error.data)
            // })
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