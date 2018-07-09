import React, { Component } from 'react';

class MessageTextBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isTyping: false,
      message: ""
     };
     this.handleChange = this.handleChange.bind(this)
     this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentWillUnmount() {
	  this.stopCheckingTyping()
	}

  handleSubmit = (e) => {
		e.preventDefault()
		this.sendMessage()
		this.setState({ message: "" })
  }

  handleChange = e => {
    e.preventDefault();
    this.setState({ [e.target.name]: e.target.value });
  };

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
      <div>
        <form onSumbit={this.handleSubmit}>
          <input name="message"
            onChange={this.handleChange}
            onKeyUp={(e) => {e.keyCode !== 13 && this.sendTyping() }}
            value={message}
            type="text"
            placeholder="Write a message here!"
            />
          <button disabled={message.length < 1} type="submit">Send</button>
        </form>
      </div>
    );
  }
}

export default MessageTextBox;