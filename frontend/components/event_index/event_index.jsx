import React from 'react';
import EventIndexItem from './event_index_item';

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
                <EventIndexItem
                    events={this.props.events}
                    fetchEvents={this.props.fetchEvents}
                />
            </div>
        )
    }
}

export default EventIndex;