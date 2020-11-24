import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux'
import { useHelp } from '../actions/helpFunctions'
import HelpItem from './HelpItem'
function HelpDesk(props) {


    const { messages, sendMessage, deleteMessage} = useHelp()

    const displayMessages = () => {
        return messages.map((message, idx) => {
            return (
                <>
                    <HelpItem message={message} key={idx} deleteMessage={deleteMessage}/>
            </>)
        })
    }

    return (

            <div>
                <h2>Help Queue</h2>
                {displayMessages()}
            </div>


    )

}
const mapStatetoProps = state => {
    if (state.api.user) {
        return { username: state.api.user.username, loggedIn: state.api.isAuthenticated }
    }
    else {
        return { username: localStorage.getItem("username"), loggedIn: true }
    }
}


export default connect(mapStatetoProps)(HelpDesk);