import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import SessionForm from '../session/session_form';
import Modal from 'react-modal';
import ModalStyle from '../../util/modal_style';
import CategoryBar from '../category/category_bar';

class NavBar extends React.Component {
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
        this.navigateToBrowse = this.navigateToBrowse.bind(this);
        this.navigateToCreate = this.navigateToCreate.bind(this);
    }

    componentDidMount() {
        let width = $(window).width();
        let leftWidth = width - 470
        $(".nav-item-dropdown-category").width(width);
        $(".nav-item-dropdown-category").css("left", `-${leftWidth}px`);
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

    navigateToBrowse() {
        this.props.history.push("/");
    }

    navigateToCreate() {
        if (this.props.currentUser) {
            this.props.history.push("/events/new");
        }else{
            this.setState({
                modalOpen: true
            })
        }
    }

    render(){
        const { currentUser, login, signup, errors } = this.props;
        return(
            <div className="nav-bar">
                <nav className="nav-logo">
                    <Link to="/">Eventise</Link>
                </nav>
                <nav className="nav-search-bar">

                </nav>
                <div className="nav-items">
                    <div className="nav-item-dropdown-top">
                        <nav className="nav-item" onClick={this.navigateToBrowse} >Browse Events</nav>
                        <nav className="nav-item-dropdown-category" id="hard-reset">
                            <CategoryBar />
                        </nav>
                    </div>
                    <nav className="nav-item-blue" onClick={this.navigateToCreate} >Create Event</nav>
                    {   currentUser ?
                        <div className="nav-item-dropdown-top">
                            <Link to="/dashboard"><nav className="nav-item-user"><i className="fa fa-user-circle" aria-hidden="true"></i>  {currentUser.firstname}</nav></Link>
                            <nav className="nav-item-dropdown-long" id="hard-reset">
                                <label>
                                    <Link to="/dashboard">
                                        Saved<div>{currentUser.bookmarked_event_ids.length}</div>
                                    </Link>
                                </label>
                                <label onClick={this.props.logout}>LOGOUT</label>
                            </nav>
                        </div>
                        :
                        <div className="nav-item-dropdown-top">
                            <nav className="nav-item-login" onClick={this.handleModalClick}>Sign In</nav>
                            <nav className="nav-item-dropdown" onClick={this.handleDemoLogin}>Demo User</nav>
                        </div>
                    }
                </div>
                <Modal
                    isOpen={this.state.modalOpen}
                    onRequestClose={this.onModalClose}
                    style={ModalStyle}
                    onAfterOpen={this.onModalOpen}>
                    <SessionForm
                        login={ login }
                        signup={ signup }
                        errors={ errors }
                        onModalClose={this.onModalClose}
                        demoLogin={this.state.demoLogin} />
                </Modal>
            </div>
        )
    }
}

export default withRouter(NavBar);