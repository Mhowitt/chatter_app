import React, { Component } from 'react';
import SideMenu from './SideMenu'
import ChatroomHeading from './ChatroomHeading'
import MessagesContainer from './MessagesContainer'
import './ChatroomContainer.css'


class ChatroomContainer extends Component {
  constructor(props) {
      super(props);
      this.state = {
        activeChat: null,
        allChats: []
      };
      // this.setActiveChat = this.setActiveChat.bind(this)
  }

  setActiveChat = (activeChat) => {
    this.setState({activeChat})
  }

  render() {
    const { user, logout } = this.props
    const { activeChat, allChats } = this.state
      return (
        <div className="container">
          <ChatroomHeading
          user={user}
          logout={logout}
          />
          <div className="main-container">
            <SideMenu
              logout={logout}
              allChats={allChats}
              user={user}
              activeChat={activeChat}
              setActiveChat={(activeChat) => this.setActiveChat(activeChat)}
            />
            <MessagesContainer user={user} activeChat={activeChat} />
          </div>
          <h2>You're in a chatroom!</h2>
        </div>
      );
  }
}

export default ChatroomContainer;