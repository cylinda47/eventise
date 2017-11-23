import React, { Component } from 'react';
import PropTypes from 'prop-types';
import RichTextEditor from 'react-rte';
import { Redirect } from 'react-router-dom';

class EventForm extends React.Component {
    
    constructor(props){
        super(props);
        this.propTypes = { onChange: PropTypes.func};
        this.value = { value: RichTextEditor.createEmptyValue() };
        this.state = this.props.formType === "create" ?
            Object.assign({}, this.value, this.props.event)
            :
            Object.assign({ id: '' }, this.value, this.props.event)
        this.onInputChange = this.onInputChange.bind(this);
    }

    static propTypes = {
        onChange: PropTypes.func
    }

    componentWillMount() {
        // Redirect if :eventId/edit doesnt exist
    }

    handleInput() {

    }

    handleAddress() {

    }

    onInputChange(value) {
        this.setState({ value });
        if (this.props.onChange) {
            // Send the changes up to the parent component as an HTML string.
            // This is here to demonstrate using `.toString()` but in a real app it
            // would be better to avoid generating a string on each change.
            this.props.onChange(
                value.toString('html')
            );
        }
    };

    render(){
        return(
            <div className="event-form-box">
                <div className="event-form-header">
                    <div className="header-section-box">1</div>
                    <h1>Event Details</h1>
                </div>
                <div className="event-form-box">
                    <label>
                        Event Title
                        <input type="text" value={this.state.title} onChange={this.handleInput} />
                    </label>
                    <label>
                        Location
                        <input type="text" value={this.state.address} onChange={this.handleAddress} />
                    </label>
                    <label>
                        Start Date
                        <input type="date" value={this.state.startDate} onChange={this.handleInput}/>
                    </label>
                    <label>
                        Event Description
                         <RichTextEditor
                            value={this.state.value}
                            onChange={this.onInputChange}
                            className="rich-text-editer"
                        />
                    </label>
                    <label>
                  
                    </label>
                </div>
            </div>
        )
    }

}

EventForm.propTypes = {
    onChange: PropTypes.func
}

export default EventForm;