import React from 'react';
import merge from 'lodash/merge';

export default class TicketList extends React.Component {
    constructor(props){
        super(props);
        this._nullTicket = {
            ticket_id: null,
            quantity: 0,
            purchaser_id: this.props.currentUserId
            };
        const newTickets = this.props.tickets.map((ticket) => 
            this._nullTicket
        )
        this.state = {
            checkout: false,
            tickets: newTickets,
            totalQty: 0,
            totalPrice: 0,
            confirmOrder: false
         };
        this.showQuantity = this.showQuantity.bind(this);
        this.setQuantity = this.setQuantity.bind(this);
        this.handleOrder = this.handleOrder.bind(this);
        this.backToList = this.backToList.bind(this);
        this.goToConfirm = this.goToConfirm.bind(this);
        this.goToCheckout = this.goToCheckout.bind(this);
    }

    showQuantity(quantity){
        const qty_arr = [];
        for(let i=0;i <= quantity;i++){
            qty_arr.push(i);
        }
        return qty_arr;
    }

    setQuantity(idx){
        return event => {
            let newTickets = merge([], this.state.tickets);
            let quantity = parseInt($(`#dropdown-${idx} option:selected`).val());
            newTickets[idx]['quantity'] = quantity
            newTickets[idx]['ticket_id'] = this.props.tickets[idx].id;
            let totalQty = 0;
            let totalPrice = 0;
            newTickets.forEach(ticket => totalQty += ticket.quantity)
            newTickets.forEach((ticket, i) => totalPrice += (ticket.quantity * this.props.tickets[i].price))
            this.setState({ totalQty, totalPrice, tickets: newTickets });
            
        }
    }

    handleOrder(event) {
        const { tickets } = this.state;
        for(let i=0; i<tickets.length;i++) {
            if (tickets[i].quantity > 0) {
                if (i === tickets.length-1) {
                    this.props.createOrder(tickets[i])
                    .then(this.goToConfirm)
                    .then(this.props.fetchEvent(this.props.event.id))
                } else {
                    this.props.createOrder(tickets[i])
                }
            }
        }
    }

    backToList(){
        this.setState({ checkout: false });
    }

    goToCheckout() {
        this.setState({ checkout: true });
    }

    goToConfirm(){
        this.setState({ confirmOrder: true })
    }

    showCheckout() {
        const { tickets, confirmOrder, totalQty, totalPrice } = this.state;
        const { event } = this.props;
        const dateOptions1 = { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' };
        if (confirmOrder) {
            return(
            <div className="checkout-order-confirm">
                <div><img src="https://image.flaticon.com/icons/svg/432/432312.svg" /></div>
                <div>Your order is completed</div>
                    <div>Be ready for your event on</div>
                    <div><span>{new Date(event.start_date).toLocaleString('en-US', dateOptions1)}</span></div>
            </div>
        )
        }else{
            return(
                <div className="checkout-form">
                    <p>Please review your order :</p>
                    <div className="checkout-event-details">
                        <div className="checkout-title">{event.title}</div>
                        <div className="checkout-date">{new Date(event.start_date).toLocaleString('en-US', dateOptions1)}</div>
                    </div>
                    <div className="checkout-event-total">
                        <div className="checkout-title">Summary</div>
                        <div>You have added a total amount of ${totalPrice}.00 for {totalQty} tickets to your basket.</div>
                    </div>
                    <div className="checkout-order-details">
                        <div className="checkout-order-header">
                            <div>type</div>
                            <div>price</div>
                            <div>quantity</div>
                        </div>
                        {
                            tickets.map((ticket, idx) =>
                                (ticket.quantity > 0 ?
                                    <div key={idx} className="checkout-order-tickets">
                                        <div>{this.props.tickets[idx].name}</div>
                                        <div>$ {this.props.tickets[idx].price}0</div>
                                        <div>{ticket.quantity}</div>
                                    </div>
                                    : "")
                            )
                        }
                    </div>
                </div>
            )
        }
    }

    render() {
        const { tickets } = this.props;
        const { checkout, confirmOrder } = this.state;
        return(
            <div className="ticket-list">
                <div className="ticket-list-header">
                    <div>
                        Register
                    </div>
                    <div>
                        <i className="fa fa-times" aria-hidden="true" onClick={this.props.onModalClose} />
                    </div>
                </div>
                { checkout ? this.showCheckout() :
                <div className="ticket-list-container">
                    {tickets.map((ticket, index) =>
                        <div className="ticket-list-item" key={index}>
                            <div className="ticket-list-item-name">{ticket.name}</div>
                                <div className="ticket-list-item-price">$ {ticket.price}0 | Remaining: {ticket.remaining_qty}</div>

                            {ticket.remaining_qty < 1 ? <p className="ticket-list-soldout">SOLD OUT</p> :
                                <select value={this.state.tickets[index].quantity} id={`dropdown-${index}`} className="ticket-list-dropdown" onChange={this.setQuantity(index)}>
                                    {
                                        this.showQuantity(ticket.remaining_qty).map((qty, index) =>
                                            <option value={qty} key={index}>{qty}</option>
                                        )
                                    }
                                </select>
                            }

                        </div>
                    )}
                </div>
                }
                { confirmOrder ? "" :
                    <div className="ticket-list-checkout-bar">
                        {checkout ? <div><i className="fa fa-arrow-circle-left" aria-hidden="true" onClick={this.backToList}></i></div> : 
                            <div>
                                QTY: {this.state.totalQty}
                            </div>
                        }
                        { checkout ? <div></div> : 
                            <div>
                                TOTAL: ${this.state.totalPrice}.00
                            </div>
                        }
                        <div>
                        {checkout ? <button onClick={this.handleOrder}>Confirm</button> : <button onClick={this.goToCheckout}>Checkout</button>}
                        </div>
                    </div>
                }
            </div>
        )
    }
}