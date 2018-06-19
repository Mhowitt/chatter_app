import React, { Component } from "react";
import io from "socket.io-client";
import LoginForm from "./LoginForm";
import { USER_CONNECTED, USER_LOGOUT } from "../Events";

const socketUrl = "http://localhost:5000";
class LayoutChatApp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      socket: null,
      user: null
    };
  }

  componentWillMount() {
    this.initSocket();
  }

  initSocket = () => {
    const socket = io(socketUrl);
    socket.on("connect", () => {
      console.log("connected");
    });
    this.setState({ socket });
  };

  setUser = user => {
    const { socket } = this.state;
    socket.emit(USER_CONNECTED, user);
    this.setState({ user });
  };

  logout = () => {
    const { socket } = this.state;
    socket.emit(USER_LOGOUT);
    this.setState({ user: null });
  };

  render() {
    const { title } = this.props;
    const { socket } = this.state;
    return (
      <div>
        <h1>{title}</h1>
        <LoginForm socket={socket} setUser={this.setUser} />
      </div>
    );
  }
}

export default LayoutChatApp;
