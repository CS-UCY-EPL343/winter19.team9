import React, { Component } from 'react';
import { Redirect }         from 'react-router-dom';

class ProfileCoach extends Component {
    render() {
        return (
            <div id='profile' className="main-container container-fluid">
                { (this.props.userLevel === 'coach') ? '' : <Redirect to = "/" /> }

                Coach

            </div>

        );
    }
}

export default ProfileCoach;