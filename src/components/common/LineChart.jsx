import React, {Component} from 'react';
import Chart              from 'chart.js';

class LineChart extends Component {
  _isMounted = false;

  constructor(props) {
    super(props);
    this.state = {
      lineChart        : {
        data  : [],
        labels: 10,
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
    const ctx = document.getElementById(this.props.id);
    ctx.height = 125;
    const data = {
      labels  : [...Array(this.state.lineChart.labels).keys()],
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

    Chart.defaults.LineWithLine = Chart.defaults.line;
    Chart.controllers.LineWithLine = Chart.controllers.line.extend({
      draw: function(ease) {
        // noinspection JSPotentiallyInvalidConstructorUsage
        Chart.controllers.line.prototype.draw.call(this, ease);

        if (this.chart.tooltip._active && this.chart.tooltip._active.length) {
          let activePoint = this.chart.tooltip._active[0],
              ctx = this.chart.ctx,
              x = activePoint.tooltipPosition().x,
              topY = this.chart.legend.bottom,
              bottomY = this.chart.chartArea.bottom;

          // draw line
          ctx.save();
          ctx.beginPath();
          ctx.moveTo(x, topY);
          ctx.lineTo(x, bottomY);
          ctx.lineWidth = 2;
          ctx.strokeStyle = '#fff';
          ctx.stroke();
          ctx.restore();
        }
      }
    });

    const myLineChart = new Chart(ctx, {
      type               : 'LineWithLine',
      responsive         : true,
      maintainAspectRatio: false,
      data               : data,
      options            : {
        responsive: true,
        legend    : {
          display: false,
        },
        tooltips  : {
          enabled           : true,
          intersect         : false,
          mode              : 'nearest',
          titleFontSize     : 0,
          titleSpacing      : 0,
          titleMarginBottom : 0,
          displayColors: false,
        },
        elements  : {point: {radius: 0}},
        scales    : {
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
    this.setState({
      newNumber: setInterval(function() {
        self.updateChart(myLineChart);
      }, this.props.chartSpeed),
    });
  }

  updateChart(value) {
    if (!this._isMounted) {
      return;
    }
    value.data.datasets[0].data.push(Math.round(Math.random() * 100));
    value.data.datasets[0].data.shift(); // Remove first value
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