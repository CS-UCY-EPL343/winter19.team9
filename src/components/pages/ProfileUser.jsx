import React, { Component } from 'react';
import '../assets/styles/profile.css';
import '../assets/styles/timetable.css';
import SettingsProfile      from '../common/SettingsProfile';
import ProfileInfo          from '../common/ProfileInfo';
import BmiCalc              from '../common/BMICalc';
import Timetable            from '../common/Timetable';
import { Redirect }         from 'react-router-dom';

class ProfileUser extends Component {
    render() {
        return (
            <div id='profile' className="main-container container-fluid">
                { (this.props.userLevel === 'user') ? '' : <Redirect to = "/" /> }

                <div className="container-fluid">
                    <div className="row ">
                        <SettingsProfile />
                        <ProfileInfo/>
                        <BmiCalc/>

                    </div>
                </div>
                <Timetable />

            </div>

        );
    }
}

export default ProfileUser;