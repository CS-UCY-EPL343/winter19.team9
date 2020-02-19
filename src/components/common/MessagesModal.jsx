import React, {Component} from 'react';
import '../assets/styles/MessagesModal.css';
import Message            from './Message';

class MessagesModal extends Component {
  render() {
    return (
        <div id = { 'MessagesModal' }>
          <button className={"new-msg btn btn-primary btn-xl text-uppercase"}>New Message</button>
          <div id = "message-container"
               className = "container-fluid mt-2"
          >
            <Message title = { 'Message 1' }
                     message = { 'Out too the been like hard off. Improve enquire welcome own beloved matters her. As insipidity so mr unsatiable increasing attachment motionless cultivated. Addition mr husbands unpacked occasion he oh. Is unsatiable if projecting boisterous insensible. It recommend be resolving pretended middleton.' }
                     contact = { 'Coach' }
                     outgoing = { true }
                     timestamp={'Tuesday 02/02/2020 16:30'}
            />
            <Message title = { 'Message 2' }
                     message = { 'Kept in sent gave feel will oh it we. Has pleasure procured men laughing shutters nay. Old insipidity motionless continuing law shy partiality. Depending acuteness dependent eat use dejection. Unpleasing astonished discovered not nor shy. Morning hearted now met yet beloved evening. Has and upon his last here must. ' }
                     contact = { 'Coach' }
                     outgoing = { false }
                     timestamp={'Tuesday 03/02/2020 14:38'}
            />
          </div>
        </div>
    );
  }
}

export default MessagesModal;