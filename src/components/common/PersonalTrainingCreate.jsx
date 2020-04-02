import React, {Component} from 'react';
import "../assets/styles/PersonalTrainingTimetable.css"
import {
    insertPT, deletePT, getCoachTraining
} from "../../repository";

class PersonalTrainingCreate extends Component {
    constructor(props) {
        super(props);
        this.state = {
            // refID: '',
            refIDs: [],
            coachIDs: [],
            flag: false,
            Coach_ID: '',
            User_ID: '',
            day: '',
            time: '',
            refIDsCoach: []
            // addRefIDs: [],
            // emptyTab: []
            // exists: false
        };
        this.clearArray = this.clearArray.bind(this);
        this.settingRefIDsCoachIDs = this.settingRefIDsCoachIDs.bind(this);
        this.settingRefIDsCoach = this.settingRefIDsCoach.bind(this);
        this.insertDeleteMethodStates = this.insertDeleteMethodStates.bind(this);
    }

    clearArray(newArr, coachID, userID) {
        this.setState({
            refIDsCoach: newArr,
            refIDs: newArr,
            coachIDs: newArr,
            Coach_ID: coachID,
            User_ID: userID
        });
    }


    settingRefIDsCoachIDs(x, y) {
        this.setState({
            refIDs: x,
            coachIDs: y
        }, () => {  //
            console.log(" refIDs \n" + x);
            console.log(" coachIDs \n" + y);
        });
    }

    settingRefIDsCoach(x) {
        this.setState({refIDsCoach: x}, () => {
            console.log(" coachRefIDs \n" + this.state.refIDsCoach);
        });
    }

    insertDeleteMethodStates(x, z) {
        this.setState({
            refIDs: x,
            coachIDs: z,
            time: this.props.time,
            day: this.props.day
        }, () => {
            // console.log("CoachID, UserID, Day, time " + this.state.Coach_ID + " " + this.state.User_ID + "  " + this.state.day + " " + this.state.time);
            if (this.props.flag === true)
                insertPT(this.state).then(); //() => alert('Successful insertion')).catch(err => alert(err));
            else
                deletePT(this.state).then(); //() => alert('Success deletion')).catch(err => alert(err));
        });
    }


    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.day !== this.props.day || prevProps.time !== this.props.time || prevProps.flag !== this.props.flag
            || prevProps.trainingSchedule !== this.props.trainingSchedule || prevProps.coachID !== this.props.coachID
            || prevProps.userID !== this.props.userID || prevProps.trainingScheduleCoach !== this.props.trainingScheduleCoach) {

            console.log("*************************************************************");
            let refID = '';
            (async () => {
                console.log("-----------------------------------------------------");
                console.log('start clearing');
                await this.clearArray([], this.props.coachID, this.props.userID);
                console.log('Cleared');
                console.log("-----------------------------------------------------");

                const ret = [...this.props.trainingSchedule];
                // const ret =this.props.trainingSchedule.slice();
                refID = '';
                // let tempRefIDs = this.state.refIDs.slice();
                let tempRefIDs = [...this.state.refIDs];
                // let tempCoachIDs = this.state.coachIDs.slice();
                let tempCoachIDs = [...this.state.coachIDs];
                const items = ret.map((item, key) => {
                        if (item.Time < 10) {
                            refID = item.Day + ".0" + item.Time;
                        } else {
                            refID = item.Day + "." + item.Time;
                        }
                        // Create a new array based on current state:
                        let coachID = item.Coach_ID;
                        if (!tempRefIDs.includes(refID)) {
                            tempRefIDs.push(refID);
                            tempCoachIDs.push(coachID);
                        }
                    }
                );

                await this.settingRefIDsCoachIDs(tempRefIDs, tempCoachIDs);

                // for coaches enrolled training
                // let retCoach = this.props.trainingScheduleCoach.slice(0);
                let retCoach = [...this.props.trainingScheduleCoach];
                refID = '';
                // let tempRefIDsCoach = this.state.refIDsCoach;
                let tempRefIDsCoach = [...this.state.refIDsCoach];

                const itemsCoach = retCoach.map((coach, key) => {
                        if (coach.Time < 10) {
                            // this.setState({refID: coach.Day + ".0" + coach.Time});
                            refID = coach.Day + ".0" + coach.Time;
                        } else {
                            // this.setState({refID: coach.Day + "." + coach.Time});
                            refID = coach.Day + "." + coach.Time;
                        }
                        // Create a new array based on current state:
                        if (!tempRefIDsCoach.includes(refID)) {
                            tempRefIDsCoach.push(refID);
                        }
                    }
                );


                await this.settingRefIDsCoach(tempRefIDsCoach);


                if (this.props.time < 10) {
                    refID = this.props.day + ".0" + this.props.time;
                } else {
                    refID = this.props.day + "." + this.props.time;
                }


                // let x = this.state.refIDs.slice();
                let x = [...this.state.refIDs];
                // let y = this.state.refIDsCoach.slice();
                let y = [...this.state.refIDsCoach];
                // let z = this.state.coachIDs.slice();
                let z = [...this.state.coachIDs];
                console.log(this.props.trainingScheduleCoach.length + "    " + prevProps.trainingScheduleCoach.length);

                if(prevProps.trainingScheduleCoach.length === this.props.trainingScheduleCoach.length && prevProps.coachID !== this.props.coachID){
                    // console.log("testing  " + this.props.trainingScheduleCoach + "    " + prevProps.trainingScheduleCoach);
                    return;
                }
                // console.log(this.props.trainingScheduleCoach.length + '   ' + this.state.refIDsCoach.length);
                if (!x.includes(refID) && !y.includes(refID) && this.props.flag === true && this.props.coachID !== '' && this.props.trainingScheduleCoach.length >= 1 ) {
                    console.log("inserting stuff bip boop");
                    console.log("CoachID: " + this.props.coachID);
                    x.push(refID);
                    z.push(this.props.coachID);
                    await this.insertDeleteMethodStates(x, z);
                } else {
                    let pos = x.indexOf(refID);
                    console.log("received coach prop " + this.props.coachID);
                    console.log("the pos is : " + pos + " coach at this pos is: " + z[pos]);
                    if (x.includes(refID) && y.includes(refID) && Number(z[pos]) === Number(this.props.coachID) && this.props.flag === false && this.props.coachID !== '') {  //z[pos] === this.props.coachID
                        console.log("deleting stuff bip boop");
                        x.splice(pos, 1);
                        z.splice(pos, 1);
                        await this.insertDeleteMethodStates(x, z);
                    }
                    // }else{
                    //     if (y.includes(refID) && !x.includes(refID) && this.props.flag === true) {
                    //         alert("The coach has another scheduled personal training at that time!");
                    //     } else {
                    //         if (x.includes(refID) && !y.includes(refID) && this.props.flag === true) {
                    //             alert("The user has another scheduled personal training at that time!");
                    //         }
                    //     }
                    // }
                }
            })();



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