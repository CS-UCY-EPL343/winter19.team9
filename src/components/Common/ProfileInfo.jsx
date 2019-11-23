import React, {Component} from 'react';

class ProfileInfo extends Component {
    render() {
        return (
            <div className="col-lg-4 col-md-12 col-sm-12">
                <div className="profile block" id="profileBlock">
                    <br/>
                    <div className="profile-picture big-profile-picture clear">
                        <img id="profpic" width="150px" alt="Anne Hathaway picture"
                             src="http://upload.wikimedia.org/wikipedia/commons/e/e1/Anne_Hathaway_Face.jpg"/>

                        <div className="middleEdit" id="Edit-Add">
                            <div className="mytext">Add/Edit<br/>
                                Profile Picture
                            </div>
                        </div>
                    </div>
                    <div className="user-name">Anne Hathaway</div>
                    <div className="profile-description">
                        <p className="scnd-font-color">Personal Message will show up here.</p>
                    </div>

                </div>


            </div>
        );
    }
}

export default ProfileInfo;