import React, {Component} from 'react';
import ToggleModal from './ToggleModal';
import PaymentModal from './PaymentModal';
import {Button} from 'reactstrap';
import AnnouncementsPrivate
    from './AnnouncementsPrivate';
import EditAccount from './EditAccount';
import MessagesModal from './MessagesModal';
import {getTotalMessages, getTotalPrivateAnnouncements} from '../../repository';

class SettingsProfile extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            modalPayment: false,
            modalAnnouncements: false,
            modalMessages: false,
            modalEditAccount: false,
            TotalMessages: 0,
            TotalAnnouncement: 0,
        };
        this.togglePayment = this.togglePayment.bind(this);
        this.toggleAnnouncements = this.toggleAnnouncements.bind(this);
        this.toggleTotalMessages = this.toggleTotalMessages.bind(this);
    };

    togglePayment = () => {
        this.setState({modalPayment: !this.state.modalPayment});
    };
    toggleTotalMessages = () => {
        this.setState({TotalMessages: 0});
    };
    toggleAnnouncements = () => {
        this.setState({modalAnnouncements: !this.state.modalAnnouncements});
    };
    toggleEditAccount = () => {
        this.setState({modalEditAccount: !this.state.modalEditAccount});
    };
    toggleMessages = () => {
        this.setState({modalMessages: !this.state.modalMessages});
    };

    componentDidMount() {
        getTotalPrivateAnnouncements().then(response => {
            console.log(response);
            this.setState(
                {TotalAnnouncement: response.TotalAnnouncement.Count});
        });

        getTotalMessages().then(response => {
            this.setState(
                {TotalMessages: response.TotalMessages});
        });
    }

    render() {
        return (
            <div className="col-lg-4 col-md-12 col-sm-12">
                <div className="menu-box block" id="leftBlock">
                    <div className="titular">Settings</div>
                    <ul className="menu-box-menu">
                        {/* Remember to add onClick to new modals on buttons */}
                        <li>
                            <Button className={'nav-link menu-box-tab menu-text '}
                                    onClick={this.toggleMessages}
                            >
                                <i className="scnd-font-color fa fa-envelope"/> Messages
                                {this.state.TotalMessages > 0 &&
                                <div className="menu-box-number">{this.state.TotalMessages}</div>}
                            </Button>
                            <ToggleModal
                                modal={this.state.modalMessages}
                                toggle={this.toggleMessages}
                                modalSize={'md'}
                                modalHeader={'Messages'}
                                modalBody={
                                    <MessagesModal userLevel={this.props.userLevel}
                                                   TotalMessages={this.state.TotalMessages}
                                                   toggleTotalMessages={this.toggleTotalMessages}
                                    />}
                            />
                        </li>
                        <li>
                            <Button className={'nav-link menu-box-tab menu-text '}
                                    onClick={this.togglePayment}
                            >
                                <i className="scnd-font-color fa fa-credit-card"><span
                                    style={{color: 'white'}}
                                >Membership</span></i>
                            </Button>
                            <ToggleModal
                                modal={this.state.modalPayment}
                                toggle={this.togglePayment}
                                modalSize={'md'}
                                modalHeader={'Payment'}
                                modalBody={<PaymentModal/>}
                            />
                        </li>
                        <li>
                            <Button className={'nav-link menu-box-tab menu-text '}>
                                <i className="scnd-font-color fa fa-calendar"/> Events
                                <div className="menu-box-number">3</div>
                            </Button>
                            {/* Modal for Events */}
                        </li>
                        <li>
                            <div className="menu-box-tab menu-text">
                                <Button className={'nav-link menu-box-tab menu-text '}
                                        onClick={this.toggleAnnouncements}
                                >
                                    <i className="scnd-font-color fa fa-tasks"/> Announcements
                                    <div className="menu-box-number">{this.state.TotalAnnouncement}</div>
                                </Button>
                                <ToggleModal
                                    modal={this.state.modalAnnouncements}
                                    toggle={this.toggleAnnouncements}
                                    modalSize={'md'}
                                    modalHeader={'Announcements'}
                                    modalBody={<AnnouncementsPrivate/>}
                                />
                            </div>
                        </li>
                        <li id="editAccount">
                            <Button className={'nav-link menu-box-tab menu-text '}
                                    onClick={this.toggleEditAccount}
                            >
                                <i className="scnd-font-color fa fa-user"/> Edit Account
                            </Button>
                            <ToggleModal
                                modal={this.state.modalEditAccount}
                                toggle={this.toggleEditAccount}
                                modalSize={'md'}
                                modalHeader={'Edit Account'}
                                modalBody={<EditAccount/>}
                            />
                        </li>

                    </ul>
                </div>


            </div>
        );
    }
}

export default SettingsProfile;