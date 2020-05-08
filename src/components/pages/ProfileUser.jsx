import React, {Component}                  from 'react';
import '../assets/styles/profile.css';
import '../assets/styles/timetable.css';
import SettingsProfile                     from '../common/SettingsProfile';
import ProfileInfo                         from '../common/ProfileInfo';
import BookClass                           from '../common/BookClass';
import Timetable
                                           from '../common/EnrolledClassSchedule';
// noinspection ES6CheckImport
import {Redirect}                 from 'react-router-dom';
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
      dataPT       : [],
      dataClasses  : [],
      loadingInfo  : 2,
      invalid      : '',
      image        : '',
    };
    this.handleSelections = this.handleSelections.bind(this);
    this.toggleLoading = this.toggleLoading.bind(this);
    this.handlePTClass = this.handlePTClass.bind(this);
    this.changeAvatar = this.changeAvatar.bind(this);
  }

  handleSelections = (DayCode, TimeCode, flag, ClassID, Name, invalid) => {
    this.setState({
      DayCode,
      TimeCode,
      flag,
      ClassID,
      Name,
      invalid,
    });
  };

  toggleLoading = () => {
    this.setState({loadingInfo: this.state.loadingInfo - 1});
  };

  handlePTClass = (dataClasses, dataPT) => {
    this.setState({dataPT, dataClasses});
  };

  changeAvatar = (image) => {
    this.setState({image});
  };

  render() {
    return (

        <div id = 'profile' className = "main-container container-fluid">
          {/*{ (navigator.userAgent.match(/Android/i)) &&*/}
          {/*  <NavLink to = "/"*/}
          {/*           className = { 'logout btn btn-danger text-uppercase d-flex justify-content-center' }*/}
          {/*           onClick = { this.onLogOut }*/}
          {/*  >*/}
          {/*    Logout <i className = "fas fa-sign-out-alt" />*/}
          {/*  </NavLink>*/}
          {/*}*/}
          { (this.props.userLevel === 'user') ? '' :
              <Redirect to = "/" /> }

          <div className = "container-fluid mb-4">
            <div className = "row ">
              <SettingsProfile dataPT = { this.state.dataPT }
                               classes = { this.state.dataClasses }
                               userLevel = { this.props.userLevel }
                               changeAvatar = { this.changeAvatar }
                               setUserLevel = { this.props.setUserLevel }
              />
              <ProfileInfo loadingInfo = { this.state.loadingInfo }
                           toggleLoading = { this.toggleLoading }
                           newAvatar = { this.state.image }
              />
              <BookClass getSelections = { this.handleSelections } />
            </div>
          </div>
          <Timetable DayCode = { this.state.DayCode }
                     TimeCode = { this.state.TimeCode }
                     flag = { this.state.flag }
                     ClassID = { this.state.ClassID }
                     Name = { this.state.Name }
                     invalid = { this.state.invalid }
                     userSchedule = { this.handlePTClass }
                     toggleLoading = { this.toggleLoading }
          />
        </div>

    );
  }
}

export default ProfileUser;