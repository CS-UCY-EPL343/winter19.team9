import React, {Component} from 'react';
import '../assets/styles/Message.css';
import adminAvatar        from '../assets/img/logos/fitnessFactoryLogo.png';

class Message extends Component {
  render() {
    let imageURL = 'https://www.w3schools.com/howto/img_avatar.png';
    let $imagePreview = <img src = { imageURL }
                             className = { 'img-left' }
                             alt = { 'Profile Avatar' }
    />;
    if (this.props.image) {
      imageURL =
          'data:image/png;base64,' + new Buffer.from(this.props.image,
          'binary').toString(
          'base64');
      $imagePreview = (<img src = { imageURL }
                            className = { 'img-left' }
                            alt = { 'Profile Avatar' }
      />);
    }

    return (
        <div className = { `msg-card 
            ${ this.props.outgoing ? 'left' : 'right' } 
            ${ this.props.hasSeen ? '' : 'new-msg' }` }
        >
          {/*{ !this.props.outgoing && !this.props.hasSeen &&*/ }
          {/*  <i className = "fa fa-plus-circle" /> }*/ }
          { this.props.outgoing ?
              <div className = "msg-data">
                <div className={'msg-header'}>
                  { $imagePreview }
                  <h2 className = "card-title">
                    { this.props.title }
                  </h2>
                </div>
                <div className = "msg-content right">
                  <h5 className = "msg-contact">
                    From: { this.props.fromContact }
                  </h5>
                  <h5 className = "msg-contact">
                    To: { this.props.toContact }
                  </h5>
                  <p className = "card-text">
                    { this.props.message }
                  </p>
                </div>
                <p className = "msg-timestamp left">{ this.props.timestamp }</p>
              </div>
              :
              <div className = "msg-data">
                <div className={'msg-header left'}>
                  < img src = { adminAvatar }
                        className = { 'img-right' }
                        alt = 'Avatar'
                  />
                  <h2 className = "card-title right">
                    { this.props.title }
                  </h2>
                </div>
                <div className = "msg-content left">
                  <h5 className = "msg-contact">
                    From: { this.props.fromContact }
                  </h5>
                  <h5 className = "msg-contact">
                    To: { this.props.toContact }
                  </h5>
                  <p className = "card-text">
                    { this.props.message }
                  </p>
                </div>
                <p className = "msg-timestamp right">{ this.props.timestamp }</p>
              </div>
          }
        </div>
    )
        ;
  }
}

export default Message;