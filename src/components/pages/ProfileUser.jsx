import React, { Component } from 'react';
import '../assets/styles/profile.css';
import '../assets/styles/timetable.css';
import SettingsProfile from '../common/SettingsProfile';
import ProfileInfo from '../common/ProfileInfo';
import BmiCalc from '../common/BMICalc';
import Timetable from '../common/Timetable';

class ProfileUser extends Component {
    render() {
        return (
            <div id='profile' className="main-container container-fluid">

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