import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import AuthHelper from '../../../helpers/AuthHelper';

import Input from '../../../components/Input/Input';

class LoginPage extends Component {
    Auth = new AuthHelper();

    state = {
        email: "",
        password: ""
    }
    
    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    formSubmitHandler = (event) => {
        event.preventDefault();
        this.Auth.login(this.state.email, this.state.password)
            .then(res => {
                if (res === false) {
                    return alert("Sorry wrong password or email");
                }
                this.props.history.replace("/home");
            })
            .catch(err => {
                alert(err);
            })
    }
    
    componentWillMount() {
        if (this.Auth.isLoggedIn()) {
            this.props.history.replace('/');
        };
    }

    render () {
        return (
            <form onSubmit={this.formSubmitHandler}>
                <h4>Enter your name.</h4>            
                <Input 
                    name="email"
                    placeholder="Enter your email"
                    type="email"
                    change={this.handleChange} />
                <Input 
                    name="password"
                    placeholder="Enter your password"
                    type="password"
                    change={this.handleChange} />
                <button type="submit">Submit</button>
            </form>
        );
    }
}

export default LoginPage;