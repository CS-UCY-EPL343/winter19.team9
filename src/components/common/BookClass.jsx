import React, { Component } from 'react';
// import Dropdown from "react-bootstrap/Dropdown";
// import DropdownButton from "react-bootstrap/DropdownButton";
import '../assets/styles/BookDropdown.css'
import {getClasses} from "../../repository";
// import {userData} from "../../repository";
import {getClassDay} from "../../repository";
import {getClassTime} from "../../repository";
import {getClassCoach} from "../../repository";
import {enrollUser} from "../../repository";
import {getClassID} from "../../repository";
// import {getCoachID} from "../../repository";
import {getUserID} from "../../repository";

class BookClass extends Component {

    constructor(props) {
        super(props);
        this.state = {
            User_ID          : '',
            Name            : [],
            Day             : [],
            Time            : [],
            CoachName       : [],
            SelectedClass   : 'Select...',
            SelectedDay     : 'Select...',
            SelectedTime    : 'Select...',
            SelectedCoach   : 'Select...',
            ClassID         : ''
            // CoachID         : ''
        };
        this.handleClass = this.handleClass.bind(this);
        this.handleDay = this.handleDay.bind(this);
        this.handleTime = this.handleTime.bind(this);
        this.handleCoach = this.handleCoach.bind(this);
    }

    handleClass = (e) => {
        this.setState({
            [e.target.name]: e.target.value === 'Select...' ? '' : e.target.value
        }, () => {
            getClassDay(this.state.SelectedClass).then(response => {
                this.setState({Day: response})
            });
        });
    };

    handleDay = (e) => {
        this.setState({
            [e.target.name]: e.target.value === 'Select...' ? '' : e.target.value
        }, () => {
            getClassTime(this.state.SelectedClass, this.state.SelectedDay).then(response => {
                this.setState({Time: response})
            });
        });
    };

    handleTime = (e) => {
        this.setState({
            [e.target.name]: e.target.value === 'Select...' ? '' : e.target.value
        }, () => {

            getClassCoach(this.state.SelectedClass, this.state.SelectedDay, this.state.SelectedTime).then(response => {
                this.setState({CoachName: response});
                // getCoachID(this.state.SelectedClass, this.state.SelectedDay, this.state.SelectedTime).then(response => {
                //     this.setState({CoachID: response});
                //     console.log(this.state.CoachID);
                // });
                }
            );
        });
    };

    handleCoach = (e) => {
        this.setState({
            [e.target.name]: e.target.value === 'Select...' ? '' : e.target.value
        }, () => {
            getClassID(this.state.SelectedClass, this.state.SelectedDay, this.state.SelectedTime, this.state.SelectedCoach).then(response => {
                this.setState({ClassID: response.data.ClassID.ClassID});
                console.log(this.state.ClassID);
            });
        });
    };

    onSubmit = () => {
        // getClassID(this.state.SelectedClass, this.state.SelectedDay, this.state.SelectedTime, this.state.SelectedCoach).then(response => {
        //     this.setState({SelectedID: response});
        //     console.log(this.state.SelectedID);
        enrollUser(this.state.ClassID, this.state.User_ID).then(() => alert('Success')).catch(err => alert(err));
        // });
    };

    componentDidMount() {
        getUserID()
            .then(response => {
                console.log(response);
                this.setState({User_ID: response.User_ID});
                console.log(this.state.User_ID);
                // this.setState(response);
                // this.setState({confirmPassword: response.password});
                getClasses().then(response => {
                    console.log(response);
                    this.setState({Name: response});
                    console.log(this.state.Name);
                });
            });
    }



    render() {
        return (
            <div className = "col-lg-4 col-md-12 col-sm-12">
                <form className = "form" id = "backBox">
                    <h3 id = "bmiHeading"><b>B</b>ook <b>A</b> <b>C</b>lass</h3>

                    <div className ="row" id="first-row">
                        <div className= "col-md-6 RowBlock">
                            <label htmlFor="DropClass">Class:</label>
                            <select className="form-control" id="DropDays" name="SelectedClass" onChange={this.handleClass}>
                                <option>Select...</option>
                                {this.state.Name.map((res, index) => {
                                        return <option value={res.Name} key={index}>
                                            {res.Name}
                                        </option>
                                    })
                                }
                            </select>
                        </div>
                        <div className= "col-md-6 RowBlock">
                            <label htmlFor="DropDays">Day:</label>
                            <select className="form-control" id="DropDays" name="SelectedDay" onChange={this.handleDay}>
                                <option>Select...</option>
                                {this.state.Day.map((res, index) => {
                                        return <option value={res.Day} key={index}>
                                            {res.Day}
                                        </option>
                                    })
                                }
                            </select>
                        </div>

                    </div>

                    <div className ="row" id="first-row">
                        <div className= "col-md-6 RowBlock">
                            <label htmlFor="DropDays">Time:</label>
                            <select className="form-control" id="DropDays" name="SelectedTime" onChange={this.handleTime}>
                                <option>Select...</option>
                                    {this.state.Time.map((res, index) => {
                                        return <option value={res.Time} key={index}>
                                            {res.Time}
                                        </option>
                                    })
                                }
                            </select>
                        </div>
                        <div className= "col-md-6 RowBlock">
                            <label htmlFor="DropClass">Coach:</label>
                            <select className="form-control" id="DropDays" name="SelectedCoach" onChange={this.handleCoach}>
                                <option>Select...</option>
                                {this.state.CoachName.map((res, index) => {
                                    return <option value={res.CoachName} key={index}>
                                        {res.CoachName}
                                    </option>
                                })
                                }
                            </select>
                        </div>
                    </div>
                    <div className = "row">
                        <div className= "col-md-6 RowBlock">
                            <button type = "" className="RowButton" onClick={this.onSubmit}>Submit</button>
                        </div>
                        <div className= "col-md-6 RowBlock">
                            <button type = "button-important" className="RowButton">View All</button>
                        </div>
                    </div>
                </form>
            </div>
        );
    }
}

export default BookClass;