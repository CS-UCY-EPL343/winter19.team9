import React, {Component} from 'react';

class GeneralScheduleModalBody extends Component {
  render() {
    return (
        <img src = { process.env.PUBLIC_URL + '/img/classes/timetable-new.png' }
             alt = "timetable"
             width = "100%"
        />
    );
  }
}

export default GeneralScheduleModalBody;