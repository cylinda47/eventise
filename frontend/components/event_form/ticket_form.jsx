import React from 'react';
import merge from 'lodash/merge';
import autoBind from 'react-autobind';

const TicketInput = ({ index, tickets, handleChange, ticketPrice, deleteTicket, addNewTicket }) => (
    <div className="ticket-input-container">
        <div className="ticket-entry" index={index}>
            <input index={index} value={tickets[index].name} id="ticket-name" type="text" onChange={handleChange} placeholder="e.g. RSVP" />
            <input index={index} value={tickets[index].quantity} id="ticket-quantity" type="number" onChange={handleChange} />
            <input index={index} value={ticketPrice(tickets[index].price)} id="ticket-price" type="number" onChange={handleChange} />
            
                <div className="ticket-actions">
                    <i className="fa fa-plus" aria-hidden="true" onClick={addNewTicket}></i>
                    { tickets.length < 2 ? "" : <i className="fa fa-trash-o" aria-hidden="true" onClick={deleteTicket} index={index}> </i>}
                </div>
        </div>
    </div>
)

export default class TicketForm extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            inputFields: []
        }
        autoBind(this);
    }

    componentDidMount() {
        const inputFields = this.state.inputFields.concat(TicketInput);
        this.setState({ inputFields });
    }

    addNewTicket(event) {
        const inputFields = this.state.inputFields.concat(TicketInput);
        let tickets = merge([], this.props.tickets);
        tickets.push(this.props.nullTicket);
        this.setState({ inputFields });
        this.props.handleTicket(tickets);
    }

    deleteTicket(event) {
        let tickets = merge([], this.props.tickets);
        tickets.splice(event.target.getAttribute('index'), 1);
        this.props.handleTicket(tickets);
        let inputFields = merge([], this.state.inputFields)
        inputFields.splice(event.target.getAttribute('index'), 1);
        this.setState({ inputFields });
    }

    handleChange(event) {
        const index = event.target.getAttribute("index");
        const field = event.target.getAttribute("id").replace("ticket-", "");
        let tickets = merge([], this.props.tickets);
        tickets[index][field] = event.target.value; 
        this.props.handleTicket(tickets);
    }

    ticketPrice(price) {
        if (typeof price === 'number') {
            return price.toFixed(2)
        } else {
            return price
        }
    }

    render(){
        const { tickets } = this.props;
        const inputFields = this.state.inputFields.map((Element, index) => {
            return <Element
                key={index}
                index={index}
                tickets={tickets}
                addNewTicket={this.addNewTicket}
                deleteTicket={this.deleteTicket}
                handleChange={this.handleChange}
                ticketPrice={this.ticketPrice} />
        });
        return(
            <div className="ticket-form">
                <div className="ticket-form-header">
                    <div className="header-section-box">2</div>
                    <h1>Create Tickets</h1>
                </div>
                <div className="ticket-create-container">
                    <div className="ticket-header">     
                        <div>
                           Ticket name
                            <span className="important"> *</span>
                        </div>
                        <div>
                            Quantity
                            <br />
                            <label>( 0 for Unlimited )</label>
                        </div>
                        <div>
                            Price
                            <br />
                            <label>( 0 for Free )</label>
                        </div>
                        <div>Actions</div>
                    </div>
                    
                        {inputFields}
                    
                </div>
            </div>
        )
    }
}