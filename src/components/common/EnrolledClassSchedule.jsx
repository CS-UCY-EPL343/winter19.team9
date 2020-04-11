import React, {Component} from 'react';
import '../assets/styles/PersonalTrainingTimetable.css';
import {
  getUserID,
  getClassSchedule,
  getPersonalSchedule,
  enrollUser,
  unenrollUser,
}                         from '../../repository';
import Swal               from 'sweetalert2';
import '@sweetalert2/theme-dark/dark.css';

class EnrolledClassSchedule extends Component {

  constructor(props) {

    super(props);
    this.myRef = React.createRef();
    this.state = {
      refID              : '',
      refIDs             : [],
      ptIDs              : [],
      trainingScheduleRet: [],
      flag               : false,
      Coach_ID           : '',
      User_ID            : '',
      classSchedule      : [],
      personalSchedule   : [],
      cIDs               : [],
      pIDs               : [],
      cNames             : [],
      pNames             : [],
      ClassID            : '',
      Name               : '',
      ClassColors        : [
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
    this.StateSetter = this.StateSetter.bind(this);
    this.StateSetterPT = this.StateSetterPT.bind(this);
    this.ColorLuminance = this.ColorLuminance.bind(this);
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
        this.setState({cNames: z}, () => {
          console.log(this.state.cNames);
        });
      });
    });
  }

  StateSetterPT(x, y, z) {
    this.setState({ptIDs: x}, () => {
      this.setState({pIDs: y}, () => {
        this.setState({pNames: z}, () => {
          console.log(this.state.pNames);
        });
      });
    });
  }

  componentDidMount() {
    getUserID().then(response => {
      console.log(response);
      this.setState(
          {User_ID: response.User_ID}, () => {

            // Gets the Class Name, ID, TimeCode and DayCode Based on the
            // user's ID
            console.clear();
            getClassSchedule(this.state.User_ID).then(response => {
              this.setState({classSchedule: response}, () => {
                console.log('Class Schedule obtained! Here it comes!');
                console.log(this.state.classSchedule);
                let ret = this.state.classSchedule.slice(0);
                let refID;
                //console.log("Let's go to the mall");
                //this.setState({Coach_ID: this.props.coachID, User_ID:
                // this.props.userID});

                (async() => {
                  console.log('foo');
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
                          const node = document.getElementById(refID);
                          node.className = 'BusySlot';
                          node.textContent = item.Name;
                          console.log(
                              'refID: ' + refID + ' | class-ID: ' + item.ClassID
                              + ' | Name: ' + item.Name);
                          if (z.includes(item.Name)) {
                            console.log('color: '
                                        + this.state.ClassColors[this.state.cIDs[this.state.cNames.indexOf(
                                    item.Name)]]);
                            // node.style.backgroundColor =
                            // this.state.ClassColors[this.state.cIDs[this.state.cNames.indexOf(item.Name)]];
                            node.style.backgroundImage =
                                'linear-gradient(to bottom right,'
                                + this.state.ClassColors[this.state.cIDs[this.state.cNames.indexOf(
                                item.Name)] % 9] + ','
                                + this.ColorLuminance(
                                this.state.ClassColors[(this.state.cIDs[this.state.cNames.indexOf(
                                    item.Name)]) % 9], -0.5) + ')';
                          } else {
                            console.log(
                                'color: ' + this.state.ClassColors[item.ClassID]);
                            // node.style.backgroundColor =
                            // this.state.ClassColors[item.ClassID];
                            node.style.backgroundImage =
                                'linear-gradient(to bottom right,'
                                + this.state.ClassColors[this.state.cIDs[this.state.cNames.indexOf(
                                item.Name)] % 9] + ','
                                + this.ColorLuminance(
                                this.state.ClassColors[(this.state.cIDs[this.state.cNames.indexOf(
                                    item.Name)]) % 9], -0.5) + ')';
                          }

                          console.log(item.Name);
                        }
                      },
                  );
                  await this.StateSetter(x, y, z);
                })();
              });
            });

            getPersonalSchedule(this.state.User_ID).then(response => {
              this.setState({personalSchedule: response}, () => {
                console.log('Personal Training obtained! Here it comes!');
                console.log(this.state.personalSchedule);
                let retPer = this.state.personalSchedule.slice(0);
                let refID;
                //console.log("Let's go to the mall");
                //this.setState({Coach_ID: this.props.coachID, User_ID:
                // this.props.userID});

                (async() => {
                  console.log('foo');
                  let x = this.state.ptIDs;
                  let y = this.state.pIDs;
                  let z = this.state.pNames;
                  retPer.forEach((item) => {
                        if (item.Time < 10) {
                          this.setState({refID: item.Day + '.0' + item.Time});
                          refID = item.Day + '.0' + item.Time;
                        } else {
                          this.setState({refID: item.Day + '.' + item.Time});
                          refID = item.Day + '.' + item.Time;
                        }
                        if (!x.includes(refID)) {
                          x.push(refID);
                          y.push(item.Coach_ID);
                          z.push(item.CoachName);
                          const node = document.getElementById(refID);
                          node.className = 'PTSlot';
                          node.textContent = item.CoachName;
                          node.style.backgroundImage = 'radial-gradient( #4c4c4c,'
                                                       + this.ColorLuminance(
                                  '#4C4C4C', -0.7) + ')';

                          //********************************************************

                          // node.style.backgroundImage = "url("+Weights+")";
                          // node.style.backgroundSize = "100%";
                          // node.style.backgroundPosition = "center";
                          // node.style.backgroundRepeat = "repeat";
                          console.log(item.CoachName);
                        }
                      },
                  );
                  await this.StateSetterPT(x, y, z);
                })();
              });
            });

          });
    });
  }

  // noinspection JSUnusedLocalSymbols
  componentDidUpdate(prevProps, prevState, snapshot) {
    if (
        prevProps.DayCode !== this.props.DayCode
        || prevProps.TimeCode !== this.props.TimeCode
        || prevProps.flag !== this.props.flag
    ) {

      let refID;
      console.log(this.props.DayCode + this.props.TimeCode + this.props.flag);

      if (this.props.TimeCode < 10) {
        this.setState({refID: this.props.DayCode + '.0' + this.props.TimeCode});
        refID = this.props.DayCode + '.0' + this.props.TimeCode;
      } else {
        this.setState({refID: this.props.DayCode + '.' + this.props.TimeCode});
        refID = this.props.DayCode + '.' + this.props.TimeCode;
      }

      this.setState({flag: this.props.flag});
      console.log(this.props.flag);

      // Create a new array based on current state:
      let x = this.state.refIDs.slice(0);
      let y = this.state.cIDs.slice(0);
      let z = this.state.cNames.slice(0);
      let p = this.state.ptIDs.slice(0);

      //Checks if the user wants to enroll or unenroll. Flag is true for enroll
      // and false otherwise.
      if (this.props.flag === true) {

        //Checks if there is not any personal training or class scehduled for
        // the user at that specific time
        if (!p.includes(refID) && !x.includes(refID)) {
          (async() => {

            //Copies the tables for the Class timetable entries, Class ID's and
            // Class names into temporary ones.
            x.push(refID);
            y.push(this.props.ClassID);
            z.push(this.props.Name);

            //waiting to copy all the tables before proceeding
            await this.StateSetter(x, y, z);

            //node is the div element containing the specified Class enrollment
            const node = document.getElementById(refID);

            //Sets that timetable entry as "enrolled"
            node.className = 'BusySlot';
            node.textContent = this.props.Name;
            console.log('refID: ' + refID + ' | class-ID: ' + this.props.ClassID
                        + ' | Name: ' + this.props.Name);
            if (z.includes(this.props.Name)) {
              console.log('color: '
                          + this.state.ClassColors[this.state.cIDs[this.state.cNames.indexOf(
                      this.props.Name)]]);
              // node.style.backgroundColor =
              // this.state.ClassColors[this.state.cIDs[this.state.cNames.indexOf(item.Name)]];
              node.style.backgroundImage = 'linear-gradient(to bottom right,'
                                           + this.state.ClassColors[this.state.cIDs[this.state.cNames.indexOf(
                      this.props.Name)] % 9] + ','
                                           + this.ColorLuminance(
                      this.state.ClassColors[(this.state.cIDs[this.state.cNames.indexOf(
                          this.props.Name)]) % 9], -0.5) + ')';
            } else {
              console.log(
                  'color: ' + this.state.ClassColors[this.props.ClassID]);
              // node.style.backgroundColor =
              // this.state.ClassColors[item.ClassID];
              node.style.backgroundImage = 'linear-gradient(to bottom right,'
                                           + this.state.ClassColors[this.state.cIDs[this.state.cNames.indexOf(
                      this.props.Name)] % 9] + ','
                                           + this.ColorLuminance(
                      this.state.ClassColors[(this.state.cIDs[this.state.cNames.indexOf(
                          this.props.Name)]) % 9], -0.5) + ')';
            }
            console.clear();
            console.log('CLASSSSSS IDDDDDD');
            console.log(this.state.cIDs[this.state.refIDs.indexOf(refID)]);
            console.log('USEEEERR IDDDDDD');
            console.log(this.state.User_ID);
            enrollUser(this.state.cIDs[this.state.refIDs.indexOf(refID)],
                this.state.User_ID).then();
            console.log('Successfully enrolled');
          })();

          // })();
        } else {
          Swal.fire(
              'You have something else scheduled for that time',
              '',
              'error',
          ).then();
        }
      } else {
        if (this.props.flag === false) {
          if (!p.includes(refID)) {
            if (x.includes(refID)) {
              if (this.props.ClassID
                  === this.state.cIDs[this.state.refIDs.indexOf(refID)]) {
                console.clear();
                console.log('Correct');
                (async() => {

                  //wait to unenroll first and then remove the entries from the
                  // arrays
                  await unenrollUser(
                      this.state.cIDs[this.state.refIDs.indexOf(refID)],
                      this.state.User_ID,
                  ).then();

                  //Copy of timetable Class entry array
                  const newList = this.state.refIDs.slice(0);
                  newList.splice(this.state.refIDs.indexOf(refID), 1);

                  //Copy of Class ID's array
                  const newList2 = this.state.cIDs.slice(0);
                  newList2.splice(this.state.refIDs.indexOf(refID), 1);

                  //Copy of Class's Names array
                  const newList3 = this.state.cNames.slice(0);
                  newList3.splice(this.state.refIDs.indexOf(refID), 1);

                  this.StateSetter(newList, newList2, newList3);
                  const node = document.getElementById(refID);
                  node.className = '';
                  node.textContent = '';
                  node.style.backgroundImage = '';

                })();
              } else {
                Swal.fire(
                    'You are enrolled to another class at that time',
                    '',
                    'error',
                ).then();
              }
            } else {
              Swal.fire(
                  'There is no class to unenroll from',
                  '',
                  'error',
              ).then();
            }
          } else {
            Swal.fire(
                'You should speak with your coach in order to cancel a Personal Training session',
                '',
                'error',
            ).then();
          }
        }
      }
    }
  }

  render() {
    return (
        <div>
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
              <div className = "content" ref = { this.myRef }>

                { [...Array(6).keys()].map(x => (x + 1.01).toFixed(2))
                    .map((x, index) =>
                        <div
                            // style={{
                            //     backgroundColor:
                            // this.state.refIDs.includes(x) ?
                            // '#'+this.state.cIDs[this.state.refIDs.indexOf(x)].toString()+this.state.cIDs[this.state.refIDs.indexOf(x)].toString()+this.state.cIDs[this.state.refIDs.indexOf(x)].toString()
                            // : '#993333', }}
                            // className={this.state.refIDs.includes(x) ?
                            // 'blackBackSelected' : ''}

                            key = { index }
                            id = { x }
                        >
                          {/*{this.state.refIDs.includes(x) ? this.state.cNames[this.state.refIDs.indexOf(x)] : ""}*/ }
                        </div>,
                    ) }

                <div className = "weekend" />
                { [...Array(6).keys()].map(x => (x + 1.02).toFixed(2))
                    .map((x, index) =>
                        <div
                            // style={{
                            //     backgroundColor:
                            // this.state.refIDs.includes(x) ?
                            // '#'+this.state.cIDs[this.state.refIDs.indexOf(x)].toString()+this.state.cIDs[this.state.refIDs.indexOf(x)].toString()+this.state.cIDs[this.state.refIDs.indexOf(x)].toString()
                            // : '#993333', }}
                            // className={this.state.refIDs.includes(x) ?
                            // 'blackBackSelected' : ''}
                            key = { index }
                            id = { x }
                        >
                          {/*{this.state.refIDs.includes(x) ? this.state.cNames[this.state.refIDs.indexOf(x)] : ""}*/ }
                        </div>,
                    ) }

                <div className = "weekend" />
                { [...Array(6).keys()].map(x => (x + 1.03).toFixed(2))
                    .map((x, index) =>
                        <div
                            // style={{
                            //     backgroundColor:
                            // this.state.refIDs.includes(x) ?
                            // '#'+this.state.cIDs[this.state.refIDs.indexOf(x)].toString()+this.state.cIDs[this.state.refIDs.indexOf(x)].toString()+this.state.cIDs[this.state.refIDs.indexOf(x)].toString()
                            // : '#993333', }}
                            // className={this.state.refIDs.includes(x) ?
                            // 'blackBackSelected' : ''}
                            key = { index }
                            id = { x }
                        >
                          {/*{console.log(this.state.cIDs[this.state.refIDs.indexOf(x)])}*/ }
                          {/*{this.state.refIDs.includes(x) ? this.state.cNames[this.state.refIDs.indexOf(x)] : ""}*/ }
                        </div>,
                    ) }

                <div className = "weekend" />
                { [...Array(6).keys()].map(x => (x + 1.04).toFixed(2))
                    .map((x, index) =>
                        <div
                            // style={{
                            //     backgroundColor:
                            // this.state.refIDs.includes(x) ?
                            // '#'+this.state.cIDs[this.state.refIDs.indexOf(x)].toString()+this.state.cIDs[this.state.refIDs.indexOf(x)].toString()+this.state.cIDs[this.state.refIDs.indexOf(x)].toString()
                            // : '#993333', }}
                            // className={this.state.refIDs.includes(x) ?
                            // 'blackBackSelected' : ''}
                            key = { index }
                            id = { x }
                        >
                          {/*{this.state.refIDs.includes(x) ? this.state.cNames[this.state.refIDs.indexOf(x)] : ""}*/ }
                        </div>,
                    ) }

                <div className = "weekend" />
                { [...Array(6).keys()].map(x => (x + 1.05).toFixed(2))
                    .map((x, index) =>
                        <div
                            // style={{
                            //     backgroundColor:
                            // this.state.refIDs.includes(x) ?
                            // '#'+this.state.cIDs[this.state.refIDs.indexOf(x)].toString()+this.state.cIDs[this.state.refIDs.indexOf(x)].toString()+this.state.cIDs[this.state.refIDs.indexOf(x)].toString()
                            // : '#993333', }}
                            // className={this.state.refIDs.includes(x) ?
                            // 'blackBackSelected' : ''}

                            key = { index }
                            id = { x }
                        >
                          {/*{this.state.refIDs.includes(x) ? this.state.cNames[this.state.refIDs.indexOf(x)] : ""}*/ }
                        </div>,
                    ) }

                <div className = "weekend" />
                { [...Array(6).keys()].map(x => (x + 1.06).toFixed(2))
                    .map((x, index) =>
                        <div
                            // style={{
                            //     backgroundColor:
                            // this.state.refIDs.includes(x) ?
                            // '#'+this.state.cIDs[this.state.refIDs.indexOf(x)].toString()+this.state.cIDs[this.state.refIDs.indexOf(x)].toString()+this.state.cIDs[this.state.refIDs.indexOf(x)].toString()
                            // : '#993333', }}
                            // className={this.state.refIDs.includes(x) ?
                            // 'blackBackSelected' : ''}
                            key = { index }
                            id = { x }
                        >
                          {/*{this.state.refIDs.includes(x) ? this.state.cNames[this.state.refIDs.indexOf(x)] : ""}*/ }
                        </div>,
                    ) }

                <div className = "weekend" />
                { [...Array(6).keys()].map(x => (x + 1.07).toFixed(2))
                    .map((x, index) =>
                        <div
                            // style={{
                            //     backgroundColor:
                            // this.state.refIDs.includes(x) ?
                            // '#'+this.state.cIDs[this.state.refIDs.indexOf(x)].toString()+this.state.cIDs[this.state.refIDs.indexOf(x)].toString()+this.state.cIDs[this.state.refIDs.indexOf(x)].toString()
                            // : '#993333', }}
                            // className={this.state.refIDs.includes(x) ?
                            // 'blackBackSelected' : ''}
                            key = { index }
                            id = { x }
                        >
                          {/*{this.state.refIDs.includes(x) ? this.state.cNames[this.state.refIDs.indexOf(x)] : ""}*/ }
                        </div>,
                    ) }

                <div className = "weekend" />
                { [...Array(6).keys()].map(x => (x + 1.08).toFixed(2))
                    .map((x, index) =>
                        <div
                            // style={{
                            //     backgroundColor:
                            // this.state.refIDs.includes(x) ?
                            // '#'+this.state.cIDs[this.state.refIDs.indexOf(x)].toString()+this.state.cIDs[this.state.refIDs.indexOf(x)].toString()+this.state.cIDs[this.state.refIDs.indexOf(x)].toString()
                            // : '#993333', }}
                            // className={this.state.refIDs.includes(x) ?
                            // 'blackBackSelected' : ''}
                            key = { index }
                            id = { x }
                        >
                          {/*{this.state.refIDs.includes(x) ? this.state.cNames[this.state.refIDs.indexOf(x)] : ""}*/ }
                        </div>,
                    ) }

                <div className = "weekend" />
                { [...Array(6).keys()].map(x => (x + 1.09).toFixed(2))
                    .map((x, index) =>
                        <div
                            //                                         style={{
                            //     backgroundColor:
                            // this.state.refIDs.includes(x) ?
                            // '#'+this.state.cIDs[this.state.refIDs.indexOf(x)].toString()+this.state.cIDs[this.state.refIDs.indexOf(x)].toString()+this.state.cIDs[this.state.refIDs.indexOf(x)].toString()
                            // : '#993333', }}
                            // className={this.state.refIDs.includes(x) ?
                            // 'blackBackSelected' : ''}
                            key = { index }
                            id = { x }
                        >
                          {/*{this.state.refIDs.includes(x) ? this.state.cNames[this.state.refIDs.indexOf(x)] : ""}*/ }
                        </div>,
                    ) }

                <div className = "weekend" />
                { [...Array(6).keys()].map(x => (x + 1.10).toFixed(2))
                    .map((x, index) =>
                        <div
                            //                                         style={{
                            //     backgroundColor:
                            // this.state.refIDs.includes(x) ?
                            // '#'+this.state.cIDs[this.state.refIDs.indexOf(x)].toString()+this.state.cIDs[this.state.refIDs.indexOf(x)].toString()+this.state.cIDs[this.state.refIDs.indexOf(x)].toString()
                            // : '#993333', }}
                            // className={this.state.refIDs.includes(x) ?
                            // 'blackBackSelected' : ''}
                            key = { index }
                            id = { x }
                        >
                          {/*{this.state.refIDs.includes(x) ? this.state.cNames[this.state.refIDs.indexOf(x)] : ""}*/ }
                        </div>,
                    ) }

                <div className = "weekend" />
                { [...Array(6).keys()].map(x => (x + 1.11).toFixed(2))
                    .map((x, index) =>
                        <div
                            //                                         style={{
                            //     backgroundColor:
                            // this.state.refIDs.includes(x) ?
                            // '#'+this.state.cIDs[this.state.refIDs.indexOf(x)].toString()+this.state.cIDs[this.state.refIDs.indexOf(x)].toString()+this.state.cIDs[this.state.refIDs.indexOf(x)].toString()
                            // : '#993333', }}
                            // className={this.state.refIDs.includes(x) ?
                            // 'blackBackSelected' : ''}
                            key = { index }
                            id = { x }
                        >
                          {/*{this.state.refIDs.includes(x) ? this.state.cNames[this.state.refIDs.indexOf(x)] : ""}*/ }
                        </div>,
                    ) }

                <div className = "weekend" />
                { [...Array(6).keys()].map(x => (x + 1.12).toFixed(2))
                    .map((x, index) =>
                        <div
                            // style={{
                            //     backgroundColor:
                            // this.state.refIDs.includes(x) ?
                            // '#'+this.state.cIDs[this.state.refIDs.indexOf(x)].toString()+this.state.cIDs[this.state.refIDs.indexOf(x)].toString()+this.state.cIDs[this.state.refIDs.indexOf(x)].toString()
                            // : '#993333', }}
                            // className={this.state.refIDs.includes(x) ?
                            // 'blackBackSelected' : ''}
                            key = { index }
                            id = { x }
                        >
                          {/*{this.state.refIDs.includes(x) ? this.state.cNames[this.state.refIDs.indexOf(x)] : ""}*/ }
                        </div>,
                    ) }
                <div className = "weekend" />
              </div>
            </div>
          </div>
          <br />
        </div>

    );
  }
}

export default EnrolledClassSchedule;