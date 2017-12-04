import React from 'react';
import autoBind from 'auto-bind';
import { Link, withRouter } from 'react-router-dom';

class CategoryShow extends React.Component {
    constructor(props) {
        super(props);
        autoBind(this);
    }
    
    componentWillReceiveProps(nextProps) {
        if (nextProps.categoryName !== this.props.categoryName) {
            this.props.fetchCategoryEvents(nextProps.categoryName);
        }
    }

    componentDidMount() {
        this.props.fetchCategoryEvents(this.props.categoryName);
        window.scrollTo(0,0);
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
        const dateOptions = { weekday: 'short', month: 'short', day: 'numeric' };
        const timeOptions = { hour: 'numeric', minute: 'numeric' }
        const { events, currentUser } = this.props;
        return (
            <div className="category-show">
                <center>
                    <span>{this.props.categoryName.replace("_", " & ")}</span>
                    { events.map(event =>                
                        <div className="category-show-event-container" key={event.id}>
                            <div className="category-show-event-image"
                                style={{ backgroundImage: `url(${event.image_url})` }}>
                            </div>
                            <div className="category-show-event-details">
                                <Link to={`/events/${event.id}`} key={event.id}>
                                    <div className="category-index-item-date">
                                        {this.dateFormat(event.start_date, dateOptions)} | {this.dateFormat(event.start_time, timeOptions)}
                                    </div>
                                    <div className="category-index-item-title">{event.title}</div>
                                    <div className="category-index-item-location" id="location-height-fix">{event.is_online_event ? "Online event" : event.addresses[0]}</div>
                                </Link>
                                <div className="category-show-item-options">
                                    <div>
                                        {event.categories.filter(el => el.length > 0).map(name =>
                                                <Link key={name} to={`/category/${name}`}>#{name.replace("_", "&")}</Link>
                                        )}
                                    </div>
                                    <div>
                                        {!currentUser || currentUser.bookmarked_event_ids.indexOf(event.id) < 0 ?
                                            <i className="fa fa-bookmark-o" onClick={this.add(event.id)} aria-hidden="true"></i> :
                                            <i className="fa fa-bookmark" onClick={this.remove(event.id)} aria-hidden="true"></i>
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </center>
            </div>
        )
    }
}

export default withRouter(CategoryShow)