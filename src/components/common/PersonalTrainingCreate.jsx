import React, {Component} from 'react';
import '../assets/styles/PersonalTrainingTimetable.css';
import {
  insertPT, deletePT, getCoachTraining, getClassSchedule, getPersonalSchedule,
} from '../../repository';
import Swal               from "sweetalert2";

class PersonalTrainingCreate extends Component {

  constructor(props) {

    super(props);
    this.state = {
      personalTraining     : [],
      classSchedule        : [],
      trainingScheduleCoach: [],
      Coach_ID             : '',
      User_ID              : '',
      coachBooked          : false,
      userBooked           : false,
      incorrectCoach       : false,
      classConflict        : false,
      coachName            : '',

      refIDs     : [],
      cIDs       : [],
      cNames     : [],
      Name       : '',
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
      ],
    };

    this.insertDeleteMethodStates = this.insertDeleteMethodStates.bind(this);
    this.fillTable = this.fillTable.bind(this);
  }

  // Modals for error messages in case of wrong input.
  toggleModalCoachBooked = () => {
    Swal.fire(
        'The coach has another scheduled client at this time.',
        '',
        'error',
    ).then();
  };

  toggleModalClassConflict = () => {
    Swal.fire(
        'The user has a registered class at that time.',
        '',
        'error',
    ).then();
  };

  toggleModalUserBooked = () => {
    Swal.fire(
        'The user has another class or personal training at this time.',
        '',
        'error',
    ).then();
  };

  toggleModalIncorrectCoach = () => {
    Swal.fire(
        'The coach registered for personal training to this user is ' + this.state.coachName + '.',
        'Please log in and try again...',
        'error',
    ).then();
  };

  //method responsible for displaying the enrolled classes and personal
  // training according to the user data from the database
  fillTable(refIDs, classesRefIDs, cNames, coaches) {
    let node;
    for (let i = 1; i <= 6; i++) {
      for (let x = 1; x <= 12; x++) {
        let refID = '';
        if (x < 10) {
          refID = i + '.0' + x;
        } else {
          refID = i + '.' + x;
        }
        if (refIDs.includes(refID)) {
          node = document.getElementById(refID);
          node.className = 'blackBackSelected';
        } else {
          if (classesRefIDs.includes(refID)) {
            node = document.getElementById(refID);
            node.className = 'classesBackground';
          } else {
            if (coaches.includes(refID)) {
              node = document.getElementById(refID);
              node.className = 'coachBooked';
            } else {
              node = document.getElementById(refID);
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
      User_ID : this.props.userID,
      Coach_ID: this.props.coachID,
      time    : this.props.time,
      day     : this.props.day,
    }, () => {
      if (this.props.flag === true) {
        insertPT(this.state).then();
      } else {
        deletePT(this.state).then();
      }
    });
  }

  // noinspection DuplicatedCode
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



  // noinspection JSUnusedLocalSymbols
  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.day !== this.props.day || prevProps.time !== this.props.time
        || prevProps.flag !== this.props.flag
        || prevProps.coachID !== this.props.coachID || prevProps.userID
        !== this.props.userID) {
      // console.clear();
      (async() => {
        console.log(this.props.userID)
        let refID = '';

        // ************************* Clearing the arrays
        // ***************************
        let personalTraining = [];
        let classSchedule = [];

        if (this.props.userID !== '') {
          await getPersonalSchedule(this.props.userID).then(response => {
            personalTraining = response;
          });
          await getClassSchedule(this.props.userID).then(response => {
            classSchedule = response;

          });
        }

        // ************************* Filling the arrays
        // *************************** ------------------------- Class Schedule
        // -------------------------------
        let ret = [...classSchedule];
        let classRefIDs = [];
        let cNames = [];
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
                cNames.push(item.Name);
              }
            },
        );


        // ------------------------ Personal Training --------------------------
        ret = [...personalTraining];
        refID = '';
        let coachID = '';
        let refIDs = [];
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
              if (!refIDs.includes(refID)) {
                refIDs.push(refID);
              }
            },
        );

        this.setState({coachName: coachName});
        // this.setState({Coach_ID: coachID});
        // noinspection JSUnresolvedFunction
        this.props.coachIDret(coachID);



        // -------------- Filling the CoachRefIDs ----------------------------
        // This will be used to prevent coach from having two personal training
        // sessions at the same time
        let trainingScheduleCoach = [];
        // trainingScheduleCoach =  await this.fetchingCoachSchedule(coachID);

        await getCoachTraining(coachID).then(response => {
          trainingScheduleCoach = response;
        });

        let retCoach = [...trainingScheduleCoach];

        refID = '';
        let refIDsCoach = [];

        retCoach.forEach((coach) => {
              if (coach.Time < 10) {
                refID = coach.Day + '.0' + coach.Time;
              } else {
                refID = coach.Day + '.' + coach.Time;
              }
              // Create a new array based on current state:
              if (!refIDsCoach.includes(refID)) {
                refIDsCoach.push(refID);
              }
            },
        );


        // ************ Printing the filled tables on the site **************

        let time = this.props.time;
        let day = this.props.day;

        // ********************** Getting day and time from box selection
        // *********************
        if (this.props.time < 10) {
          refID = day + '.0' + time;
        } else {
          refID = day + '.' + time;
        }
        if (prevProps.userID !== this.props.userID || (prevProps.day
                                                       === this.props.day
                                                       && prevProps.time
                                                       === this.props.time
                                                       && prevProps.coachID
                                                       === this.props.coachID
                                                       && prevProps.flag
                                                       === this.props.flag)) {
          refID = '';
        }

        if (!refIDs.includes(refID) && !refIDsCoach.includes(refID)
            && this.props.flag === true && String(this.props.coachID) !== ''
            && (String(coachID) === String(this.props.coachID) || String(
                coachID) === '') && refID !== '' && !classRefIDs.includes(
                refID)) {
          refIDs.push(refID);
          refIDsCoach.push(coachID);
          await this.insertDeleteMethodStates(String(coachID),
              String(this.props.coachID));
        } else {
          let pos = refIDs.indexOf(refID);
          let posCoach = refIDsCoach.indexOf(refID);
          if (refIDs.includes(refID) && this.props.flag === false && String(
              this.props.coachID) !== ''
              && (String(coachID) === String(this.props.coachID) || String(
                  coachID) === '') && refID !== '') {

            refIDs.splice(pos, 1);
            refIDsCoach.splice(posCoach, 1);
            await this.insertDeleteMethodStates(String(coachID),
                String(this.props.coachID));
          } else {

            if ((refIDs.includes(refID) || classRefIDs.includes(refID))
                && this.props.flag === true) {
              this.toggleModalUserBooked();
              coachID = '';
            }

            if (classRefIDs.includes(refID) && this.props.flag === false) {
              this.toggleModalClassConflict();
              coachID = '';
            }
            if (refIDsCoach.includes(refID) && !refIDs.includes(refID)
                && this.props.flag === true && String(coachID)
                === this.props.coachID) {
              this.toggleModalCoachBooked();
            }

            if (String(coachID) !== String(this.props.coachID) && String(
                coachID) !== '' && prevProps.userID === this.props.userID) { //
              this.toggleModalIncorrectCoach();
            }
          }

        }
        await this.fillTable(refIDs, classRefIDs, cNames, refIDsCoach);

      })();
    }
  }

  render() {
    return (
        <div className = { 'container' }>
          <div className = "row">
            <div className = "timetable">
              <div className = "week-names">
                <div>monday</div>
                <div>tuesday</div>
                <div>w/day</div>
                <div>thursday</div>
                <div>friday</div>
                <div>saturday</div>
                <div className = "weekend">sunday</div>
              </div>
              <div className = "time-interval">
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
              <div className = "content">
                { [...Array(6).keys()].map(x => (x + 1.01).toFixed(2))
                    .map((x, index) =>
                        <div key = { index } id = { x }>
                          <p />
                        </div>,
                    ) }
                <div className = "weekend" />
                { [...Array(6).keys()].map(x => (x + 1.02).toFixed(2))
                    .map((x, index) =>
                        <div key = { index } id = { x }>
                          <p />
                        </div>,
                    ) }

                <div className = "weekend" />
                { [...Array(6).keys()].map(x => (x + 1.03).toFixed(2))
                    .map((x, index) =>
                        <div key = { index } id = { x }>
                          <p />
                        </div>,
                    ) }
                <div className = "weekend" />
                { [...Array(6).keys()].map(x => (x + 1.04).toFixed(2))
                    .map((x, index) =>
                        <div key = { index } id = { x }>
                          <p />
                        </div>,
                    ) }
                <div className = "weekend" />
                { [...Array(6).keys()].map(x => (x + 1.05).toFixed(2))
                    .map((x, index) =>
                        <div key = { index } id = { x }>
                          <p />
                        </div>,
                    ) }
                <div className = "weekend" />
                { [...Array(6).keys()].map(x => (x + 1.06).toFixed(2))
                    .map((x, index) =>
                        <div key = { index } id = { x }>
                          <p />
                        </div>,
                    ) }
                <div className = "weekend" />
                { [...Array(6).keys()].map(x => (x + 1.07).toFixed(2))
                    .map((x, index) =>
                        <div key = { index } id = { x }>
                          <p />
                        </div>,
                    ) }
                <div className = "weekend" />
                { [...Array(6).keys()].map(x => (x + 1.08).toFixed(2))
                    .map((x, index) =>
                        <div key = { index } id = { x }>
                          <p />
                        </div>,
                    ) }
                <div className = "weekend" />
                { [...Array(6).keys()].map(x => (x + 1.09).toFixed(2))
                    .map((x, index) =>
                        <div key = { index } id = { x }>
                          <p />
                        </div>,
                    ) }
                <div className = "weekend" />
                { [...Array(6).keys()].map(x => (x + 1.10).toFixed(2))
                    .map((x, index) =>
                        <div key = { index } id = { x }>
                          <p />
                        </div>,
                    ) }
                <div className = "weekend" />
                { [...Array(6).keys()].map(x => (x + 1.11).toFixed(2))
                    .map((x, index) =>
                        <div key = { index } id = { x }>
                          <p />
                        </div>,
                    ) }
                <div className = "weekend" />
                { [...Array(6).keys()].map(x => (x + 1.12).toFixed(2))
                    .map((x, index) =>
                        <div key = { index } id = { x }>
                          <p />
                        </div>,
                    ) }
                <div className = "weekend" />
              </div>
            </div>
          </div>
          {/*<div> <span><small>&emsp;*The personal training sessions registered are represented by: </small></span><p className='smallCellBox'></p></div>*/ }
          <br />
          <div className = { 'row' }>
            <div className = 'col-sm-12 col-md-9 legendsBoxPT'>
              <div className = "sameRow">
                <div className = 'smallCellBox' />
                {/*<div className='smallCellBox'></div>*/ }
                <small>&emsp;User Booked</small>
                <div className = 'coachBookedSmall' />
                <small>&emsp;Coach Booked</small>
                <div className = 'classBookedSmall' />
                <small>&emsp;Class Enrolled</small>
              </div>
            </div>
          </div>
          <br />
        </div>
    );
  }
}

export default PersonalTrainingCreate;