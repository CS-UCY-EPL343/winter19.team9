import React, {Component}                                   from 'react';
import {Button, Modal, ModalBody, ModalFooter, ModalHeader} from 'reactstrap';

class AnnouncementsPrivateModal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title  : this.props.title || '',
      message: this.props.message || '',
      // announcement_id :
      // this.props.announcements[this.props.announcement_id].ANNOUNCEMENT_ID
      // || '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

  }

  handleChange = (e) => {
    this.setState({[e.target.name]: e.target.value});
  };

  onSubmit = (e) => {
    e.preventDefault();

    this.props.onSubmit(this.state.title, this.state.message).then((res) => {
      if(res) {
        this.toggle();
      }
    });
  };

  toggle = () => {
    this.setState({title: '', message: ''});
    this.props.toggle();
  };

  render() {
    // noinspection JSUnresolvedVariable
    return (
        <Modal isOpen = { this.props.modal } toggle = { this.toggle }
               size = { 'md' }
               aria-labelledby = "contained-modal-title-vcenter"
               centered
        >
          <ModalHeader toggle = { this.toggle }>Add
                                                      Announcement</ModalHeader>
          <ModalBody>
            <form>
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
                       defaultValue = { this.props.title || '' }
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
                          defaultValue = { this.props.message || '' }
                          required
                          onChange = { this.handleChange }
                />
              </div>
            </form>
          </ModalBody>
          <ModalFooter>
            <Button onClick = { this.toggle }>{ this.props.btnCancel
                                                      || 'Cancel' }</Button>
            <Button onClick = { this.onSubmit }>{ 'Submit' }</Button>
          </ModalFooter>
        </Modal>
    );
  }
}

export default AnnouncementsPrivateModal;