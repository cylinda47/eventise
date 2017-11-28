import { connect } from 'react-redux';
import EventDetail from './event_detail';
import { createEvent, fetchEvent } from '../../actions/event_actions';


const mapStateToProps = (state, ownProps) => {
    const eventId = ownProps.match.params.eventId;
    return {
        event: state.entities.events[eventId],
        eventId,
        currentUserId: state.session.currentUser.id
    };
}

const mapDispatchToProps = dispatch => ({
    fetchEvent: (eventId) => dispatch(fetchEvent(eventId))
})

export default connect(mapStateToProps, mapDispatchToProps)(EventDetail);