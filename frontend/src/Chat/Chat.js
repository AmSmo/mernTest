import React, {useEffect, useState, useRef} from 'react'
import {useChat} from '../actions/socketFunctions'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import {SendMessageButton, MessageLine, MessageContainer} from '../styles/styles'
function Chat(props){
    if (!props.loggedIn){
        props.history.push("/")
    }
    
    const {roomId} = props
    const { messages, sendMessage, stageTime, changeStageTime } = useChat(roomId, props.username)
    const [newMessage, setNewMessage] = useState("")
    const [time, setTime] = useState(0)
    const [newTime, setNewTime]= useState("")
    const handleSendMessage = ()=>{
        sendMessage(props.username + ": " + newMessage)
        setNewMessage("")

    }

    const messagesEndRef = useRef(null)

    const scrollToBottom = () => {
        messagesEndRef.current.scrollIntoView({ behavior: "smooth" })
    }

    useEffect(scrollToBottom, [messages]);
    const handleTimeChange = () =>{
       changeStageTime(parseInt(newTime))
    }

    const myMessage = (message) =>{
        return message.owner === props.username
    }

    const displayMessages = () => {
        return messages.map((message, idx) => {
            
        return <MessageLine key={idx} className={ myMessage(message) ? "sent" : "received"}>{message.body}</MessageLine>
} )   }
    // useEffect(() => {
    //     let timer = setInterval(() => {
    //         setTime(time => (time + 1));
            
    //     }, 1000);

    // return () => clearInterval(timer);
    // },[time])

    // useEffect(()=>{
    //     return setTime(parseInt(stageTime))
    // },[stageTime])
    return(
        <div>
            {props.help ? 
            null:
            <h2>Room {roomId} time {time}</h2>
            }
            <MessageContainer>
                mooo
                {displayMessages()}
                <div ref={messagesEndRef} />
            </MessageContainer>
            
            <textarea
                value={newMessage}
                onChange={(e)=> setNewMessage(e.target.value)}
                placeholder="Your Message..."
            /><br></br>
            <SendMessageButton onClick={handleSendMessage}>Send Message</SendMessageButton>

            {props.control ? 
            <>
                <input type="text" value={newTime} onChange={(e)=> setNewTime(e.target.value)} />
                <button onClick={handleTimeChange}>ChangeTime</button>
            </>
            :
            null}
        </div>
        
    )   

    }
const mapStatetoProps = state => {
    if(state.api.user){
        return {username: state.api.user.username, loggedIn: state.api.isAuthenticated}}
    else{
        return {username: localStorage.getItem("username"), loggedIn: true}
    }
}

export default withRouter(connect(mapStatetoProps)(Chat))