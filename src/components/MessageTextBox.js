import React, { Component } from 'react';

class MessageTextBox extends Component {
  constructor(props) {
    super(props);
    this.state = {  };
  }
  render() {
    return (
      <div>
        <input type="text" placeholder="Write a message here!"/>
      </div>
    );
  }
}

export default MessageTextBox;