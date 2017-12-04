import React from 'react';
import ReactQuill from 'react-quill';
import autoBind from 'react-autobind';
import merge from 'lodash/merge';
import { withRouter } from 'react-router-dom';

import ImageUpload from './image_upload';
import TicketForm from './ticket_form';
import CategoryForm from './category_form';

class EventForm extends React.Component {
    constructor(props){
        super(props);
        autoBind(this);
        this._nullState = {
            title: '',
            description: '',
            start_date: '',
            end_date: '',
            start_time: '',
            end_time: '',
            image_url: '',
            organizer: '',
            organizer_id: this.props.currentUser.id,
            imageFile: '',
            is_online_event: false,
            addressOpen: false,
            loading: true,
            addresses: ['', '', '', ''],
            categories: ['', ''],
            tickets: [
                { name: '', price: 0, quantity: 0 }
            ]
        };
        this.state = this.props.formType === "create" ?
            Object.assign({}, this._nullState)
            :
            Object.assign({ id: null }, this._nullState)
    }

    componentDidMount() {
        $('.event-error-message').remove();
        $('.ticket-event-error-message').remove();
        $('.header-img').removeClass('invisible');
        if (this.props.formType === 'update'){
            this.props.fetchEvent(this.props.eventId).then(this.setEventState).then(this.toggleLoading);
        }
    }

    dateFormat(datetime, option) {
        const date = new Date(datetime);
        const utc = new Date(date.getTime() + date.getTimezoneOffset() * 60000);
        return utc;
    }
    
    componentWillReceiveProps(nextProps) {
        if (nextProps.match.params.eventId !== this.props.match.params.eventId) {
            this.clearForm();
            if (nextProps.formType === 'update'){
                this.setState({ loading: true });
                this.props.fetchEvent(nextProps.eventId).then(this.setEventState).then(this.toggleLoading);
            }
        }
    }

    toggleLoading(){
        this.setState({ loading: false });
    }

    setEventState() { 
        let event = merge({}, this.props.event);
        event.start_time = this.dateFormat(event.start_time);
        event.end_time = this.dateFormat(event.end_time);
        this.setState(event);
    }

