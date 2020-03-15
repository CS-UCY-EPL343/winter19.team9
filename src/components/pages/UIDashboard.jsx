import React, {Component} from 'react';
import LineChart          from '../common/LineChart';
import PieChart           from '../common/PieChart';
import StaffList          from '../common/StaffList';
import LeaderBoard        from '../common/LeaderBoard';
import {Redirect}         from 'react-router-dom';
import '../assets/styles/UIDashboard.css'
import Graphs             from '../common/Graphs';

let uiDataCountries = [
  {
    country: 'US',
    percent: 65,
  },
  {
    country: 'India',
    percent: 15,
  },
  {
    country: 'UK',
    percent: 10,
  },
  {
    country: 'Canada',
    percent: 8,
  },
  {
    country: 'Russia',
    percent: 5,
  },
  {
    country: 'Mexico',
    percent: 20,
  },
  {
    country: 'France',
    percent: 30,
  },
];
let uiDataPageViews = [
  {
    page : '/ (Logged out)',
    views: 3929481,
  },
  {
    page : '/ (Logged in)',
    views: 1143393,
  },
  {
    page : '/tour',
    views: 999888,
  },
  {
    page : '/page',
    views: 1999888,
  },
  {
    page : '/contact',
    views: 1599888,
  },
  {
    page : '/about',
    views: 1329888,
  },
  {
    page : '/homes',
    views: 329888,
  },
];

class UIDashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      traffic: {
        id: "traffic",
        new: 80,
        returning: 50
      },
      profit: {
        id: "profit",
        new: 100,
        returning: 25
      },
      reveanue: {
        id: "reveanue",
        new: 300,
        returning: 1500
      }
    };
  }

  render() {
    return (
        <div id="UIDashboard">
          <div className="container">
            {(this.props.userLevel === 'admin') ? '' : <Redirect to="/"/>}
            <div className="row line__chart-wrapper">
              <LineChart id="test-1" chartSpeed="4250" bgColor="#1BC98E" title="Page Views"/>
              <LineChart id="test-2" chartSpeed="6100" bgColor="#E64759" title="Emails"/>
              <LineChart id="test-3" chartSpeed="4900" bgColor="#9F86FF" title="Users"/>
              <LineChart id="test-4" chartSpeed="3200" bgColor="#E4D836" title="Sales"/>
            </div>
            <div className="row pie__chart-wrapper">
              <PieChart title="Traffic" new={this.state.traffic.new} returning={this.state.traffic.returning} id={this.state.traffic.id}/>
              <PieChart title="Profit" new={this.state.profit.new} returning={this.state.profit.returning} id={this.state.profit.id}/>
              <PieChart title="Reveanue" new={this.state.reveanue.new} returning={this.state.reveanue.returning} id={this.state.reveanue.id}/>
            </div>
            <Graphs/>
            <StaffList/>
            <div className="row leaderboards">
              <LeaderBoard data={uiDataCountries} sortAsc={true} title="Countries" dataSort="percent" dataTitle="country"/>
              <LeaderBoard data={uiDataPageViews} sortAsc={false} title="Most Visited Pages" dataSort="views" dataTitle="page" numberComma="true"/>
            </div>
          </div>
        </div>
    );
  }
}

export default UIDashboard;