import React  from 'react';
import $      from 'jquery';
import Modal  from 'react-bootstrap/Modal';
import Signup from './SignUp';
import LogIn  from './LogIn';
import '../assets/styles/SignInUpModal.css';

class SignInUpModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
    };

    this.toggleModal = this.toggleModal.bind(this);
  }

  toggleModal = () => {
    this.setState({showModal: !this.state.showModal});
  };

  rotate = () => {
    // noinspection JSJQueryEfficiency
    if ($('.flipper').css('transform') === 'none') {
      $('.flipper').css('transform', 'rotateY(180deg)');
    } else {
      $('.flipper').css('transform', '');

      // $('html, body').animate(
      //     {
      //       scrollTop: $('.flip-container').offset().top,
      //     },
      //     2000,
      //     function() {
      //       window.location.hash = $('.flip-container');
      //     },
      // );
    }
  };

  render() {
    return (
        <div>
          <button className = { 'nav-link login btn btn-secondary' }
                  onClick = { this.toggleModal }
          >
            Login/Register
          </button>

          <Modal show = { this.state.showModal }
                 onHide = { this.toggleModal }
                 className = { 'sign-in-up-modal' }
                 size = { 'md' }
                 centered
          >
            {/*<Modal.Header closeButton>*/ }
            {/*  <Modal.Title>Modal heading</Modal.Title>*/ }
            {/*</Modal.Header>*/ }
            <Modal.Body>
              <div className = "flip-container">
                <div className = "flipper">
                  <div className = "front">
                    {/* <!-- front content --> */ }
                    <div className = "card">
                      <LogIn rotate = { this.rotate }
                             toggleModal = { this.toggleModal }
                             setUserLevel = { this.props.setUserLevel }
                      />
                    </div>
                  </div>
                  <div className = "back">
                    {/* <!-- back content --> */ }
                    <div className = "card">
                      <Signup rotate = { this.rotate }
                              toggleModal = { this.toggleModal }
                      />
                    </div>
                  </div>
                </div>
              </div>
            </Modal.Body>
            {/*<Modal.Footer>*/ }
            {/*  <Button variant = "secondary" onClick = { this.toggleModal }>*/ }
            {/*    Close*/ }
            {/*  </Button>*/ }
            {/*  <Button variant = "primary" onClick = { this.toggleModal }>*/ }
            {/*    Save Changes*/ }
            {/*  </Button>*/ }
            {/*</Modal.Footer>*/ }
          </Modal>
        </div>
    );
  }
}

export default SignInUpModal;
