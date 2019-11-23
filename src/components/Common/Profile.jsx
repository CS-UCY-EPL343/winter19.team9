import React, {Component} from 'react';
import '../assets/styles/profile.css';
import '../assets/styles/timetable.css';
import SettingsProfile from "./SettingsProfile";
import ProfileInfo from "./ProfileInfo";
import BmiCalc from "./BMICalc";
import Timetable from "./Timetable";

class Profile extends Component {
    render() {
        return (
            <div id='profile' className="main-container container-fluid">

                <div className="container-fluid">
                    <div className="row ">
                        {/*// <!-- LEFT-CONTAINER -->*/}
                        <SettingsProfile/>

                        {/*// <!-- MIDDLE-CONTAINER -->*/}
                        <ProfileInfo/>

                        {/*// <!-- RIGHT-CONTAINER -->*/}
                        <BmiCalc/>
                    </div>
                </div>

                {/*// <!-- Timetable -->*/}
                <Timetable/>

            </div>

        );
    }
}

export default Profile;