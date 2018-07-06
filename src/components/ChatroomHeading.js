import React from 'react';
import './ChatroomHeading.css'

const ChatroomHeading = props => {
  return (
    <div className="heading-container">
    Welcome back {props.user.username}!

    </div>
  )
}

export default ChatroomHeading;