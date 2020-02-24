import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';
import "../assets/styles/adminProfile.css"
import {userDetails} from "../../repository";
import AnnouncementsPrivate from '../common/AnnouncementsPrivate';
import {Button} from "reactstrap";
import ToggleModal from "../common/ToggleModal";


class ProfileAdmin extends Component {

    constructor(props) {
        super(props);
        this.state = {
            nameStart: '',
            Name: '',
            Surname: '',
            Email: '',
            username: '',
            searchResults: []
        };
    }

    onSubmit = (e) => {
        console.log(this.state.nameStart);
        e.preventDefault();
        userDetails(this.state.nameStart)
            .then(response => {
                console.log(response);
                this.setState({searchResults: response})
            })
    };

    handleChange = (e) => {
        // this.setState({[e.target.nameStart]: e.target.value})
        this.setState({nameStart: e.target.value})
    };

    // AccountID: 0
    // Age: 22
    // Bdate: "1997-04-18T21:00:00.000Z"
    // Coach_ID: null
    // Email: "antreasloizou97@gmail.com"
    // Gender: 1
    // Medical_History: null
    // Membership_ID: null
    // Name: "Andreas"
    // Owner_ID: null
    // Surname: "Elia"
    // User_ID: 3
    // level: "user"
    // password: "1234"​
    // username: "aloizo03"

    handleChange2 = (e) => {
        const username = e.target.value;
        const user = this.state.searchResults.find(usr => usr.username === username);
        if (!user) return null; // TODO fix error

        this.setState({Name: user.Name, Surname: user.Surname, Email: user.Email, username});
        this.toggleAnnouncements = this.toggleAnnouncements.bind(this);

    };

    toggleAnnouncements = () => {
        this.setState({modalAnnouncements: !this.state.modalAnnouncements});
    };

    render() {
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
                                        <input className="h-100 w-100 m-0" name={"Name"} onChange={this.handleChange}
                                               type="text" placeholder="Search" aria-label="Search" id="searchClient"/>
                                    </div>
                                    <div className="p-sm-1 flex-fill bd-highlight ">
                                        <button className="btn btn-outline-secondary h-100 w-100" type="submit"
                                                onClick={this.onSubmit}><i className="fa fa-search"/>
                                        </button>
                                    </div>

                                </div>
                            </form>
                            <br/>
                            <div className="form-group">
                                <label htmlFor="userList"><h6>Clients Retrieved:</h6></label>
                                <select className="form-control" name={"username"} id="userList"
                                        onChange={this.handleChange2} required>
                                    <option value="" hidden>Client List Generated</option>
                                    {this.state.searchResults.map((res, index) => {
                                        return <option value={res.username} key={index}>
                                            {res.Name} {res.Surname} {res.username}
                                        </option>
                                    })
                                    }

                                </select>
                            </div>
                        </div>

                        <div className="col-md-4">
                            <h4>Client Details:</h4>
                            <img src="https://www.w3schools.com/howto/img_avatar.png" alt="Avatar" id="profPic"/>
                            <form id="clientDetails">
                                <div className="form-group">
                                    <label htmlFor="nameInput">Name</label>
                                    <input type="name" className="form-control" id="nameInput"
                                           value={this.state.Name}/>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="nameInput">Surname</label>
                                    <input type="surname" className="form-control" id="nameInput"
                                           value={this.state.Surname}/>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="exampleInputEmail1">Email address</label>
                                    <input type="email" className="form-control" id="exampleInputEmail1"
                                           value={this.state.Email}/>
                                </div>
                                <div className="form-group">
                                    <label className="usernameIn">Username</label>
                                    <input type="username" className="form-control" id="usernameIn"
                                           value={this.state.username}/>
                                </div>


                            </form>
                        </div>
                        <div className="col-md-4">
                            <label htmlFor="comment"><h4>Announcements:</h4></label>

                            <div className="menu-box-tab menu-text">
                                <Button className={'nav-link menu-box-tab menu-text '}
                                        onClick={this.toggleAnnouncements}
                                >
                                    <i className="scnd-font-color fa fa-tasks"/> View Client's Private Announcements
                                </Button>
                                <ToggleModal
                                    modal={this.state.modalAnnouncements}
                                    toggle={this.toggleAnnouncements}
                                    modalSize={'md'}
                                    modalHeader={'Announcements'}
                                    modalBody={<AnnouncementsPrivate/>}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="comment"><h6>Submit Announcement:</h6></label>
                                <textarea className="form-control" rows="5" id="announcement"/>
                            </div>
                            <div className="form-group">
                                {/*<label htmlFor="sel1">Select Type:</label>*/}
                                {/*<select className="form-control" id="sel1">*/}
                                {/*<option>Global</option>*/}
                                {/*<option>Personal</option>*/}
                                {/*</select>*/}
                                <small id="emailHelp" className="form-text text-muted">*The personal option will use the
                                    client selected
                                    previously.</small>
                            </div>
                            <button type="submit" className="btn btn-secondary">Submit</button>


                        </div>

                    </div>
                </div>
            </div>

        )
            ;
    }
}

export default ProfileAdmin;