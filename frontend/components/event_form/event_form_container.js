import { connect } from 'react-redux';
import EventForm from './event_form';
import { createEvent, updateEvent } from '../../actions/event_actions';

const mapStateToProps = (state, ownProps) => {
    const currentUser = state.session.currentUser;
    let formType = "create";
    let event = {
        title: '',
        description: '',
        address: ['', '', '', ''],
        image_url: '',
        start_date: '',
        end_date: '',
        organizer_id: '',
        organizer: ''
    };
    if (ownProps.match.path == "/events/:eventId/edit") {
        const eventId = ownProps.match.params.eventId;
        event = state.entities.events[eventId];
        formType = "update";
    }
    return { currentUser, event, formType };
}

const mapDispatchToProps = (dispatch, ownProps) => {
    const submitForm = ownProps.match.path === "/" ? createEvent : updateEvent;
    return {
        submitForm: event => dispatch(submitForm(event))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(EventForm);