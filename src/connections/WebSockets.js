const connectWebSocket = (lineaId, callback) => {
    const socket = new WebSocket("ws://localhost:8080");

    socket.onopen = () => {
        console.log("Conexión WebSocket establecida");
        socket.send(JSON.stringify({id: lineaId}));
    };

    socket.onmessage = (event) => {
        const data = JSON.parse(event.data);
        callback(data);
    };

    socket.onerror = (error) => {
        console.error("Error en WebSocket: ", error);
    };

    socket.onclose = () => {
        console.log("Conexión WebSocket cerrada");
    };
};

export default connectWebSocket;