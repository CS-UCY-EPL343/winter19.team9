import React, {Component} from 'react';
import {Button, Modal, ModalBody, ModalFooter, ModalHeader} from 'reactstrap';

class AnnouncementModal extends Component {
    constructor(props) {
        super(props);

        this.state = {
            title: this.props.title || '',
            message: this.props.message || '',
            // announcement_id : this.props.announcements[this.props.announcement_id].ANNOUNCEMENT_ID || '',
        };

        this.handleChange = this.handleChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (!this.props.announcements || !this.props.announcement_id) return;
        if (prevProps.announcement_id === this.props.announcement_id || this.props.announcement_id === undefined) return;
        if (prevProps.title !== this.props.title || prevProps.message !== this.props.message || prevProps.this.props.announcements[this.props.announcement_id].ANNOUNCEMENT_ID !== this.props.announcements[this.props.announcement_id].ANNOUNCEMENT_ID)
            this.setState({
                title: this.props.title || '',
                message: this.props.message || '',
                announcement_id: this.props.announcements[this.props.announcement_id].ANNOUNCEMENT_ID || ''
            });
    }

    handleChange = (e) => {
        this.setState({[e.target.name]: e.target.value});
    };

    onSubmit = (e) => {
        e.preventDefault();
        if (this.props.announcements && this.props.announcement_id) {
            this.props.onSubmit(this.state.title, this.state.message, this.props.announcements[this.props.announcement_id].ANNOUNCEMENT_ID);
        } else {
            this.props.onSubmit(this.state.title, this.state.message);
        }
        this.setState({title: '', message: ''});
    };


    render() {
        return (
            <Modal isOpen={this.props.modal} toggle={this.props.toggle}
                   size={'md'}
                   aria-labelledby="contained-modal-title-vcenter"
                   centered
            >
                <ModalHeader toggle={this.props.toggle}>Add
                    Announcement</ModalHeader>
                <ModalBody>
                    <form>
                        <div className="form-group">
                            <label htmlFor="ann-modal-title"
                                   className="col-form-label"
                                   style={{color: '#D90429'}}
                            >Title:</label>
                            <input type="text"
                                   className="form-control"
                                   id="ann-modal-title"
                                   placeholder="Enter a title..."
                                   name="title"
                                   defaultValue={this.props.title || ''}
                                   required
                                   onChange={this.handleChange}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="ann-modal-message"
                                   className="col-form-label"
                                   style={{color: '#D90429'}}
                            >Message:</label>
                            <textarea className="form-control"
                                      id="ann-modal-message"
                                      placeholder="Enter a message..."
                                      name="message"
                                      defaultValue={this.props.message || ''}
                                      required
                                      onChange={this.handleChange}
                            />
                        </div>
                    </form>
                </ModalBody>
                <ModalFooter>
                    <Button onClick={this.props.toggle}>{this.props.btnCancel
                    || 'Cancel'}</Button>
                    <Button onClick={this.onSubmit}>{'Submit'}</Button>
                </ModalFooter>
            </Modal>
        );
    }
}

export default AnnouncementModal;