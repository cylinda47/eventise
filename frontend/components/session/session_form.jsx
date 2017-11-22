import React from 'react';

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
        this.handleInput = this.handleInput.bind(this);
        this.handleLogin = this.handleLogin.bind(this);

    }

    handleInput(field) {
        return event => this.setState({ [field]: event.target.value })
    }

    handleSubmit() {
        event.preventDefault();
    }

    render(){
        return(
            <div className="session-box">
                <div className="login-form">
                    <h1>Let's get started</h1>
                    <span>Enter your email and password to continue.</span>
                    <label>Email address<input type="text" onChange={this.handleInput('email')}/></label>
                    <label>Password<input type="password" onChange={this.handleInput('password')}/></label>
                    <input type="submit" value="Sign In" onClick={this.handleLogin}/>
                    <input type="submit" value="Join us" />
                </div>
            </div>
        )
    }
}