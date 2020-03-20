import React, {Component} from 'react';
import LineChart          from '../common/LineChart';
import PieChart           from '../common/PieChart';
import StaffList          from '../common/StaffList';
import LeaderBoard        from '../common/LeaderBoard';
import Graphs             from '../common/Graphs';
import {Redirect}         from 'react-router-dom';
import '../assets/styles/UIDashboard.css';
import {
  allUsersCount,
  allVisitCount,
  loggedInVisit,
  updateDashboardVisit,
}                         from '../../repository';

class UIDashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedGraph  : '1',
      graphData      : {
        title: 'Chart 1',
        type : 'bar',
        xs   : ['January', 'February', 'March', 'April', 'May', 'June'],
        ys   : [
          {label: 'Lost', data: [45, 25, 40, 20, 45, 20]},
          {label: 'Success', data: [20, 40, 20, 45, 25, 60]},
        ],
      },  // Set to first option of select
      // Donought chats data
      traffic        : {
        id       : 'traffic',
        new      : 80,
        returning: 50,
      },
      profit         : {
        id       : 'profit',
        new      : 100,
        returning: 25,
      },
      reveanue       : {
        id       : 'reveanue',
        new      : 300,
        returning: 1500,
      },
      uiDataPageViews: [],
      uiDataUserTypes: [],
    };

    this.handleChart = this.handleChart.bind(this);
    this.visitCounts = this.visitCounts.bind(this);
    this.userCounts = this.userCounts.bind(this);
  }

  componentDidMount() {
    loggedInVisit().then();
    updateDashboardVisit().then();
    allVisitCount().then(response => this.visitCounts(response));
    allUsersCount().then(response => this.userCounts(response));
  }

  userCounts(response) {
    let types = [];
    for (let v of response.types) {
      // noinspection JSUnfilteredForInLoop
      types.push({type: v.level, count: v.count});
    }
    this.setState({uiDataUserTypes: types});
  }

  visitCounts(response) {
    let visits = [];
    for (let v in response.visits[0]) {
      let page = null;
      // noinspection JSUnfilteredForInLoop
      switch (v) {
        case 'HOME_PAGE':
          page = '/classes';
          break;
        case 'CLASSES':
          page = '/ (Logged Out)';
          break;
        case 'ABOUT_US':
          page = '/about';
          break;
        case 'PROFILE_USER':
          page = '/user/profile';
          break;
        case 'PROFILE_COACH':
          page = '/coach/profile';
          break;
        case 'PROFILE_ADMIN':
          page = '/admin/profile';
          break;
        case 'ADMIN_DASHBOARD':
          page = '/admin/profile/dashboard';
          break;
        case 'LOGGED_IN':
          page = '/ (Logged In)';
          break;
        default:
          continue;
      }
      // noinspection JSUnfilteredForInLoop
      visits.push({page: page, views: response.visits[0][v]});
    }
    this.setState({uiDataPageViews: visits});
  };

  handleChart(e) {
    this.setState({
      [e.target.name]: e.target.value,
    }, () => {
      // Get data from database
      if (this.state.selectedGraph === '1') {
        this.setState({
          graphData: {
            title: 'Chart 1',
            type : 'bar',
            xs   : ['January', 'February', 'March', 'April', 'May', 'June'],
            ys   : [
              {label: 'Lost', data: [45, 25, 40, 20, 45, 20]},
              {label: 'Success', data: [20, 40, 20, 45, 25, 60]},
            ],
          },
        });
      } else if (this.state.selectedGraph === '2') {
        this.setState({
          graphData: {
            title: 'Chart 2',
            type : 'line',
            xs   : [
              'January',
              'February',
              'March',
              'April',
              'May',
              'June',
              'July',
              'August',
            ],
            ys   : [
              {label: 'Day', data: [5, 10, 5, 8, 20, 30, 20, 10]},
              {label: 'Week', data: [20, 14, 20, 25, 10, 15, 25, 10]},
              {label: 'Month', data: [40, 20, 5, 10, 30, 15, 15, 10]},
            ],
          },
        });
      }
    });
  }

  render() {
    return (
        <div id = "UIDashboard">
          <div className = "container">
            { (this.props.userLevel === 'admin') ? '' : <Redirect to = "/" /> }
            <div className = "row line__chart-wrapper">
              <LineChart id = "test-1"
                         chartSpeed = "4250"
                         bgColor = "#1BC98E"
                         title = "Page Views"
              />
              <LineChart id = "test-2"
                         chartSpeed = "6100"
                         bgColor = "#E64759"
                         title = "Emails"
              />
              <LineChart id = "test-3"
                         chartSpeed = "4900"
                         bgColor = "#9F86FF"
                         title = "Users"
              />
              <LineChart id = "test-4"
                         chartSpeed = "3200"
                         bgColor = "#E4D836"
                         title = "Sales"
              />
            </div>
            <div className = "row pie__chart-wrapper">
              <PieChart title = "Traffic"
                        new = { this.state.traffic.new }
                        returning = { this.state.traffic.returning }
                        id = { this.state.traffic.id }
              />
              <PieChart title = "Profit"
                        new = { this.state.profit.new }
                        returning = { this.state.profit.returning }
                        id = { this.state.profit.id }
              />
              <PieChart title = "Reveanue"
                        new = { this.state.reveanue.new }
                        returning = { this.state.reveanue.returning }
                        id = { this.state.reveanue.id }
              />
            </div>
            <div className = "select-chart">
              <select name = "selectedGraph" onChange = { this.handleChart }>
                {/*<option selected disabled>Choose a chart to display</option>*/ }
                <option value = "1">Chart 1</option>
                <option value = "2">Chart 2</option>
              </select>
            </div>
            <Graphs graphData = { this.state.graphData } />
            <StaffList />
            <div className = "row leaderboards">
              <LeaderBoard data = { this.state.uiDataUserTypes }
                           sortAsc = { true }
                           title = "User Types"
                           dataSort = "count"
                           dataTitle = "type"
              />
              <LeaderBoard data = { this.state.uiDataPageViews }
                           sortAsc = { false }
                           title = "Most Visited Pages"
                           dataSort = "views"
                           dataTitle = "page"
                           numberComma = "true"
              />
            </div>
          </div>
        </div>
    );
  }
}

export default UIDashboard;