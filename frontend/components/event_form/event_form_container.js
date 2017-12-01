import { connect } from 'react-redux';
import EventForm from './event_form';
import {
    createEvent,
    updateEvent,
    fetchEvent,
    createTicket,
    updateCategory } from '../../actions/event_actions';

const mapStateToProps = (state, ownProps) => {
    const currentUser = state.session.currentUser;
    let formType = "create";
    const eventId = ownProps.match.params.eventId;
    const event = eventId && state.entities.events[eventId];
    if (ownProps.match.path == "/events/:eventId/edit") {
        formType = "update";
    }
    return { currentUser, event, formType, eventId, errors: state.errors.eventForm };
}

const mapDispatchToProps = (dispatch, ownProps) => {
    if (ownProps.match.path === "/events/new") {
        return {
            submitForm: event => dispatch(createEvent(event)),
            fetchEvent: (eventId) => dispatch(fetchEvent(eventId))
        }
    }else{
        return {
            submitForm: event => dispatch(updateEvent(event)),
            createTicket: ticket => dispatch(createTicket(ticket)),
            updateCategory: (eventId, category) => dispatch(updateCategory(eventId, category)),
            fetchEvent: (eventId) => dispatch(fetchEvent(eventId))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(EventForm);