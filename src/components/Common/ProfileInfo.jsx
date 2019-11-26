import React, { Component } from 'react';

class ProfileInfo extends Component {
    render() {
        const image = this.props.user ? 'http://upload.wikimedia.org/wikipedia/commons/e/e1/Anne_Hathaway_Face.jpg' :
            this.props.coach ? 'https://upload.wikimedia.org/wikipedia/commons/8/8d/George_Clooney_2016.jpg' :
                this.props.admin
                    ? 'https://upload.wikimedia.org/wikipedia/commons/b/bd/JenniferAnistonFeb09.jpg' : '';
        const name = this.props.user ? 'Anne Hathaway' :
            this.props.coach ? 'George Clooney' :
                this.props.admin ? 'Jennifer Aniston' : '';
        return (
            <div className = "col-lg-4 col-md-12 col-sm-12">
                <div className = "profile block" id = "profileBlock">
                    <br />
                    <div className = "profile-picture big-profile-picture clear">
                        <img id = "profpic" width = "150px" alt = "Anne Hathaway"
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