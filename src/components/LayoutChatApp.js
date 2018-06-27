import React, { Component } from "react";
import LoginForm from "./LoginForm";
import { USER_CONNECTED, USER_LOGOUT } from "../Events";

const socketUrl = "http://localhost:5000";
const io = require("socket.io-client")

class LayoutChatApp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      socket: null,
      user: null
    };
    this.setUser = this.setUser.bind(this);
    this.logout = this.logout.bind(this)
  }

  componentWillMount() {
    const socket = io(socketUrl);
    this.setState({ socket })
    this.initSocket(socket);
  }

  initSocket = (socket) => {
    socket.on("connect", () => {
      console.log("connected");
    });
  };

  setUser = (user) => {
    const { socket } = this.state;
    this.setState({ user });
    socket.emit(USER_CONNECTED, user);
  };

  logout = () => {
    const { socket } = this.state;
    socket.emit(USER_LOGOUT);
    this.setState({ user: null });
  };

  render() {
    const { title } = this.props;
    const { socket, user } = this.state;
    return (
      <div>
        <h1>{title}</h1>
        { !user ?
          <LoginForm socket={socket} setUser={this.setUser} />
        :
          <h1>User is set</h1>
        }
        </div>
    );
  }
}

export default LayoutChatApp;
