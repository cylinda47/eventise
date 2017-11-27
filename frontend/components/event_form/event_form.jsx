import React from 'react';
import { Redirect } from 'react-router-dom';
import ReactQuill from 'react-quill'; // ES6
import ImageUpload from './image_upload';

class EventForm extends React.Component {

    constructor(props){
        super(props);
        this.formEl = { addressOpen: false, imageFile: '' }
        this.state = this.props.formType === "create" ?
            Object.assign({}, this.formEl, this.props.event)
            :
            Object.assign({ id: '' }, this.formEl, this.props.event)

        this.handleEditerChange = this.handleEditerChange.bind(this);
        this.enableAddress = this.enableAddress.bind(this);
        this.disableAddress = this.disableAddress.bind(this);
        this.enableOnlineEvent = this.enableOnlineEvent.bind(this);
        this.resetAddress = this.resetAddress.bind(this);
        this.handleInput = this.handleInput.bind(this);
        this.handleAddress = this.handleAddress.bind(this);
        this.handleImageFile = this.handleImageFile.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleEditerChange(value) {
        this.setState({ description: value })
    }
    
    componentWillMount() {
        // Redirect if :eventId/edit doesnt exist
    }

    handleInput(event) {
        return this.setState({
            [event.currentTarget.id]: event.currentTarget.value
        });
    }

    handleAddress(idx) {
        return event => {
            let address = Object.assign({}, this.state.address);
            address[idx] = event.currentTarget.value;
            this.setState({ address });
        };
    }

    enableAddress() {
        this.setState({ addressOpen: true });
    }

    disableAddress() {
        this.setState({ addressOpen: false });
    }

    enableOnlineEvent() {
        this.setState({ is_online_event: true, address: ['', '', '', ''] });
    }

    resetAddress() {
        this.setState({ is_online_event: false });
    }

    handleImageFile(file) {
        const imageFile = file;
        this.setState({ imageFile })
    }

    handleSubmit(event) {
        const formData = new FormData();
        formData.append('event[title]', this.state.title);
        formData.append("event[description]", this.state.description);
        formData.append("event[address]", this.state.address);
        formData.append("event[is_online_event]", this.state.is_online_event);
        formData.append("event[start_date]", this.state.start_date);
        formData.append("event[end_date]", this.state.end_date);
        formData.append("event[start_time]", this.state.start_time);
        formData.append("event[end_time]", this.state.end_time);
        formData.append("event[organizer]", this.state.organizer);
        formData.append("event[organizer_id]", this.state.organizer_id);
        formData.append("event[image]", this.state.imageFile);
        this.props.submitForm(formData);
    }

    render(){
        const { addressOpen, is_online_event } = this.state;
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
                        id="title"
                        placeholder="Maxmium: 75 characters"
                        value={this.state.title}
                        onChange={this.handleInput} />

                    <label>Location</label>
                    { is_online_event ?
                        <div className="event-form-online-event">This is an online event</div>
                        :
                        <input
                            type="text"
                            placeholder={ addressOpen ? "Enter the venue name" : "Enter an address for your venue" }
                            value={this.state.address[0]}
                            onChange={this.handleAddress(0)} />
                    }
                    <div className="expand-address-bar">
                        { addressOpen ?
                        <div>
                            <input type="text"
                                placeholder="Address"
                                value={this.state.address[1]}
                                onChange={this.handleAddress(1)} />
                            <input type="text"
                                placeholder="Address 2"
                                value={this.state.address[2]}
                                onChange={this.handleAddress(2)} />
                            <input type="text"
                                placeholder="City / Country / Postcode"
                                value={this.state.address[3]}
                                onChange={this.handleAddress(3)} />
                            <span onClick={this.disableAddress}>
                                <i className="fa fa-times-circle-o" aria-hidden="true"></i>  Reset Address
                            </span>
                        </div>
                        :
                        <div>
                            { is_online_event ?
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
                            <input
                                id="start_date"
                                type="date"
                                value={this.state.start_date}
                                onChange={this.handleInput} />
                            <input
                                id="start_time"
                                type="time"
                                value={this.state.start_time}
                                onChange={this.handleInput} />
                        </div>
                        <div className="event-form-endtime">
                        <label>Ends</label>
                            <input
                                id="end_date"
                                type="date"
                                value={this.state.end_date}
                                onChange={this.handleInput}/>
                            <input
                                id="end_time"
                                type="time"
                                value={this.state.end_time}
                                onChange={this.handleInput} />
                        </div>
                    </div>
                    <label>Event Image</label>
                    <ImageUpload imageFile={this.state.imageFile} handleImageFile={this.handleImageFile} />
                    <label>Event Description
                        <span className="important"> *</span>
                    </label>
                    <div className="event-description-box">
                        <ReactQuill
                        value={this.state.description}
                        onChange={this.handleEditerChange}
                        className="rich-text-editer" />
                    </div>
                    
                    <label>Organizer Name<span className="important"> *</span></label>
                    <input
                        type="text"
                        id="organizer"
                        placeholder="Who's organizing this event?"
                        value={this.state.organizer}
                        onChange={this.handleInput} />
                    <center><button onClick={this.handleSubmit} className="event-form-submit">Make yoru event live</button></center>
                </div>
            </div>
        )
    }

}

export default EventForm;