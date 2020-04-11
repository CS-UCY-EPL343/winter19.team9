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

  // noinspection JSUnusedLocalSymbols
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
    const ys = this.props.graphData.ys.map((data, index) => {
      data['fill'] = false;
      data['lineTension'] = .4;
      data['pointBorderColor'] = false;
      this.props.graphData.type === 'bar'
          ? data['borderColor'] = colors
          : data['borderColor'] = colors[index];
      data['borderWidth'] = 2;
      this.props.graphData.type === 'bar'
          ? data['backgroundColor'] = colors
          : data['backgroundColor'] = colors[index];
      data['showLine'] = true;
      return data;
    });
    const chart1 = document.getElementById('myChart').getContext('2d');
    const myChart = new Chart(chart1, {
      type   : this.props.graphData.type,
      data   : {
        labels              : this.props.graphData.xs,
        datasets            : ys,
        hoverBackgroundColor: hoverColors,
        borderColor         : '#252830',
      },
      options: {
        title           : {display: false},
        animation       : {duration: 2000},
        responsive      : true,
        aspectRatio     : 3,
        maintainAspectRatio: true,
        defaultFontColor: '#999999',
        defaultFontSize : 10,
        tooltips        : {
          enabled    : true,
          borderColor: 'white',
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
                  {/*<h3>{ this.props.graphData.title }</h3>*/ }
                  <canvas id = "myChart" style={{height: '200px'}} />
                </div>
              </div>
            </div>
          </div>
        </div>
    );
  }
}

export default Graphs;