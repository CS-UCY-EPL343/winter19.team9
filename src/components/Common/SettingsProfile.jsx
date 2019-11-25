import React, { Component } from 'react';
import ToggleModal          from './ToggleModal';
import PaymentModal         from './PaymentModal';
import { Button }           from 'reactstrap';
import Announcements        from './Announcements';

class SettingsProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modalPayment      : false,
            modalAnnouncements: false
        };
        this.togglePayment = this.togglePayment.bind(this);
        this.toggleAnnouncements = this.toggleAnnouncements.bind(this);
    };

    togglePayment = () => {
        this.setState({ modalPayment: !this.state.modalPayment });
    };
    toggleAnnouncements = () => {
        this.setState({ modalAnnouncements: !this.state.modalAnnouncements });
    };

    render() {
        return (
            <div className = "col-lg-4 col-md-12 col-sm-12">
                <div className = "menu-box block" id = "leftBlock">
                    <div className = "titular">Settings</div>
                    <ul className = "menu-box-menu">
                        {/* Remember to add onClick to new modals on buttons */ }
                        <li>
                            <Button className = { 'nav-link menu-box-tab menu-text ' }>
                                <i className = "scnd-font-color far fa-envelope" /> Messages
                                <div className = "menu-box-number">4</div>
                            </Button>
                            {/* Modal for Messages*/ }
                        </li>
                        <li>
                            <Button className = { 'nav-link menu-box-tab menu-text ' } onClick = { this.togglePayment }>
                                <i className = "scnd-font-color fas fa-sync-alt" /> Membership
                            </Button>
                            <ToggleModal
                                modal = { this.state.modalPayment }
                                toggle = { this.togglePayment }
                                modalSize = { 'md' }
                                modalHeader = { 'Payment' }
                                modalBody = { <PaymentModal /> }
                            />
                        </li>
                        <li>
                            <Button className = { 'nav-link menu-box-tab menu-text ' }>
                                <i className = "scnd-font-color far fa-calendar-alt" /> Events
                                <div className = "menu-box-number">5</div>
                            </Button>
                            {/* Modal for Events */ }
                        </li>
                        <li>
                            <div className = "menu-box-tab menu-text">
                                <Button className = { 'nav-link menu-box-tab menu-text ' }
                                        onClick = { this.toggleAnnouncements }
                                >
                                    <i className = "scnd-font-color fas fa-tasks" /> Announcements
                                    <div className = "menu-box-number">3</div>
                                </Button>
                                <ToggleModal
                                    modal = { this.state.modalAnnouncements }
                                    toggle = { this.toggleAnnouncements }
                                    modalSize = { 'md' }
                                    modalHeader = { 'Announcements' }
                                    modalBody = { <Announcements /> }
                                />
                            </div>
                        </li>
                        <li id = "editAccount">
                            <Button className = { 'nav-link menu-box-tab menu-text ' }>
                                <i className = "scnd-font-color fas fa-user" /> Edit Account
                            </Button>
                            {/* Modal for Edit Account */ }
                        </li>

                    </ul>
                </div>


            </div>
        );
    }
}

export default SettingsProfile;