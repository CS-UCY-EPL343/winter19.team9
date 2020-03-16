import React, {Component} from 'react';
import Chart              from 'chart.js';

class Graphs extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.createGraph = this.createGraph.bind(this);
  }

  componentDidMount() {
    this.createGraph();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.graphData !== this.props.graphData) {
      this.state.myChart.destroy();
      this.createGraph();
    }
  }

  createGraph() {
    Chart.defaults.scale.ticks.beginAtZero = true;
    Chart.defaults.scale.gridLines.zeroLineColor = 'rgba(255, 255, 255, 0.1)';
    Chart.defaults.scale.gridLines.color = 'rgba(255, 255, 255, 0.02)';

    const colors = ['#4BC0C0', '#FF6384', '#FFCD56', '#3fc62e'];
    const ys = this.props.graphData.ys.map((data, index) => {
      data['fill'] = false;
      data['lineTension'] = .4;
      data['pointBorderColor'] = false;
      data['borderColor'] = colors[index];
      data['borderWidth'] = 2;
      data['backgroundColor'] = colors[index];
      data['showLine'] = true;
      return data;
    });
    const chart1 = document.getElementById('myChart').getContext('2d');
    const myChart = new Chart(chart1, {
      type   : this.props.graphData.type,
      data   : {
        labels  : this.props.graphData.xs,
        datasets: ys,
      },
      options: {
        title           : {display: false},
        animation       : {duration: 2000},
        responsive      : true,
        aspectRatio     : 3,
        defaultFontColor: '#999999',
        defaultFontSize : 10,
        tooltips        : {
          enabled: true,
          borderColor: 'white'
        },
        legend          : {
          display  : true,
          align    : 'center',
          fullWidth: true,
        },
      },
    });
    this.setState({myChart});
  }

  render() {
    return (
        <div className = "charts">
          <div className = "container-fluid">
            <div className = "row">
              <div className = "col-md-12">
                <div className = "chart-container">
                  <h3>{ this.props.graphData.title }</h3>
                  <canvas id = "myChart" />
                </div>
              </div>
            </div>
          </div>
        </div>
    );
  }
}

export default Graphs;