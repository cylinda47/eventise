import React from 'react';
import { Link } from 'react-router-dom';
import SessionForm from '../session/session_form';

export default class NavBar extends React.Component {
    constructor(props){
        super(props);
    }

    addSessionModal(event){
        event.target.addClass("launch-form");
    }

    render(){
        const { currentUser, login, signup } = this.props;
        return(
            <div className="nav-bar">
                <nav className="nav-logo">
                    <Link to="/">Eventize</Link>
                </nav>
                <nav className="nav-search-bar">

                </nav>
                <div className="nav-items">
                    <nav className="nav-item"><Link to="">Browse Events</Link></nav>
                    <nav className="nav-item-blue"><Link to="">Create Event</Link></nav>
                    {   currentUser ?
                        <nav className="nav-item-login" onClick={this.addSessionModal}>Sign In</nav>
                        // "DEMO LOGIN"
                        :
                        <nav className="nav-item-user">{currentUser.firstname}</nav>
                    }
                </div>
                <SessionForm currentUser={currentUser} signup={signup} login={login}/>
            </div>
        )
    }
}