import React from 'react';
import { Link } from 'react-router-dom';

export default class EventDetail extends React.Component {
    constructor(props){
        super(props);
    }

    componentDidMount() {
        this.props.fetchEvent(this.props.eventId);
    }
    
    render(){
        const { event, currentUserId } = this.props;
        const dateOptions1 = { weekday: 'short', month: 'long', day: 'numeric', year: 'numeric' };
        const dateOptions2 = { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' };
        const timeOptions1 = { hour: 'numeric', minute: 'numeric', hour12: false }
        const timeOptions2 = { hour: 'numeric', minute: 'numeric', timeZoneName: 'short', hour12: false }
        if (event) {
            return(
                <div>
                    <div
                        className="event-detail-blur-bg"
                        style={{ backgroundImage: `url(${event.image_url})` }}>
                    </div>
                    <div className="event-detail-main-container">
                        <div className="event-detail-header">
                            <div className="event-detail-header-bg"
                                style={{ backgroundImage: `url(${event.image_url})` }}>
                            </div>
                            <div className="event-detail-header-info">
                                <div className="event-detail-header-month">
                                    {new Date(event.start_date).toLocaleString('en-US', { month: 'short'} )}
                                </div>
                                <div className="event-detail-header-date">
                                    {new Date(event.start_date).toLocaleString('en-US', { month: 'numeric'} )}
                                </div>
                                <div className="event-detail-header-title">
                                    {event.title}
                                </div>
                                <div className="event-detail-header-organizer">
                                    by {event.organizer}
                                </div>
                            </div>
                        </div>
                        <div className="event-detail-register-bar">
                            <i className="fa fa-bookmark-o" aria-hidden="true" />
                            <button>Register</button>
                        </div>
                        <div className="event-detail-content">
                            <div className="event-detail-content-main">
                                <div><b>DESCRIPTION</b></div>
                                <div className="event-detail-description">
                                    <div dangerouslySetInnerHTML={{ __html: event.description }}></div>
                                </div>
                            </div>
                            <div className="event-detail-content-sidebar">
                                <div><b>DATE AND TIME</b></div>
                                <div className="event-detail-datetime">
                                    { event.start_date === event.end_date ? 
                                        <div>
                                            {new Date(event.start_date).toLocaleString('en-US', dateOptions1)}
                                            <div className="event-detail-time">
                                                {new Date(event.start_time).toLocaleString('en-US', timeOptions1)} - {new Date(event.end_time).toLocaleString('en-US', timeOptions2)}
                                            </div>
                                        </div>
                                        :
                                        <div>
                                            {new Date(event.start_date).toLocaleString('en-US', dateOptions2)}, {new Date(event.start_time).toLocaleString('en-US', timeOptions1)} -
                                            {new Date(event.end_date).toLocaleString('en-US', dateOptions2)}, {new Date(event.end_time).toLocaleString('en-US', timeOptions2)}
                                        </div>
                                    }
                                </div>
                                <div><b>LOCATION</b></div>
                                <div className="event-detail-location">
                                    {event.is_online_event ? "This event is online." :
                                    <ul>
                                        {event.address.map((el, idx) => <li key={idx}>{el}</li>)}
                                    </ul>
                                    }
                                </div>
                            </div>
                        </div>
                        <div className="event-detail-organizer-detail">
                            <center>
                                <div><b>ORANGIZER OF THIS EVENT</b></div>
                                <img src="https://image.flaticon.com/icons/svg/149/149071.svg" />
                                <div className="organizer">{event.organizer}</div>    
                            </center>
                        </div>
                        { currentUserId === event.organizer_id ?
                        <div className="event-detail-edit-bar">
                            <Link to={`/events/${event.id}/edit`}><button>Edit this event</button></Link>
                        </div>
                        : ""}
                    </div>
                </div>
            )
        }else{
            return(<div>Loading...</div>)
        }
    }
}