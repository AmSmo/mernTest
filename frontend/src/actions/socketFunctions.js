import { useEffect, useRef, useState } from "react";
import socketIOClient from "socket.io-client";

const NEW_CHAT_MESSAGE_EVENT = "newChatMessage"; // Name of the event
// const SOCKET_SERVER_URL = "http://localhost:3001";
const SOCKET_SERVER_URL = "ws://warm-plains-05189.herokuapp.com:19605/socket.io/?EIO=4&transport=websocket";

const useChat = (roomId) => {
    const [messages, setMessages] = useState([]); // Sent and received messages
    const [stageTime, setStageTime] = useState("22")
    const socketRef = useRef();
    
    useEffect(() => {

        socketRef.current = socketIOClient(SOCKET_SERVER_URL, {
            query: { roomId },
        });

        socketRef.current.on(NEW_CHAT_MESSAGE_EVENT, (message) => {
            const incomingMessage = {
                ...message,
                ownedByCurrentUser: message.senderId === socketRef.current.id,
            };
            setMessages((messages) => [...messages, incomingMessage]);
        });

        socketRef.current.on("changeTime", (time) => {
            setStageTime(time.body)
        })

        return () => {
            socketRef.current.disconnect();
        };
    }, [roomId]);

    // Sends a message to the server that
    // forwards it to all users in the same room
    const sendMessage = (messageBody) => {
        socketRef.current.emit(NEW_CHAT_MESSAGE_EVENT, {
            body: messageBody,
            senderId: socketRef.current.id,
        });
    };

    const changeStageTime = (time) => {
        socketRef.current.emit("changeTime",{
            body: time
        })
    }

 

    return { messages, sendMessage, stageTime, changeStageTime };
};



export {useChat};