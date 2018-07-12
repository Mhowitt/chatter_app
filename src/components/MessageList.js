import React, { Component } from 'react';

const MessageList = props => {
    const { user, messages, typingUsers } = props;
    return (
        <div
          className="thread-container">
          <div className="thread">
            {
              messages.map((mes)=>{
                return (
                  <div
                    key={mes.id}
                    className={`message-container ${mes.sender === user.username && 'right'}`}
                  >
                    <div className="time">{mes.time}</div>
                    <div className="data">
                      <div className="message">{mes.message}</div>
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