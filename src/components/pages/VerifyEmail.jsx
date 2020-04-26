import React, {Component} from "react";
import '../assets/styles/VerifyEmail.css';
import {lastVerify} from "../../repository";

class VerifyEmail extends Component{
    constructor(props){
        super(props);

        this.state={
            // token:'',
            confirm:false,
        };
    }

   componentDidMount() {
       const { id } = this.props.match.params;
       const data = {
           secret: id,
       };
       lastVerify(data)
           .then(()=>{
               // alert("Account is verified! Please Proceed to Login!.");
               this.setState({confirm: true});
           })
   }

    render() {
        return (
            <div id={"VerifyEmail"}>
                <div className={"PasswordContainer"}>
                    <div className={"PageHeader"}>
                        <h1>Verify Email</h1>
                    </div>
                    <div>
                        {this.state.confirm ?(
                            <div>
                                <h1>Your account was successfully verified!.</h1>
                            </div>
                        ):(
                            <h1>There was an error!</h1>
                        )
                        }
                    </div>
                </div>
            </div>
        );
    }
}
export default VerifyEmail;
