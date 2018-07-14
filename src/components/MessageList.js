import React, { Component } from 'react';
import './MessageList.css'

const MessageList = props => {
    const { user, messages, typingUsers } = props;
    return (
        <div
          className="message_list_container">
          <div className="messages">
            {
              messages.map((mes)=>{
                return (
                  <div
                    key={mes.id}
                    className={`message-container ${mes.sender === user.username ? 'my_message' : 'other_message'}`}
                  >
                    <div className="time">{mes.time}</div>
                    <div className="data">
                      <div className="message_content">{mes.message}</div>
                      <div className="name">{mes.sender}</div>
                    </div>
                  </div>

                  )
              })
            }
            {
              typingUsers.map((name)=>{
                return (
                  <div key={name} className="typing-user">
                    {`${name} is typing . . .`}
                  </div>
                )
              })
            }
          </div>


        </div>
    );
}

export default MessageList;