import React from 'react';
import SavedEvents from './saved_events';

export default class Dashboard extends React.Component{
    constructor(props){
        super(props)
        this.state = { currentTab: 'saved' }
    }

    componentDidUpdate() {
        
    }

    render(){
        return(
            <div className="dashboard">
                <div className="dashboard-logo">
                    <img src="https://image.flaticon.com/icons/svg/262/262866.svg"/>
                    <img src="https://image.flaticon.com/icons/svg/448/448025.svg"/>
                    <img src="https://image.flaticon.com/icons/svg/447/447992.svg"/>
                </div>
                <div className="dashboard-navbar">
                    <div id="upcoming-events">Upcoming Events</div>
                    <div id="saved-events">Saved Events</div>
                    <div id="past-events">Past Events</div>
                </div>
                <div className="dashboard-event-container">
                    <SavedEvents
                        currentUser={this.props.currentUser} />
                </div>
            </div>
        )
    }
}