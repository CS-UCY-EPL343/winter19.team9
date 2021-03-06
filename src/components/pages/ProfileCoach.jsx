import React, {Component} from 'react';
// noinspection ES6CheckImport
import {Redirect}         from 'react-router-dom';
import '../assets/styles/adminCoachProfile.css';
import {
  getPrivateAnnouncementsAdmin,
  userDetails,
  updateAnnouncement,
  deleteAnnouncement,
  addPrivateAnnouncement,
  loggedInVisit,
  updateProfileVisit,
  staffData,
  getAccountID,
}                         from '../../repository';

import AnnouncementModal         from '../common/AnnouncementModal';
import {Button}                  from 'reactstrap';
import Box                       from '../common/SelectionPTCoach';
import Timetable                 from '../common/CoachSchedule';
import AnnouncementsPrivateModal from '../common/AnnouncementsPrivateModal';
import Swal                      from 'sweetalert2';
import ButtonLoader              from '../common/ButtonLoader';
import ToggleModal               from '../common/ToggleModal';
import MessagesModalAdminCoach   from '../common/MessagesModalAdminCoach';

class ProfileCoach extends Component {

    // noinspection DuplicatedCode
    constructor(props) {
        super(props);
        this.state = {
            userAccountID        :'',
            nameStart            : '',
            Name                 : '',
            Surname              : '',
            Email                : '',
            username             : '',
            searchResults        : [],
            announcements        : [],
            modal                : false,
            modal2               : false,
            modalTitle           : '',
            modalMessage         : '',
            modalAnnId           : '',
            day                  : '',
            time                 : '',
            flag                 : false,
            image                : '',
            User_ID              : '',
            Coach_ID             : '',
            loadingSearchUser    : false,
            loadingInfo          : false,
            trainingScheduleCoach: [],
            cleared              : false,
            ownerName            :''
        };

    this.toggleAnnouncementsData = this.toggleAnnouncementsData.bind(this);
    this.onAnnouncementSubmit = this.onAnnouncementSubmit.bind(this);
    this.toggleAnnouncementsData2 = this.toggleAnnouncementsData2.bind(this);
    this.onAnnouncementSubmit2 = this.onAnnouncementSubmit2.bind(this);
    this.handleDayTimeChange = this.handleDayTimeChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.toggleAnnouncements = this.toggleAnnouncements.bind(this);
    this.toggleAnnouncements2 = this.toggleAnnouncements2.bind(this);
    this.searchButton = this.searchButton.bind(this);
    this.userDropdown = this.userDropdown.bind(this);
    this.onAnnouncementDelete = this.onAnnouncementDelete.bind(this);
    this.clearOptions = this.clearOptions.bind(this);
  }

  componentDidMount() {
    loggedInVisit().then();
    updateProfileVisit().then();
    staffData().then(response => {
      this.setState({ownerName: response.username});
    });
  }

  onSubmit = (e) => {
    e.preventDefault();
    this.clearOptions();
    this.setState({loadingSearchUser: true}, () => {
      userDetails(this.state.nameStart)
          .then(response => {
            this.setState({searchResults: response, loadingSearchUser: false});
          });
    });
  };

  toggleMessages = () => {
    this.setState({modalMessages: !this.state.modalMessages});
  };

