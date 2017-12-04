import React from 'react';
import autoBind from 'auto-bind';
import { withRouter, Link } from 'react-router-dom';

class EventIndexItem extends React.Component {
    constructor(props) {
        super(props);
        autoBind(this);
    }

    add(eventId) {
        return e => this.props.addBookmark({ event_id: eventId, user_id: this.props.currentUser.id })
    }

    remove(eventId) {
        return e => this.props.removeBookmark(eventId);
    }

    dateFormat(datetime, option) {
        const date = new Date(datetime);
        const utc = new Date(date.getTime() + date.getTimezoneOffset() * 60000);
        return utc.toLocaleString('en-US', option);
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
                            style={{ backgroundImage: `url(${event.image_url.replace('http', 'https')})` }}
                                >
                        </div>
                    </Link>
                        <ul>
                            <Link to={`/events/${event.id}`} key={event.id}>
                            <li className="event-index-item-date">
                                <i className="fa fa-clock-o" aria-hidden="true"></i>
                                    {this.dateFormat(event.start_date, dateOptions)} | {this.dateFormat(event.start_time, timeOptions)}
                            </li>
                            <li className="event-index-item-title"><div>{event.title}</div></li>
                            <li className="event-index-item-location">
                                <div>
                                    <i className="fa fa-map-marker" aria-hidden="true"></i>
                                    {event.is_online_event ? "Online Event" : event.addresses[0]}
                                </div>
                            </li>
                            </Link>
                            <li className="event-index-item-options">
                                <div>
                                    {event.categories.filter(el => el.length > 0).map((name, idx) => 
                                        <Link key={idx} to={`/category/${name}`} >#{name.replace("_", "&")}</Link>
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

export default withRouter(EventIndexItem);