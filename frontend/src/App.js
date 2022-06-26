import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Auth from "./components/Auth/Auth";
import Room from "./components/Room/Room";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chatHistory: []
    }
  }
  render() {
    return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Auth />} />
          <Route path="/room" element={<Room chatHistory={this.state.chatHistory} />} />
        </Routes>
      </BrowserRouter>
    );
  }
}

export default App;
