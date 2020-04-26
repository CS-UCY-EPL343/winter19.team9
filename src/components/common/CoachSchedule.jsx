import React, {Component} from 'react';
import '../assets/styles/PersonalTrainingTimetable.css';
import {
    insertPT,
    deletePT,
    getCoachTraining,
    getCoachID, getPersonalSchedule, getClassSchedule,
    getCoachClasses
} from '../../repository';
import Swal from "sweetalert2";

class CoachSchedule extends Component {

    constructor(props) {

        super(props);
        this.state = {
            Coach_ID: '',
            User_ID: '',
            coachName: '',

            clientNames: [],
            flag: false,
            refIDsCoach: [],

            refIDs: [],
            cIDs: [],
            cNames: [],
            Name: '',
            ClassColors: [
                '#812029',
                '#1A63D9',
                '#CF1B1B',
                '#FFAD1F',
                '#704585',
                '#53878C',
                '#C97200',
                '#489655',
                '#158CA3',
                '#9E134B',
            ]
        };

        this.insertDeleteMethodStates = this.insertDeleteMethodStates.bind(this);
        this.fillTable = this.fillTable.bind(this);
        this.ColorLuminance = this.ColorLuminance.bind(this);
        this.StateSetter = this.StateSetter.bind(this);
    }

    // Modals for error messages in case of wrong input.
    toggleModalCoachBooked = () => {
        Swal.fire(
            'This time is unavailable.',
            // 'The coach has another scheduled client or a class at this time.',
            '',
            'error',
        ).then();
    };

    toggleModalAnotherClient = () => {
        Swal.fire(
            'You cannot delete the Personal Training Session of a different client.',
            'Please choose the appropriate client.',
            'error',
        ).then();
    };

    toggleModalEmptyCell = () => {
        Swal.fire(
            'There is no Personal Training Session to delete here.',
            '',
            'error',
        ).then();
    };

    toggleModalClientHasClass = () => {
        Swal.fire(
            'The client has a class enrolled at this time.',
            'You are not authorised to delete that.',
            'error',
        ).then();
    };

    toggleModalClientHasClassInsert = () => {
        Swal.fire(
            'The client has a class enrolled at this time.',
            'You cannot schedule a Personal Training Session.',
            'error',
        ).then();
    };

    //method responsible for displaying the enrolled classes and personal
    // training according to the user data from the database
    fillTable(coaches, clientNames, classRefIDs) {
        let node;
        for (let i = 1; i <= 6; i++) {
            for (let x = 1; x <= 12; x++) {
                let refID = '';
                if (x < 10) {
                    refID = i + '.0' + x;
                } else {
                    refID = i + '.' + x;
                }
                if (coaches.includes(refID)) {
                    node = document.getElementById(refID);
                    node.setAttribute('style', 'white-space: pre;');
                    node.className = 'coachBooked';
                    node.textContent = clientNames[coaches.indexOf(refID)];
                } else {
                    if (classRefIDs.includes(refID) && !this.state.refIDs.includes(refID)) {
                        node = document.getElementById(refID);
                        node.style.backgroundImage = '';
                        node.className = 'classesBackground';
                        node.textContent = '';
                    } else {
                        if (!this.state.refIDsCoach.includes(refID) && !this.state.refIDs.includes(refID)) {
                            node = document.getElementById(refID);
                            node.style.backgroundImage = '';
                            node.className = '';
                            node.textContent = '';
                        }
                    }
                }
            }
        }
    }

    insertDeleteMethodStates() {
        this.setState({
            // refIDs: x,
            User_ID: this.props.userID,
            time: this.props.time,
            day: this.props.day,
        }, () => {
            if (this.props.flag === true) {
                insertPT(this.state).then();
            } else {
                deletePT(this.state).then();
            }
        });
    }


    ColorLuminance = (hex, lum) => {
        // validate hex string
        hex = String(hex).replace(/[^0-9a-f]/gi, '');
        if (hex.length < 6) {
            hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
        }
        lum = lum || 0;
        // convert to decimal and change luminosity
        let rgb = '#', c, i;
        for (i = 0; i < 3; i++) {
            c = parseInt(hex.substr(i * 2, 2), 16);
            c = Math.round(Math.min(Math.max(0, c + (c * lum)), 255)).toString(16);
            rgb += ('00' + c).substr(c.length);
        }
        return rgb;
    };

