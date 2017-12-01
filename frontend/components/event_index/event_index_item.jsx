import React from 'react';
import { Link } from 'react-router-dom';

export default class EventIndexItem extends React.Component {
    constructor(props) {
        super(props);
        this.add = this.add.bind(this);
        this.remove = this.remove.bind(this);
    }

    add(eventId) {
        return e => this.props.addBookmark({ event_id: eventId, user_id: this.props.currentUser.id })
    }

    remove(eventId) {
        return e => this.props.removeBookmark(eventId);
    }

    render() {
        const { events, currentUser } = this.props;
        const dateOptions = { weekday: 'short', month: 'short', day: 'numeric' };
        const timeOptions = { hour: 'numeric', minute: 'numeric' }
        return (
            <div className="event-index-items">
                {events.map(event =>
                    <div className="event-index-item-detail" key={event.id}>
                    <Link to={`/events/${event.id}`} key={event.id}>
                        <div className="item-thumbnail"
                            style={{ backgroundImage: `url(${event.image_url})` }}
                                >
                        </div>
                    </Link>
                        <ul>
                            <Link to={`/events/${event.id}`} key={event.id}>
                            <li className="event-index-item-date">
                                {new Date(event.start_date).toLocaleString('en-US', dateOptions)} | {new Date(event.start_time).toLocaleString('en-US', timeOptions)}
                            </li>
                            <li className="event-index-item-title"><div>{event.title}</div></li>
                            <li className="event-index-item-location">
                                <div>{event.is_online_event ? "Online event" : event.address[0]}</div>
                            </li>
                            </Link>
                            <li className="event-index-item-options">
                                <div>
                                    {event.category_names.filter(el => el.length > 0).map((name, idx) => 
                                        <Link key={idx} to={`/categories/${name}`}>#{name.replace("_", "&")}</Link>
                                    )}
                                </div>
                                 <div>
                                    {!currentUser || currentUser.bookmarked_event_ids.indexOf(event.id) < 0 ?
                                        <i className="fa fa-bookmark-o" onClick={this.add(event.id)} aria-hidden="true"></i> :
                                        <i className="fa fa-bookmark" onClick={this.remove(event.id)} aria-hidden="true"></i>
                                    }
                                </div>
                            </li>
                        </ul>
                    </div>
                   
                )}
            </div>
        )
    }
}