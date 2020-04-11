import React, {Component} from 'react';
import './assets/styles/Spinner.css';

class Spinner extends Component {
  render() {
    return (
        <div id = "wrapper"
             style = { this.props.style || {
               'height'         : '100vh',
               'backgroundColor': '#252830',
             } }
        >
          <div className = "profile-main-loader">
            <div className = "loader">
              <svg className = "circular-loader"
                   viewBox = "25 25 50 50"
              >
                <circle className = "loader-path"
                        cx = "50"
                        cy = "50"
                        r = "20"
                        fill = "none"
                        stroke = "#D90429"
                        strokeWidth = "2"
                />
              </svg>
            </div>
          </div>
        </div>
    );
  }
}

export default Spinner;