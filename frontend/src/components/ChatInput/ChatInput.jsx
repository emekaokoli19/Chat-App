import React, { Component } from "react";
import { sendMsg, getSocket } from "../../api";
import "./ChatInput.scss";

class ChatInput extends Component {
    send = (event) => {
        if(event.keyCode === 13) {
            let currSocket = getSocket()
            sendMsg(currSocket, this.props.username, event.target.value);
            event.target.value = "";
        }
    }

    render() {
        return (
            <div className="ChatInput">
                <input onKeyDown={this.send} placeholder="Type a message. Hit enter to send..."/>
            </div>
        );
    }
}

export default ChatInput;
