import React, {Component} from 'react';
import Chart              from 'chart.js';

class LineChart extends Component {
  _isMounted = false;

  constructor(props) {
    super(props);
    this.state = {
      lineChart        : {
        data  : [],
        labels: 6,
      },
      percentChange    : 0,
      percentComparison: 'Up',
      lastNumber       : '100',
    };

    this.getChartData = this.getChartData.bind(this);
    this.createChart = this.createChart.bind(this);
    this.updateChart = this.updateChart.bind(this);
  }

  componentDidMount() {
    this._isMounted = true;

    const self = this;
    if (this._isMounted) {
      self.getChartData();
      self.createChart();
    }
  }

  componentWillUnmount() {
    this._isMounted = false;
    clearInterval(this.state.newNumber);
  }

  getChartData() {
    let randomData = [];
    for (let x = 0; x < this.state.lineChart.labels; x++) {
      let number = Math.round(Math.random() * 100);
      this.setState({
        lineChart: {
          labels: this.state.lineChart.labels,
          data  : this.state.lineChart.data.push(number),
        },
      });
      randomData.push(number);
    }

    this.setState({
      lineChart: {
        data: randomData,
      },
    });
  }

  createChart() {
    Chart.defaults.global.legend.display = false;
    Chart.defaults.global.tooltips.enabled = false;
    let ctx = document.getElementById(this.props.id);
    ctx.height = 125;
    let data = {
      labels  : [1, 2, 3, 4, 5, 6],
      datasets: [
        {
          backgroundColor : 'rgba(255,255,255,0.5)',
          strokeColor     : 'rgba(255,255,255,1)',
          pointColor      : 'rgba(255,255,255,1)',
          borderColor     : 'rgba(255,255,255,1)',
          pointStrokeColor: '#FFFFFF',
          data            : this.state.lineChart.data,
        },
      ],
    };
    let latestLabel = data.labels[6];
    let myLineChart = new Chart(ctx, {
      responsive         : true,
      maintainAspectRatio: false,
      type               : 'line',
      data               : data,
      options            : {
        legend  : {
          display: false,
        },
        elements: {point: {radius: 0}},
        scales  : {
          xAxes: [
            {
              display: false,
            },
          ],
          yAxes: [
            {
              display: false,
            },
          ],
        },
      },
    });

    const self = this;
    setInterval(function() {
      self.updateChart(myLineChart);
    }, this.props.chartSpeed);

  }

  updateChart(value) {
    if (!this._isMounted) {
      return;
    }
    value.data.datasets[0].data.push(Math.round(Math.random() * 100));
    value.data.datasets[0].data.shift();
    let changeOne = value.data.datasets[0].data[value.data.datasets[0].data.length
                                                - 2];
    let changeTwo = value.data.datasets[0].data[value.data.datasets[0].data.length
                                                - 1];

    if (changeOne > changeTwo) {
      this.setState({percentComparsion: 'Down'});
    } else {
      this.setState({percentComparsion: 'Up'});
    }

    let changeNumber = (
                           changeOne / changeTwo) * 10;
    this.setState({
      percentChange: changeNumber.toFixed(2),
      lastNumber   : (
          value.data.datasets[0].data[value.data.datasets[0].data.length - 1]),
    });
    value.update();
  }

  render() {
    let isArrowUp = this.state.percentComparison;
    let arrowChange = null;

    let lastNumber = this.state.lineChart.data[this.state.lineChart.data.length
                                               - 1];

    // function CheckArrow() {
    //     if(!isArrowUp === "Up") {
    //         return <IsArrowUp />
    //     } else {
    //         return <IsArrowDown />
    //     }
    // };
    // function IsArrowUp(props) {
    //     //console.log("Up")
    //     return <p>Up</p>
    // }
    // function IsArrowDown(props) {
    //     //console.log("Down")
    //     return <p>Down</p>
    // }

    const divStyle = {
      background: this.props.bgColor,
    };
    return (
        <div className = "col-md-3">
          <div className = "line__chart" style = { divStyle }>
            <div className = "line__chart-header">
              <strong>{ this.props.title }</strong>
            </div>
            <div className = "line__chart-data">{ this.state.lastNumber }
              <span>{ this.state.percentChange }%</span>
              <span className = { `arrow ${ this.state.percentComparsion }` } />
            </div>
            <canvas id = { this.props.id } width = "400" height = "400" />
          </div>
        </div>
    );
  }
}

export default LineChart;