import React, { Component } from 'react';

class ProfileInfo extends Component {
    render() {
        const image = 'https://www.w3schools.com/howto/img_avatar.png';
        const name = 'Member Name';
        return (
            <div className = "col-lg-4 col-md-12 col-sm-12">
                <div className = "profile block" id = "profileBlock">
                    <br />
                    <div className = "profile-picture big-profile-picture clear">
                        <img id = "profpic" width = "150px" alt = "Member Name"
                             src = { image }
                        />

                        <div className = "middleEdit" id = "Edit-Add">
                            <div className = "mytext">Add/Edit<br />
                                Profile Picture
                            </div>
                        </div>
                    </div>
                    <div className = "user-name">{name}</div>
                    <div className = "profile-description">
                        <p className = "scnd-font-color">Personal Message will show up here.</p>
                    </div>

                </div>


            </div>
        );
    }
}

export default ProfileInfo;