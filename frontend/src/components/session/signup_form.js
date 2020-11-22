import React, {useState, useEffect} from 'react';
import { withRouter } from 'react-router-dom';
import * as APIUtil from '../../util/session_api_util'
import UserInfo from './UserInfo'
function SignupForm(props){
    const [ticketId, setTicketId] = useState("")
    const [errors, setErrors] = useState({})
    const [ticketFound, setTicketFound] = useState(false)
    const [tempUserInfo, setTempUserInfo] = useState({})

if( props.signedIn === true) {
    props.history.push('/login')
}

    const handleSubmit = (e) => {
        e.preventDefault();
        let ticket = {
            ticketId: e.target.ticketId.value
        };
        signup(ticket);
        
    }
    const signup = ticketId => {

        APIUtil.signup(ticketId).then((e) => {
            if (e.data.error) {
                setErrors({errors: e.data.error})
                console.log(e.data.error)
            } else {
                setErrors({})
                setTempUserInfo(e.data.user)
                setTicketFound(true)
            }
        }
        )
            .catch(err => setErrors(err.response.data)
            )
    }
    const renderErrors = () => {
        return (
            <ul>
                {errors ?
                    <>
                {Object.keys(errors).map((error, i) => (
                    <li key={`error-${i}`}>
                        {errors[error]}
                    </li>
                ))}
                </>
                :
                null}
            </ul>
        );
    }

        return (
            <div className="signup-form-container">
                        {ticketFound ?
                            <UserInfo info={tempUserInfo} /> 
                            :
                <form onSubmit={handleSubmit}>
                    <div className="signup-form">
                        <br />
                        <input type="text"
                            value={ticketId}
                            name="ticketId"
                            onChange={(e) => setTicketId(e.target.value)}
                            placeholder="Ticket Id"
                        />
                        <input type="submit" value="Submit" />
                        {renderErrors()}
                        
                    </div>
                </form>
                        }
            </div>
        );
    }


export default withRouter(SignupForm);