import React, {Component} from 'react';
import '../assets/styles/Message.css';
import adminAvatar        from '../assets/img/logos/fitnessFactoryLogo.png';

const userAvatar = 'https://raw.githubusercontent.com/isopho01/EPL344_HW4/master/images/avatar.png?token=AG24XEROEGXMLVMTDFMZMYK6K3SW2';

class Message extends Component {
  render() {
    return (
        <div className = { 'msg-card' }>
          { this.props.outgoing ?
              <div className = "msg-data">
                <img src = { userAvatar }
                     className = { 'img-left' }
                     alt = "Avatar"
                />
                <div className = "msg-content right">
                  <h2 className = "card-title">
                    { this.props.title }
                  </h2>
                  <h5 className = "msg-contact">
                    To: { this.props.contact }
                  </h5>
                  <p className = "card-text">
                    { this.props.message }
                  </p>
                </div>
                <p className="msg-timestamp">{this.props.timestamp}</p>
              </div>
              :
              <div className = "msg-data">
                < img src = { adminAvatar } className = { 'img-right' } alt = 'Avatar' />
                <div className = "msg-content left">
                  <h2 className = "card-title">
                    { this.props.title }
                  </h2>
                  <h5 className = "msg-contact">
                    From: { this.props.contact }
                  </h5>
                  <p className = "card-text">
                    { this.props.message }
                  </p>
                </div>
                <p className="msg-timestamp">{this.props.timestamp}</p>
              </div>
          }
        </div>
    )
        ;
  }
}

export default Message;