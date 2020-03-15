import React, {Component} from 'react';
import Chart              from 'chart.js';

class Graphs extends Component {
  componentDidMount() {
    this.createGraphs();
  }

  createGraphs() {
    const chart = document.getElementById('myChart');
    Chart.defaults.global.animation.duration = 2000; // Animation duration
    Chart.defaults.global.title.display = false; // Remove title
    Chart.defaults.global.title.text = "Chart"; // Title
    Chart.defaults.global.title.position = 'bottom'; // Title position
    Chart.defaults.global.defaultFontColor = '#999'; // Font color
    Chart.defaults.global.defaultFontSize = 10; // Font size for every label

    // Chart.defaults.global.tooltips.backgroundColor = '#FFF'; // Tooltips background color
    Chart.defaults.global.tooltips.borderColor = 'white'; // Tooltips border color
    Chart.defaults.global.legend.labels.padding = 0;
    Chart.defaults.scale.ticks.beginAtZero = true;
    Chart.defaults.scale.gridLines.zeroLineColor = 'rgba(255, 255, 255, 0.1)';
    Chart.defaults.scale.gridLines.color = 'rgba(255, 255, 255, 0.02)';
    Chart.defaults.global.legend.enabled = true;
    Chart.defaults.global.legend.display = false;

    this.createGraph1();
    this.createGraph2();
  }

  createGraph1() {
    const Chart1 = document.getElementById('myChart1').getContext('2d');
    const myChart = new Chart(Chart1, {
      type: 'bar',
      data: {
        labels: ["January", "February", "March", "April", "May", 'June'],
        datasets: [{
          label: "Lost",
          fill: false,
          lineTension: 0,
          data: [45, 25, 40, 20, 45, 20],
          pointBorderColor: "#4bc0c0",
          borderColor: '#4bc0c0',
          borderWidth: 2,
          showLine: true,
        }, {
          label: "Succes",
          fill: false,
          lineTension: 0,
          startAngle: 2,
          data: [20, 40, 20, 45, 25, 60],
          // , '#ff6384', '#4bc0c0', '#ffcd56', '#457ba1'
          backgroundColor: "transparent",
          pointBorderColor: "#ff6384",
          borderColor: '#ff6384',
          borderWidth: 2,
          showLine: true,
        }]
      },
    });
  }

  createGraph2() {
    const Chart2 = document.getElementById('myChart2').getContext('2d');
    const chart = new Chart(Chart2, {
      type: 'line',
      data: {
        labels  : [
          'January',
          'February',
          'March',
          'April',
          'May',
          'June',
          'July',
          'August',
        ],
        datasets: [
          {
            label           : 'My First dataset',
            backgroundColor : 'rgb(255, 99, 132)',
            borderColor     : 'rgb(255, 79, 116)',
            borderWidth     : 2,
            pointBorderColor: false,
            data            : [5, 10, 5, 8, 20, 30, 20, 10],
            fill            : false,
            lineTension     : .4,
          }, {
            label           : 'Month',
            fill            : false,
            lineTension     : .4,
            startAngle      : 2,
            data            : [20, 14, 20, 25, 10, 15, 25, 10],
            // , '#ff6384', '#4bc0c0', '#ffcd56', '#457ba1'
            backgroundColor : 'transparent',
            pointBorderColor: '#4BC0C0',
            borderColor     : '#4BC0C0',
            borderWidth     : 2,
            showLine        : true,
          }, {
            label           : 'Month',
            fill            : false,
            lineTension     : .4,
            startAngle      : 2,
            data            : [40, 20, 5, 10, 30, 15, 15, 10],
            // , '#ff6384', '#4bc0c0', '#ffcd56', '#457ba1'
            backgroundColor : 'transparent',
            pointBorderColor: '#FFCD56',
            borderColor     : '#FFCD56',
            borderWidth     : 2,
            showLine        : true,
          },
        ],
      },

      // Configuration options
      options: {
        title: {
          display: false,
        },
      },
    });
  }

  render() {
    return (
        <div className = "charts">
          <div className = "container-fluid">
            <div className = "row">
              <div className = "col-md-6">
                <div className = "chart-container">
                  <h3>Chart1</h3>
                  <canvas id = "myChart1" />
                </div>
              </div>
              <div className = "col-md-6">
                <div className = "chart-container">
                  <h3>Chart2</h3>
                  <canvas id = "myChart2" />
                </div>
              </div>
            </div>
          </div>
        </div>
    );
  }
}

export default Graphs;