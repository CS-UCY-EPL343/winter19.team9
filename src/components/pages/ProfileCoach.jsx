import React, { Component }                from 'react';
// noinspection ES6CheckImport
import { Redirect }                        from 'react-router-dom';
import {loggedInVisit, updateProfileVisit} from '../../repository';

class ProfileCoach extends Component {

    componentDidMount() {
        loggedInVisit().then();
        updateProfileVisit().then();
    }

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