  // noinspection DuplicatedCode
  onAnnouncementSubmit = async(Title, Message, Ann_ID) => {
    if (this.state.level <= 1) {
      Swal.fire(
          'You are not authorized to do this!',
          'Please log in and try again...',
          'error',
      ).then();
      return false;
    }

    if (Title === this.state.announcements[this.state.modalAnnId].Title
        && Message
        === this.state.announcements[this.state.modalAnnId].Message) {
      Swal.fire(
          'Please give new data to update',
          '',
          'error',
      ).then();
      return false;
    }

    if (Title === '' || Message === '') {
      Swal.fire(
          'Please fill in all boxes',
          '',
          'error',
      ).then();
      return false;
    }

    let flag = false;
    await updateAnnouncement(Ann_ID, Title, Message).then(response => {
      this.setState({
        announcements: this.state.announcements.map(ann => {
          let x = ann;
          if (ann.ANNOUNCEMENT_ID === response.ANNOUNCEMENT_ID) {
            // noinspection JSPrimitiveTypeWrapperUsage
            x.Title = Title;
            // noinspection JSPrimitiveTypeWrapperUsage
            x.Message = Message;
            // noinspection JSPrimitiveTypeWrapperUsage
            x.Ann_ID = Ann_ID;
          }
          return x;
        }),
      });
      this.toggle();
    }).then(() => {
      flag = true;
      Swal.fire(
          'Private Announcement was updated successfully',
          '',
          'success',
      );
      this.toggle();
    }).catch(() => Swal.fire(
        'Something went wrong',
        'Please try again...',
        'error',
    ));

    return flag;
  };

  // noinspection DuplicatedCode
  onAnnouncementDelete = async(ANNOUNCEMENT_ID) => {
    if (this.state.level <= 1) {
      Swal.fire(
          'You are not authorized to do this!',
          'Please log in and try again...',
          'error',
      ).then();
      return false;
    }

    let flag = false;
    await Swal.fire({
      title             : 'Are you sure?',
      text              : 'You won\'t be able to revert this!',
      icon              : 'warning',
      showCancelButton  : true,
      confirmButtonColor: '#3085D6',
      cancelButtonColor : '#DD3333',
      confirmButtonText : 'Yes, delete it!',
    }).then(async(result) => {
      if (result.value) {
        await deleteAnnouncement(
            this.state.announcements[ANNOUNCEMENT_ID].ANNOUNCEMENT_ID)
            .then(() => {
              this.setState({
                announcements: this.state.announcements.filter(
                    ann => ann.ANNOUNCEMENT_ID
                           !== this.state.announcements[ANNOUNCEMENT_ID].ANNOUNCEMENT_ID),
              }, () => Swal.fire(
                  'Private Announcement deleted successfully',
                  '',
                  'success',
              ));
              flag = true;
            })
            .catch(() => Swal.fire(
                'Something went wrong',
                'Please try again...',
                'error',
            ));
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
            'Cancelled',
            'Your Private Announcement is safe :)',
            'error',
        ).then();
      }
    });

