import React, { Component } from 'react';
import SideMenu from './SideMenu'


class ChatroomContainer extends Component {
  constructor(props) {
      super(props);
      this.state = {
        allChats: [],
        activeChat:''
      };
      this.setActiveChat = this.setActiveChat.bind(this)
  }
  setActiveChat = (chat) => {

  }
  render() {
    const { user, socket, logout } = this.props
      return (
        <div>
          <SideMenu
            logout={logout}
            user={user}
            allChats={allChats}
            activeChat={activeChat}
            setActiveChat={this.setActiveChat}
          />
          <h2>You're in a chatroom!</h2>
        </div>
      );
  }
}

export default ChatroomContainer;