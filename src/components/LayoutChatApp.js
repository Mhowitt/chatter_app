import React, { Component } from "react";
import LoginForm from "./LoginForm";
import ChatroomContainer from "./ChatroomContainer"
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
    const { socket, user } = this.state;
    return (
      <div>
        { !user ?
          <LoginForm socket={socket} setUser={this.setUser} />
        :
          <ChatroomContainer socket={socket} user={user} logout={this.logout} />
        }
        </div>
    );
  }
}

export default LayoutChatApp;
