import React, {Component}                  from 'react';
import '../assets/styles/profile.css';
import '../assets/styles/timetable.css';
import SettingsProfile                     from '../common/SettingsProfile';
import ProfileInfo                         from '../common/ProfileInfo';
import BookClass                           from '../common/BookClass';
import Timetable
                                           from '../common/EnrolledClassSchedule';
// noinspection ES6CheckImport
import {Redirect}                          from 'react-router-dom';
import {loggedInVisit, updateProfileVisit} from '../../repository';

class ProfileUser extends Component {
  componentDidMount() {
    loggedInVisit().then();
    updateProfileVisit().then();
  }

  constructor(props) {
    super(props);
    this.state = {
      ClassID      : '',
      DayCode      : '',
      TimeCode     : '',
      CoachID      : '',
      User_ID      : '',
      EnrollID     : '',
      flag         : '',
      classSchedule: [],
      Name         : '',
      loadingInfo  : 2,
    };
    this.handleSelections = this.handleSelections.bind(this);
    this.toggleLoading = this.toggleLoading.bind(this);
  }

  handleSelections = (DayCode, TimeCode, flag, ClassID, Name) => {
    this.setState({
      DayCode,
      TimeCode,
      flag,
      ClassID,
      Name,
    }, () => {
      // console.log("General Kenobi");
      // console.log(this.state.classSchedule);
    });

  };

  toggleLoading = () => {
    this.setState({loadingInfo: this.state.loadingInfo - 1});
  };

  render() {
    return (
        <div id = 'profile' className = "main-container container-fluid">
          { (this.props.userLevel === 'user') ? '' :
              <Redirect to = "/" /> }

          <div className = "container-fluid mb-4">
            <div className = "row ">
              <SettingsProfile userLevel = { this.props.userLevel } />
              <ProfileInfo loadingInfo = { this.state.loadingInfo }
                           toggleLoading = { this.toggleLoading }
              />
              <BookClass getSelections = { this.handleSelections } />
            </div>
          </div>
          <Timetable DayCode = { this.state.DayCode }
                     TimeCode = { this.state.TimeCode }
                     flag = { this.state.flag }
                     ClassID = { this.state.ClassID }
                     Name = { this.state.Name }
                     toggleLoading = { this.toggleLoading }
              // User_ID = {this.state.User_ID}
              // classSchedule = {this.state.classSchedule}
          />
        </div>
    );
  }
}

export default ProfileUser;