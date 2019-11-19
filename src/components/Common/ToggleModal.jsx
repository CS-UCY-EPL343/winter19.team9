import React from 'react';
import {Button, Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap';
import LoginModal from "./LoginModal";

export default class ToggleModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            modal: false
        };
        this.toggle = this.toggle.bind(this);
    };

    toggle = () => {
        this.setState({
            modal: !this.state.modal
        });
    };

    render() {
        return (
            <div>
                {/*<Button color="danger" onClick={this.toggle}>Open</Button>*/}
                <Button className="nav-link" onClick={this.toggle}
                >Login/Register <i className="fas fa-sign-in-alt"/></Button>

                <Modal isOpen={this.state.modal} toggle={this.toggle}
                       size="md"
                       aria-labelledby="contained-modal-title-vcenter"
                       centered>
                    <ModalHeader toggle={this.toggle}>Login Form</ModalHeader>
                    <ModalBody>
                        <LoginModal
                            toggle={this.toggle}
                        />
                    </ModalBody>
                    <ModalFooter>
                        <Button onClick={this.toggle}>Cancel</Button>
                    </ModalFooter>
                </Modal>
            </div>
        )
    }
}
