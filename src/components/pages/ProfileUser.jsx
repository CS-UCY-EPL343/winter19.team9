import React, {Component}                  from 'react';
import '../assets/styles/profile.css';
import '../assets/styles/timetable.css';
import SettingsProfile                     from '../common/SettingsProfile';
import ProfileInfo                         from '../common/ProfileInfo';
import BookClass                           from '../common/BookClass';
import Timetable                           from '../common/Timetable';
import {Redirect}                          from 'react-router-dom';
import {loggedInVisit, updateProfileVisit} from '../../repository';

class ProfileUser extends Component {
  componentDidMount() {
    loggedInVisit().then();
    updateProfileVisit().then();
  }

  render() {
    return (
        <div id = 'profile' className = "main-container container-fluid">
          { (this.props.userLevel === 'user') ? '' : <Redirect to = "/" /> }

          <div className = "container-fluid">
            <div className = "row ">
              <SettingsProfile userLevel = { this.props.userLevel } />
              <ProfileInfo />
              <BookClass />

            </div>
          </div>
          <Timetable />

        </div>

    );
  }
}

export default ProfileUser;