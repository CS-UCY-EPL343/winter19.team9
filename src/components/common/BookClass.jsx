import React, {Component}       from 'react';
import '../assets/styles/BookDropdown.css';
import {getClasses}             from '../../repository';
import {getClassDay}            from '../../repository';
import {getClassTime}           from '../../repository';
import {getClassCoach}          from '../../repository';
import {getClassID}             from '../../repository';
import {getUserID}              from '../../repository';
import {preventDefault}         from 'leaflet/src/dom/DomEvent';
import ToggleModal              from './ToggleModal';
import GeneralScheduleModalBody from './GeneralScheduleModalBody';

class BookClass extends Component {

  constructor(props) {
    super(props);
    this.state = {
      User_ID      : '',
      Name         : [],
      Day          : [],
      Time         : [],
      CoachName    : [],
      SelectedClass: 'Select...',
      SelectedDay  : 'Select...',
      SelectedTime : 'Select...',
      SelectedCoach: 'Select...',
      ClassID      : '',
      DayCode      : '',
      TimeCode     : '',
      flag         : false,
      classSchedule: [],
      modalGeneral : false,
    };
    this.handleClass = this.handleClass.bind(this);
    this.handleDay = this.handleDay.bind(this);
    this.handleTime = this.handleTime.bind(this);
    this.handleCoach = this.handleCoach.bind(this);
    this.toggleModalGeneral = this.toggleModalGeneral.bind(this);

  }

  toggleModalGeneral = (e) => {
    preventDefault(e);
    this.setState({modalGeneral: !this.state.modalGeneral});
  };

  handleClass = (e) => {
    this.setState(
        {[e.target.name]: e.target.value === 'Select...' ? '' : e.target.value},
        () => {
          this.setState({Day: this.state.Day !== null ? [] : this.state.Day},
              () => {
                this.setState(
                    {Time: this.state.Time !== null ? [] : this.state.Time},
                    () => {
                      this.setState({
                        CoachName: this.state.CoachName !== null
                            ? []
                            : this.state.CoachName,
                      }, () => {
                        getClassDay(this.state.SelectedClass).then(response => {
                          this.setState({Day: response}, () => {
                            console.clear();
                            console.log('Class = ' + this.state.SelectedClass
                                        + ' & Days dropdown: ');
                            console.log(this.state.Day);
                          });
                        });
                      });
                    });
              });
        });
  };

  handleDay = (e) => {
    this.setState(
        {[e.target.name]: e.target.value === 'Select...' ? '' : e.target.value},
        () => {
          this.setState({Time: []}, () => {
            this.setState({CoachName: []}, () => {
              getClassTime(this.state.SelectedClass, this.state.SelectedDay)
                  .then(response => {
                    this.setState({Time: response}, () => {
                      console.log(
                          'Class = ' + this.state.SelectedClass + ', day = '
                          + this.state.SelectedDay + ' & Times dropdown: ');
                      console.log(this.state.Time);
                      if (this.state.SelectedDay === 'Monday') {
                        this.setState({DayCode: 1});
                      } else if (this.state.SelectedDay === 'Tuesday') {
                        this.setState({DayCode: 2});
                      } else if (this.state.SelectedDay === 'Wednesday') {
                        this.setState({DayCode: 3});
                      } else if (this.state.SelectedDay === 'Thursday') {
                        this.setState({DayCode: 4});
                      } else if (this.state.SelectedDay === 'Friday') {
                        this.setState({DayCode: 5});
                      } else if (this.state.SelectedDay === 'Saturday') {
                        this.setState({DayCode: 6});
                      } else if (this.state.SelectedDay === 'Sunday') {
                        this.setState({DayCode: 7});
                      }
                    });
                  });
            });
          });
        });
  };

  handleTime = (e) => {
    this.setState(
        {[e.target.name]: e.target.value === 'Select...' ? '' : e.target.value},
        () => {
          this.setState({CoachName: []}, () => {
            getClassCoach(this.state.SelectedClass, this.state.SelectedDay,
                this.state.SelectedTime).then(response => {
              this.setState({CoachName: response}, () => {
                console.log('Class = ' + this.state.SelectedClass + ', day = '
                            + this.state.SelectedDay + ', time = '
                            + this.state.SelectedTime
                            + ' & Coaches dropdown: ');
                console.log(this.state.CoachName);
                if (this.state.SelectedTime === '08:00:00') {
                  this.setState({TimeCode: 1});
                } else if (this.state.SelectedTime === '09:00:00') {
                  this.setState({TimeCode: 2});
                } else if (this.state.SelectedTime === '10:00:00') {
                  this.setState({TimeCode: 3});
                } else if (this.state.SelectedTime === '11:00:00') {
                  this.setState({TimeCode: 4});
                } else if (this.state.SelectedTime === '12:00:00') {
                  this.setState({TimeCode: 5});
                } else if (this.state.SelectedTime === '13:00:00') {
                  this.setState({TimeCode: 6});
                } else if (this.state.SelectedTime === '14:00:00') {
                  this.setState({TimeCode: 7});
                } else if (this.state.SelectedTime === '15:00:00') {
                  this.setState({TimeCode: 8});
                } else if (this.state.SelectedTime === '16:00:00') {
                  this.setState({TimeCode: 9});
                } else if (this.state.SelectedTime === '17:00:00') {
                  this.setState({TimeCode: 10});
                } else if (this.state.SelectedTime === '18:00:00') {
                  this.setState({TimeCode: 11});
                } else if (this.state.SelectedTime === '19:00:00') {
                  this.setState({TimeCode: 12});
                }
              });
            });
          });
        });
  };

