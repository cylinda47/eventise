import React from 'react';
import { Redirect } from 'react-router-dom';
import ReactQuill from 'react-quill'; // ES6
import ImageUpload from './image_upload';

class EventForm extends React.Component {

    constructor(props){
        super(props);
        this.formEl = { addressOpen: false, isOnlineEvent: false }
        this.state = this.props.formType === "create" ?
            Object.assign({}, this.formEl, this.props.event)
            :
            Object.assign({ id: '' }, this.formEl, this.props.event)
        this.handleChange = this.handleChange.bind(this);
        this.enableAddress = this.enableAddress.bind(this);
        this.disableAddress = this.disableAddress.bind(this);
        this.enableOnlineEvent = this.enableOnlineEvent.bind(this);
        this.resetAddress = this.resetAddress.bind(this);
    }

    handleChange(value) {
        this.setState({ description: value })
    }
    
    componentWillMount() {
        // Redirect if :eventId/edit doesnt exist
    }

    handleInput(field) {
        (event) => this.setState({ title: event.target.value })
    }

    handleAddress() {
        
    }

    enableAddress() {
        this.setState({ addressOpen: true });
    }

    disableAddress() {
        this.setState({ addressOpen: false });
    }

    enableOnlineEvent() {
        this.setState({ isOnlineEvent: true });
    }

    resetAddress() {
        this.setState({ isOnlineEvent: false });
    }

    render(){
        const { addressOpen, isOnlineEvent } = this.state;
        return(
            <div className="event-form">
                <div className="event-form-header">
                    <div className="header-section-box">1</div>
                    <h1>Event Details</h1>
                </div>
                <div className="event-form-box">

                    <label>Event Title<span className="important"> *</span></label>
                    <input
                        type="text"
                        placeholder="Maxmium: 75 characters"
                        value={this.state.title}
                        onChange={this.handleInput('title')} />

                    <label>Location</label>
                    { isOnlineEvent ? <div className="event-form-online-event">This is an online event</div> :
                        <input
                            type="text"
                            placeholder={ addressOpen ? "Enter the vanue name" : "Enter an address for your venue" }
                            value={this.state.address[0]}
                            onChange={this.handleAddress} />
                    }
                    <div className="expand-address-bar">
                        { addressOpen ?
                        <div>
                            <input type="text"
                                placeholder="Address"
                                value={this.state.address[1]}
                                onChange={this.handleAddress} />
                            <input type="text"
                                placeholder="Address 2"
                                value={this.state.address[2]}
                                onChange={this.handleAddress} />
                            <input type="text"
                                placeholder="City / Country / Postcode"
                                value={this.state.address[3]}
                                onChange={this.handleAddress} />
                            <span onClick={this.disableAddress}>
                                <i className="fa fa-times-circle-o" aria-hidden="true"></i>  Reset Address
                            </span>
                        </div>
                        :
                        <div>
                            { isOnlineEvent ?
                            <div>
                                <span onClick={this.resetAddress}><i className="fa fa-map-marker" aria-hidden="true"></i>  Add a location</span>
                             </div>
                            :
                            <div>
                                <span onClick={this.enableOnlineEvent}><i className="fa fa-globe" aria-hidden="true"></i>  Online Event</span>
                                <span onClick={this.enableAddress}><i className="fa fa-map-marker" aria-hidden="true"></i>  Enter Address</span>
                            </div>
                            }
                        </div>
                         }
                    </div>

                    <div className="event-form-datetime">
                        <div className="event-form-starttime">
                            <label>Starts</label>
                            <input type="date" placeholder={this.state.startDate} onChange={this.handleInput} />
                            <input type="time" onChange={this.handleTime} />
                        </div>
                        <div className="event-form-endtime">
                        <label>Ends</label>
                            <input type="date" placeholder={this.state.endDate} onChange={this.handleInput}/>
                            <input type="time" onChange={this.handleTime} />
                        </div>
                    </div>
                    <label>Event Image</label>
                    <ImageUpload />

                    <label>Event Description
                        <span className="important"> *</span>
                    </label>
                    <div className="event-description-box">
                        <ReactQuill value={this.state.description}
                        onChange={this.handleChange}
                        className="rich-text-editer" />
                    </div>
                    
                    <label>Organizer Name<span className="important"> *</span></label>
                    <input
                        type="text"
                        placeholder="Who's organizing this event?"
                        value={this.state.organizer}
                        onChange={this.handleInput} />
                    <center><button className="event-form-submit">Make yoru event live</button></center>
                </div>
            </div>
        )
    }

}

export default EventForm;