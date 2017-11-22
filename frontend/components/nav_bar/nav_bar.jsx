import React from 'react';
import { Link } from 'react-router-dom';
import SessionForm from '../session/session_form';
import Modal from 'react-modal';
import ModalStyle from '../../util/modal_style';

export default class NavBar extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            modalOpen: false,
            demoLogin: false
        };
        this.handleModalClick = this.handleModalClick.bind(this);
        this.onModalClose = this.onModalClose.bind(this);
        this.onModalOpen = this.onModalOpen.bind(this);
        this.handleDemoLogin = this.handleDemoLogin.bind(this);
    }

    handleModalClick(event){
        this.setState({
            modalOpen: true,
            demoLogin: false
        });
    }

    handleDemoLogin(){
        this.setState({
            modalOpen: true,
            demoLogin: true
        });
    }

    onModalClose(){
        this.setState({ modalOpen: false });
        ModalStyle.content.opacity = 0;
    }

    onModalOpen() {
        ModalStyle.content.opacity = 100;
    }

    render(){
        const { currentUser, login, signup } = this.props;
        return(
            <div className="nav-bar">
                <nav className="nav-logo">
                    <Link to="/">Eventize</Link>
                </nav>
                <nav className="nav-search-bar">

                </nav>
                <div className="nav-items">
                    <nav className="nav-item"><Link to="">Browse Events</Link></nav>
                    <nav className="nav-item-blue"><Link to="">Create Event</Link></nav>
                    {   currentUser ?
                        <div>
                            <nav className="nav-item-user">{currentUser.firstname}</nav>
                            <nav className="nav-item-user" onClick={this.props.logout}>LOGOUT</nav>
                        </div>
                        :
                        <div>
                            <nav className="nav-item-login" onClick={this.handleModalClick}>Sign In</nav>
                            <nav className="nav-item-login" onClick={this.handleDemoLogin}>Demo User</nav>
                        </div>
                    }
                </div>
                <Modal
                    isOpen={this.state.modalOpen}
                    onRequestClose={this.onModalClose}
                    style={ModalStyle}
                    onAfterOpen={this.onModalOpen}>
                    <button onClick={this.onModalClose}>Close</button>
                    <SessionForm
                        login={login}
                        signup={signup}
                        onModalClose={this.onModalClose}
                        demoLogin={this.state.demoLogin} />
                </Modal>
            </div>
        )
    }
}