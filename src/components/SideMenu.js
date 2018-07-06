import React, { Component } from 'react';
import './SideMenu.css'

class SideMenu extends Component {
    render() {
    const { allChats, user, logout, activeChat, setActiveChat } = this.props;
    return (
      <div className="side-menu-container">
        <div className="side-menu-heading">Chatter App</div>
        <div className="search">
          <span className="search-icon"><i className="fas fa-search glass"></i></span>
          <input type="text" className="text-input-box"/>
        </div>
        <div
						className="users"
						ref='users'
						onClick={(e)=>{ (e.target === this.refs.user) && setActiveChat(null) }}>

						{
						allChats.map((chat)=>{
							if(chat.name){
								const lastMessage = chat.messages[chat.messages.length - 1];
								const user = chat.users.find(({name})=>{
									return name !== this.props.name
								}) || { name:"Community" }
								const classNames = (activeChat && activeChat.id === chat.id) ? 'active' : ''
								return(
								<div
									key={chat.id}
									className={`user ${classNames}`}
									onClick={ ()=>{ setActiveChat(chat) } }
									>
									<div className="user-photo">{user.username[0].toUpperCase()}</div>
									<div className="user-info">
										<div className="name">{user.username}</div>
										{lastMessage && <div className="last-message">{lastMessage.message}</div>}
									</div>

								</div>
							)
							}

							return null
						})
						}

					</div>
        <div>
          <div>{user.username}</div>
          <button onClick={() => {logout()}}>Logout!</button>
        </div>
      </div>
    );
  }
}

export default SideMenu;