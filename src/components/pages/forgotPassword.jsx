import React, {Component} from 'react';
import '../assets/styles/forgotPassword.css'
import {newPassword} from "../../repository";

class forgotPassword extends Component{
    constructor(props){
        super(props);

        this.state={
            email:'',
            username:'',
            messageFromServer:'',
            showError:false,
            sendingEmail: false,
            confirming: true,
        };
        this.onMailChange = this.onMailChange.bind(this);
        this.sendEmailPass = this.sendEmailPass.bind(this);

    }

    onMailChange = (e) =>{
        this.setState({email: e.target.value});
    };

    sendEmailPass=() =>{
      if(this.state.email ===''){
          this.setState({
              messageFromServer:'',
          });
      }else{
            const input ={
                email: this.state.email,
            };
            newPassword(input)
                .then(()=>{
                    alert("done.");
                })
                .catch(error =>{
                    alert("not done."+error);
                })
                // .then(response =>{
                //     if(response.data ==='email not in db'){
                //         this.setState({
                //             showError: true,
                //             messageFromServer:'',
                //         });
                //     }else if(response.data ==='recovery email sent'){
                //         this.setState({
                //             showError: false,
                //             messageFromServer: 'recovery email sent',
                //         });
                //     }
                // })
                // .catch(error=>{
                //     console.log(error.data);
                // });
      }
    };
    render() {
        return(
            <div id={"ForgotPassword"}>
                <div className={"PasswordContainer"}>
                    <div className={"PageHeader"}>
                        <h1>Forgot your password?</h1>
                    </div>
                    <p>Enter your email.</p>
                    <form className={"passwordForm"}>
                        <input type={"email"} className={"emailText"} onChange={this.onMailChange}/>
                        <input type={"submit"} className={"emailSubmit"} value={"Submit"} onClick={this.sendEmailPass}/>
                    </form>
                </div>
            </div>
        );
    }
}
export default forgotPassword;
