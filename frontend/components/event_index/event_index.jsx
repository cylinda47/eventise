import React from 'react';
import EventIndexItem from './event_index_item';
import SearchBackground from './search_background';
import { withRouter } from 'react-router-dom';

class EventIndex extends React.Component {
    constructor(props){
        super(props);
    }

    componentDidMount() {
        this.props.fetchEvents();
    }

    render(){
        return(
            <div className="event-index">
                <SearchBackground />
                <EventIndexItem
                    currentUser={this.props.currentUser}
                    removeBookmark={this.props.removeBookmark}
                    addBookmark={this.props.addBookmark}
                    events={this.props.events}
                    fetchEvents={this.props.fetchEvents}
                />
            </div>
        )
    }
}

export default withRouter(EventIndex);