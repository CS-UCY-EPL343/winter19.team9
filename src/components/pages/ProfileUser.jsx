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
    };
    this.handleSelections = this.handleSelections.bind(this);
    // this.handleAllSelections = this.handleAllSelections.bind(this);
  }

  // handleAllSelections = (User_ID) => {
  //     this.setState({
  //         User_ID,
  //     }, () => {
  //         console.log("handleAllSelections - done");
  //         // console.log(this.state.classSchedule);
  //     });
  // };

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

  render() {
    return (
        <div id = 'profile' className = "main-container container-fluid">
          { (this.props.userLevel === 'user') ? '' :
              <Redirect to = "/" /> }

          <div className = "container-fluid mb-4">
            <div className = "row ">
              <SettingsProfile userLevel = { this.props.userLevel } />
              <ProfileInfo />
              <BookClass getSelections = { this.handleSelections } />
            </div>
          </div>
          <Timetable DayCode = { this.state.DayCode }
                     TimeCode = { this.state.TimeCode }
                     flag = { this.state.flag }
                     ClassID = { this.state.ClassID }
                     Name = { this.state.Name }
              // User_ID = {this.state.User_ID}
              // classSchedule = {this.state.classSchedule}
          />
        </div>
    );
  }
}

export default ProfileUser;