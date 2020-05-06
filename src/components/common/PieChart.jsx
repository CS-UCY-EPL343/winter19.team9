import React, {Component} from 'react';
import Chart              from 'chart.js';

class PieChart extends Component {
  constructor(props) {
    super(props);
    // noinspection JSUnresolvedVariable
    this.state = {
      myChart      : null,
      animationTime: this.props.timeMS || 1000,
    };
  }

  componentDidMount() {
    if (!this.props.testLoading) {
      this.createChart();
    }
  }

  // noinspection JSUnusedLocalSymbols
  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.data !== this.props.data) {
      if (!this.props.testLoading) {
        this.state.myChart.destroy();
        this.createChart();
      }
    }
  }

  createChart() {
    const colors = [
      '#4BC0C0',
      '#FF6384',
      '#FFCD56',
      '#3FC62E',
      '#E55AFF',
      '#CB843F',
      '#F583FF',
      '#49FF60',
      '#4CC6BF',
      '#F3F6FF',
    ];
    const hoverColors = [
      '#287FC0',
      '#FF001C',
      '#F6EC04',
      '#17920F',
      '#9E00FF',
      '#CB5F0B',
      '#EA1DFF',
      '#12D021',
      '#0D9DB4',
      '#343438',
    ];
    let ctx = document.getElementById(this.props.id);
    let data = {
      labels  : this.props.labels,
      datasets: [
        {
          data                : this.props.data,
          backgroundColor     : colors,
          hoverBackgroundColor: hoverColors,
          borderColor         : '#252830',
        },
      ],
    };
    const myChart = new Chart(ctx, {
      type   : 'doughnut',
      data   : data,
      options: {
        cutoutPercentage: 80,
        legend          : {
          display  : true,
          align    : 'center',
          fullWidth: true,
        },
        tooltips        : {
          enabled    : true,
          borderColor: 'white',
        },
        animation       : {
          animateScale: true,
          duration    : this.state.animationTime,
        },
        responsive      : true,
      },
    });

    this.setState({myChart});
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
          <div className = "text-center">
            <strong>{ this.props.title }</strong>
          </div>
        </div>
    );
  }
}

export default PieChart;