import React                                                  from 'react';
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';

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
        let Comp = this.props.modalBody;
        return (
            <div>
                {/*<Button color="danger" onClick={this.toggle}>Open</Button>*/ }
                <Button className = { this.props.btnClass } onClick = { this.toggle }
                >{ this.props.btnText || 'Button' }</Button>

                <Modal isOpen = { this.state.modal } toggle = { this.toggle }
                       size = { this.props.modalSize || 'lg' }
                       aria-labelledby = "contained-modal-title-vcenter"
                       centered
                >
                    <ModalHeader toggle = { this.toggle }>{ this.props.modalHeader }</ModalHeader>
                    <ModalBody>
                        { React.cloneElement(Comp, { toggle: this.toggle }) }
                    </ModalBody>
                    <ModalFooter>
                        <Button onClick = { this.toggle }>{ this.props.btnCancel || 'Cancel' }</Button>
                    </ModalFooter>
                </Modal>
            </div>
        )
    }
}
