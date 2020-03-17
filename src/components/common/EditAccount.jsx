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
            confirmPassword: '',
            image: ''
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
    onSubmit = (e) => {
        e.preventDefault();

        if (!(
            this.state.Name.match('[a-zA-Z ]+') &&
            this.state.Email.match('[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,}$') &&
            this.state.Surname.match('^ *[a-zA-Z0-9]+.'))) {
            return;
        }
        this.Test();
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

        let imageURL = 'data:image/png;base64,' + new Buffer(this.state.image, 'binary').toString('base64');

        let $imagePreview = null;
        if (this.state.image !=='' ) {
            $imagePreview = (<img src={imageURL} alt={"Picture"}/>);
        }
        if (this.state.imagePreviewUrl) {
            $imagePreview = (<img src={this.state.imagePreviewUrl} alt={"Picture"}/>);
        }

        return (
            <div className="container" id="EditModal">
                <div className="text-center">
                    <div className="avatar-upload">
                        <div className="avatar-edit">
                            <input type='file' id="imageUpload" accept=".png, .jpg, .jpeg"
                                   onChange={(e) => this._handleImageChange(e)}

                                    />
                            <label htmlFor="imageUpload"/>
                        </div>
                        <div className="avatar-preview">
                            <div id="imagePreview">{$imagePreview}</div>
                        </div>
                    </div>

                </div>
                <form className="form-horizontal needs-validation" noValidate = "novalidate" role="form" onSubmit = { this.onSubmit }>
                    <h3>Personal info</h3>
                    <div className="form-group">
                        <label className="col-lg-6 control-label">First name:</label>
                        <input className="form-control first-name-field" name={"Name"} onChange={this.onValueInput} type="text"
                               defaultValue={this.state.Name} required = "required"
                               pattern = "[a-zA-Z ]+"/> <span className="message"/>
                    </div>
                    <div className="form-group">
                        <label className="col-lg-6 control-label">Last name:</label>
                        <input className="form-control last-name-field" name={"Surname"} onChange={this.onValueInput} type="text"
                               defaultValue={this.state.Surname} required = "required"
                               pattern = "[a-zA-Z ]+"/> <span className="message"/>
                    </div>

                    <div className="form-group">
                        <label className="col-lg-3 control-label">Email:</label>
                        <input className="form-control email-field" name={"Email"} onChange={this.onValueInput} type="text"
                               defaultValue={this.state.Email}  required = "required"
                               pattern = "[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"/> <span className="message"/>
                    </div>

                    <div className="form-group">
                        <label className="col-md-3 control-label">Username:</label>
                        <input className="form-control username-field" name={"username"} onChange={this.onValueInput} type="text"
                               defaultValue={this.state.username} pattern = "[a-zA-Z0-9 ]+" required = "required"/> <span className="message"/>
                    </div>
                    <div className="form-group">
                        <label className="col-md-3 control-label">Password:</label>
                        <input className="form-control" name={"password"} onChange={this.onValueInput} type="password"
                               defaultValue={this.state.password} required = "required"/>
                    </div>
                    <div className="form-group">
                        <label className="col-md-6 control-label">Confirm password:</label>
                        <input className="form-control" name={"confirmPassword"} onChange={this.onValueInput}
                               type="password"
                               defaultValue={this.state.confirmPassword} required = "required"/>
                    </div>
                    <div className="form-group" id="buttons">
                        <label className="col-md-12 control-label" id="savel">
                            <input type="submit" className="btn btn-primary" defaultValue="Save Changes" id="save"
                                   />
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