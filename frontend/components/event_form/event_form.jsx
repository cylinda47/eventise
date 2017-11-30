import React from 'react';
import { withRouter } from 'react-router-dom';
import ReactQuill from 'react-quill'; // ES6
import ImageUpload from './image_upload';
import TicketForm from './ticket_form';

class EventForm extends React.Component {

    constructor(props){
        super(props);
        this._nullState = {
            title: '',
            description: '',
            address: ['', '', '', ''],
            is_online_event: false,
            start_date: '',
            end_date: '',
            start_time: '',
            end_time: '',
            organizer_id: this.props.currentUser.id,
            organizer: '',
            image_url: '',
            addressOpen: false,
            imageFile: '',
            loading: true,
            tickets: [{ name: '', price: null, quantity: null }]
        };
        this.state = this.props.formType === "create" ?
            Object.assign({}, this._nullState)
            :
            Object.assign({ id: '' }, this._nullState)

        this.handleEditerChange = this.handleEditerChange.bind(this);
        this.enableAddress = this.enableAddress.bind(this);
        this.disableAddress = this.disableAddress.bind(this);
        this.enableOnlineEvent = this.enableOnlineEvent.bind(this);
        this.resetAddress = this.resetAddress.bind(this);
        this.handleInput = this.handleInput.bind(this);
        this.handleAddress = this.handleAddress.bind(this);
        this.handleImageFile = this.handleImageFile.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleErrors = this.handleErrors.bind(this);
        this.clearForm = this.clearForm.bind(this);
        this.setEventState = this.setEventState.bind(this);
        this.toggleLoading = this.toggleLoading.bind(this);
        this.handleTicket = this.handleTicket.bind(this);
    }

    componentDidMount() {
        if (this.props.formType === 'update'){
            // this.setState({ loading: true })
            this.props.fetchEvent(this.props.eventId).then(this.setEventState).then(this.toggleLoading);
        }
    }
    
    componentWillReceiveProps(nextProps) {
        if (nextProps.match.params.eventId !== this.props.match.params.eventId) {
            this.clearForm();
            if (nextProps.formType === 'update'){
                this.setState({ loading: true });
                this.props.fetchEvent(this.props.eventId).then(this.toggleLoading);
            }
        }
    }

    toggleLoading(){
        this.setState({ loading: false });
    }

    setEventState() { 
        this.setState(this.props.event);
    }

    clearForm(){
        this.setState(this._nullState);
        this.setState({ loading: false });
    }
    
    handleEditerChange(value) {
        this.setState({ description: value })
    }
    
    handleInput(event) {
        return this.setState({
            [event.currentTarget.id]: event.currentTarget.value
        });
    }

    handleAddress(idx) {
        return event => {
            let address = Object.assign(["", "", "", ""], this.state.address);
            address[idx] = event.currentTarget.value;
            this.setState({ address });
            console.log(address);
            console.log(this.state);
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

    handleImageFile(file, image_url) {
        const imageFile = file;
        this.setState({ imageFile, image_url })
    }

    handleTicket(tickets){
        this.setState({ tickets });
    }

    handleSubmit(event) {
        const formData = new FormData();
        if (this.props.formType === 'update') {
            formData.append('event[id]', this.state.id);
        }
        formData.append('event[title]', this.state.title);
        formData.append("event[description]", this.state.description);
        formData.append("event[address][]", this.state.address[0]);
        formData.append("event[address][]", this.state.address[1]);
        formData.append("event[address][]", this.state.address[2]);
        formData.append("event[address][]", this.state.address[3]);
        formData.append("event[is_online_event]", this.state.is_online_event);
        formData.append("event[start_date]", this.state.start_date);
        formData.append("event[end_date]", this.state.end_date);
        formData.append("event[start_time]", this.state.start_time);
        formData.append("event[end_time]", this.state.end_time);
        formData.append("event[organizer]", this.state.organizer);
        formData.append("event[organizer_id]", this.state.organizer_id);
        formData.append("event[image]", this.state.imageFile);
        for (let i = 0; i < this.state.tickets.length; i++) {
            formData.append("event[tickets_attributes][" + i + "][name]", this.state.tickets[i]['name']);
            formData.append("event[tickets_attributes][" + i + "][price]", this.state.tickets[i]['price']);
            formData.append("event[tickets_attributes][" + i + "][quantity]", this.state.tickets[i]['quantity']);
        }
        this.props.submitForm(formData)
            .then((res) => this.props.history.push(`/events/${res.event.id}`), this.handleErrors);
    }

    handleErrors() {
        let { errors } = this.props;
        errors = errors[0].replace("Validation failed: ", "").split(",");
        $('.event-error-message').remove();
        if (errors.length > 0) {
            if ($('.event-error-message').length > 0) return;
            $('div.event-form input').each(function () {
                const err = errors.filter((el, idx) => el.toLowerCase().indexOf(this.id.replace("_", " ")) > -1);
                if (err.length > 0) {
                    if (err.indexOf('ticket')) {
                        $('div.ticket-create-container').before(`<span class="event-error-message">${err}</span>`);
                    }
                    $(this).after(`<span class="event-error-message">${err}</span>`);
                }
            }
            )
        } 
    }

    render(){
        const { addressOpen, is_online_event } = this.state;
        const { formType } = this.props;
        const timeOptions = { hour: 'numeric', minute: 'numeric', hour12: false }
        if ( !this.state.loading || formType === 'create'){
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
                            placeholder="Maxmium: 60 characters"
                            value={this.state.title}
                            onChange={this.handleInput} />
    
                        <label>Location</label>
                        { is_online_event ?
                            <div className="event-form-online-event">This is an online event</div>
                            :
                            <input
                                id="address"
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
                                    value={formType === 'update' ? new Date(this.state.start_time).toLocaleString('en-US', timeOptions) : this.state.start_time}
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
                                    value={formType === 'update' ? new Date(this.state.end_time).toLocaleString('en-US', timeOptions) : this.state.end_time}
                                    onChange={this.handleInput} />
                            </div>
                        </div>
                        <label>Event Image</label>
                        <ImageUpload
                            image_url={this.state.image_url}
                            handleImageFile={this.handleImageFile} />

                        <label>Event Description
                            <span className="important"> *</span>
                        </label>
                        <div className="event-description-box">
                            <ReactQuill
                            value={this.state.description}
                            onChange={this.handleEditerChange}
                            className="rich-text-editer" />
                        </div>
                        <input style={{ display: 'none' }} id="description" />
                        
                        <label>Organizer Name<span className="important"> *</span></label>
                        <input
                            type="text"
                            id="organizer"
                            placeholder="Who's organizing this event?"
                            value={this.state.organizer}
                            onChange={this.handleInput} />
                        <TicketForm
                            tickets={this.state.tickets}
                            nullTicket={this._nullState.tickets[0]}
                            handleTicket={this.handleTicket} />
                        <center>
                            <button onClick={this.handleSubmit} className="event-form-submit">
                                {formType === 'create' ? "Make your event live" : "Update event"}
                            </button>
                        </center>
                    </div>
                </div>
            )
        }else{
            return(<div>Loading...</div>)
        }
    }

}

export default withRouter(EventForm);