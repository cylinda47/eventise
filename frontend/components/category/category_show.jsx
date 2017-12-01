import React from 'react';
import { Link, withRouter } from 'react-router-dom';

class CategoryShow extends React.Component {
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

    componentWillReceiveProps(nextProps) {
        if (nextProps.categoryName !== this.props.categoryName) {
            this.props.fetchCategoryEvents(nextProps.categoryName);
        }
    }

    componentDidMount() {
        this.props.fetchCategoryEvents(this.props.categoryName);
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
                                    style={{ backgroundImage: `url(${event.image_url})` }}
                                ></div>
                          
                                <div className="category-show-event-details">
                                    <Link to={`/events/${event.id}`} key={event.id}>
                                        <div className="event-index-item-date">
                                        {new Date(event.start_date).toLocaleString('en-US', dateOptions)} | {new Date(event.start_time).toLocaleString('en-US', timeOptions)}
                                        </div>
                                        <div className="event-index-item-title">{event.title}</div>
                                        <div className="event-index-item-location" id="location-height-fix">{event.is_online_event ? "Online event" : event.address[0]}</div>
                                    </Link>
                                    <div className="category-show-item-options">
                                        <div>
                                            {event.category_names.filter(el => el.length > 0).map(name =>
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