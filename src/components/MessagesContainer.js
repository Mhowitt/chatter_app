import React, { Component } from 'react';
import './MessagesContainer.css'
import ChatHeading from './ChatHeading'
import MessageList from './MessageList'
import MessageTextBox from './MessageTextBox'
import { MESSAGE_SENT, TYPING, COMMUNITY_CHAT, MESSAGE_RECEIVED } from "../Events";

class MessagesContainer extends Component {
  // constructor(props) {
  //   super(props);
  //   this.state = {  };
  // }

  // componentDidMount() {
  //   const { socket } = this.props;
  //   socket.emit(COMMUNITY_CHAT, this.resetChat)
  // }

  // resetChat = (chat) => {
  //   return this.addChat(chat, true);
  // }

  // addChat = (newChat, reset) => {
  //   const { socket, allChats, activeChat } = this.props;

  //   const chatAdded = reset ? [newChat] : [...allChats, newChat]
  //   const updatedActiveChat = reset ? newChat : activeChat;
  //   this.setState({allChats: chatAdded, activeChat: updatedActiveChat})

  //   const newMessageAction = `${MESSAGE_RECEIVED}-${newChat.id}`
  //   const typingAction = `${TYPING}-${newChat.id}`

  //   socket.on(newMessageAction, this.addMessageToChat(newChat.id))
  //   socket.on(typingAction, this.updateTypingAction(newChat.id))

  // }

  // addMessageToChat = (chatId) => {
  //   return message => {
	// 		const { allChats } = this.props
	// 		let newChats = allChats.map((chat)=>{
	// 			if(chat.id === chatId)
	// 				chat.messages.push(message)
	// 			return chat
	// 		})

	// 		this.setState({allChats:newChats})
	// 	}
  // }

  // updateTypingAction = (chatId) => {
  //   return ( {isTyping, user} ) => {
	// 		if(user !== this.props.user.username){
	// 			const { allChats } = this.props

	// 			let newChats = allChats.map((chat)=>{
	// 				if(chat.id === chatId){
	// 					if(isTyping && !chat.typingUsers.includes(user)){
	// 						chat.typingUsers.push(user)
	// 					}else if(!isTyping && chat.typingUsers.includes(user)){
	// 						chat.typingUsers = chat.typingUsers.filter(u => u !== user)
	// 					}
	// 				}
	// 				return chat
	// 			})
	// 			this.setState({allChats:newChats})
	// 		}
	// 	}
  // }

  // sendMessage = (chatId, message) => {
  //   const { socket } = this.props
  //   socket.emit(MESSAGE_SENT, { chatId, message })
  // }

  // sendTyping = (chatId, isTyping) => {
  //   const { socket } = this.props
  //   socket.emit(TYPING, { chatId, isTyping })
  // }

  render() {
    const { activeChat, user } = this.props
    return (
      <div className="messages-container">
        Message Container
        {/* { activeChat !== null ? */}
          <div>Here's you active Chatroom
            <ChatHeading activeChat={activeChat.name}/>
            <MessageList messages={activeChat.messages} user={user} typingUsers={activeChat.typingUser} />
            <MessageTextBox
              sendMessage={ (message) => { this.sendMessage(activeChat.id, message) }}
               sendTyping= {(isTyping) => { this.isTyping(activeChat.id, isTyping) }}/>
          </div>
        {/* :
        <div>
          <h2>Welcome {user.username}!</h2>
          <button>Strike up a conversation!</button>
        </div>
        } */}
      </div>
    );
  }
}

export default MessagesContainer;