    StateSetter(x, y, z) {
        this.setState({refIDs: x}, () => {
            this.setState({cIDs: y}, () => {
                this.setState({cNames: z});
            });
        });
    }

    componentDidMount() {
        console.clear();
        let coachID = '';
        let coachName = '';
        getCoachID().then(response => {
            this.setState(
                {Coach_ID: response.Coach_ID}, () => {
                    coachID = response.Coach_ID;
                    coachName = response.CoachName;
                    getCoachClasses(this.state.Coach_ID).then(response => {
                        let ret = response.slice(0);
                        let refID;
                        (async () => {
                            let x = this.state.refIDs;
                            let y = this.state.cIDs;
                            let z = this.state.cNames;
                            ret.forEach((item) => {
                                    if (item.TimeCode < 10) {
                                        this.setState(
                                            {refID: item.DayCode + '.0' + item.TimeCode});
                                        refID = item.DayCode + '.0' + item.TimeCode;
                                    } else {
                                        this.setState(
                                            {refID: item.DayCode + '.' + item.TimeCode});
                                        refID = item.DayCode + '.' + item.TimeCode;
                                    }
                                    if (!x.includes(refID)) {
                                        x.push(refID);
                                        y.push(item.ClassID);
                                        z.push(item.Name);
                                        let node = document.getElementById(refID);
                                        node.className = 'BusySlot';
                                        node.childNodes[0].textContent = item.Name;

                                        if (z.includes(item.Name)) {
                                            node.style.backgroundImage =
                                                'linear-gradient(to bottom right,'
                                                + this.state.ClassColors[this.state.cIDs[this.state.cNames.indexOf(
                                                item.Name)] % 9] + ','
                                                + this.ColorLuminance(
                                                this.state.ClassColors[(this.state.cIDs[this.state.cNames.indexOf(
                                                    item.Name)]) % 9], -0.5) + ')';
                                        } else {
                                            node.style.backgroundImage =
                                                'linear-gradient(to bottom right,'
                                                + this.state.ClassColors[this.state.cIDs[this.state.cNames.indexOf(
                                                item.Name)] % 9] + ','
                                                + this.ColorLuminance(
                                                this.state.ClassColors[(this.state.cIDs[this.state.cNames.indexOf(
                                                    item.Name)]) % 9], -0.5) + ')';
                                        }
                                    }
                                },
                            );
                            await this.StateSetter(x, y, z);
                        })();
                    });
                });

            (async () => {
                let trainingScheduleCoach = [];

                await getCoachTraining(coachID).then(response => {
                    trainingScheduleCoach = response;
                });

                let retCoach = [...trainingScheduleCoach];
                let refID = '';
                let refIDsCoach = [];
                let clientNames = [];
                // Finding the personal training schedule of the coach
                retCoach.forEach((coach) => {
                        if (coach.Time < 10) {
                            refID = coach.Day + '.0' + coach.Time;
                        } else {
                            refID = coach.Day + '.' + coach.Time;
                        }
                        // Create a new array based on current state:
                        if (!refIDsCoach.includes(refID)) {
                            refIDsCoach.push(refID);
                            let fullName = coach.Name + '\r\n' + coach.Surname;
                            clientNames.push(fullName);
                        }
                    },
                );
                await this.setState({refIDsCoach: refIDsCoach, clientNames: clientNames});
                // Inserting to table

                await this.fillTable(this.state.refIDsCoach, this.state.clientNames, []);
            })();

        });
    }

