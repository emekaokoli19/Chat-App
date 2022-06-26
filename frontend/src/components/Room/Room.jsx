import React from "react";
import ChatHistory from "../ChatHistory/ChatHistory";
import ChatInput from "../ChatInput/ChatInput";
import { connect, getSocket } from "../../api";
import { useState } from "react";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const Room = function() {
    const [chatHistory, setChatHistory] = useState([]);
    const { state } = useLocation();

    useEffect(() => {
        const { room } = state;

        let currSocket = getSocket();
        if (currSocket === undefined) {
            console.log("SOCKET IS INVALID!")
            return
        }

        console.log("current socket is: ", currSocket);

        connect(currSocket, (msg) => {
            setChatHistory([...chatHistory, msg])
            console.log("========= chatHistory: ", chatHistory)
        })
    }, [chatHistory])

    return (
        <div className="Room">
          <ChatHistory chatHistory={chatHistory} />
          <ChatInput username={state.username} room={state.room} />
        </div>
    )
}

export default Room;