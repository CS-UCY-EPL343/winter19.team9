import React, {Component} from 'react';

class Leader extends Component {
  render() {
    return (
        <div className = "leaderboard__result">
          { this.props.title } - { this.props.number }
        </div>
    );
  }
}

export default Leader;