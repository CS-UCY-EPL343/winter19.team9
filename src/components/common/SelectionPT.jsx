import React, {Component} from 'react';
import '../assets/styles/BookDropdown.css'

class SelectionPT extends Component {

    constructor(props) {
        super(props);
        this.state = {
            day: '',
            time: '',
            flag: false,
            Coach_ID: '',
            coaches: []
        };

        this.onSubmit = this.onSubmit.bind(this);
        this.onSubmit2 = this.onSubmit2.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.clearOptions = this.clearOptions.bind(this);
    }

    handleChange = (e) => {
        // console.log(e.target.value);
        this.setState({
            [e.target.name]: e.target.value
        }, () => {
            // console.log("this is the CoachID: " + this.state.Coach_ID);
        });
        // this.setState({Coach_ID: e.target.Coach_ID});

    };


    onSubmit = () => {
        // console.log(this.state.day);
        this.setState({flag: true},
            () => {
                // console.log(this.state.flag);
                this.props.toogle(this.state.day, this.state.time, this.state.flag, this.state.Coach_ID);
            });
    };

    onSubmit2 = () => {
        // console.log(this.state.day);
        this.setState({flag: false},
            () => {
                // console.log(this.state.flag);
                this.props.toogle(this.state.day, this.state.time, this.state.flag, this.state.Coach_ID);
            });
    };

    clearOptions() {
        const timeNode = document.getElementById('TimePers');
        timeNode.value = 0;
        const dayNode = document.getElementById('DayPers');
        dayNode.value = 0;
        const coachNode = document.getElementById('CoachPers');
        coachNode.value = 0;
    }

    // noinspection JSUnusedLocalSymbols
    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.coaches !== this.props.coaches || prevProps.coachesRet !== this.props.coachesRet
            || prevProps.coachID !== this.props.coachID
           || prevProps.userID !== this.props.userID) {
            (async () => {
                if (prevProps.userID !== this.props.userID) {
                    await this.clearOptions();
                }
            })();
        }
    }

    render() {
        return (
            <div>
                <form className="form" id="backBox">
                    <h3 id="bmiHeading"><b>C</b>hoose <b>D</b>ay and <b>T</b>ime</h3>
                    <div className="row" id="first-row">
                        <div className="col-md-6 RowBlock">
                            <label htmlFor="DropDays">Day:</label>
                            <select className="form-control selectGroupPersonal" name="day" id="DayPers"
                                    onChange={this.handleChange} required>
                                <option value="0" hidden>Day Option</option>
                                <option value="1">Monday</option>
                                <option value="2">Tuesday</option>
                                <option value="3">Wednesday</option>
                                <option value="4">Thursday</option>
                                <option value="5">Friday</option>
                                <option value="6">Saturday</option>
                            </select>
                        </div>
                        <div className="col-md-6 RowBlock">
                            <label htmlFor="DropClass">Time:</label>
                            <select className="form-control selectGroupPersonal" name="time" id="TimePers"
                                    onChange={this.handleChange} required>
                                <option value="0" hidden>Time Option</option>
                                <option value="1">08:00-09:00</option>
                                <option value="2">09:00-10:00</option>
                                <option value="3">10:00-11:00</option>
                                <option value="4">11:00-12:00</option>
                                <option value="5">12:00-13:00</option>
                                <option value="6">13:00-14:00</option>
                                <option value="7">14:00-15:00</option>
                                <option value="8">15:00-16:00</option>
                                <option value="9">16:00-17:00</option>
                                <option value="10">17:00-18:00</option>
                                <option value="11">18:00-19:00</option>
                                <option value="12">19:00-20:00</option>
                            </select>
                        </div>
                    </div>
                    <div className="row hidden">
                        <div className="col-md-12 RowBlock">   {/*justify-content-center*/}
                            <label htmlFor="DropClass">Coach:</label>

                            <select className="form-control selectGroupPersonal" name="Coach_ID" id="CoachPers"
                                    onChange={this.handleChange} required>
                                <option value="0" hidden>Select a Coach</option>

                                {this.props.coaches.map((res, index) => {
                                    return <option value={res.Coach_ID} key={index}>
                                        {res.CoachName} {res.Surname}
                                    </option>
                                })
                                }
                            </select>
                        </div>

                    </div>
                    <div className="row">
                        <div className="col-md-6 RowBlock">
                            <button type="button" className="RowButton" onClick={this.onSubmit}>Submit</button>
                        </div>
                        <div className="col-md-6 RowBlock">
                            <button type="button" className="RowButton" onClick={this.onSubmit2}>Delete</button>
                        </div>
                    </div>
                </form>
            </div>
        );
    }
}

export default SelectionPT;