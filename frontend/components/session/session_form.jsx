import React from 'react';
import Typed from 'typed.js';

export default class SessionForm extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            email: '',
            firstname: '',
            lastname: '',
            password: '',
            signup: false
        }
        this.demoUser = { email: "guest@eventize.io", password: "password" };
        this.handleInput = this.handleInput.bind(this);
        this.handleLogin = this.handleLogin.bind(this);
        this.handleSignup = this.handleSignup.bind(this);
        this.handleErrors = this.handleErrors.bind(this);
        this.returnToLogin = this.returnToLogin.bind(this);
    }

    componentDidMount() {
        const that = this;
        if (this.props.demoLogin){
            this.autoTyping('email');
            this.autoTyping('password');
            setTimeout(() => {
                this.setState(this.demoUser);
                const { email, password } = this.state;
                this.props.login({ email, password }).then(this.props.onModalClose());
            }, 2500); 
        }
    }

    componentWillUnmount() {
        if (this.props.demoLogin) {
            this.typed.destroy();
        }
    }

    componentDidUpdate() {
        if (!this.state.signup) {
            $('.signup-error-message').remove();
        }
    }

    autoTyping(field){
        let strings = (field === 'email') ? [this.demoUser.email] : [this.demoUser.password];
        let inputField = (field === 'email') ? this.emailEl : this.passwordEl; 
        const options = {
            strings: strings,
            typeSpeed: 65,
            backSpeed: 50
        };
        this.typed = new Typed(inputField, options);
    }

    handleInput(field) {
        return event => this.setState({ [field]: event.target.value })
    }

    handleLogin() {
        event.preventDefault();
        const { email, password } = this.state;
        this.props.login({ email, password })
            .then(null, this.handleErrors)
            .then(this.props.onModalClose);
    }

    handleSignup(){
        event.preventDefault();
        if (this.state.signup) {
            const { email, password, firstname, lastname } = this.state;
            this.props.signup({ email, password, firstname, lastname })
                .then(null, this.handleErrors)
                .then(this.props.onModalClose);
        }else{
            this.setState({ signup: true });
            $('.login-error-message').remove();
        }
    }

    returnToLogin() {
        this.setState({ signup: false });
    }

    handleErrors() {
        const { errors } = this.props;
        $('.signup-error-message').remove();
        if (this.state.signup && errors.userForm.length > 0) {
            if ($('.signup-error-message').length > 0) return;
            $('div.session-input-fields input').each( function() {
                const err = errors.userForm.filter((el, idx) => el.toLowerCase().indexOf(this.id) > -1 );
                $(this).addClass('input-error').after(`<span class="signup-error-message">${err}</span>`)
                }
            )
        } else if (errors.loginForm) {
            if($('.login-error-message').length > 0) return;
                $('p#signup').addClass('input-error').after(`<p class="login-error-message">${errors.loginForm}</p>`);
        }
    }

    render(){
        const { signup } = this.state;
        return(
            <div className="session">
                <div className="exit-icon">
                    <i className="fa fa-times" aria-hidden="true" onClick={this.props.onModalClose} />
                </div>
                <section className="session-form">
                    <div>
                        {signup ? "" : <center><img src="https://image.flaticon.com/icons/svg/320/320416.svg"/></center>}
                        <h1>{ signup ? "Welcome to Eventize" : "Let's get started" }</h1>
                        <p id="signup">{ signup ? "We'd like to know a bit more about you." : 
                            "Enter your email and password to continue."}</p>
                    </div>
                    <div className="session-input-fields">
                        <label>
                            <p>Email address</p>
                            <input
                                autoFocus
                                ref={(el) => { this.emailEl = el; }}
                                type="text"
                                id="email"
                                onChange={this.handleInput('email')}/>
                        </label>
                        <label>
                            <p>Password</p>
                            <input
                                ref={(el) => { this.passwordEl = el; }}
                                type="password"
                                id="password"
                                onChange={this.handleInput('password')}/>
                        </label>
                        { signup ?
                            <div className="session-signup">
                                <label><p>First name</p><input type="text" id="firstname" onChange={this.handleInput('firstname')} /></label>
                                <label><p>Last name</p><input type="text" id="lastname" onChange={this.handleInput('lastname')} /></label>
                            </div>
                            :
                            <div />
                        }
                    </div>
                    <div className="session-buttons">
                        {signup ? <div /> : <button onClick={this.handleLogin}>Sign In</button> }
                        <button onClick={this.handleSignup}>Join us</button>
                    </div>
                    <center>{signup ? <div className="session-link" onClick={this.returnToLogin}>Return to Sign In Here</div> : ""}</center>
                </section>
            </div>
        )
    }
}