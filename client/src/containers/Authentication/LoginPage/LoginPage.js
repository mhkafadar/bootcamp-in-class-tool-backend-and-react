import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import AuthHelper from '../../../helpers/AuthHelper';

import Input from '../../../components/Input/Input';

class LoginPage extends Component {
    Auth = new AuthHelper();

    componentWillMount() {
        if (this.Auth.isLoggedIn()) {
            this.props.history.replace('/');
        };
    }

    render () {
        return (
            <form onSubmit={this.props.submitLoginForm}>
                <h4>Enter your name.</h4>            
                <Input 
                    name="email"
                    placeholder="Enter your email"
                    type="email"
                    change={this.props.change} />
                <Input 
                    name="password"
                    placeholder="Enter your password"
                    type="password"
                    change={this.props.change} />
                <button type="submit">Submit</button>
            </form>
        );
    }
}

export default LoginPage;