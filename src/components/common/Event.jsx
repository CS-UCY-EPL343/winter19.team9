import React, {Component} from 'react';

class Event extends Component {
  render() {
    return (
        <div className = "event_item">
          <div className = { 'ei_Dot ' + (this.props.active
                                          && 'dot_active') }
          />
          <div className = "ei_Title">
            { this.props.timeStart } { this.props.timeStart.split(':')[0] < 12
              ? 'am' : 'pm' }
          </div>
          <div className = "ei_Copy">{ this.props.event }</div>
        </div>
    );
  }
}

export default Event;