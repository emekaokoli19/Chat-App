var socket = new WebSocket("ws://localhost:8080/ws");

console.log("socket map: ", socket)

const getSocket = () => {
    return socket
}

let connect = (socket, cb) => {
    console.log("Attempting connection...");
    console.log("socket is:.... ", socket)

    socket.onopen = () => {
        console.log("Successfully Connected");
    };

    socket.onmessage = msg => {
        console.log("on_message: ", msg)
        cb(msg)
    };

    socket.onclose = event => {
        console.log("Socket Closed Connection: ", event);
    };

    socket.onerror = error => {
        console.log("Socket Error: ", error);
    };
};

let sendMsg = (socket, username, msg) => {
    console.log("send_mg: ", username, msg);
    socket.send(username + ": " + msg);
}

export {
    connect,
    sendMsg,
    getSocket,
};
