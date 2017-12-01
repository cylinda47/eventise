import { connect } from 'react-redux';
import CategoryShow from './category_show';
import { fetchCategoryEvents } from '../../actions/event_actions';
import { addBookmark, removeBookmark } from '../../actions/session_actions';

const mapStateToProps = (state, ownProps) => {
    const categoryName = ownProps.match.params.categoryName;
    const events = Object.values(state.entities.events);
    const currentUser = state.session.currentUser;
    return { events, categoryName, currentUser };
}

const mapDispatchToProps = dispatch => {
    return {
        fetchCategoryEvents: name => dispatch(fetchCategoryEvents(name)),
        addBookmark: bookmark => dispatch(addBookmark(bookmark)),
        removeBookmark: eventId => dispatch(removeBookmark(eventId))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CategoryShow);