import React, { Component } from 'react';
import './MessagesContainer.css'
import ChatHeading from './ChatHeading'
import MessageList from './MessageList'
import MessageTextBox from './MessageTextBox'

class MessagesContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {  };
  }
  render() {
    const { activeChat, user } = this.props
    return (
      <div className="messages-container">
        Message Container
        { activeChat !== null ?
          <div>Here's you active Chatroom
            <ChatHeading activeChat={activeChat.name}/>
            <MessageList messages={activeChat.messages} user={user} typingUsers={activeChat.typingUser} />
            <MessageTextBox
              sendMessage={ (message) => { this.sendMessage(activeChat.id, message) }}
               isTyping= {(isTyping) => { this.isTyping(activeChat.id, isTyping) }}/>
          </div>
        :
        <div>
          <h2>Welcome {user.username}!</h2>
          <button>Strike up a conversation!</button>
        </div>
        }
      </div>
    );
  }
}

export default MessagesContainer;