import { connect } from 'react-redux';
import EventIndex from './event_index';
import { fetchEvents } from '../../actions/event_actions';

const mapStateToProps = state => ({
    events: Object.values(state.entities.events),
    currentUser: state.session.currentUser
})

const mapDispatchToProps = dispatch => ({
    fetchEvents: () => dispatch(fetchEvents()),
    addBookmark: bookmark => dispatch(addBookmark(bookmark)),
    removeBookmark: eventId => dispatch(removeBookmark(eventId))
})

export default connect(mapStateToProps, mapDispatchToProps)(EventIndex)