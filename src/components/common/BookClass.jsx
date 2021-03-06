import React, {Component}       from 'react';
import '../assets/styles/BookDropdown.css';
import {getClasses}             from '../../repository';
import {getClassDay}            from '../../repository';
import {getClassTime}           from '../../repository';
import {getClassCoach}          from '../../repository';
import {getClassID}             from '../../repository';
import {getUserID}              from '../../repository';
import ToggleModal              from './ToggleModal';
import GeneralScheduleModalBody from './GeneralScheduleModalBody';
import Swal                     from 'sweetalert2';

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
      invalid      : true,
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
    e.preventDefault();
    this.setState({modalGeneral: !this.state.modalGeneral});
  };

  handleClass = (e) => {
    if (this.props.testLoading) {
      return;
    }
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
                          });
                        });
                      });
                    });
              });
        });
  };

  handleDay = (e) => {
    if (this.props.testLoading) {
      return;
    }
    this.setState(
        {[e.target.name]: e.target.value === 'Select...' ? '' : e.target.value},
        () => {
          this.setState({Time: []}, () => {
            this.setState({CoachName: []}, () => {
              getClassTime(this.state.SelectedClass, this.state.SelectedDay)
                  .then(response => {
                    this.setState({Time: response}, () => {
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
    if (this.props.testLoading) {
      return;
    }
    this.setState(
        {[e.target.name]: e.target.value === 'Select...' ? '' : e.target.value},
        () => {
          this.setState({CoachName: []}, () => {
            getClassCoach(this.state.SelectedClass, this.state.SelectedDay,
                this.state.SelectedTime).then(response => {
              this.setState({CoachName: response}, () => {
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
    if (this.props.testLoading) {
      return;
    }
    this.setState(
        {[e.target.name]: e.target.value === 'Select...' ? '' : e.target.value},
        () => {
          getClassID(this.state.SelectedClass, this.state.SelectedDay,
              this.state.SelectedTime, this.state.SelectedCoach)
              .then(response => {
                this.setState({ClassID: response.data.ClassID.ClassID}, () => {
                });
              });
        });

  };

  onSubmit = (e) => {
    e.preventDefault();
    if (this.state.Day.length === 0 ||
        this.state.Name.length === 0 ||
        this.state.Time.length === 0 ||
        this.state.CoachName.length === 0) {
      Swal.fire(
          'Required selections are empty',
          'Make sure that you have filled every selection first!',
          'error',
      ).then();
    } else {
      this.setState({flag: true, invalid: false}, () => {
        this.props.getSelections(
            this.state.DayCode,
            this.state.TimeCode,
            true,
            this.state.ClassID,
            this.state.SelectedClass,
            false,
        );
      });
    }
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
    e.preventDefault();
    if (this.state.Day.length === 0 ||
        this.state.Name.length === 0 ||
        this.state.Time.length === 0 ||
        this.state.CoachName.length === 0) {
      Swal.fire(
          'Required selections are empty',
          'Make sure that you have filled every selection first!',
          'error',
      ).then();
    } else {
      this.setState({flag: false, invalid: false}, () => {
        this.props.getSelections(
            this.state.DayCode,
            this.state.TimeCode,
            false,
            this.state.ClassID,
            this.state.SelectedClass,
            false,
        );
      });
    }
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
    if (this.props.testLoading) {
      this.setState({
        Name     : this.props.data.Name,
        Day      : this.props.data.Day,
        Time     : this.props.data.Time,
        CoachName: this.props.data.CoachName,
      });
    } else {
      getUserID()
          .then(response => {
            this.setState(
                {User_ID: response.User_ID}, () => {
                });
            getClasses().then(response => {
              this.setState({Name: response});
            });
          });
    }
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
                        data-testid = { 'class-select' }
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
                        data-testid = { 'day-select' }
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
                        data-testid = { 'time-select' }
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
                        data-testid = { 'coach-select' }
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