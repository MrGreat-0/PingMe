import { io } from "socket.io-client";

let socket = null;

export const initSocket = (BASE_URL, userId) => {
    if (socket && socket.connected) return socket; // avoid duplicate connections

    socket = io(BASE_URL, {
        query: { userId },
        reconnectionAttempts: 3,
        timeout: 5000,
    });

    return socket;
};

export const getSocket = () => socket;

export const disconnectSocket = () => {
    if (socket?.connected) {
        socket.removeAllListeners();
        socket.disconnect();
        socket = null;
    }
};
