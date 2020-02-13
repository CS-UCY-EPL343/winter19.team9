import React, { Component } from 'react';
import { Redirect }         from 'react-router-dom';

class ProfileAdmin extends Component {
    render() {
        return (
            <div id = 'profile' className = "main-container container-fluid">
                { (this.props.userLevel === 'admin') ? '' : <Redirect to = "/" /> }
                Admin

            </div>

        );
    }
}

export default ProfileAdmin;