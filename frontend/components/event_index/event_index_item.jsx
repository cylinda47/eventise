import React from 'react';

export default class EventIndexItem extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { events } = this.props;
        return (
            <div className="event-index-items">
                {events.map(event =>
                    <div className="event-index-item-detail" key={event.id}>
                        <div className="item-thumbnail"
                            style={{ backgroundImage: `url(${event.image_url})` }}
                                >
                        </div>
                        <ul>
                            <li>{event.start_date} - {event.end_date}</li>
                            <li>{event.title}</li>
                            <li>{event.address[0]}</li>
                        </ul>
                    </div>
                )}
            </div>
        )
    }
}