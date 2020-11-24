import { useEffect, useRef, useState } from "react";
import socketIOClient from "socket.io-client";

const NEW_HELP_MESSAGE_EVENT = "newHelpMessage"; 
const SOCKET_SERVER_URL = "/"
const useHelp = (username) => {
    const [messages, setMessages] = useState([]); // Sent and received messages
    const socketRef = useRef();

    useEffect(() => {

        socketRef.current = socketIOClient(SOCKET_SERVER_URL, {
            query: { roomId: "help" },
        });

        socketRef.current.on(NEW_HELP_MESSAGE_EVENT, (message) => {
            const incomingMessage = {
                ...message,
                ownedByCurrentUser: message.senderId === socketRef.current.id,
                username: message.username
            };
            setMessages((messages) => [...messages, incomingMessage]);
        });

        return () => {
            socketRef.current.disconnect();
        };
    }, []);

    const sendMessage = (messageBody) => {
        socketRef.current.emit(NEW_HELP_MESSAGE_EVENT, {
            body: messageBody,
            senderId: socketRef.current.id,
            username
        });
    };
    
    const deleteMessage = (message) =>{
        let newArray = messages.filter(oldMessage => oldMessage !== message)
        setMessages(newArray)
    }
    return { messages, sendMessage, deleteMessage };
};


export {useHelp}