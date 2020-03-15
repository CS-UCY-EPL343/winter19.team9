import React, {Component} from 'react';
import Leader             from './Leader';

class LeaderBoard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sortOrder: this.props.sortAsc,
    };
  }

  componentDidMount() {
    this.setState({
      sortOrder: this.props.sortAsc,
    });
  }

  numberWithCommas(num) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }

  render() {
    let self = this;
    let dataSort = this.props.dataSort;
    let dataTitle = this.props.dataTitle;
    let sortAsc = this.props.sortAsc;
    let numberComma = this.props.numberComma;
    let sortCustom = this.props.data.sort(function(a, b) {
      if (sortAsc) {
        return parseFloat(b[dataSort]) - parseFloat(a[dataSort]);
      } else {
        return parseFloat(a[dataSort]) - parseFloat(b[dataSort]);
      }
    });
    const leaders = sortCustom.map(function(leader, i) {
      let number = leader[dataSort];
      let title = leader[dataTitle];
      if (numberComma === 'true') {
        number = self.numberWithCommas(number);
      }
      return <Leader key = { i } title = { title } number = { number } />;
    });

    return (
        <div className = "col-md-6 panel panel-default">
          <div className = "leaderboard__wrapper">
            <div className = "leaderboard__title panel-heading">
              <h5>{ this.props.title }</h5>
            </div>
            <div className = "leaderboard__results">
              { leaders }
            </div>
            {/*
             <div className="sort-btn">
             <div href="#">Sort</div>
             <div>{this.state.sortOrder}</div>
             </div>
             */ }
          </div>
        </div>
    );
  }
}

export default LeaderBoard;