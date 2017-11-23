import { connect } from 'react-redux';
import EventIndex from './event_index';
import { fetchEvents } from '../../actions/event_actions';

const mapStateToProps = ({ entities }) => ({
    events: Object.values(entities.events)
})

const mapDispatchToProps = dispatch => ({
    fetchEvents: () => dispatch(fetchEvents())
})

export default connect(mapStateToProps, mapDispatchToProps)(EventIndex)