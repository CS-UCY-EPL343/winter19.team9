import React, {Component} from 'react';
import '../assets/styles/MessagesModal.css';
import Message            from './Message';
import {
  createNewMessage,
  getMessages,
  makeMessagesRead, userData,
}                         from '../../repository';
import MessageNewModal    from './MessageNewModal';
import Swal               from 'sweetalert2';
import Spinner            from '../Spinner';
import {AnimatedOnScroll} from 'react-animated-css-onscroll';

class MessagesModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      newModal: false,
      loading : [true, true],
    };
    this.toggle = this.toggle.bind(this);
    this.onMessageSubmit = this.onMessageSubmit.bind(this);
  }

  componentDidMount() {
    getMessages().then(response => {
      this.setState({
        messages: response.messages[0].sort(
            function(a, b) {
              // noinspection JSUnresolvedVariable
              return b.Message_ID
                     - a.Message_ID;
            }),
      });
    }).then(() => {
      let loading = this.state.loading;
      loading[0] = false;
      this.setState({loading});
    }).catch(err => alert(err));

    userData().then(response => {
      this.setState({image: response.image});
    }).then(() => {
      let loading = this.state.loading;
      loading[1] = false;
      this.setState({loading});
    });
  }

  componentWillUnmount() {
    if (this.props.TotalMessages > 0) {
      // noinspection JSUnresolvedVariable
      const newMessages = this.state.messages.slice(0,
          this.props.TotalMessages).map(msg => msg.Message_ID);
      makeMessagesRead(newMessages).then(() => {
        this.props.toggleTotalMessages();
      }).catch(err => alert(err));
    }
  }

  toggle = () => {
    this.setState({newModal: !this.state.newModal});
  };

  onMessageSubmit = (e, title, message, contact) => {
    e.preventDefault();
    createNewMessage({title, message, contact}).then(response => {
      this.toggle();
      let newArr = this.state.messages.slice(0);
      newArr.unshift(response[0]);
      this.setState({messages: newArr});
      console.log(response);
      if (response[0]) {
        Swal.fire(
            'Message sent successfully',
            '',
            'success',
        ).then();
      } else {
        Swal.fire(
            'Something went wrong',
            'Please try again...',
            'error',
        ).then();
      }
    }).catch(() => Swal.fire(
        'Something went wrong',
        'Please try again...',
        'error',
    ).then());
  };

  render() {
    return (
        <div id = { 'MessagesModal' }>
          { this.state.loading.includes(true) ?
              <Spinner style = { {
                'height'         : '250px',
                'backgroundColor': 'transparent',
              } }
              />
              :
              <>
                <button className = { 'new-msg-btn btn btn-primary btn-xl text-uppercase' }
                        onClick = { this.toggle }
                >
                  New Message
                </button>
                <div id = "message-container"
                     className = "container-fluid mt-2"
                >
                  <AnimatedOnScroll animationIn = "slideInDown">
                    { this.state.messages.map(
                        (msg, index) => {
                          // noinspection JSUnresolvedVariable
                          const outgoing = this.props.userLevel
                                           === msg.From_level;
                          // noinspection JSUnresolvedVariable
                          const toContact = `${ msg.To_Name } ${ msg.To_Surname } - ${ msg.To_level.toUpperCase() }`;
                          // noinspection JSUnresolvedVariable
                          const fromContact = `${ msg.From_Name } ${ msg.From_Surname } - ${ msg.From_level.toUpperCase() }`;
                          const timestamp = msg.Timestamp.split(/[T.]+/)[0]
                                            + ' '
                                            + msg.Timestamp.split(/[T.]+/)[1];
                          // noinspection JSUnresolvedVariable
                          return (
                              <div className = { 'messageDiv' } key = { index }>
                                { this.props.TotalMessages > 0 &&
                                  this.props.TotalMessages === index &&
                                  < div className = 'new-msg-line'>
                                    New Messages Above
                                  </div> }
                                <Message
                                    key = { msg.Message_ID }
                                    title = { msg.Title }
                                    message = { msg.Message }
                                    toContact = { toContact }
                                    fromContact = { fromContact }
                                    outgoing = { outgoing }
                                    timestamp = { timestamp }
                                    hasSeen = { msg.hasSeen }
                                    image = { this.state.image }
                                />
                              </div>
                          );
                        })
                    }
                  </AnimatedOnScroll>
                </div>
              </>
          }

          <MessageNewModal onSubmit = { this.onMessageSubmit }
                           toggle = { this.toggle }
                           modal = { this.state.newModal }
          />
        </div>
    );
  }
}

export default MessagesModal;