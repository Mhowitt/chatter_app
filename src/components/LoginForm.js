import React, { Component } from "react";
import "./LoginForm.css"
import { VERIFY_USERNAME } from "../Events";

const loginInput = {
  borderTop: 'none',
  borderRight: 'none',
  borderLeft: 'none',
  width: '75%',
  height: '40px',
}

class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      error: ""
    };
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.setUser= this.setUser.bind(this)
  }

  componentDidMount() {
    this.focus();
  }

  setUser = (response) => {
    if (response.isUser) {
      this.setError("Username taken");
    } else {
      this.props.setUser(response.user);
      this.setError("")
    }
  };

  setError = (error) => {
    this.setState({ error });
  };

  handleSubmit = (e) => {
    e.preventDefault();

    const { socket } = this.props;
    const { username } = this.state;
    socket.emit(VERIFY_USERNAME, username, this.setUser);
    // this.setState({username: ""})
  };

    handleChange = e => {
    e.preventDefault();
    this.setState({ [e.target.name]: e.target.value });
  };

  focus(){
		this.textInput.focus()
  }

  render() {
    const { username, error } = this.state;

    return (
      <div className="card-container">
        <div className="login">
          <form onSubmit={this.handleSubmit}>
            <label htmlFor="username">
              <h2>Got a name?</h2>
            </label>
            <div className="login_field">
              <input
                type="text"
                ref={(input)=>{ this.textInput = input }}
                style={loginInput}
                name="username"
                id="username"
                value={username}
                onChange={this.handleChange}
                placeholder="My Sweeeeeet Username"
              />
              <button type="submit" className="login_button">Chatter Away</button>
            </div>
            <div className="error">{error ? error : ""}</div>
          </form>
        </div>
      </div>
    );
  }
}

export default LoginForm;
