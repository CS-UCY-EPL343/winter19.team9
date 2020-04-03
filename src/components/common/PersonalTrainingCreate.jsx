import React, {Component} from 'react';
import "../assets/styles/PersonalTrainingTimetable.css"
import {
    insertPT
} from "../../repository";
class PersonalTrainingCreate extends Component {
    constructor(props) {
        super(props);
        this.state = {
            refID: '',
            refIDs: [],
            trainingScheduleRet: [],
            flag: false,
            Coach_ID: '',
            User_ID: ''
            // addRefIDs: [],
            // emptyTab: []
            // exists: false
        };
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.day !== this.props.day || prevProps.time !== this.props.time || prevProps.flag !== this.props.flag
            || prevProps.trainingSchedule !== this.props.trainingSchedule || prevProps.coachID !== this.props.coachID || prevProps.userID !== this.props.userID) {
            // this.setState({addRefIDs: this.state.emptyTab});
            let ret = this.props.trainingSchedule.slice(0);
            let refID;
            this.setState({Coach_ID: this.props.coachID, User_ID: this.props.userID});
            ret.map((item) => {
                    if (item.Time < 10) {
                        this.setState({refID: item.Day + ".0" + item.Time});
                        refID = item.Day + ".0" + item.Time;
                    } else {
                        this.setState({refID: item.Day + "." + item.Time});
                        refID = item.Day + "." + item.Time;
                    }

                    // Create a new array based on current state:
                    let x = this.state.refIDs;
                    if (!x.includes(refID)) {
                        x.push(refID);
                        // x.push(this.state.addRefIDs);
                        this.setState({refIDs: x}, () => {
                            // console.log(" refIDs \n" + x);
                        });
                    }

                    return item;
                }
            );

            // let refID;
            if (this.props.time < 10) {
                this.setState({refID: this.props.day + ".0" + this.props.time});
                refID = this.props.day + ".0" + this.props.time;
                //na valei dame to props.day je kserogo sto state tou gia na to steilei meta stin vasi
            } else {
                this.setState({refID: this.props.day + "." + this.props.time});
                refID = this.props.day + "." + this.props.time;
            }

            this.setState({flag: this.props.flag});
            console.log(this.props.flag);

            // Create a new array based on current state:
            let x = this.state.refIDs.slice(0);
            if (!x.includes(refID) && this.props.flag === true) {
                x.push(refID);
                this.setState({refIDs: x});
                //vallei ta pramata pou ethkialeksen o coach, stin vasi
                insertPT(this.state).then(() => alert('Success')).catch(err => alert(err));
                // console.log(x);
            } else {
                if (x.includes(refID) && this.props.flag === false) {
                    const newList = this.state.refIDs.slice(0);
                    //pkiannei to refID
                    newList.splice(this.state.refIDs.indexOf(refID), 1);
                    this.setState({refIDs: newList}, () => {
                        console.log(this.state.refIDs)
                    });
                }
            }
        }
    }

    render() {
        return (
            <div>
                <div className="row">
                    <div className="timetable">
                        <div className="week-names">
                            <div>monday</div>
                            <div>tuesday</div>
                            <div>w/day</div>
                            <div>thursday</div>
                            <div>friday</div>
                            <div>saturday</div>
                            <div className="weekend">sunday</div>
                        </div>
                        <div className="time-interval">
                            <div>8:00 - 09:00</div>
                            <div>09:00 - 10:00</div>
                            <div>10:00 - 11:00</div>
                            <div>11:00 - 12:00</div>
                            <div>12:00 - 13:00</div>
                            <div>13:00 - 14:00</div>
                            <div>14:00 - 15:00</div>
                            <div>15:00 - 16:00</div>
                            <div>16:00 - 17:00</div>
                            <div>17:00 - 18:00</div>
                            <div>18:00 - 19:00</div>
                            <div>19:00 - 20:00</div>
                        </div>
                        <div className="content">
                            {[...Array(6).keys()].map(x => (x + 1.01).toFixed(2))
                                .map((x, index) =>
                                    <div
                                        className={this.state.refIDs.includes(x) ? 'blackBackSelected' : ''}
                                        key={index} id={x}/>
                                )}
                            <div className="weekend"/>
                            {[...Array(6).keys()].map(x => (x + 1.02).toFixed(2))
                                .map((x, index) =>
                                    // <div className={classes.join(' ')} key={index} id={x}/>
                                    <div
                                        className={this.state.refIDs.includes(x) ? 'blackBackSelected' : ''}
                                        key={index} id={x}/>
                                )}

                            <div className="weekend"/>
                            {[...Array(6).keys()].map(x => (x + 1.03).toFixed(2))
                                .map((x, index) =>
                                    <div
                                        className={this.state.refIDs.includes(x) ? 'blackBackSelected' : ''}
                                        key={index} id={x}/>
                                )}
                            <div className="weekend"/>
                            {[...Array(6).keys()].map(x => (x + 1.04).toFixed(2))
                                .map((x, index) =>
                                    <div
                                        className={this.state.refIDs.includes(x) ? 'blackBackSelected' : ''}
                                        key={index} id={x}/>
                                )}
                            <div className="weekend"/>
                            {[...Array(6).keys()].map(x => (x + 1.05).toFixed(2))
                                .map((x, index) =>
                                    <div
                                        className={this.state.refIDs.includes(x) ? 'blackBackSelected' : ''}
                                        key={index} id={x}/>
                                )}
                            <div className="weekend"/>
                            {[...Array(6).keys()].map(x => (x + 1.06).toFixed(2))
                                .map((x, index) =>
                                    <div
                                        className={this.state.refIDs.includes(x) ? 'blackBackSelected' : ''}
                                        key={index} id={x}/>
                                )}
                            <div className="weekend"/>
                            {[...Array(6).keys()].map(x => (x + 1.07).toFixed(2))
                                .map((x, index) =>
                                    <div
                                        className={this.state.refIDs.includes(x) ? 'blackBackSelected' : ''}
                                        key={index} id={x}/>
                                )}
                            <div className="weekend"/>
                            {[...Array(6).keys()].map(x => (x + 1.08).toFixed(2))
                                .map((x, index) =>
                                    <div
                                        className={this.state.refIDs.includes(x) ? 'blackBackSelected' : ''}
                                        key={index} id={x}/>
                                )}
                            <div className="weekend"/>
                            {[...Array(6).keys()].map(x => (x + 1.09).toFixed(2))
                                .map((x, index) =>
                                    <div
                                        className={this.state.refIDs.includes(x) ? 'blackBackSelected' : ''}
                                        key={index} id={x}/>
                                )}
                            <div className="weekend"/>
                            {[...Array(6).keys()].map(x => (x + 1.10).toFixed(2))
                                .map((x, index) =>
                                    <div
                                        className={this.state.refIDs.includes(x) ? 'blackBackSelected' : ''}
                                        key={index} id={x}/>
                                )}
                            <div className="weekend"/>
                            {[...Array(6).keys()].map(x => (x + 1.11).toFixed(2))
                                .map((x, index) =>
                                    <div
                                        className={this.state.refIDs.includes(x) ? 'blackBackSelected' : ''}
                                        key={index} id={x}/>
                                )}
                            <div className="weekend"/>
                            {[...Array(6).keys()].map(x => (x + 1.12).toFixed(2))
                                .map((x, index) =>
                                    <div
                                        className={this.state.refIDs.includes(x) ? 'blackBackSelected' : ''}
                                        key={index} id={x}/>
                                )}
                            <div className="weekend"/>
                        </div>
                    </div>
                </div>
                <br/>
            </div>
        )
    }
}

export default PersonalTrainingCreate;