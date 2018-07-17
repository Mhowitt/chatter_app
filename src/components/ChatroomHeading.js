import React from 'react';
import './ChatroomHeading.css'

const ChatroomHeading = props => {
  return (
    <div className="heading-container">
      {props.user.username}!
      <button onClick={() => {props.logout()}}>Logout!</button>
    </div>
  )
}

export default ChatroomHeading;