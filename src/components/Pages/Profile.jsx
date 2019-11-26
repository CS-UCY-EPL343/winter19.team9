import React, { Component } from 'react';
import '../assets/styles/profile.css';
import '../assets/styles/timetable.css';
import SettingsProfile      from '../Common/SettingsProfile';
import ProfileInfo          from '../Common/ProfileInfo';
import BmiCalc              from '../Common/BMICalc';
import Timetable            from '../Common/Timetable';

class Profile extends Component {
    render() {
        return (
            <div id = 'profile' className = "main-container container-fluid">

                <div className = "container-fluid">
                    <div className = "row ">
                        {/*// <!-- LEFT-CONTAINER -->*/ }
                        { this.props.level === '1' ?
                            [
                                <SettingsProfile admin = { true } key={'1'} />,
                                <ProfileInfo admin = { true } key={'11'}/>,
                                <BmiCalc admin = { true } key={'111'}/>
                            ] :
                            this.props.level === '2' ?
                                [
                                    <SettingsProfile coach = { true } key={'2'}/>,
                                    <ProfileInfo coach = { true } key={'22'}/>,
                                    <BmiCalc coach = { true } key={'222'}/>
                                ] :
                                this.props.level === '3' ?
                                    [
                                        <SettingsProfile user = { true } key={'3'}/>,
                                        <ProfileInfo user = { true } key={'33'}/>,
                                        <BmiCalc user = { true } key={'333'}/>
                                    ] :
                                    false }

                    </div>
                </div>

                {/*// <!-- Timetable -->*/ }
                { this.props.level === '3' && <Timetable /> }

            </div>

        );
    }
}

export default Profile;