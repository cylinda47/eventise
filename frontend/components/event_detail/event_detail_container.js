import { connect } from 'react-redux';
import EventDetail from './event_detail';
import { createEvent, fetchEvent } from '../../actions/event_actions';
import { createOrder } from '../../actions/ticket_actions';
import { login, logout, signup } from '../../actions/session_actions';

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
    fetchEvent: (eventId) => dispatch(fetchEvent(eventId)),
    createOrder: (order) => dispatch(createOrder(order)),
    login: user => dispatch(login(user)),
    logout: () => dispatch(logout()),
    signup: user => dispatch(signup(user))
})

export default connect(mapStateToProps, mapDispatchToProps)(EventDetail);