import React from 'react';
import SavedEvents from './saved_events';
import { withRouter } from 'react-router-dom';
import autoBind from 'auto-bind';

class Dashboard extends React.Component{
    constructor(props){
        super(props)
        this.state = { currentTab: 'saved' }
        autoBind(this);
    }

    componentDidMount() {
        this.props.fetchEvents();
        this.props.fetchOrders();
        window.scrollTo(0, 0);
    }

    handleTab(currentTab) {
        return event => this.setState({ currentTab })
    }

    showTab() {
        let events;
        switch(this.state.currentTab) {
            case 'saved':
                return events = this.props.events.filter(event => this.props.currentUser.bookmarked_event_ids.indexOf(event.id) > -1) 
            case 'upcoming':
                events = this.props.events.filter(event => Object.keys(this.props.orders).indexOf(String(event.id)) > -1)
                return events.filter(event => new Date(event.end_date) > new Date())
            case 'past':
                events = this.props.events.filter(event => Object.keys(this.props.orders).indexOf(String(event.id)) > -1)
                return events.filter(event => new Date(event.end_date) < new Date())
        }
    }

    render(){
        if (this.props.events.length > 0 && this.props.orders.length > 0) {
            const events = this.showTab();
            return(
                <div className="dashboard">
                    <div className="dashboard-logo">
                        <img src="https://image.flaticon.com/icons/svg/262/262866.svg"/>
                        <img src="https://image.flaticon.com/icons/svg/448/448025.svg"/>
                        <img src="https://image.flaticon.com/icons/svg/447/447992.svg"/>
                    </div>
                    <div className="dashboard-navbar">
                        <div id="upcoming-events" onClick={this.handleTab('upcoming')}>Upcoming Events</div>
                        <div id="saved-events" onClick={this.handleTab('saved')}>Saved Events</div>
                        <div id="past-events" onClick={this.handleTab('past')}>Past Events</div>
                    </div>
                    <div className="dashboard-event-container">
                        <SavedEvents
                            events={events}
                            currentTab={this.state.currentTab}
                            addBookmark={this.props.addBookmark}
                            removeBookmark={this.props.removeBookmark}
                            currentUser={this.props.currentUser} />
                    </div>
                </div>
            )
        }else{
            return(<div>Loading...</div>)
        }
    }
}

export default withRouter(Dashboard);