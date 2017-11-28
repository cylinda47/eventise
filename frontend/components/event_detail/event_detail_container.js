import { connect } from 'react-redux';
import EventDetail from './event_detail';
import { createEvent, fetchEvent } from '../../actions/event_actions';


const mapStateToProps = (state, ownProps) => {
    const eventId = ownProps.match.params.eventId;
    const currentUser = state.session.currentUser;
    return {
        event: state.entities.events[eventId],
        eventId,
        currentUserId: currentUser && currentUser.id
    };
}

const mapDispatchToProps = dispatch => ({
    fetchEvent: (eventId) => dispatch(fetchEvent(eventId))
})

export default connect(mapStateToProps, mapDispatchToProps)(EventDetail);