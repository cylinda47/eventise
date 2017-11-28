import React from 'react';
import { Link } from 'react-router-dom';

export default class EventIndexItem extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { events } = this.props;
        const dateOptions = { weekday: 'short', month: 'short', day: 'numeric' };
        const timeOptions = { hour: 'numeric', minute: 'numeric' }
        return (
            <div className="event-index-items">
                {events.map(event =>
                    <Link to={`/events/${event.id}`} key={event.id}>
                    <div className="event-index-item-detail">
                        <div className="item-thumbnail"
                            style={{ backgroundImage: `url(${event.image_url})` }}
                                >
                        </div>
                        <img src="" />
                        <ul>
                            <li className="event-index-item-date">
                                {new Date(event.start_date).toLocaleString('en-US', dateOptions)} | {new Date(event.start_time).toLocaleString('en-US', timeOptions)}
                            </li>
                            <li className="event-index-item-title"><div>{event.title}</div></li>
                            <li className="event-index-item-location">
                                <div>{event.is_online_event ? "Online event" : event.address[0]}</div>
                            </li>
                            <li className="event-index-item-options">
                                <div><i className="fa fa-bookmark-o" aria-hidden="true"></i></div>
                            </li>
                        </ul>
                    </div>
                    </Link>
                )}
            </div>
        )
    }
}