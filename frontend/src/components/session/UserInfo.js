import React, {useState} from 'react';

function UserInfo(props){
    let user = props.info
    let randomName = props.info.name + " "+ props.info.ticketId.slice(-4)
    let [username, setUsername] = useState(randomName)

    const handleChange = (e) =>{
        setUsername(e.target.value)
    }
    
    const handleSubmit = (e) =>{
        e.preventDefault()
        console.log(e.target)
    }
        return (
            <form onSubmit={handleSubmit}>
                <input type="hidden" value={user.ticketId} />
                <input type="text" value= {username} onChange={handleChange}/>
                <input type="submit" value="Join the Fun!" />
            </form>
                
        );
    
}

export default UserInfo;

