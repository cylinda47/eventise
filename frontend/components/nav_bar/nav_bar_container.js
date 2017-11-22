import { connect } from 'react-redux';
import NavBar from './nav_bar';
import { login, logout, signup } from '../../actions/session_actions';

const mapStateToProps = ({ session }) => ({
    currentUser: session.currentUser
})

const mapDispatchToProps = dispatch => ({
    login: user => dispatch(login(user)),
    logout: () => dispatch(logout()),
    signup: user => dispatch(signup(user))
})

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);