import React, {useEffect, useState} from 'react'
import openSocket from 'socket.io-client';
function Chat(props){

    const socket = openSocket('http://localhost:3001')
useEffect(() => {
socket.on("hello", (arg) => {
    console.log(arg); // world

});},[])

return(
    <div>CHAT!!!!</div>
)

}

export default Chat