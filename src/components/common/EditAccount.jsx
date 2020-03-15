import React, {Component} from 'react';

import '../assets/styles/EditAccountModal.css'
import {logOut, userData} from "../../repository";
import {postuserData} from "../../repository";
import {deleteUserData} from "../../repository";

class EditAccount extends Component {
    constructor(props) {
        super(props);
        this.state = {
            file: '',
            imagePreviewUrl: '',
            username: '',
            Email: '',
            Name: '',
            Surname: '',
            password: '',
            confirmPassword: ''
        };
    }

    handleSubmit = () => {
        const {password, confirmPassword} = this.state;
        // perform all neccassary validations
        if (password !== confirmPassword) {
            alert("Passwords don't match");
            return 1;

        } else {
            return 0;
        }
    };

    refreshPage() {
        window.location.reload(false);
    }

    deleted = () => {
        if (window.confirm('Delete the item?')) {
            deleteUserData().then(() => {
                alert('Success');
                logOut();
                window.location.replace('/');
            }).catch(err => alert(err));
        }
    };

    componentDidMount() {
        userData()
            .then(response => {
                console.log(response);
                this.setState(response);
                this.setState({confirmPassword: response.password});
            });

    }

    onValueInput = (e) => {
        this.setState({[e.target.name]: e.target.value});
    };

    Test = () => {
        if (this.handleSubmit() !== 1)
            postuserData(this.state).then(() => alert('Success')).catch(err => alert(err));

    };


    _handleImageChange(e) {
        e.preventDefault();

        let reader = new FileReader();
        let file = e.target.files[0];

        reader.onloadend = () => {
            this.setState({
                file: file,
                imagePreviewUrl: reader.result
            });
        };

        reader.readAsDataURL(file)
    }

    render() {
        let {imagePreviewUrl} = this.state;
        let $imagePreview = null;
        if (imagePreviewUrl) {
            $imagePreview = (<img src={imagePreviewUrl} alt={"Profile of user"}/>);
        }
        return (
            <div className="container" id="EditModal">
                <div className="text-center">
                    <div className="avatar-upload">
                        <div className="avatar-edit">
                            <input type='file' id="imageUpload" accept=".png, .jpg, .jpeg"
                                   onChange={(e) => this._handleImageChange(e)}/>
                            <label htmlFor="imageUpload"/>
                        </div>
                        <div className="avatar-preview">
                            <div id="imagePreview"
                                 style={{'backgroundImage': 'url(' + this.state.url + ')'}}>{$imagePreview}</div>
                        </div>
                    </div>

                </div>
                <form className="form-horizontal">
                    <h3>Personal info</h3>
                    <div className="form-group">
                        <label className="col-lg-6 control-label">First name:</label>
                        <input className="form-control" name={"Name"} onChange={this.onValueInput} type="text"
                               defaultValue={this.state.Name}/>
                    </div>
                    <div className="form-group">
                        <label className="col-lg-6 control-label">Last name:</label>
                        <input className="form-control" name={"Surname"} onChange={this.onValueInput} type="text"
                               defaultValue={this.state.Surname}/>
                    </div>

                    <div className="form-group">
                        <label className="col-lg-3 control-label">Email:</label>
                        <input className="form-control" name={"Email"} onChange={this.onValueInput} type="text"
                               defaultValue={this.state.Email}/>
                    </div>

                    <div className="form-group">
                        <label className="col-md-3 control-label">Username:</label>
                        <input className="form-control" name={"username"} onChange={this.onValueInput} type="text"
                               defaultValue={this.state.username}/>
                    </div>
                    <div className="form-group">
                        <label className="col-md-3 control-label">Password:</label>
                        <input className="form-control" name={"password"} onChange={this.onValueInput} type="password"
                               defaultValue={this.state.password}/>
                    </div>
                    <div className="form-group">
                        <label className="col-md-6 control-label">Confirm password:</label>
                        <input className="form-control" name={"confirmPassword"} onChange={this.onValueInput}
                               type="password"
                               defaultValue={this.state.confirmPassword}/>
                    </div>
                    <div className="form-group" id="buttons">
                        <label className="col-md-12 control-label" id="savel">
                            <input type="button" className="btn btn-primary" defaultValue="Save Changes" id="save"
                                   onClick={this.Test}/>
                        </label>
                        <label className="col-md-12 control-label" id="resetl">
                            <input onClick={this.refreshPage} type="reset" className="btn btn-default" value="Reset"
                                   id="reset"/>
                            <input type="button" className="btn btn-default" defaultValue="Delete Account" id="delete"
                                   onClick={this.deleted}/>
                        </label>

                    </div>
                </form>
            </div>


        )
            ;
    }
}

export default EditAccount;