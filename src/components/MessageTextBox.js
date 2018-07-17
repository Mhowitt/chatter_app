import React, { Component } from 'react';
import './MessageTextBox.css'

class MessageTextBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isTyping: false,
      message: ""
     };
     this.handleSubmit = this.handleSubmit.bind(this)
     this.handleChange = this.handleChange.bind(this)
  }

  handleSubmit = e => {
    e.preventDefault()
    let message = this.state.message;
		this.props.sendMessage(message)
		this.setState({ message: "" })
  }

  handleChange = e => {
    e.preventDefault();
    this.setState({ [e.target.name]: e.target.value });
  };

    componentWillUnmount() {
	  this.stopCheckingTyping()
	}

  sendTyping = () => {
    this.lastUpdateTime = Date.now()
		if(!this.state.isTyping){
			this.setState({ isTyping: true })
			this.props.sendTyping(true)
			this.startCheckingTyping()
		}
  }

  startCheckingTyping = () => {
    console.log("Typing");
		this.typingInterval = setInterval(() => {
			if((Date.now() - this.lastUpdateTime) > 300){
				this.setState( {isTyping:false} )
				this.stopCheckingTyping()
			}
		}, 300)
  }

  stopCheckingTyping = () => {
		console.log("Stop Typing");
		if(this.typingInterval){
			clearInterval(this.typingInterval)
			this.props.sendTyping(false)
		}
  }



  render() {
    const { isTyping, message } = this.state
    return (
      <div className="message__input__container">
        <form onSubmit={this.handleSubmit} className="message__form">
          <input name="message"
            onChange={this.handleChange}
            onKeyUp={(e) => {e.keyCode !== 13 && this.sendTyping() }}
            value={message}
            type="text"
            placeholder="Write a message here!"
            className="message__input"
            />
          <button disabled={message.length < 1} type="submit" className="login_button">Send</button>
        </form>
      </div>
    );
  }
}

export default MessageTextBox;