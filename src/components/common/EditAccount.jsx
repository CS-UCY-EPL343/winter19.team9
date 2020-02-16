import React, {Component} from 'react';

import '../assets/styles/EditAccountModal.css'


class EditAccount extends Component {
    $imagePreview;
    constructor(props) {
        super(props);
        this.state = {file: '',imagePreviewUrl: ''};
    }
/*
    _handleSubmit(e) {
        e.preventDefault();
        // TODO: do something with -> this.state.file
        console.log('handle uploading-', this.state.file);
    }*/

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
            $imagePreview = (<img src={imagePreviewUrl}  alt={"Picture"} />);
        }
        return (
            <div className="container" id="EditModal">
                <div className="text-center">
                    <div className="avatar-upload">
                        <div className="avatar-edit">
                            <input type='file' id="imageUpload" accept=".png, .jpg, .jpeg" onChange={(e)=>this._handleImageChange(e)}/>
                            <label htmlFor="imageUpload" />
                        </div>
                        <div className="avatar-preview" >
                            <div id="imagePreview" style={{'background-image': 'url(' + this.state.url + ')'} }>{$imagePreview}</div>
                        </div>
                    </div>

                </div>
                <form className="form-horizontal" role="form">
                    <h3>Personal info</h3>
                    <div className="form-group">
                        <label className="col-lg-3 control-label">First name:</label>
                        <input className="form-control" type="text"  defaultValue ="Jane"/>
                    </div>
                    <div className="form-group">
                        <label className="col-lg-3 control-label">Last name:</label>
                        <input className="form-control" type="text" defaultValue="Bishop"/>
                    </div>

                    <div className="form-group">
                        <label className="col-lg-3 control-label">Email:</label>
                        <input className="form-control" type="text" defaultValue="janesemail@gmail.com"/>
                    </div>

                    <div className="form-group">
                        <label className="col-md-3 control-label">Username:</label>
                        <input className="form-control" type="text" defaultValue="janeuser"/>
                    </div>
                    <div className="form-group">
                        <label className="col-md-3 control-label">Password:</label>
                        <input className="form-control" type="password" defaultValue="11111122333"/>
                    </div>
                    <div className="form-group">
                        <label className="col-md-6 control-label">Confirm password:</label>
                        <input className="form-control" type="password" defaultValue="11111122333"/>
                    </div>
                    <div className="form-group">
                        <label className="col-md-3 control-label"/>
                        <input type="button" className="btn btn-primary" defaultValue="Save Changes"/>
                        <span/>
                        <input type="reset" className="btn btn-default" defaultValue="Cancel" id = "reset"/>
                    </div>
                </form>
            </div>


        )
            ;
    }
}

export default EditAccount;