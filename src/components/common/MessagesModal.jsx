import React, {Component} from 'react';
import {AnimatedOnScroll} from 'react-animated-css-onscroll';
import '../assets/styles/MessagesModal.css';
import Message            from './Message';
import {
  createNewMessage,
  getMessages,
  makeMessagesRead,
}                         from '../../repository';
import MessageNewModal    from './MessageNewModal';

class MessagesModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      newModal: false,
    };
    this.toggle = this.toggle.bind(this);
    this.onMessageSubmit = this.onMessageSubmit.bind(this);
  }

  componentDidMount() {
    getMessages().then(response => {
      this.setState({
        messages: response.messages[0].sort(
            function(a, b) {
              return b.Message_ID
                     - a.Message_ID;
            }),
      });
    }).catch(err => alert(err));
  }

  componentWillUnmount() {
    if (this.props.TotalMessages > 0) {
      const newMessages = this.state.messages.slice(0,
          this.props.TotalMessages).map(msg => msg.Message_ID);
      makeMessagesRead(newMessages).then(response => {
        this.props.toggleTotalMessages();
      }).catch(err => alert(err));
    }
  }

  toggle = () => {
    this.setState({newModal: !this.state.newModal});
  };

  onMessageSubmit = (title, message, contact) => {
    createNewMessage({title, message, contact}).then(response => {
      this.toggle();
      let newArr = this.state.messages.slice(0);
      newArr.unshift(response[0]);
      this.setState({messages: newArr});
    }).catch(err => alert(err));
  };

  render() {
    return (
        <div id = { 'MessagesModal' }>
          <button className = { 'new-msg-btn btn btn-primary btn-xl text-uppercase' }
                  onClick = { this.toggle }
          >
            New Message
          </button>
          <div id = "message-container"
               className = "container-fluid mt-2"
          >
            { this.state.messages.map(
                (msg, index) => {
                  const outgoing = this.props.userLevel === msg.From_level;
                  const contact = `${ msg.From_Name } ${ msg.From_Surname } - ${ msg.From_level.toUpperCase() }`;
                  const timestamp = msg.Timestamp.split(/[T.]+/)[0] + ' '
                                    + msg.Timestamp.split(/[T.]+/)[1];
                  return (
                      <div key = { index }>
                        { this.props.TotalMessages > 0 &&
                          this.props.TotalMessages === index &&
                          < div className = 'new-msg-line'>
                            New Messages Above
                          </div> }
                          <Message
                              key = { msg.Message_ID }
                              title = { msg.Title }
                              message = { msg.Message }
                              contact = { contact }
                              outgoing = { outgoing }
                              timestamp = { timestamp }
                              hasSeen = { msg.hasSeen }
                          />
                      </div>
                  );
                })
            }
          </div>

          <MessageNewModal onSubmit = { this.onMessageSubmit }
                           toggle = { this.toggle }
                           modal = { this.state.newModal }
          />
        </div>
    );
  }
}

export default MessagesModal;