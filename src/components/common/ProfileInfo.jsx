import React, {Component} from 'react';
import {userData}         from '../../repository';
import Spinner            from '../Spinner';

class ProfileInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Name    : '',
      Surname : '',
      username: '',
      image   : '',
    };
  }

  componentDidMount() {
    userData()
        .then(response => {
          this.setState(response);
        }).then(() => this.props.toggleLoading());

  }

  render() {
    let {image} = this.state;
    let imageURL = 'https://www.w3schools.com/howto/img_avatar.png';
    let $imagePreview = <img src = { imageURL } alt = { 'Profile Avatar' } />;
    if (image !== '') {
      imageURL =
          'data:image/png;base64,' + new Buffer.from(image, 'binary').toString(
          'base64');
      $imagePreview = (<img src = { imageURL } alt = { 'Profile Avatar' } />);
    }

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
                      { $imagePreview }
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