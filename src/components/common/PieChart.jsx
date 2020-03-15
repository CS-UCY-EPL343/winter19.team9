import React, {Component} from 'react';
import Chart              from 'chart.js';

class PieChart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      animationTime: this.props.timeMS,
    };
  }

  componentDidMount() {
    this.createChart();
  }

  createChart() {
    let ctx = document.getElementById(this.props.id);
    let data = {
      labels  : [
        'New',
        'Returning',
      ],
      datasets: [
        {
          data                : [this.props.new, this.props.returning],
          backgroundColor     : [
            '#FF6384',
            '#36A2EB',
          ],
          hoverBackgroundColor: [
            '#FF6384',
            '#36A2EB',
          ],
          borderColor         : ['#252830', '#252830'],
        },
      ],
    };
    const myDoughnutChart = new Chart(ctx, {
      type   : 'doughnut',
      data   : data,
      options: {
        cutoutPercentage: 80,
        legend          : {
          display: false,
        },
        animation       : {
          animateScale: true,
        },
      },
    });
  }

  render() {
    return (
        <div className = "col-md-4">
          <div className = "pie__chart">
            <canvas id = { this.props.id }
                    width = "400"
                    height = "400"
            />
          </div>
          <div className = "text-center"><strong>{ this.props.title }</strong>
          </div>
          <h4 className = "text-center">{ this.props.new } vs. { this.props.returning }</h4>
        </div>
    );
  }
}

export default PieChart;