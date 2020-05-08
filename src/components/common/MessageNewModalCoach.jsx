import React, {Component}                                   from 'react';
import {Button, Modal, ModalBody, ModalFooter, ModalHeader} from 'reactstrap';
import Swal                                                 from "sweetalert2";

class MessageNewModal extends Component {
    constructor(props) {
        super(props);

        this.state = {
            title     : '',
            message   : '',
            recipients: [],
            contact   : '',
        };

        this.handleChange = this.handleChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.componentDidMount = this.componentDidMount.bind(this);
    }

    componentDidMount() {
        this.setState({contact: this.props.user_ID},()=>{

        });
    }

    handleChange = (e) => {
        this.setState({[e.target.name]: e.target.value});
    };

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
            // this.setState({title: '', message: '', contact: ''});

    };

    render() {
        // noinspection JSUnresolvedVariable
        return (
            <Modal isOpen = { this.props.modal } toggle = { this.props.toggle }
                   size = { 'md' }
                   aria-labelledby = "contained-modal-title-vcenter"
                   centered
            >
                <ModalHeader toggle = { this.props.toggle }>New Message</ModalHeader>
                <ModalBody>
                    <form>
                        <div className = "form-group">
                            <label htmlFor = "ann-modal-to"
                                   className = "col-form-label"
                                   style = { {color: '#D90429'} }
                            >To: {this.props.username} </label>


                            {/*<select id = "ann-modal-to"*/}
                            {/*        name = "contact"*/}
                            {/*        className = "form-control"*/}
                            {/*        placeholder = "Select recipient..."*/}
                            {/*        required*/}
                            {/*        onChange = { this.handleChange }*/}
                            {/*>*/}
                            {/*    <option value = ''>*/}
                            {/*        Select recipient...*/}
                            {/*    </option>*/}
                            {/*    { this.state.recipients.map((rec, index) => {*/}
                            {/*        // noinspection JSUnresolvedVariable*/}
                            {/*        return <option key = { index }*/}
                            {/*                       value = { rec.AccountID }*/}
                            {/*        >*/}
                            {/*            { `${ rec.CoachName } ${ rec.Surname } - ${ rec.level.toUpperCase() }` }*/}
                            {/*        </option>;*/}
                            {/*    }) }*/}
                            {/*</select>*/}

                        </div>
                        <div className = "form-group">
                            <label htmlFor = "ann-modal-title"
                                   className = "col-form-label"
                                   style = { {color: '#D90429'} }
                            >Title:</label>
                            <input type = "text"
                                   className = "form-control"
                                   id = "ann-modal-title"
                                   placeholder = "Enter a title..."
                                   name = "title"
                                   required
                                   onChange = { this.handleChange }
                            />
                        </div>
                        <div className = "form-group">
                            <label htmlFor = "ann-modal-message"
                                   className = "col-form-label"
                                   style = { {color: '#D90429'} }
                            >Message:</label>
                            <textarea className = "form-control"
                                      id = "ann-modal-message"
                                      placeholder = "Enter a message..."
                                      name = "message"
                                      required
                                      onChange = { this.handleChange }
                            />
                        </div>
                    </form>
                </ModalBody>
                <ModalFooter>
                    <Button onClick = { this.props.toggle }>{ this.props.btnCancel
                    || 'Cancel' }</Button>
                    <Button onClick = { this.onSubmit }>{ 'Submit' }</Button>
                </ModalFooter>
            </Modal>
        );
    }
}

export default MessageNewModal;