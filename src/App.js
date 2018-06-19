import React, { Component } from "react";
import LayoutChatApp from "./components/LayoutChatApp";
import "./index.css";

class App extends Component {
  render() {
    return (
      <div className="App">
        <LayoutChatApp title="Chat App" />
      </div>
    );
  }
}

export default App;
