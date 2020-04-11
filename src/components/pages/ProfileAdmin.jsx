import React, {Component}        from 'react';
import {Redirect}                from 'react-router-dom';
import '../assets/styles/adminProfile.css';
import {
    getPrivateAnnouncementsAdmin,
    userDetails,
    updateAnnouncement,
    // removeAnnouncement,
    deleteAnnouncement,
    addPrivateAnnouncement,
    getPersonalTraining,
    getAllCoaches,
    getCoachTraining,
    loggedInVisit,
    updateProfileVisit,
    userPic,
    getClassSchedule,
    getPersonalSchedule
} from "../../repository";
import AnnouncementModal from "../common/AnnouncementModal";
import {Button} from "reactstrap";
import Box from "../common/SelectClassRegistration";
import Timetable from "../common/PersonalTrainingCreate";
import AnnouncementsPrivateModal from '../common/AnnouncementsPrivateModal';
import Swal                      from 'sweetalert2';
import ButtonLoader              from '../common/ButtonLoader';

class ProfileAdmin extends Component {

    // noinspection DuplicatedCode
    constructor(props) {
        super(props);
        this.state = {
            nameStart: '',
            Name: '',
            Surname: '',
            Email: '',
            username: '',
            searchResults: [],
            announcements: [],
            modal: false,
            modal2   : false,
            modalTitle: '',
            modalMessage: '',
            modalAnnId: '',
            day: '',
            time: '',
            flag: false,
            image: '',
            User_ID: '',
            personalTraining: [],
            selectedCoaches: [],
            Coach_ID: '',
            loadingSearchUser: false,
            trainingScheduleCoach: [],
            classSchedule: [],
            coachIDAssigned: ''
        };

        this.toggleAnnouncementsData = this.toggleAnnouncementsData.bind(this);
        this.onAnnouncementSubmit = this.onAnnouncementSubmit.bind(this);
        this.toggleAnnouncementsData2 = this.toggleAnnouncementsData2.bind(this);
        this.onAnnouncementSubmit2 = this.onAnnouncementSubmit2.bind(this);
        this.handleDayTimeChange = this.handleDayTimeChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.toggleAnnouncements = this.toggleAnnouncements.bind(this);
        this.toggleAnnouncements2 = this.toggleAnnouncements2.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleChange2 = this.handleChange2.bind(this);
        this.onAnnouncementDelete = this.onAnnouncementDelete.bind(this);

    }

    componentDidMount() {
        loggedInVisit().then();
        updateProfileVisit().then();
    }

    onSubmit = (e) => {
        e.preventDefault();
        this.setState({loadingSearchUser: true}, () => {
            userDetails(this.state.nameStart)
                .then(response => {
                    this.setState({searchResults: response, loadingSearchUser: false});
                });
        });
    };