    clearForm(){
        $('.event-error-message').remove();
        $('.ticket-event-error-message').remove();
        $('.header-img').removeClass('invisible');
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
            let addresses = Object.assign(["", "", "", ""], this.state.addresses);
            addresses[idx] = event.currentTarget.value;
            this.setState({ addresses });
        };
    }

    enableAddress() {
        this.setState({ addressOpen: true });
    }

    disableAddress() {
        this.setState({ addressOpen: false });
    }

    enableOnlineEvent() {
        let addresses;
        if (this.props.formType === 'create') {
            addresses = this._nullState.addresses
        }else{
            addresses = this.state.addresses
        }
        this.setState({ is_online_event: true, addresses });
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

    setCategory(categories) {
        this.setState({ categories });
    }

    handleSubmit(event) {
        const formData = new FormData();
        if (this.props.formType === 'update') {
            formData.append('event[id]', this.state.id);
        }
        formData.append('event[title]', this.state.title);
        formData.append("event[description]", this.state.description);
        formData.append("event[addresses][]", this.state.addresses[0]);
        formData.append("event[addresses][]", this.state.addresses[1]);
        formData.append("event[addresses][]", this.state.addresses[2]);
        formData.append("event[addresses][]", this.state.addresses[3]);
        formData.append("event[is_online_event]", this.state.is_online_event);
        formData.append("event[start_date]", this.state.start_date);
        formData.append("event[end_date]", this.state.end_date);
        formData.append("event[start_time]", this.state.start_time);
        formData.append("event[end_time]", this.state.end_time);
        formData.append("event[organizer]", this.state.organizer);
        formData.append("event[organizer_id]", this.state.organizer_id);
        formData.append("event[image]", this.state.imageFile);
        formData.append("event[categories][]", this.state.categories[0]);
        formData.append("event[categories][]", this.state.categories[1]);
        if (this.props.formType === 'create') {
            for (let i = 0; i < this.state.tickets.length; i++) {
                formData.append("event[tickets_attributes][" + i + "][name]", this.state.tickets[i]['name']);
                formData.append("event[tickets_attributes][" + i + "][price]", Number(this.state.tickets[i]['price']));
                formData.append("event[tickets_attributes][" + i + "][quantity]", this.state.tickets[i]['quantity']);
            }
        }
        this.props.submitForm(formData)
            .then((res) => this.props.history.push(`/events/${res.event.id}`), this.handleErrors);
    }

    handleErrors() {
        window.scrollTo(0,0);
        const { errors } = this.props;
        $('.event-error-message').remove();
        $('.ticket-event-error-message').remove();
        $('.header-img').addClass('invisible');
        let err;
        $('div.event-form header, div.category-form header')
            .each(function () {
            err = errors[0].filter((el, idx) => el.toLowerCase().indexOf(this.id.replace("_", " ")) > -1);
            if (err.length > 0) {
                if (err.length > 1) {
                    err = String(err).replace(",", "<br />")
                }
                $(this).after(`<nav class="event-error-message">${err}</nav>`);
                if (err.indexOf('categories')) {
                    $('div.category-choose nav').addClass('error-adjusted');
                }
            }
        })
        if (errors[1].length > 0) {
        
            $('div.ticket-entry').each(function (idx) {
                if (errors[1][idx].length > 0) {
                    $(this).after(`<nav class="ticket-event-error-message">${errors[1][idx]}</nav>`);
                }
            })
        }
    }

    render(){
        const { addressOpen, is_online_event } = this.state;
        const { formType } = this.props;
        const timeOptions = { hour: 'numeric', minute: 'numeric', hour12: false }
        if ( !this.state.loading || formType === 'create'){
            return(
                <div className="event-form">
                    <div className="header-img">
                        <img src="https://image.flaticon.com/icons/svg/16/16294.svg"/>
                    <div>
                        <h1>Do you know?</h1>
                        Create multiple tickets at different prices can attract a wider variety of attendees.
                    </div>
                    </div>
                    <div className="event-form-box">
                        <div className="event-form-header">
                            <div className="header-section-box">1</div>
                            <h1>Event Details</h1>
                        </div>
    
                        <label>
                            <header id="title">Event Title</header>
                            <span className="important"> *</span>
                        <input
                            type="text"
                            id="title"
                            placeholder="Maxmium: 60 characters"
                            value={this.state.title}
                                onChange={this.handleInput} /></label>
    
                        <label>
                            <header id="address">Location</header>
                            <span className="important"> *</span>
                        { is_online_event ?
                            <div className="event-form-online-event">This is an online event</div>
                            :
                            <input
                                id="addresses"
                                type="text"
                                placeholder={ addressOpen ? "Enter the venue name" : "Enter an address for your venue" }
                                value={this.state.addresses[0]}
                                onChange={this.handleAddress(0)} />
                        }
                        <div className="expand-address-bar">
                            { addressOpen ?
                            <div>
                                <input type="text"
                                    placeholder="Address"
                                    value={this.state.addresses[1]}
                                    onChange={this.handleAddress(1)} />
                                <input type="text"
                                    placeholder="Address 2"
                                    value={this.state.addresses[2]}
                                    onChange={this.handleAddress(2)} />
                                <input type="text"
                                    placeholder="City / Country / Postcode"
                                    value={this.state.addresses[3]}
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
                            </div></label>
    
                        <div className="event-form-datetime">
                            <div className="event-form-starttime">
                                <label>
                                    <header id="date">Starts</header>
                                    <span className="important"> *</span>
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
                                </label>
                            </div>
                            <div className="event-form-endtime">
                                <label>
                                    Ends<span className="important"> *</span>
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
                                </label>
                            </div>
                        </div>
                        <label>Event Image
                        <ImageUpload
                            image_url={this.state.image_url}
                            handleImageFile={this.handleImageFile} />
                        </label>
                        <label>
                            <header id="description">Event Description</header>
                            <span className="important"> *</span>
                        <div className="event-description-box">
                            <ReactQuill
                            value={this.state.description}
                            onChange={this.handleEditerChange}
                            className="rich-text-editer" />
                        </div>
                        </label>
                        <input style={{ display: 'none' }} id="description" />
                        
                        <label>
                            <header id="organizer">Organizer Name</header>
                            <span className="important"> *</span>
                        <input
                            type="text"
                            id="organizer"
                            placeholder="Who's organizing this event?"
                            value={this.state.organizer}
                            onChange={this.handleInput} />
                        </label>
                        { this.props.formType === 'create' ?
                        <TicketForm
                            tickets={this.state.tickets}
                            nullTicket={this._nullState.tickets[0]}
                            handleTicket={this.handleTicket} />
                        : "" }
                        <CategoryForm
                            formType={this.props.formType}
                            setCategory={this.setCategory}
                            categories={this.state.categories}
                        />
                            <button onClick={this.handleSubmit} className="event-form-submit">
                                {formType === 'create' ? "Make your event live" : "Update event"}
                            </button>
                     
                    </div>
                </div>
            )
        }else{
            return(<div>Loading...</div>)
        }
    }

}

export default withRouter(EventForm);