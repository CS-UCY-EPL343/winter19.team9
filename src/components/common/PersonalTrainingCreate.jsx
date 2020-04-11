import React, {Component} from 'react';
import '../assets/styles/PersonalTrainingTimetable.css';
import {
  insertPT, deletePT, getCoachTraining, getClassSchedule, getPersonalSchedule,
}                         from '../../repository';
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
              console.log(refID);
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
        insertPT(this.state).then(); //() => alert('Successful
                                     // insertion')).catch(err => alert(err));
        console.log('REFIDS AFTER INSERTION: \n' + this.state.refIDs);
      } else {
        deletePT(this.state).then(); //() => alert('Success
                                     // deletion')).catch(err => alert(err));
      }
    });
  }

  // noinspection JSUnusedLocalSymbols
  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.day !== this.props.day || prevProps.time !== this.props.time
        || prevProps.flag !== this.props.flag
        || prevProps.coachID !== this.props.coachID || prevProps.userID
        !== this.props.userID) {
      console.clear();
      console.log('An update is being performed!');

      (async() => {
        let refID = '';

        // ************************* Clearing the arrays
        // ***************************
        // console.log("-----------------------------------------------------");
        // console.log('start clearing'); console.log('Cleared');
        // console.log("-----------------------------------------------------");
        let personalTraining = [];
        let classSchedule = [];

        if (this.props.userID !== '') {
          // console.log(" I AM HERE!!!!")
          await getPersonalSchedule(this.props.userID).then(response => {
            personalTraining = response;
            // console.log("this the user's returned schedule: \n");
            // console.log(personalTraining);
          });
          await getClassSchedule(this.props.userID).then(response => {
            classSchedule = response;
            // console.log("this the classes returned schedule: ");
            // console.log(classSchedule);

          });
        }

        // ************************* Filling the arrays
        // *************************** ------------------------- Class Schedule
        // -------------------------------
        let ret = [...classSchedule];
        // console.log("ret is here: \n");
        // console.log(ret);

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
                // console.log("HERE: " + item.Name);
              }

            },
        );

        // ------------------------ Personal Training --------------------------
        ret = [...personalTraining];
        refID = '';
        // console.log("pts is here: \n");
        // console.log(ret);
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
              console.log(' this is the coachID: ' + coachID);
              coachName = item.CoachName + ' ' + item.Surname;
              if (!refIDs.includes(refID)) {
                refIDs.push(refID);
              }
            },
        );

        this.setState({coachName: coachName});

        // -------------- Filling the CoachRefIDs ----------------------------
        // This will be used to prevent coach from having two personal training
        // sessions at the same time
        let trainingScheduleCoach = [];
        // trainingScheduleCoach =  await this.fetchingCoachSchedule(coachID);

        await getCoachTraining(coachID).then(response => {
          trainingScheduleCoach = response;
          // console.log("this the coach's returned schedule: \n");
          // console.log(trainingScheduleCoach);

        });

        let retCoach = [...trainingScheduleCoach];

        // console.log(retCoach);
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
        // console.log(refIDsCoach);
        // await this.fillTable(refIDs, classRefIDs, cNames, refIDsCoach);

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
          // console.log("YOU SHALL NOT PASS!!!")
          refID = '';
        }

        if (!refIDs.includes(refID) && !refIDsCoach.includes(refID)
            && this.props.flag === true && String(this.props.coachID) !== ''
            && (String(coachID) === String(this.props.coachID) || String(
                coachID) === '') && refID !== '' && !classRefIDs.includes(
                refID)) {
          console.log(
              '+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++');
          console.log('inserting stuff bip boop');
          console.log(
              '+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++');
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
            console.log(
                '+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++');
            console.log('deleting stuff bip boop');
            console.log(
                '+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++');
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

            // console.log("coachID : " + (coachID) + " prop coachID: " +
            // this.props.coachID);
            if (String(coachID) !== String(this.props.coachID) && String(
                coachID) !== '' && prevProps.userID === this.props.userID) { //
              this.toggleModalIncorrectCoach();
            }
          }

        }
        console.log(refIDsCoach);
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
                        <div
                            key = { index } id = { x }
                        />,
                    ) }
                <div className = "weekend" />
                { [...Array(6).keys()].map(x => (x + 1.02).toFixed(2))
                    .map((x, index) =>
                        // <div className={classes.join(' ')} key={index}
                        // id={x}/>
                        <div
                            key = { index } id = { x }
                        />,
                    ) }

                <div className = "weekend" />
                { [...Array(6).keys()].map(x => (x + 1.03).toFixed(2))
                    .map((x, index) =>
                        <div
                            key = { index } id = { x }
                        />,
                    ) }
                <div className = "weekend" />
                { [...Array(6).keys()].map(x => (x + 1.04).toFixed(2))
                    .map((x, index) =>
                        <div
                            key = { index } id = { x }
                        />,
                    ) }
                <div className = "weekend" />
                { [...Array(6).keys()].map(x => (x + 1.05).toFixed(2))
                    .map((x, index) =>
                        <div
                            key = { index } id = { x }
                        />,
                    ) }
                <div className = "weekend" />
                { [...Array(6).keys()].map(x => (x + 1.06).toFixed(2))
                    .map((x, index) =>
                        <div
                            key = { index } id = { x }
                        />,
                    ) }
                <div className = "weekend" />
                { [...Array(6).keys()].map(x => (x + 1.07).toFixed(2))
                    .map((x, index) =>
                        <div
                            key = { index } id = { x }
                        />,
                    ) }
                <div className = "weekend" />
                { [...Array(6).keys()].map(x => (x + 1.08).toFixed(2))
                    .map((x, index) =>
                        <div
                            key = { index } id = { x }
                        />,
                    ) }
                <div className = "weekend" />
                { [...Array(6).keys()].map(x => (x + 1.09).toFixed(2))
                    .map((x, index) =>
                        <div
                            key = { index } id = { x }
                        />,
                    ) }
                <div className = "weekend" />
                { [...Array(6).keys()].map(x => (x + 1.10).toFixed(2))
                    .map((x, index) =>
                        <div
                            key = { index } id = { x }
                        />,
                    ) }
                <div className = "weekend" />
                { [...Array(6).keys()].map(x => (x + 1.11).toFixed(2))
                    .map((x, index) =>
                        <div
                            key = { index } id = { x }
                        />,
                    ) }
                <div className = "weekend" />
                { [...Array(6).keys()].map(x => (x + 1.12).toFixed(2))
                    .map((x, index) =>
                        <div
                            key = { index } id = { x }
                        />,
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
              {/*<div className="sameRow">*/ }
              {/*    /!*<div className='coachBookedSmall'></div>*!/*/ }
              {/*    /!*<small>&emsp;Coach Booked</small>*!/*/ }
              {/*</div>*/ }
              {/*<div className="sameRow">*/ }
              {/*    /!*<div className='classBookedSmall'></div>*!/*/ }
              {/*    /!*<small>&emsp;Class Enrolled</small>*!/*/ }
              {/*</div>*/ }
            </div>
          </div>
          <br />
        </div>
    );
  }
}

export default PersonalTrainingCreate;