    // noinspection JSUnusedLocalSymbols
    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.day !== this.props.day || prevProps.time !== this.props.time
            || prevProps.flag !== this.props.flag || prevProps.userID
            !== this.props.userID || prevProps.userName !== this.props.userName) {
            console.clear();
            (async () => {
                let user = this.props.userID;
                if (user === '') {
                    Swal.fire(
                        'Please select a user first!',
                        '',
                        'error',
                    ).then();
                    return;
                }

                let refID = '';
                //  Client's PT and Classes
                let personalTraining = [];
                let classSchedule = [];

                if (this.props.userID !== '') {
                    //  Retrieving the Personal Schedule of the client (Classes and PT)
                    await getPersonalSchedule(this.props.userID).then(response => {
                        personalTraining = response;

                    });
                    await getClassSchedule(this.props.userID).then(response => {
                        classSchedule = response;
                    });
                }

                // ****************** Filling the arrays ***************************
                // -------------------- Class Schedule -------------------------
                let ret = [...classSchedule];
                let classRefIDs = [];
                // for loop for traversing fetched data for ClassSchedule and filling
                // tables accordingly
                ret.forEach((item) => {
                        if (item.TimeCode < 10) {
                            refID = item.DayCode + '.0' + item.TimeCode;
                        } else {
                            refID = item.DayCode + '.' + item.TimeCode;
                        }
                        if (!classRefIDs.includes(refID)) {
                            classRefIDs.push(refID);
                        }
                    },
                );

                // ------------------------ Personal Training --------------------------
                ret = [...personalTraining];
                refID = '';
                let coachID = '';
                let ClientRefIDs = [];
                if (ret.length !== 0) {
                    let coachName = '';
                    ret.forEach((item) => {
                            if (item.Time < 10) {
                                refID = item.Day + '.0' + item.Time;
                            } else {
                                refID = item.Day + '.' + item.Time;
                            }
                            // Create a new array based on current state:
                            coachID = item.Coach_ID;
                            coachName = item.CoachName + ' ' + item.Surname;
                            if (!ClientRefIDs.includes(refID)) {
                                ClientRefIDs.push(refID);
                            }
                        },
                    );
                }

                /* Printing the Client Classes */
                await this.fillTable(this.state.refIDsCoach, this.state.clientNames, classRefIDs);

                // Checking if the client has the same coach assigned for PT
                if (coachID !== this.state.Coach_ID) {
                    Swal.fire(
                        'A different coach is registered for personal training for this client',
                        'You cannot add a personal schedule session to this client',
                        'error',
                    ).then();
                    return;
                }
                // *********** Getting day and time from box select ***************
                let time = this.props.time;
                let day = this.props.day;
                if (this.props.time < 10) {
                    refID = day + '.0' + time;
                } else {
                    refID = day + '.' + time;
                }
                if (prevProps.userID !== this.props.userID) {
                    refID = '';
                }

                if ((time === '' || day === '')) {
                    refID = '';
                }

                let refIDsCoach = [...this.state.refIDsCoach];
                let clientNames = [...this.state.clientNames];
                if (!this.state.refIDsCoach.includes(refID)
                    && this.props.flag === true && refID !== '' && !classRefIDs.includes(
                        refID) && !this.state.refIDs.includes(refID)) {

                    refIDsCoach.push(refID);
                    clientNames.push(this.props.userName);
                    await this.setState({refIDsCoach: refIDsCoach, clientNames: clientNames})
                    await this.insertDeleteMethodStates();
                } else {
                    let pos = ClientRefIDs.indexOf(refID);
                    let posCoach = refIDsCoach.indexOf(refID);
                    if (refIDsCoach.includes(refID) && ClientRefIDs.includes(refID) && this.props.flag === false && refID !== '') {
                        ClientRefIDs.splice(pos, 1);
                        refIDsCoach.splice(posCoach, 1);
                        clientNames.splice(posCoach, 1);
                        await this.setState({refIDsCoach: refIDsCoach, clientNames: clientNames})

                        await this.insertDeleteMethodStates();
                    } else {
                        /* Conflict and Error Messages */
                        // Insert Warnings
                        // Coach has another PT or class at this time
                        if ((refIDsCoach.includes(refID) || this.state.refIDs.includes(refID))
                            && this.props.flag === true) {
                            this.toggleModalCoachBooked();
                            coachID = '';
                        }
                        // User has a class at that time.
                        if ((!refIDsCoach.includes(refID) && !this.state.refIDs.includes(refID))
                            && classRefIDs.includes(refID) && this.props.flag === true) {
                            this.toggleModalClientHasClassInsert();
                            coachID = '';
                        }

                        // Deletion Warnings
                        // Different Client
                        if ((refIDsCoach.includes(refID) && !ClientRefIDs.includes(refID))
                            && this.props.flag === false) {
                            this.toggleModalAnotherClient();
                            coachID = '';
                        }
                        //Empty Cell
                        if (!refIDsCoach.includes(refID) && !ClientRefIDs.includes(refID) &&
                            !this.state.refIDs.includes(refID) && !classRefIDs.includes(refID) &&
                            this.props.flag === false && refID !== '') {
                            this.toggleModalEmptyCell();
                            coachID = '';
                        }
                        // Client has a class
                        if (classRefIDs.includes(refID) && this.props.flag === false) {
                            this.toggleModalClientHasClass();
                            coachID = '';
                        }


                    }

                }
                await this.fillTable(refIDsCoach, clientNames, classRefIDs);
            })();
        }
    }

    render() {
        return (
            <div className={'container'}>
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
                                    <div key={index} id={x}>
                                        <p/>
                                    </div>,
                                )}
                            <div className="weekend"/>
                            {[...Array(6).keys()].map(x => (x + 1.02).toFixed(2))
                                .map((x, index) =>
                                    <div key={index} id={x}>
                                        <p/>
                                    </div>,
                                )}

                            <div className="weekend"/>
                            {[...Array(6).keys()].map(x => (x + 1.03).toFixed(2))
                                .map((x, index) =>
                                    <div key={index} id={x}>
                                        <p/>
                                    </div>,
                                )}
                            <div className="weekend"/>
                            {[...Array(6).keys()].map(x => (x + 1.04).toFixed(2))
                                .map((x, index) =>
                                    <div key={index} id={x}>
                                        <p/>
                                    </div>,
                                )}
                            <div className="weekend"/>
                            {[...Array(6).keys()].map(x => (x + 1.05).toFixed(2))
                                .map((x, index) =>
                                    <div key={index} id={x}>
                                        <p/>
                                    </div>,
                                )}
                            <div className="weekend"/>
                            {[...Array(6).keys()].map(x => (x + 1.06).toFixed(2))
                                .map((x, index) =>
                                    <div key={index} id={x}>
                                        <p/>
                                    </div>,
                                )}
                            <div className="weekend"/>
                            {[...Array(6).keys()].map(x => (x + 1.07).toFixed(2))
                                .map((x, index) =>
                                    <div key={index} id={x}>
                                        <p/>
                                    </div>,
                                )}
                            <div className="weekend"/>
                            {[...Array(6).keys()].map(x => (x + 1.08).toFixed(2))
                                .map((x, index) =>
                                    <div key={index} id={x}>
                                        <p/>
                                    </div>,
                                )}
                            <div className="weekend"/>
                            {[...Array(6).keys()].map(x => (x + 1.09).toFixed(2))
                                .map((x, index) =>
                                    <div key={index} id={x}>
                                        <p/>
                                    </div>,
                                )}
                            <div className="weekend"/>
                            {[...Array(6).keys()].map(x => (x + 1.10).toFixed(2))
                                .map((x, index) =>
                                    <div key={index} id={x}>
                                        <p/>
                                    </div>,
                                )}
                            <div className="weekend"/>
                            {[...Array(6).keys()].map(x => (x + 1.11).toFixed(2))
                                .map((x, index) =>
                                    <div key={index} id={x}>
                                        <p/>
                                    </div>,
                                )}
                            <div className="weekend"/>
                            {[...Array(6).keys()].map(x => (x + 1.12).toFixed(2))
                                .map((x, index) =>
                                    <div key={index} id={x}>
                                        <p/>
                                    </div>,
                                )}
                            <div className="weekend"/>
                        </div>
                    </div>
                </div>
                <br/>
                <div className={'row'}>
                    <div className='col-sm-12 col-md-12 legendsBoxPT'>
                        <div className="sameRow">
                            <div className='classBookedSmall'/>
                            <small>&emsp;Client Class Enrolled</small>
                        </div>
                    </div>
                </div>
                <br/>
            </div>
        );
    }
}

export default CoachSchedule;