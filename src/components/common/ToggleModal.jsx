import React                                                  from 'react';
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';

export default class ToggleModal extends React.Component {
    render() {
        let Comp = this.props.modalBody;
        return (
            <div>
                <Modal isOpen = { this.props.modal } toggle = { this.props.toggle }
                       size = { this.props.modalSize || 'lg' }
                       aria-labelledby = "contained-modal-title-vcenter"
                       centered
                >
                    <ModalHeader toggle = { this.props.toggle }>{ this.props.modalHeader }</ModalHeader>
                    <ModalBody>
                        { React.cloneElement(Comp, {
                            ...this.props
                        }) }
                    </ModalBody>
                    <ModalFooter>
                        <Button onClick = { this.props.toggle }>{ this.props.btnCancel || 'Cancel' }</Button>
                    </ModalFooter>
                </Modal>
            </div>
        )
    }
}
