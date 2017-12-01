import React from 'react';
import merge from 'lodash/merge';

class TicketInput extends React.Component {
    constructor(props){
        super(props);
    }
    render() {
        return <div index={this.props.index}>
            <ul>
                <li><input index={this.props.index} id="ticket-name" type="text" onChange={this.props.handleChange} /></li>
                <li><input index={this.props.index} id="ticket-price" type="number" onChange={this.props.handleChange} /></li>
                <li><input index={this.props.index} id="ticket-quantity" type="number" onChange={this.props.handleChange} /></li>
                <li>
                    <div className="ticket-actions">
                        <i className="fa fa-plus" aria-hidden="true" onClick={this.props.addNewTicket}></i>  <i className="fa fa-trash-o" aria-hidden="true" onClick={this.props.deleteTicket} index={this.props.index}></i>
                    </div>
                </li>
            </ul>
        </div>;
    }
}

export default class TicketForm extends React.Component {
    constructor(props){
        super(props);
        this._nullTicket = this.props.nullTicket;
        this.state = {
            inputFields: [],
            tickets: this.props.tickets
        }
        this.addNewTicket = this.addNewTicket.bind(this);
        this.deleteTicket = this.deleteTicket.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    addNewTicket(event) {
        const inputFields = this.state.inputFields.concat(TicketInput);
        let tickets = merge([], this.state.tickets);
        tickets.push(this._nullTicket);
        this.setState({ inputFields, tickets });
    }

    deleteTicket(event) {
        if ($('.ticket-entry').children().length > 1){
            $(event.currentTarget.parentNode.parentNode.parentNode.parentNode).remove();
        }
        let tickets = merge([], this.state.tickets);
        tickets = tickets.splice(event.target.getAttribute('index'), 1);
        this.setState({ tickets }, () => this.props.handleTicket(this.state.tickets))
    }

    handleChange(event) {
        const index = event.target.getAttribute("index");
        const field = event.target.getAttribute("id").replace("ticket-", "");
        let tickets = merge([], this.state.tickets);
        tickets[index][field] = event.target.value; 
        this.setState({ tickets }, () => this.props.handleTicket(this.state.tickets))
    }

    render(){
        const inputFields = this.state.inputFields.map((Element, index) => {
            return <Element
                key={index+1}
                index={index+1}
                addNewTicket={this.addNewTicket}
                deleteTicket={this.deleteTicket}
                handleChange={this.handleChange} />
        });
        return(
            <div className="ticket-form">
                <div className="event-form-header">
                    <div className="header-section-box">2</div>
                    <h1>Create Tickets</h1>
                </div>
                <div className="ticket-create-container">
                    <div className="ticket-header">
                        <ul>
                            <li>Ticket name<span className="important"> *</span></li>
                            <li>Quantity Available</li>
                            <li>Price</li>
                            <li>Actions</li>
                        </ul>
                    </div>
                    <div className="ticket-entry">
                        <div>
                            <ul>
                                <li><input index="0" id="ticket-name" type="text" onChange={this.handleChange}/></li>
                                <li><input index="0" id="ticket-quantity" type="number" onChange={this.handleChange} /></li>
                                <li><input index="0" id="ticket-price" type="number" onChange={this.handleChange}/></li>
                                <li>
                                    <div className="ticket-actions">
                                        <i className="fa fa-plus" aria-hidden="true" onClick={this.addNewTicket}></i>  <i className="fa fa-trash-o" aria-hidden="true"></i>
                                    </div>
                                </li>
                            </ul>
                        </div>
                        {inputFields}
                    </div>
                </div>
            </div>
        )
    }
}