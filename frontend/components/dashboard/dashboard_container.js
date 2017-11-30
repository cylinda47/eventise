import { connect } from 'react-redux';
import Dashboard from './dashboard';
import { fetchEvents, fetchEvent } from '../../actions/event_actions';

const mapStateToProps = state => ({
    currentUser: state.session.currentUser
})

const mapDispatchToProps = dispatch => ({
    fetchEvents: () => dispatch(fetchEvents()),
    fetchEvent: eventId => dispatch(fetchEvent(eventId))
})

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard)