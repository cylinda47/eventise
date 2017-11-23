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
        this.props.login({ email, password }).then(this.props.onModalClose());
    }

    handleSignup(){
        event.preventDefault();
        if (this.state.signup) {
            const { email, password, firstname, lastname } = this.state;
            this.props.signup({ email, password, firstname, lastname })
                .then(this.props.onModalClose());
        }
        this.setState({ signup: true });
    }

    render(){
        const { signup } = this.state;
        return(
            <div className="session">
                <section className="session-form">
                    <div>
                        <h1>{ signup ? "Welcome to Eventize" : "Let's get started" }</h1>
                        <p>{ signup ? "Please let us know a bit more about you." : 
                            "Enter your email and password to continue."}</p>
                    </div>
                    <label>
                        Email address
                        <input
                            ref={(el) => { this.emailEl = el; }}
                            type="text"
                            onChange={this.handleInput('email')}/>
                    </label>
                    <label>
                        Password
                        <input
                            ref={(el) => { this.passwordEl = el; }}
                            type="password"
                            onChange={this.handleInput('password')}/>
                    </label>
                    { signup ?
                        <div>
                            <label>First name<input type="text" onChange={this.handleInput('firstname')} /></label>
                            <label>Last name<input type="text" onChange={this.handleInput('lastname')} /></label>
                        </div>
                        :
                        <div />
                    }
                    <div className="session-buttons">
                        { signup ? <div /> : <input type="submit" value="Sign In" onClick={this.handleLogin}/> }
                        <input type="submit" value="Join us" onClick={this.handleSignup}/>
                    </div>
                </section>
            </div>
        )
    }
}