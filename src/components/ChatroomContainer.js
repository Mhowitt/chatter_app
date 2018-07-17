import React, { Component } from 'react';
import SideMenu from './SideMenu'
import ChatroomHeading from './ChatroomHeading'
// import MessagesContainer from './MessagesContainer'
import { MESSAGE_SENT, TYPING, COMMUNITY_CHAT, MESSAGE_RECEIVED } from "../Events";
import ChatHeading from './ChatHeading'
import MessageList from './MessageList'
import MessageTextBox from './MessageTextBox'
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
  componentDidMount() {
    const { socket } = this.props;
    socket.emit(COMMUNITY_CHAT, this.resetChat)
  }

  resetChat = (chat) => {
    return this.addChat(chat, true);
  }

  addChat = (newChat, reset) => {
    const { socket } = this.props;
    const {allChats, activeChat } = this.state;

    const chatAdded = reset ? [newChat] : [...allChats, newChat]
    const updatedActiveChat = reset ? newChat : activeChat;
    this.setState({allChats: chatAdded, activeChat: updatedActiveChat})

    const newMessageAction = `${MESSAGE_RECEIVED}-${newChat.id}`
    const typingAction = `${TYPING}-${newChat.id}`

    socket.on(newMessageAction, this.addMessageToChat(newChat.id))
    socket.on(typingAction, this.updateTypingAction(newChat.id))

  }

  addMessageToChat = (chatId) => {
    return message => {
			const { allChats } = this.state
			let newChats = allChats.map((chat)=>{
				if(chat.id === chatId)
					chat.messages.push(message)
				return chat
			})

			this.setState({allChats:newChats})
		}
  }

  updateTypingAction = (chatId) => {
    return ( {isTyping, user} ) => {
			if(user !== this.props.user.username){
				const { allChats } = this.state

				let newChats = allChats.map((chat)=>{
					if(chat.id === chatId){
						if(isTyping && !chat.typingUsers.includes(user)){
							chat.typingUsers.push(user)
						}else if(!isTyping && chat.typingUsers.includes(user)){
							chat.typingUsers = chat.typingUsers.filter(u => u !== user)
						}
					}
					return chat
				})
				this.setState({allChats:newChats})
			}
		}
  }

  sendMessage = (chatId, message) => {
    const { socket } = this.props
    let messageObj = {
      chatId: chatId,
      message: message,
      sender: this.props.user.username
    }
    console.log(messageObj.chatId + ' ' + messageObj.message + ' ' + messageObj.sender)
    socket.emit(MESSAGE_SENT, messageObj)
    this.setState({})
  }

  sendTyping = (chatId, isTyping) => {
    const { socket } = this.props
    socket.emit(TYPING, { chatId, isTyping })
  }


  setActiveChat = (activeChat) => {
    this.setState({activeChat})
  }

  render() {
    const { user, logout, socket } = this.props
    const { activeChat, allChats } = this.state
      return (
        <div className="container">
          <div className="main-container">
            <ChatroomHeading
            user={user}
            logout={logout}
            />
            <SideMenu
              logout={logout}
              allChats={allChats}
              user={user}
              activeChat={activeChat}
              setActiveChat={(activeChat) => this.setActiveChat(activeChat)}
            />
          </div>
          <div className="messages-container">
          { activeChat !== null ?
            <div>
              <ChatHeading activeChat={activeChat.name}/>
              <MessageList messages={activeChat.messages} user={user} typingUsers={activeChat.typingUsers} />
              <MessageTextBox
                activeChat={activeChat}
                sendMessage={(message) => { this.sendMessage(activeChat.id, message)} }
                sendTyping= {(isTyping) => { this.sendTyping(activeChat.id, isTyping) }}/>
            </div>
           :
          <div>
            <h2>Welcome {user.username}!</h2>
            <button>Strike up a conversation!</button>
          </div>
          }
          </div>
        </div>
      );
  }
}

export default ChatroomContainer;