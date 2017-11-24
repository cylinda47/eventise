import { connect } from 'react-redux';
import NavBar from './nav_bar';
import { login, logout, signup } from '../../actions/session_actions';

const mapStateToProps = state => ({
    currentUser: state.session.currentUser,
    errors: state.errors
})

const mapDispatchToProps = dispatch => ({
    login: user => dispatch(login(user)),
    logout: () => dispatch(logout()),
    signup: user => dispatch(signup(user))
})

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);