import React from 'react';
import { withRouter } from 'react-router-dom'


class NavBar extends React.Component {
    constructor(props) {
        super(props);
        this.logoutUser = this.logoutUser.bind(this);
        this.getLinks = this.getLinks.bind(this);
    }

    logoutUser(e) {
        e.preventDefault();
        this.props.logout();
    }
    
    // Selectively render links dependent on whether the user is logged in
    getLinks() {
        if (this.props.loggedIn) {
            return (
                <div>
                    <button onClick={this.logoutUser}>Logout</button>
                </div>
            );
        } else {
            return null
        }
    }

    render() {
        return (
            <div>
                <h1>Rio Test</h1>
                { this.getLinks()}
            </div>
        );
    }
}

export default withRouter(NavBar);