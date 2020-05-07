import React, {Component}                                   from 'react';
import {Button, Modal, ModalBody, ModalFooter, ModalHeader} from 'reactstrap';

class AnnouncementModal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title          : '',
      message        : '',
      announcement_id: '',
      // this.props.announcements[this.props.announcement_id].ANNOUNCEMENT_ID
      // || '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.DeleteAnn = this.DeleteAnn.bind(this);
    this.toggle = this.toggle.bind(this);
  }

  componentDidMount() {
    this.setState({
      title          : this.props.title || '',
      message        : this.props.message || '',
      announcement_id: this.props.announcement_id || '',
    });
  }

  // noinspection JSUnusedLocalSymbols
  componentDidUpdate(prevProps, prevState, snapshot) {
    if (!this.props.announcements || this.props.announcement_id === undefined) {
      return;
    }
    if (this.props.announcement_id === prevProps.announcement_id
        || this.props.announcement_id === undefined) {
      return;
    }
    if (this.props.title !== prevProps.title ||
        this.props.message !== prevProps.message
        || this.props.announcements[this.props.announcement_id].ANNOUNCEMENT_ID
        !== prevProps.announcements[this.props.announcement_id].ANNOUNCEMENT_ID) {
      this.setState({
        title          : this.props.title || '',
        message        : this.props.message || '',
        announcement_id: this.props.announcements[this.props.announcement_id].ANNOUNCEMENT_ID
                         || '',
      });
    }
  }

  handleChange = (e) => {
    this.setState({[e.target.name]: e.target.value});
  };

  onSubmit = (e) => {
    e.preventDefault();
    if (this.props.announcements && this.props.announcement_id !== undefined) {
      this.props.onSubmit(this.state.title, this.state.message,
          this.props.announcements[this.props.announcement_id].ANNOUNCEMENT_ID)
          .then((res) => {
            if (res) {
              // this.setState({title: '', message: '', announcement_id: ''});
            }
          });
    } else {
      this.props.onSubmit(this.state.title, this.state.message).then((res) => {
        if (res) {
          this.setState({title: '', message: ''});
        }
      });
    }
  };

  // DeleteAnn = (ANNOUNCEMENT_ID) => {
  //     if (this.state.level <= 1) {
  //         return;
  //     }
  //
  //     removeAnnouncement(ANNOUNCEMENT_ID).then(() => {
  //         this.setState({
  //             announcements: this.state.announcements.filter(
  //                 ann => ann.ANNOUNCEMENT_ID
  //                     !== ANNOUNCEMENT_ID),
  //         });
  //     }).catch(err => alert(err));
  //
  // };

  DeleteAnn = (e) => {
    e.preventDefault();
    if (this.props.level !== -1) {
      this.props.DeleteAnn(this.props.announcement_id).then((res) => {
        if (res) {
          this.props.toggle();
        }
      });
    }
  };

  toggle = () => {
    if (!(this.props.announcements && this.props.announcement_id !== undefined)) {
      this.setState({title: '', message: ''});
    }
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
          <ModalHeader toggle = { this.toggle }>
            {this.props.isPrivate ? 'Edit' : 'Add' } Announcement
          </ModalHeader>
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
            { this.props.isPrivate &&
              <Button onClick = { this.DeleteAnn }>{ 'Delete' }</Button> }
          </ModalFooter>
        </Modal>
    );
  }
}

export default AnnouncementModal;