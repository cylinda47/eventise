import React from 'react';

export default class SessionForm extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            email: '',
            firstname: '',
            lastname: '',
            password: ''
        }
    }

    removeSessionModal(event) {
        event.preventDefault();
        event.target.removeClass("launch-form");
    }

    handleInput(field) {
        return event => this.setState({ [field]: event.target.value })
    }

    handleLogin() {
        event.preventDefault();
    }

    renderSignupForm() {
        event.preventDefault();
        const loginForm = document.getElementById("login-form");
        const signupForm = (
            <div className="signup-form">
                <h1>Welcome to Eventize!</h1>
                <span>Please complete your registration.</span>
                <label>Email address<input type="text" /></label>
                <label>Password<input type="password" /></label>
                <input type="submit" value="Sign In" />
                <input type="submit" value="Join us" />
            </div>
        )
        loginForm.parentNode.replaceChild(signupForm, loginForm)
    }

    render(){
        return(
            <div className="session-box">
                <span onClick={this.removeSessionModal}>x</span>
                <div className="login-form">
                    <h1>Let's get started</h1>
                    <span>Enter your email and password to continue.</span>
                    <label>Email address<input type="text" onChange={this.handleInput('email')}/></label>
                    <label>Password<input type="password" onChange={this.handleInput('password')}/></label>
                    <input type="submit" value="Sign In" onClick={this.handleLogin}/>
                    <input type="submit" value="Join us" onClick={this.renderSignupForm}/>
                </div>
            </div>
        )
    }
}