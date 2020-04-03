import React, {Component} from 'react';
import LineChart          from '../common/LineChart';
import PieChart           from '../common/PieChart';
import StaffList          from '../common/StaffList';
import LeaderBoard        from '../common/LeaderBoard';
import Graphs             from '../common/Graphs';
import {Redirect}         from 'react-router-dom';
import '../assets/styles/UIDashboard.css';
import Spinner            from '../Spinner';
import {
  allUsersCount,
  allVisitCount,
  loggedInVisit,
  updateDashboardVisit,
  getServerConnections,
  getUserCount,
  getPageVisits,
  getEnrollCount,
  getGenderChart,
  getClassDaysChart,
  getPersonalDaysChart,
  getAgeRange,
  getCoachesDayWork,
  getCoachesPersonalWork,
}                         from '../../repository';
import {AnimatedOnScroll} from 'react-animated-css-onscroll';

class UIDashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading         : true,
      // Set to first option of select
      firstGraphLoaded: false,
      selectedGraph   : 0,
      graphData       : [],
      // Donought chats data
      genders         : {id: 'gender', data: [], labels: []},
      enroll          : {id: 'enroll', data: [], labels: []},
      personal        : {id: 'personal', data: [], labels: []},
      // Leaderboards data
      uiDataPageViews : [],
      uiDataUserTypes : [],
    };

    this.handleChart = this.handleChart.bind(this);
    this.visitCounts = this.visitCounts.bind(this);
    this.userCounts = this.userCounts.bind(this);
  }

  componentDidMount() {
    // Page Visits
    loggedInVisit().then();
    updateDashboardVisit().then();
    // Leaderboards
    allVisitCount().then(response => this.visitCounts(response));
    allUsersCount().then(response => this.userCounts(response));
    // Pie Charts
    getGenderChart().then(response => this.setState({
      genders: {
        id    : 'gender',
        labels: ['Male', 'Female'],
        data  : response.map(val => val.count),
      },
    }));
    getClassDaysChart().then(response => this.setState({
      enroll: {
        id    : 'enroll',
        labels: response.map(val => val.Day),
        data  : response.map(val => val.count),
      },
    }));
    getPersonalDaysChart().then(response => this.setState({
      personal: {
        id    : 'personal',
        labels: response.map(val => this.indexToDay(val.Day - 1)),
        data  : response.map(val => val.count),
      },
    }));
    // Graphs
    this.getGraphData.then(() => {
      this.setState({loading: false});
    });
  }

  getGraphData = new Promise((resolve) => {
    getCoachesDayWork().then(response => {
      let graphData = [...this.state.graphData];
      const finalCoachData = [];
      this.groupBy(response, response => response.Coach_ID)
          .forEach(val => {
            const coachData = {
              label: `${ val[0].CoachName } ${ val[0].Surname }`,
              data : [0, 0, 0, 0, 0, 0, 0],
            };
            for (let v of val) {
              const dayIndex = this.dayToIndex(v.Day);
              if (dayIndex === -1) {
                continue;
              }
              // noinspection JSUnresolvedVariable
              coachData.data[dayIndex] += v.Participants;
            }
            finalCoachData.push(coachData);
          });
      graphData.push({
        title: 'Participants in Coaches Classes',
        type : 'line',
        xs   : [
          'Monday',
          'Tuesday',
          'Wednesday',
          'Thursday',
          'Friday',
          'Saturday',
          'Sunday',
        ],
        ys   : finalCoachData,
      });
      this.setState({graphData, firstGraphLoaded: true});
    })
        .then(() => getCoachesPersonalWork().then(response => {
          let graphData = [...this.state.graphData];
          const finalCoachData = [];
          this.groupBy(response, response => response.Coach_ID)
              .forEach(val => {
                const coachData = {
                  label: `${ val[0].CoachName } ${ val[0].Surname }`,
                  data : [0, 0, 0, 0, 0, 0, 0],
                };
                for (let v of val) {
                  const dayIndex = v.Day;
                  if (dayIndex < 0 || dayIndex > 6) {
                    continue;
                  }
                  // noinspection JSUnresolvedVariable
                  coachData.data[dayIndex] += v.Participants;
                }
                finalCoachData.push(coachData);
              });
          graphData.push({
            title: 'Participants in Coaches Personal Classes',
            type : 'line',
            xs   : [
              'Monday',
              'Tuesday',
              'Wednesday',
              'Thursday',
              'Friday',
              'Saturday',
              'Sunday',
            ],
            ys   : finalCoachData,
          });
          this.setState({graphData, firstGraphLoaded: true});
        }))
        .then(() => getAgeRange().then(response => {
          let graphData = [...this.state.graphData];
          graphData.push({
            title: 'Age Range User Count',
            type : 'bar',
            xs   : Object.keys(response),
            ys   : [{label: 'Users', data: Object.values(response)}],
          });
          this.setState({graphData});
        }))
        .then(() => resolve());
  });

  dayToIndex = (day) => {
    switch (day) {
      case 'Monday':
        return 0;
      case 'Tuesday':
        return 1;
      case 'Wednesday':
        return 2;
      case 'Thursday':
        return 3;
      case 'Friday':
        return 4;
      case 'Saturday':
        return 5;
      case 'Sunday':
        return 6;
      default:
        return -1;
    }
  };

  indexToDay = (day) => {
    switch (parseInt(day)) {
      case 0:
        return 'Monday';
      case 1:
        return 'Tuesday';
      case 2:
        return 'Wednesday';
      case 3:
        return 'Thursday';
      case 4:
        return 'Friday';
      case 5:
        return 'Saturday';
      case 6:
        return 'Sunday';
      default:
        return 'Undefined';
    }
  };

  groupBy(list, keyGetter) {
    const map = new Map();
    list.forEach((item) => {
      const key = keyGetter(item);
      const collection = map.get(key);
      if (!collection) {
        map.set(key, [item]);
      } else {
        collection.push(item);
      }
    });
    return map;
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
    this.setState({[e.target.name]: Number(e.target.value)});
  }

  render() {
    return (
        <>
          { this.state.loading ?
              <Spinner />
              :
              <div id = "UIDashboard">
                <AnimatedOnScroll animationIn = "fadeIn">
                  <div className = { 'container' }>
                    { (this.props.userLevel === 'admin') ? '' :
                        <Redirect to = "/" /> }
                    <div className = "row line__chart-wrapper">
                      <LineChart id = "server-connections"
                                 chartSpeed = "4250"
                                 bgColor = "#1BC98E"
                                 title = "Server"
                                 getData = { getServerConnections }
                      />
                      <LineChart id = "page-visits"
                                 chartSpeed = "6100"
                                 bgColor = "#E64759"
                                 title = "Page Visits"
                                 getData = { getPageVisits }
                      />
                      <LineChart id = "user-count"
                                 chartSpeed = "4900"
                                 bgColor = "#9F86FF"
                                 title = "Users"
                                 getData = { getUserCount }
                      />
                      <LineChart id = "enrollment-count"
                                 chartSpeed = "3200"
                                 bgColor = "#E4D836"
                                 title = "Enrolled"
                                 getData = { getEnrollCount }
                      />
                    </div>
                    <div className = "row pie__chart-wrapper">
                      <PieChart title = "Genders"
                                data = { this.state.genders.data }
                                labels = { this.state.genders.labels }
                                id = { this.state.genders.id }
                      />
                      <PieChart title = "Enrolled Classes"
                                data = { this.state.enroll.data }
                                labels = { this.state.enroll.labels }
                                id = { this.state.enroll.id }
                      />
                      <PieChart title = "Personal Classes"
                                data = { this.state.personal.data }
                                labels = { this.state.personal.labels }
                                id = { this.state.personal.id }
                      />
                    </div>
                    <div className = "select-chart">
                      <select name = "selectedGraph"
                              onChange = { this.handleChart }
                      >
                        {/*<option selected disabled>Choose a chart to display</option>*/ }
                        <option value = "0">Participants in Coaches Classes
                        </option>
                        <option value = "1">Participants in Coaches Personal
                                            Classes
                        </option>
                        <option value = "2">Age Range User Count</option>
                      </select>
                    </div>
                    { this.state.firstGraphLoaded &&
                      <Graphs graphData = { this.state.graphData[this.state.selectedGraph] } /> }
                    <StaffList />
                    <div className = "row leaderboards">
                      <LeaderBoard data = { this.state.uiDataUserTypes }
                                   sortAsc = { false }
                                   title = "User Types"
                                   dataSort = "count"
                                   dataTitle = "type"
                      />
                      <LeaderBoard data = { this.state.uiDataPageViews }
                                   sortAsc = { true }
                                   title = "Most Visited Pages"
                                   dataSort = "views"
                                   dataTitle = "page"
                                   numberComma = "true"
                      />
                    </div>
                  </div>
                </AnimatedOnScroll>
              </div>
          }
        </>
    );
  }
}

export default UIDashboard;