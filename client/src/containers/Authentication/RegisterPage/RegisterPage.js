import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import AuthHelper from '../../../helpers/AuthHelper';

import Input from '../../../components/Input/Input';
import axios from '../../../axios';

class RegisterPage extends Component {
    Auth = new AuthHelper();

    state = {
        email: "",
        firstName: "",
        lastName: "",
        password: ""
    }
    
    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        });
        console.log(event.target.name);
    }

    formSubmitHandler = (event) => {
        event.preventDefault();
        axios.post("/register", {
            email: this.state.email,
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            password: this.state.password
        })
        .then(data => {
            this.props.history.replace("/login")
        })
    }

    componentWillMount() {
        if (this.Auth.isLoggedIn()) {
            this.props.history.replace('/');
        };
    }  

    render () {
        return (
            <React.Fragment>
                <form onSubmit={this.formSubmitHandler}>
                    <h4>Enter your name.</h4>            
                    <Input 
                        name="email"
                        placeholder="Email"
                        type="email"
                        change={this.handleChange} />
                    <Input 
                        name="firstName"
                        placeholder="First Name"
                        type="text"
                        change={this.handleChange} />
                    <Input 
                        name="lastName"
                        placeholder="Last Name"
                        type="text"
                        change={this.handleChange} />
                    <Input 
                        name="password"
                        placeholder="Password"
                        type="password"
                        change={this.handleChange} />
                    <button type="submit">Submit</button>
                </form>
            </React.Fragment>
        );
    }
}

export default RegisterPage;