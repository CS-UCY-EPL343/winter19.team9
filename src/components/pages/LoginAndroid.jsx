import React  from 'react';
import $      from 'jquery';
import Modal  from 'react-bootstrap/Modal';
import Signup from '../common/SignUp';
import LogIn  from '../common/LogIn';
import '../assets/styles/SignInUpModal.css';
import ToggleModal from "../common/ToggleModal";
import MessagesModal from "../common/MessagesModal";
import LoginModal from "../common/LoginModal";

class LoginAndroid extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showModal: true,
        };

        this.toggleModal = this.toggleModal.bind(this);
    }

    toggleModal = () => {
        this.setState({showModal: true});
    };


    render() {
        return (

            <ToggleModal
                modal = { this.state.showModal }
                toggle = { this.toggleModal }
                modalSize = { 'md' }
                modalHeader = { 'Login Form' }
                modalBody = { <LoginModal /> }
                setUserLevel = { this.props.setUserLevel }
            />

        );
    }
}

export default LoginAndroid;