  handleCoach = (e) => {
    this.setState(
        {[e.target.name]: e.target.value === 'Select...' ? '' : e.target.value},
        () => {
          getClassID(this.state.SelectedClass, this.state.SelectedDay,
              this.state.SelectedTime, this.state.SelectedCoach)
              .then(response => {
                this.setState({ClassID: response.data.ClassID.ClassID}, () => {
                  console.log(
                      'FINAL SELECTION:\nClass = ' + this.state.SelectedClass
                      + ', day = ' + this.state.SelectedDay + ', time = '
                      + this.state.SelectedTime + ' & coach = '
                      + this.state.SelectedCoach);
                });
              });
        });

  };

  onSubmit = (e) => {
    preventDefault(e);
    // enrollUser(this.state.ClassID, this.state.User_ID).then();
    // () => alert('Success')).catch(err => alert(err));
    this.setState({flag: true}, () => {
      this.props.getSelections(
          this.state.DayCode,
          this.state.TimeCode,
          true,
          this.state.ClassID,
          this.state.SelectedClass,
      );
    });

    this.setState({Name: []}, () => {
      this.setState({Day: []}, () => {
        this.setState({Time: []}, () => {
          this.setState({CoachName: []}, () => {
            getClasses().then(response => {
              this.setState({Name: response});
            });
          });
        });
      });
    });
  };

  onDelete = (e) => {
    preventDefault(e);
    // unenrollUser(this.state.ClassID, this.state.User_ID).then();
    //() => alert('Success')).catch(err => alert(err));
    this.setState({flag: false},
        () => {
          this.props.getSelections(this.state.DayCode, this.state.TimeCode,
              false, this.state.ClassID, this.state.SelectedClass);
        });

    this.setState({Name: []}, () => {
      this.setState({Day: []}, () => {
        this.setState({Time: []}, () => {
          this.setState({CoachName: []}, () => {
            getClasses().then(response => {
              this.setState({Name: response});
            });
          });
        });
      });
    });
  };

  //
  componentDidMount() {
    getUserID()
        .then(response => {
          // console.log(response);
          this.setState(
              {User_ID: response.User_ID}, () => {
                // console.log("Hello There!");

              });
          getClasses().then(response => {
            // console.log(response);
            this.setState({Name: response});
            // console.log(this.state.Name);
          });
        });
  }

  render() {
    return (
        <div className = "col-lg-4 col-md-12 col-sm-12">
          <form className = "form" id = "backBox">
            <h3 id = "bmiHeading"><b>E</b>nroll <b>T</b>o <b>C</b>lass</h3>

            <div className = "row" id = "first-row">
              <div className = "col-md-6 RowBlock">
                <label htmlFor = "DropClass">Class:</label>
                <select className = "form-control"
                        id = "DropDays"
                        name = "SelectedClass"
                        onChange = { this.handleClass }
                >
                  <option>Select...</option>
                  { this.state.Name.map((res, index) => {
                    return <option value = { res.Name } key = { index }>
                      { res.Name }
                    </option>;
                  })
                  }
                </select>
              </div>
              <div className = "col-md-6 RowBlock">
                <label htmlFor = "DropDays">Day:</label>
                <select className = "form-control"
                        id = "DropDays"
                        name = "SelectedDay"
                        onChange = { this.handleDay }
                >
                  <option>Select...</option>
                  { this.state.Day.map((res, index) => {
                    return <option value = { res.Day } key = { index }>
                      { res.Day }
                    </option>;
                  })
                  }
                </select>
              </div>

            </div>

            <div className = "row" id = "first-row">
              <div className = "col-md-6 RowBlock">
                <label htmlFor = "DropDays">Time:</label>
                <select className = "form-control"
                        id = "DropDays"
                        name = "SelectedTime"
                        onChange = { this.handleTime }
                >
                  <option>Select...</option>
                  { this.state.Time.map((res, index) => {
                    return <option value = { res.Time } key = { index }>
                      { res.Time }
                    </option>;
                  })
                  }
                </select>
              </div>
              <div className = "col-md-6 RowBlock">
                <label htmlFor = "DropClass">Coach:</label>
                <select className = "form-control"
                        id = "DropDays"
                        name = "SelectedCoach"
                        onChange = { this.handleCoach }
                >
                  <option>Select...</option>
                  { this.state.CoachName.map((res, index) => {
                    return <option value = { res.CoachName } key = { index }>
                      { res.CoachName }
                    </option>;
                  })
                  }
                </select>
              </div>
            </div>
            <div className = "row">
              <div className = "col-md-6 RowBlock">
                <button type = ""
                        className = "RowButton"
                        onClick = { this.onSubmit }
                >Enroll
                </button>
              </div>
              <div className = "col-md-6 RowBlock">
                <button type = "button-important"
                        className = "RowButton"
                        onClick = { this.onDelete }
                >Unenroll
                </button>
              </div>
            </div>
            <div className = "row">
              <div className = "col-md-12 RowBlock"
                   style = { {'paddingBottom': '0px'} }
              >
                <button type = "button-important"
                        className = "RowButton"
                        onClick = { this.toggleModalGeneral }
                >View General Schedule
                </button>
              </div>

            </div>
            <ToggleModal
                modal = { this.state.modalGeneral }
                toggle = { this.toggleModalGeneral }
                modalSize = { 'lg' }
                modalHeader = { 'General Gym Schedule' }
                modalBody = { <GeneralScheduleModalBody /> }
            />
          </form>
        </div>
    );
  }
}

export default BookClass;