    onAnnouncementSubmit = async(Title, Message, Ann_ID) => {
        if (this.state.level <= 1) {
            Swal.fire(
                'You are not authorized to do this!',
                'Please log in and try again...',
                'error',
            ).then();
            return false;
        }

        // console.log(Title + ' ' + Message);
        // console.log(this.state.announcements[this.state.modalAnnId].Title + ' '
        //             + this.state.announcements[this.state.modalAnnId].Message);
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

        // console.log('Success');
        let flag = false;
        await updateAnnouncement(Ann_ID, Title, Message).then(response => {
            // console.log(response);
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
                // console.log(response);
                //console.log(response.TIMESTAMP);
                prevAnn.push(
                    {
                        ANNOUNCEMENT_ID: response.data.ANNOUNCEMENT_ID,
                        Title          : Title,
                        Message        : Message,
                        TIMESTAMP      : new Date().toISOString(),
                    });
                // console.log(announcements);
                this.setState({announcements: prevAnn});
                //console.log(prevAnn);
                // alert('Announcement is added!');
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

    handleChange = (e) => {
        this.setState({nameStart: e.target.value});
    };

    handleChange2 = (e) => {
        const username = e.target.value;
        const user = this.state.searchResults.find(
            usr => usr.username === username);
        if (!user) {
            return null;
        }

        // console.log("THIS IS THE USERID: " + user.User_ID);

        userPic(user.User_ID).then(response => {
            this.setState({image: ''}, () => {
                // console.log(response);
                if (response[0] !== undefined)
                    this.setState({image: response[0].image});
            });

        });
        // console.log(user.image);

        this.setState({
            Name: user.Name,
            Surname: user.Surname,
            Email: user.Email,
            username,
            // image: user.image,
            User_ID: user.User_ID,
        }, () => {
            getAllCoaches().then(response => {
                this.setState(
                    {selectedCoaches: response}, () => {
                        // console.log("Coaches array \n" + this.state.selectedCoaches);
                    });
            });
        });

        getPrivateAnnouncementsAdmin(username).then(response => {
            this.setState(
                {announcements: response.data.announcements});
            // console.log(this.state.announcements);
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
        const x = this.state.announcements[e.target.id];
        this.setState({
            modalTitle  : x.Title,
            modalMessage: x.Message,
            modalAnnId  : e.target.id,
        });
        this.toggleAnnouncements();
    };

    toggleAnnouncementsData2 = () => {
        this.toggleAnnouncements2();
    };


    render() {
        let {image} = this.state;
        let imageURL = 'https://www.w3schools.com/howto/img_avatar.png';
        let $imagePreview = <img src={imageURL} alt={'Profile'}/>;
        if (image !== '') {
            imageURL =
                'data:image/png;base64,' + new Buffer.from(image, 'binary').toString(
                'base64');
            $imagePreview = (<img src={imageURL} alt={'Profile'}/>);
            // console.log(image)
        }

        return (
            <div id='profile' className="">
                {(this.props.userLevel === 'admin') ? '' : <Redirect to="/"/>}
                <div className="container">
                    <div className="row">
                        <div className="col-md-4">
                            <h4>Search for Client:</h4>
                            <form className="adminViewClient">
                                <div className="d-flex bd-highlight">
                                    <div className="p-lg-2 flex-fill w-100">
                                        <input className="h-100 w-100 m-0"
                                               name={'Name'}
                                               onChange={this.handleChange}
                                               type="text"
                                               placeholder="Search"
                                               aria-label="Search"
                                               id="searchClient"
                                        />
                                    </div>
                                    <div className="p-sm-1 flex-fill bd-highlight ">
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
                            <br/>
                            <div className="form-group">
                                <label htmlFor="userList"><h6>Clients Retrieved:</h6>
                                </label>
                                <select className="form-control"
                                        name={'username'}
                                        id="userList"
                                        onChange={this.handleChange2}
                                        required
                                >
                                    <option value="" hidden>Client List Generated</option>
                                    {this.state.searchResults.map((res, index) => {
                                        return <option value={res.username} key={index}>
                                            {res.Name} {res.Surname} {res.username}
                                        </option>;
                                    })
                                    }

                                </select>
                            </div>
                        </div>

                        <div className="col-md-4">
                            <h4>Client Details:</h4>
                            <div className="avatar-preview d-flex justify-content-center">
                                <div id="imagePreview">{$imagePreview}</div>
                            </div>
                            <form id="clientDetails">
                                <div className="form-group">
                                    <label htmlFor="nameInput">Name</label>
                                    <input type="name"
                                           className="form-control"
                                           id="nameInput"
                                           value={this.state.Name}
                                           readOnly
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="nameInput">Surname</label>
                                    <input type="surname"
                                           className="form-control"
                                           id="surnameInput"
                                           value={this.state.Surname}
                                           readOnly
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="exampleInputEmail1">Email address</label>
                                    <input type="email"
                                           className="form-control"
                                           id="exampleInputEmail1"
                                           value={this.state.Email}
                                           readOnly
                                    />
                                </div>
                                <div className="form-group">
                                    <label className="usernameIn">Username</label>
                                    <input type="username"
                                           className="form-control"
                                           id="usernameIn"
                                           value={this.state.username}
                                           readOnly
                                    />
                                </div>

                            </form>
                        </div>
                        <div className="col-md-4">
                            <label htmlFor="comment"><h4>Announcements:</h4></label>

                            <div className="menu-box-tab menu-text" id="EditAnns">
                                {this.state.announcements.sort(
                                    function (a, b) {
                                        return b.ANNOUNCEMENT_ID
                                            - a.ANNOUNCEMENT_ID;
                                    }).map((ann, index) => {
                                    return <Button className="nav-link menu-box-tab menu-text"
                                                   onClick={this.toggleAnnouncementsData} id={index}
                                                   key={index}><i className="scnd-font-color fa fa-tasks"/>
                                        {ann.Title}{<p> (</p>}{ann.TIMESTAMP[0]}
                                        {ann.TIMESTAMP[1]}{ann.TIMESTAMP[2]}{ann.TIMESTAMP[3]}{ann.TIMESTAMP[4]}{ann.TIMESTAMP[5]}
                                        {ann.TIMESTAMP[6]}{ann.TIMESTAMP[7]} {ann.TIMESTAMP[8]}{ann.TIMESTAMP[9]}{<p
                                            id="extra">)</p>}
                                    </Button>
                                })}

                            </div>
                            <Button className={' edit nav-link menu-box-tab menu-text '}
                                    onClick={this.toggleAnnouncements2}>
                                <i className="scnd-font-color fa fa-tasks"/> Add Announcement
                            </Button>

                            {/*<AnnouncementModal onSubmit = { this.onAnnouncementSubmit }*/}
                            {/*                   toggle = { this.toggleAnnouncements }*/}
                            {/*                   modal = { this.state.modalAnnouncements }*/}
                            {/*                   announcements = { this.state.announcements }*/}
                            {/*                   title = { this.state.modalTitle }*/}
                            {/*                   message = { this.state.modalMessage }*/}
                            {/*                   announcement_id = { this.state.modalAnnId }*/}
                            {/*/>*/}
                            <AnnouncementsPrivateModal
                                onSubmit = { this.onAnnouncementSubmit2 }
                                toggle = { this.toggleAnnouncements2 }
                                modal = { this.state.modalAnnouncements2 }
                                resetOnSubmit = { true }
                            />
                            <AnnouncementModal onSubmit={this.onAnnouncementSubmit}
                                               DeleteAnn={this.onAnnouncementDelete}
                                               toggle={this.toggleAnnouncements}
                                               modal={this.state.modalAnnouncements}
                                               announcements={this.state.announcements}
                                               title={this.state.modalTitle}
                                               message={this.state.modalMessage}
                                               announcement_id={this.state.modalAnnId}
                                               isPrivate={true}
                            />


                        </div>
                        <div>
                            <div className="container">
                                <div className="row">
                                    <div id="timeTableHeading">Create Personal Training Schedule</div>
                                    <div className="col-md-8">
                                        <Timetable day={this.state.day}
                                                   time={this.state.time}
                                                   flag={this.state.flag}
                                                   coachID={this.state.Coach_ID}
                                                   userID={this.state.User_ID}
                                        />
                                    </div>
                                    <div className="col-md-4">
                                        <Box toogle={this.handleDayTimeChange} coaches={this.state.selectedCoaches}
                                             userID = {this.state.User_ID}/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        )

    }
}

export default ProfileAdmin;