    return flag;
  };

  // noinspection DuplicatedCode
  onAnnouncementSubmit2 = async(Title, Message) => {
    if (this.state.level <= 1) {
      Swal.fire(
          'You are not authorized to do this!',
          'Please log in and try again...',
          'error',
      ).then();
      return false;
    }

    if (!this.state.username || this.state.username === '') {
      Swal.fire(
          'Please select a user first',
          '',
          'error',
      ).then();
      return false;
    }

    if (Title === '' || Message === '') {
      Swal.fire(
          'Please fill in all boxes',
          '',
          'error',
      ).then();
      return false;
    }

    let flag = false;
    await addPrivateAnnouncement(Title, Message, this.state.username)
        .then(response => {
          let prevAnn = this.state.announcements.slice(0);
          prevAnn.push(
              {
                ANNOUNCEMENT_ID: response.data.ANNOUNCEMENT_ID,
                Title          : Title,
                Message        : Message,
                TIMESTAMP      : new Date().toISOString(),
              });
          this.setState({announcements: prevAnn});
        }).then(() => {
          flag = true;
          Swal.fire(
              'Private Announcement added successfully',
              '',
              'success',
          );
          this.toggle2();
        }).catch(() => Swal.fire(
            'Something went wrong',
            'Please try again...',
            'error',
        ));

    return flag;
  };

  toggle = () => {
    if (this.state.level <= 1) {
      return;
    }
    this.setState({modal: !this.state.modal});
  };

  toggle2 = () => {
    if (this.state.level <= 1) {
      return;
    }
    this.setState({modal2: !this.state.modal2});
  };

  searchButton = (e) => {
    this.setState({nameStart: e.target.value});
  };

  userDropdown = (e) => {
    const username = e.target.value;
    const user = this.state.searchResults.find(
        usr => usr.username === username);
    if (!user) {
      return null;
    }

    this.setState({loadingInfo: true}, async() => {
      await this.updateCoaches(user, username);
      await this.updatePrivateAnnouncements(username);
      this.setState({loadingInfo: false});
    });
  };

    updateCoaches = async(user, username) => {
        return new Promise((resolve) => {
            this.setState({
                Name   : user.Name,
                Surname: user.Surname,
                Email  : user.Email,
                username,
                // image: user.image,
                User_ID: user.User_ID,
                cleared: false,
            }, () => {
                getAccountID(this.state.username).then(response => {
                    this.setState({userAccountID: response.AccountID}, () =>{
                    })
                });
            });
            return resolve();
        });
    };

  updatePrivateAnnouncements = async(username) => {
    return new Promise((resolve) => {
      getPrivateAnnouncementsAdmin(username).then(response => {
        this.setState({announcements: response.data.announcements});
      });
      return resolve();
    });
  };

  toggleAnnouncements = () => {
    this.setState({modalAnnouncements: !this.state.modalAnnouncements});
  };

  toggleAnnouncements2 = () => {
    this.setState({modalAnnouncements2: !this.state.modalAnnouncements2});
  };

  handleDayTimeChange = (day, time, flag, Coach_ID) => {
    this.setState({day, time, flag, Coach_ID}, () => {
    });
  };

  toggleAnnouncementsData = (e) => {
    const x = this.state.announcements[e.target.id - 100];
    if (x === undefined) {
      return;
    }

    this.setState({
      modalTitle  : x.Title,
      modalMessage: x.Message,
      modalAnnId  : e.target.id - 100,
    }, () => {
      this.toggleAnnouncements();
    });
  };

  toggleAnnouncementsData2 = () => {
    this.toggleAnnouncements2();
  };

  clearOptions() {
    this.setState({User_ID: '', announcements: [], cleared: true});
    const clientList = document.getElementById('userList');
    clientList.value = '';
  }

  render() {
    return (
        <div id = 'profile' className = "">
          { (this.props.userLevel === 'coach') ? '' : <Redirect to = "/" /> }
          <div className = "container-back">
            <div className = "row">
              <div className = "col-md-4">
                <h4>Search for Client:</h4>
                <form className = "adminViewClient">
                  <div className = "d-flex bd-highlight">
                    <div className = "p-lg-2 flex-fill w-100">
                      <input className = "h-100 w-100 m-0"
                             name = { 'Name' }
                             onChange = { this.searchButton }
                             type = "text"
                             placeholder = "Search"
                             aria-label = "Search"
                             id = "searchClient"
                      />
                    </div>
                    <div className = "p-sm-1 flex-fill bd-highlight ">
                      <ButtonLoader text = { '' }
                                    textIcon = { true }
                                    loadingText = { '' }
                                    size = { 'lg' }
                                    type = { 'submit' }
                                    onClick = { this.onSubmit }
                                    loading = { this.state.loadingSearchUser }
                      />
                    </div>
                  </div>
                </form>
                <br />
                <div className = "form-group">
                  <label htmlFor = "userList"><h6>Clients Retrieved:</h6>
                  </label>
                  <select className = "form-control"
                          name = { 'username' }
                          id = "userList"
                          onChange = { this.userDropdown }
                          required
                  >
                    <option value = "" hidden>Client List Generated</option>
                    { this.state.searchResults.map((res, index) => {
                      return <option value = { res.username } key = { index }>
                        { res.Name } { res.Surname } { res.username }
                      </option>;
                    })
                    }

                                </select>
                            </div>
                        </div>
                        <div className = "col-md-4">
                            <Box toogle = { this.handleDayTimeChange }
                                 userID = { this.state.User_ID }
                            />
                        </div>
                        <div className = "col-md-4">
                            <label htmlFor = "comment"><h4>Messages:</h4></label>
                            <div className="form-group">
                                <Button className = { 'nav-link menu-box-tab menu-text ' }
                                        onClick = { this.toggleMessages }
                                        style = { {width: '100%'} }
                                >
                                    <i className = "scnd-font-color fa fa-envelope" /> Exchange Messages with this Client
                                    { this.state.TotalMessages > 0 &&
                                    <div className = "menu-box-number">{ this.state.TotalMessages }</div> }
                                </Button>
                                <ToggleModal
                                    modal = { this.state.modalMessages }
                                    toggle = { this.toggleMessages }
                                    modalSize = { 'md' }
                                    modalHeader = { 'Messages' }
                                    modalBody = {
                                        <MessagesModalAdminCoach
                                            userName = {this.state.ownerName}
                                            userLevel = { this.props.userLevel}
                                            TotalMessages = { this.state.TotalMessages }
                                            toggleTotalMessages = { this.toggleTotalMessages }
                                            username = {this.state.username}
                                            user_ID = {this.state.userAccountID}
                                        /> }
                                />
                            </div>
                            <br/>
                            <label htmlFor = "comment"><h4>Announcements:</h4></label>
                            <div className = "menu-box-tab menu-text" id = "EditAnns">
                                { this.state.announcements.sort(
                                    function(a, b) {
                                        return b.ANNOUNCEMENT_ID
                                            - a.ANNOUNCEMENT_ID;
                                    }).map((ann, index) => {
                                    return <Button className = "nav-link menu-box-tab menu-text"
                                                   onClick = { this.toggleAnnouncementsData.bind(
                                                       this) } id = { index + 100 }
                                                   key = { index }
                                    ><i style = { {marginRight: 10 + 'px'} }
                                        className = "scnd-font-color fa fa-tasks"
                                    />
                                        { ann.Title }{ <p> (</p> }{ ann.TIMESTAMP[0] }
                                        { ann.TIMESTAMP[1] }{ ann.TIMESTAMP[2] }{ ann.TIMESTAMP[3] }{ ann.TIMESTAMP[4] }{ ann.TIMESTAMP[5] }
                                        { ann.TIMESTAMP[6] }{ ann.TIMESTAMP[7] } { ann.TIMESTAMP[8] }{ ann.TIMESTAMP[9] }{
                                            <p
                                                id = "extra"
                                            >)</p> }
                                    </Button>;
                                }) }

                </div>
                <Button id = "addAnn"
                        className = { ' edit nav-link menu-box-tab menu-text ' }
                        onClick = { this.toggleAnnouncements2 }
                >
                  <i style = { {marginRight: 10 + 'px'} }
                     className = "scnd-font-color fa fa-tasks"
                  /> Add Announcement
                </Button>
                <AnnouncementsPrivateModal
                    onSubmit = { this.onAnnouncementSubmit2 }
                    toggle = { this.toggleAnnouncements2 }
                    modal = { this.state.modalAnnouncements2 }
                    resetOnSubmit = { true }
                />
                <AnnouncementModal onSubmit = { this.onAnnouncementSubmit }
                                   DeleteAnn = { this.onAnnouncementDelete }
                                   toggle = { this.toggleAnnouncements }
                                   modal = { this.state.modalAnnouncements }
                                   announcements = { this.state.announcements }
                                   title = { this.state.modalTitle }
                                   message = { this.state.modalMessage }
                                   announcement_id = { this.state.modalAnnId }
                                   isPrivate = { true }
                />


              </div>
            </div>

            <div className = "row">
              <div id = "timeTableHeading">Personal Training Schedule
              </div>
              <div className = "col-md-12 col-lg-12">
                <Timetable day = { this.state.day }
                           time = { this.state.time }
                           flag = { this.state.flag }
                           coachID = { this.state.Coach_ID }
                           userID = { this.state.User_ID }
                           userName = { this.state.Name + '\r\n'
                                        + this.state.Surname }
                           cleared = { this.state.cleared }
                           invalid = { this.state.invalid }
                />
              </div>
            </div>
          </div>
        </div>

    );

  }
}

export default ProfileCoach;