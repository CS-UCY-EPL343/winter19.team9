import React, {Component} from 'react';

class SettingsProfile extends Component {
    render() {
        return (
            <div className="col-lg-4 col-md-12 col-sm-12">
                <div className="menu-box block" id="leftBlock">
                    <div className="titular">Settings</div>
                    <ul className="menu-box-menu">
                        <li>
                            <div className="menu-box-tab menu-text">
                                <span className="icon scnd-font-color"><i className="far fa-envelope"/></span>
                                Messages
                                <div className="menu-box-number">4</div>
                            </div>
                        </li>
                        <li>
                            <div className="menu-box-tab menu-text">
                                <span className="icon scnd-font-color"><i className="fas fa-sync-alt"/></span>
                                Activate/Renew Membership
                            </div>
                        </li>
                        <li>
                            <div className="menu-box-tab menu-text">
                                <span className="icon scnd-font-color"><i className="far fa-calendar-alt"/></span>
                                Events
                                <div className="menu-box-number">5</div>
                            </div>
                        </li>
                        <li>
                            <div className="menu-box-tab menu-text">
                                <span className="icon scnd-font-color"><i className="fas fa-tasks"/></span>
                                Announcements
                                <div className="menu-box-number">3</div>
                            </div>
                        </li>
                        <li id="editAccount">
                            <div className="menu-box-tab menu-text">
                                <span className="icon scnd-font-color"><i className="fas fa-user"/></span>
                                Edit Account
                            </div>
                        </li>

                    </ul>
                </div>


            </div>
        );
    }
}

export default SettingsProfile;