import React from 'react';
import { Redirect } from 'react-router-dom';

export default class EventForm extends React.Component {
    constructor(props){
        super(props);
        this.state = this.props.formType === "create" ?
            Object.assign({}, this.props.event)
            :
            Object.assign({ id: '' }, this.props.event)
    }

    componentWillMount() {
        // Redirect if :eventId/edit doesnt exist
    }

    render(){
        return(
            <div className="event-form-box">
                <div className="event-form-header">
                    <div className="header-section-box">1</div>
                    <h1>Event Details</h1>
                </div>
                <div className={event-form-box}>
                    <label>
                        Event Title
                        <input type="text" value={this.state.title} onChange={this.handleInput} />
                    </label>
                    <label>
                        Location
                        <input type="text" value={this.state.address} onChange={this.handleAddress} />
                    </label>
                </div>
            </div>
        )
    }
}