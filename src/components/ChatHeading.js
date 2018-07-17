import React, { Component } from 'react';
import './ChatHeading.css'

const ChatHeading = ({activeChat, name, numberOfUsers}) => {
  return (
    <div className="chat-header">
      <div className="user-info">
        <div className="user-name"><i class="fas fa-users"></i> {activeChat}</div>
        <div className="status">
          <div className="indicator"></div>
          <span>{numberOfUsers ? numberOfUsers : null}</span>
        </div>
      </div>
    {/* <div className="options">
      <button>Add User</button>
    </div> */}
  </div>
  );
}

export default ChatHeading;