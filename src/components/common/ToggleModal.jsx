import React                                                  from 'react';
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';

export default class ToggleModal extends React.Component {
    render() {
        let Comp = this.props.modalBody;
        // noinspection JSUnresolvedVariable
      return (
            <div>
                <Modal isOpen = { this.props.modal } toggle = { this.props.toggle }
                       size = { this.props.modalSize || 'lg' }
                       aria-labelledby = "contained-modal-title-vcenter"
                       centered
                >
                    {!(navigator.userAgent.match(/Android/i))     &&
                    <ModalHeader toggle={this.props.toggle}>{this.props.modalHeader}</ModalHeader>
                    }
                    <ModalBody>
                        { React.cloneElement(Comp, {
                            ...this.props
                        }) }
                    </ModalBody>
                    {!(navigator.userAgent.match(/Android/i)) &&
                    <ModalFooter>
                        <Button onClick={this.props.toggle}>{this.props.btnCancel || 'Cancel'}</Button>
                    </ModalFooter>
                    }
                </Modal>
            </div>
        )
    }
}
