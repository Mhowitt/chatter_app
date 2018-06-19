import React, { Component } from "react";
import { VERIFY_USER } from "../Events";

class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      error: ""
    };
  }

  setUser = (user, isUser) => {
    if (isUser) {
      this.setError("Username taken");
    } else {
      this.props.setUser(user);
    }
  };

  setError = error => {
    this.setState({ error });
  };

  handleSubmit = e => {
    e.preventDefault();

    const { socket } = this.props;
    const { username } = this.state;
    socket.emit(VERIFY_USER, username, this.setUser);
  };

  handleChange = e => {
    e.preventDefault();
    this.setState({ [e.target.name]: e.target.value });
  };
  render() {
    const { username, error } = this.state;
    return (
      <div className="login">
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="username">
            <h2>Got a name?</h2>
          </label>
          <input
            type="text"
            name="username"
            id="username"
            value={username}
            onChange={this.handleChange}
            placeholder="My Sweeeeeet Username"
          />
          <div className="error">{error ? error : null}</div>
        </form>
      </div>
    );
  }
}

export default LoginForm;
