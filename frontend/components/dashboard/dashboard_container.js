import { connect } from 'react-redux';
import Dashboard from './dashboard';
import { fetchEvents } from '../../actions/event_actions';
import { fetchOrders } from '../../actions/ticket_actions';
import { addBookmark, removeBookmark } from '../../actions/session_actions';

const mapStateToProps = state => ({
    currentUser: state.session.currentUser,
    events: Object.values(state.entities.events),
    orders: Object.values(state.entities.orders)
})

const mapDispatchToProps = dispatch => ({
    fetchEvents: () => dispatch(fetchEvents()),
    fetchOrders: () => dispatch(fetchOrders()),
    addBookmark: bookmark => dispatch(addBookmark(bookmark)),
    removeBookmark: eventId => dispatch(removeBookmark(eventId))
})

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard)