import React, {Component} from 'react';
import '../assets/styles/ButtonLoader.css';
import {FontAwesomeIcon}  from '@fortawesome/react-fontawesome';
import {faSpinner}        from '@fortawesome/free-solid-svg-icons';

class ButtonLoader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
    };
    this.fetchData = this.fetchData.bind(this);
  }

  fetchData = () => {
    this.setState({loading: true}, () => {
      this.props.onClick().then(() => this.setState({loading: false}));
    });

    //Faking API call here
    setTimeout(() => {
      this.setState({loading: false});
    }, 2000);
  };

  render() {
    return (
        <div>
          { this.props.onClick ?
              (
                  <button className = "loading-button"
                          onClick = { this.fetchData }
                          disabled = { this.props.loading }
                          type = { this.props.type || 'button' }
                  >
                    { this.props.loading && (
                        <FontAwesomeIcon icon = { faSpinner }
                                         size = "2x"
                                         spin
                        />
                    ) }
                    { this.props.loading &&
                      <span>{ this.props.loadingText }</span> }
                    { !this.props.loading && <span>{ this.props.text }</span> }
                  </button>
              ) :
              (
                  <button className = "loading-button"
                          disabled = { this.props.loading }
                          type = { this.props.type || 'button' }
                  >
                    { this.props.loading && (
                        <FontAwesomeIcon icon = { faSpinner }
                                         size = "sm"
                                         spin
                        />
                    ) }
                    { this.props.loading &&
                      <span>{ this.props.loadingText }</span> }
                    { !this.props.loading && <span>{ this.props.text }</span> }
                  </button>
              )
          }
        </div>
    );
  }
}

export default ButtonLoader;