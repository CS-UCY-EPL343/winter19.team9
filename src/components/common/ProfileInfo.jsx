import React, {Component}            from 'react';
import {userData, userPicByUsername} from '../../repository';
import Spinner                       from '../Spinner';

class ProfileInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Name        : '',
      Surname     : '',
      username    : '',
      image       : '',
      imagePreviewURL: '',
    };
  }

  componentDidMount() {
    userData()
        .then(response => {
          this.setState(response);
        })
        .then(
            () => userPicByUsername().then(response => this.setState(response)))
        .then(() => {
          let {image} = this.state;
          let imageURL = 'https://www.w3schools.com/howto/img_avatar.png';

          if (image !== '') {
            imageURL =
                'data:image/png;base64,' + new Buffer.from(image, 'binary').toString(
                'base64');
          }
          this.setState({imagePreviewURL: imageURL});
        })
        .finally(() => this.props.toggleLoading());
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.newAvatar !== prevProps.newAvatar && this.props.newAvatar
        !== '') {
      this.setState({imagePreviewURL: this.props.newAvatar});
    }
  }

  render() {
    const name = this.state.Name + ' ' + this.state.Surname;

    return (
        <div className = "col-lg-4 col-md-12 col-sm-12">
          <div className = "profile block" id = "profileBlock">
            <br />
            { this.props.loadingInfo ?
                <Spinner secondaryStyle = { true }
                         style = { {
                           'height'         : 'auto',
                           'backgroundColor': 'transparent',
                         } }
                />
                :
                <div className = "profile-picture big-profile-picture clear">
                  {/*<img id = "profpic" width = "150px" alt = "Member Name"*/ }
                  {/*     src = { image }*/ }
                  {/*/>*/ }
                  <div className = "avatar-preview d-flex justify-content-center">
                    <div id = "imagePreview">
                      <img data-testid = { 'image' }
                           src = { this.state.imagePreviewURL }
                           alt = { 'Profile Avatar' }
                      />
                    </div>
                  </div>
                  <div className = "middleEdit" id = "Edit-Add">
                    <div className = "mytext">Add/Edit<br />
                                              Profile Picture
                    </div>
                  </div>
                </div>
            }
            <div className = "user-name">{ name }</div>
            <div className = "profile-description">
              <p className = "scnd-font-color">Welcome to your Fitness Factory
                                               Profile!</p>
            </div>

          </div>


        </div>
    );
  }
}

export default ProfileInfo;