import React, {Component} from 'react';
import {Button, Modal, ModalBody, ModalFooter, ModalHeader} from 'reactstrap';
import MessagesNewModalForm from "./MessagesNewModalForm";
import Swal from "sweetalert2";
import {getCoaches} from "../../repository";

class MessagesNewModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            message: '',
            recipients: [],
            contact: '',
        };

        this.handleChange = this.handleChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.toggle = this.toggle.bind(this);
    }

    componentDidMount() {
        getCoaches().then(response => {
            this.setState({recipients: response});
        }).catch(err => alert(err));
    }

    onSubmit = (e) => {
        e.preventDefault();
        if (!this.state.title || !this.state.message || !this.state.contact) {
            Swal.fire(
                'Please fill in all boxes',
                '',
                'error',
            ).then();
            return;
        }
        this.props.onSubmit(e, this.state.title, this.state.message,
            this.state.contact);
        this.setState({title: '', message: '', contact: ''});
    };

    handleChange = (e) => {
        this.setState({[e.target.name]: e.target.value});
    };

    toggle = () => {
        this.setState({
            title: '',
            message: '',
            contact: '',
        });
        this.props.toggle();
    };

    render() {
        // noinspection JSUnresolvedVariable
        return (
            <Modal isOpen={this.props.modal} toggle={this.toggle}
                   size={'md'}
                   aria-labelledby="contained-modal-title-vcenter"
                   centered
            >
                <ModalHeader toggle={this.toggle}>New Message</ModalHeader>
                <ModalBody>
                    <MessagesNewModalForm handleChange={this.handleChange} {...this.state} />
                </ModalBody>
                <ModalFooter>
                    <Button onClick={this.toggle}>{this.props.btnCancel
                    || 'Cancel'}</Button>
                    <Button onClick={this.onSubmit}>{'Submit'}</Button>
                </ModalFooter>
            </Modal>

        )
    }
}

export default MessagesNewModal;