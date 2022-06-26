import React, { useState } from "react";
import { sendMsg, getSocket } from "../../api";
import { useNavigate } from "react-router-dom";

const Auth = (props) => {
  let navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");
  let currSocket = getSocket()

  return (
    <div className="Auth-form-container">
      <form className="Auth-form">
        <div className="Auth-form-content">
          <h3 className="Auth-form-title">Log In</h3>
          <div className="form-group mt-3">
            <label>Username</label>
            <input
              type="text"
              className="form-control mt-1"
              onChange={event => setUsername(event.target.value)}
              placeholder="Enter your username"
            />
          </div>
          <div className="form-group mt-3">
            <label>Password</label>
            <input
              type="password"
              className="form-control mt-1"
              placeholder="Enter your password"
            />
          </div>
          <div className="form-group mt-3">
            <label>Room</label>
            <input
              type="text"
              className="form-control mt-1"
              onChange={event => setRoom(event.target.value)}
              placeholder="Enter room choice"
            />
          </div>
          <div className="d-grid gap-2 mt-3">
            <button
              type="submit"
              className="btn btn-primary"
              onClick={() => {
                currSocket.send(room)
                navigate(
                  "/room",
                  {
                    state: {
                      username: username,
                      room: room,
                    }
                  }
                )
              }}
            >
              Join
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Auth;