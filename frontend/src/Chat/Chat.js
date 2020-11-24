import React, {useEffect, useState} from 'react'
import {useChat} from '../actions/socketFunctions'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
function Chat(props){
    if (!props.loggedIn){
        props.history.push("/")
    }
    
    const {roomId} = props
    const { messages, sendMessage, stageTime, changeStageTime } = useChat(roomId)
    const [newMessage, setNewMessage] = useState("")
    const [time, setTime] = useState(0)
    const [newTime, setNewTime]= useState("")
    const handleSendMessage = ()=>{
        sendMessage(props.username + ": " + newMessage)
        setNewMessage("")

    }

    const handleTimeChange = () =>{
       changeStageTime(parseInt(newTime))
    }

    const myMessage = (message) =>{
        return message.owner === props.username
    }

    const displayMessages = () => {
        return messages.map((message, idx) => {
            console.log("message", props)
        return <li key={idx} className={ myMessage(message) ? "sent" : "received"}>{message.body}</li>
} )   }
    useEffect(() => {
        let timer = setInterval(() => {
            setTime(time => (time + 1));
            
        }, 1000);

    return () => clearInterval(timer);
    },[time])

    useEffect(()=>{
        return setTime(parseInt(stageTime))
    },[stageTime])
    return(
        <div>
            <h2>Room {roomId} time {time}</h2>
            
            <div>
                {displayMessages()}
            </div>
            
            <textarea
                value={newMessage}
                onChange={(e)=> setNewMessage(e.target.value)}
                placeholder="Your Message..."
            />
            <button onClick={handleSendMessage}>Send Message</button>

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