import React, {Component} from 'react';
// import Flippy, { FrontSide, BackSide } from 'react-flippy';
import '../assets/styles/loginStyle.css'
// import {Link} from 'react-router-dom';
import {logIn, signUp} from '../../repository';
import history from "../../history";


class LoginModal extends Component {
    constructor(props) {
        super(props);

        this.state = {
            fname:"",
            lname:'',
            username: '',
            password: '',
            repeatedPassword:'',
            email:'',
            gender:'',
            med: null,
            age:'',
            bDate:'',
            toggle: true,
            value: true
        };
        this.handleChange = this.handleChange.bind(this);
        this.onRadioChange = this.onRadioChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }
    handleChange = (e) => {
        if(e.target.name === 'bDate'){
            this.setState({[e.target.name]: e.target.value});
            this.calcDate(e);
        }else{
            this.setState({[e.target.name]: e.target.value})
        }

    };
    onRadioChange = (e) =>{
        this.setState({gender: e.target.value})
    };
    changeSign = () => {
        this.setState({toggle: !this.state.toggle})
    };

    onSubmit = (e) => {
        e.preventDefault();
        logIn(this.state)
            .then(data => {
                if (!data.level) {
                    throw Error;
                }
                this.props.toggle();    // Close Modal
                this.props.setUserLevel(data.level);
                history.push('/');
            })
            .catch(err => alert(err));
    };
    onSignUp= (e) =>{
        e.preventDefault();
        if(this.state.password !== this.state.repeatedPassword){
            alert("Password dont match");
        }else {
            const dataSign = {
                username: this.state.username,
                password: this.state.password,
                fname: this.state.fname,
                lname: this.state.lname,
                email: this.state.email,
                age: this.state.age,
                gender: this.state.gender,
                level: this.state.level,
                bDate: this.state.bDate,
            };
            signUp(dataSign)
                .then(() => {
                    alert('Success');
                    history.push('/')
                })
                .catch(err => alert(err));
        }
    };
    calcDate=(dDate)=>{
        let thenD = dDate.target.value;
        let str = thenD.split("-");
        let now = new Date();
        let ageDif = now.getFullYear() - str[0];
        this.setState({age: ageDif})
    };
    render() {
        return (

            <div className={"wrapper"} id={"LoginModal"} tabIndex={"-1"} role={"dialog"}
                 aria-labelledby={"exampleModalLabel"} aria-hidden={"true"}>
                <input type={"checkbox"} name={"flipper__checkbox"} id={"flipper__checkbox"}
                       className={"flipper__checkbox"} hidden/>

                <div className={"form__container"}>
                    {this.state.toggle ?
                        <div className={"form__login"}>
                            <h1 className={"form__header"}>Login</h1>
                            <div className={"imgcontainer"}>
                                <div className={"cursive"}>

                                </div>
                                <div className={"row"}>
                                    <div className="col-lg-12 col-md-12 col-sm-12">
                                        <i className="fa fa-facebook facebook brands"/>
                                        <i className="fa fa-twitter twitter brands"/>
                                    </div>
                                </div>
                            </div>
                            <p className={"subtitle fancy"}><span className={"cursive2"}>OR</span></p>
                            <form id={"loginForm"} action={"#"} method={"post"} className={"form"}>
                                <fieldset className={"form__group"}>
                                    <label htmlFor={"username"}>
                                    <span className={"label__icon fa fa-user coloring"}>
                                    </span>
                                    </label>
                                    <input id={"username"}
                                           name={"username"}
                                           className={"form_element"}
                                           type={"text"}
                                           pattern="^ *[a-zA-Z0-9]+.*"
                                           placeholder={"username"}
                                           required
                                           onChange={this.handleChange}/>
                                </fieldset>
                                <fieldset className={"form__group"}>
                                    <label htmlFor="password">
                                    <span className="label__icon fa fa-lock coloring">
                                    </span>
                                    </label>
                                    <input type={"password"}
                                           className={"form_element"}
                                           id={"pword"}
                                           pattern={"^ *[a-zA-Z]+.*"}
                                           placeholder={"Enter password"}
                                           name={"password"}
                                           required
                                           onChange={this.handleChange}
                                    />
                                </fieldset>
                                <fieldset className={"form__group"}>
                                    <label htmlFor={"checkbox"}>
                                        <input id={"checkbox"} name={"checkbox"}
                                               className={"checkbox--forget"} type={"checkbox"}/>
                                        {/*   <span className="icon--checkbox fa fa-check">*/}
                                        {/*</span>*/}
                                        Remember me
                                    </label>
                                    <a className={"form__link link--right"}>Forgot your password?</a>
                                    {/*  href is missing*/}
                                </fieldset>
                                <fieldset className={"form__group"}>
                                    <input className={"form__button"} type={"submit"} value={"Login"}
                                           onClick={this.onSubmit}/>
                                </fieldset>

                                <small> Not a member yet?
                                    <label htmlFor={"flipper__checkbox"} className={"form__link"}
                                           onClick={this.changeSign}>
                                        Create your account
                                    </label>
                                    .
                                </small>
                            </form>
                        </div>
                        :
                        <div className={"form__signup"}>
                            <h1 className={"form__header"}>Sign Up</h1>
                            <form id={"signupForm"} method={"post"} className={"form"}>
                                <fieldset className={"form__group"}>
                                    <label htmlFor={"signUpName"}>
                                        <span className={"label__icon fa fa-user coloring"}>
                                        </span>
                                    </label>
                                    <input name={"fname"} className={"form_element signUpName"}
                                           type={"text"} onChange={this.handleChange} placeholder={"First Name"} required/>
                                    <span>
                                           </span>
                                    <input name={"lname"} className={"form_element signUpName"}
                                           type={"text"} onChange={this.handleChange} placeholder={"Last Name"} required/>

                                </fieldset>
                                <fieldset className={"form__group"}>
                                    <label htmlFor={"username"}>
                                        <span className={"label__icon fa fa-user coloring"}>
                                        </span>
                                    </label>
                                    <input id={"signUpUsername"} name={"username"} className={"form__element"}
                                           type={"text"} onChange={this.handleChange} placeholder={"Username"} required/>
                                </fieldset>

                                <fieldset className={"form__group"}>
                                    <label htmlFor={"signUpMail"}>
                        <span className={"label__icon fa fa-envelope coloring"}>
                        </span>
                                    </label>
                                    <input id={"signUpMail"} name={"email"} className={"form__element"}
                                           type={"email"} onChange={this.handleChange} placeholder={"Email"} required/>
                                </fieldset>
                                <fieldset className={"form__group"}>
                                    <label htmlFor={"signUpPassword"}>
                        <span className={"label__icon fa fa-lock coloring"}>
                        </span>
                                    </label>
                                    <input id={"signUpPassword"} name={"password"} className={"form__element"}
                                           type={"password"} onChange={this.handleChange} placeholder={"Password"} required/>
                                </fieldset>
                                <fieldset className={"form__group"}>
                                    <label htmlFor={"signUpPasswordRepeat"}>
                        <span className={"label__icon fa fa-lock coloring"}>
                        </span>
                                    </label>
                                    <input id="signUpPasswordRepeat" name={"repeatedPassword"}
                                           className={"form__element"}
                                           type={"password"} onChange={this.handleChange} placeholder={"Repeat Password"} required/>
                                </fieldset>
                                <fieldset className={"form__group"}>
                                    <label htmlFor={"age"} id={"birthday"}>
                                        Birth Date:
                                        <span className={"fas fa-birthday-cake"}>
                                        </span>
                                    </label>
                                    <input id={"signUpAge"} name={"bDate"} className={"form_element"}
                                           type={"date"} onChange={this.handleChange} placeholder={"Birth Date"}
                                           min={"1900-01-01"} max={"2010-01-01"} required/>
                                </fieldset>
                                <fieldset className={"form__group"}>
                                    <label htmlFor={"gender"} id={"gender"}>
                                        <input type={"radio"} value={"1"} checked={this.state.gender === '1'}
                                               onChange={this.onRadioChange}/>
                                        Male
                                        <input type={"radio"} value={"2"} checked={this.state.gender ==='2'}
                                               onChange={this.onRadioChange}/>
                                        Female
                                    </label>
                                </fieldset>
                                <fieldset className={"form__group"}>
                                    <input className={"form__button"} type={"submit"} value={"Sign up"} onClick={this.onSignUp}/>
                                </fieldset>
                                <small>
                                    Are you already a member?
                                    <label htmlFor={"flipper__checkbox"}
                                           onClick={this.changeSign} className={"form__link"}>
                                        Click here to login
                                    </label>
                                    .
                                </small>
                            </form>
                            {/*>>>>>>> Stashed changes*/}
                        </div>
                    }
                </div>
            </div>
        );
    }
}

export default LoginModal;