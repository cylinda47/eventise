import { connect } from 'react-redux';
import EventForm from './event_form';
import { createEvent, updateEvent, fetchEvent } from '../../actions/event_actions';

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
    const submitForm = ownProps.match.path === "/events/new" ? createEvent : updateEvent;
    return {
        submitForm: event => dispatch(submitForm(event)),
        fetchEvent: (eventId) => dispatch(fetchEvent(eventId))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(EventForm);