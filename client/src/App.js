import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import { withRouter } from 'react-router';
import socketIOClient from "socket.io-client";

import AdminPage from './containers/AdminPage/AdminPage';
import HomePage from './components/HomePage/HomePage';
import LoginPage from './containers/Authentication/LoginPage/LoginPage';
import RegisterPage from './containers/Authentication/RegisterPage/RegisterPage';
import NavigationItems from './components/Navigation/NavigationItems/NavigationItems';

import './App.css';
import axios from './axios';
import AuthHelper from './helpers/AuthHelper';

class App extends Component {
  Auth = new AuthHelper();

  state = {
    message: '',
    anonymous: true,
    isAdmin: false,
    user: null,
    email: '',
    password: ''
  }
  
  componentDidMount() {
    console.log('app js did mount');
    const endpoint = "http://localhost:5000";
    const socket = socketIOClient(endpoint);
    socket.on("otgoin data", data => console.log("response data is", data));
  }

  componentDidCatch() {
    console.log('component did catch');
  }

  componentDidUpdate(prevProps, prevState) {
    console.log('this.state.anon ', this.state.anonymous);
    console.log('prevState.anon ', prevState.anonymous);
    if (this.state.anonymous !== prevState.anonymous) {
    console.log('component did update');   
    this.callBackendAPI()
      .then(res => {
        console.log(res.data.message);
        this.setState({
          message: res.data.message
        })
      })
    .catch(err => console.log(err))
    console.log('admin post req will be sent');
    axios.post("/admin")
      .then(res => {
        const user = res.data;
        console.log('here is the user ', user);
      });
    }
  }

  // shouldComponentUpdate(nextProps, nextState) {
  //   console.log('should component update?');
  //   console.log('nextState', nextState);
  //   console.log('this.state ', this.state);
  //   console.log(nextState !== this.state);
  //   return nextState !== this.state
  // }

  componentWillReceiveProps(nextProps) {
    console.log('existing props, ', this.props);
    console.log('nextProps ', this.nextProps);

  }

  callBackendAPI = () => {
    console.log('express-backend route called');
    return axios.get('/express-backend')
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  loginformSubmitHandler = async (event) => {
    event.preventDefault();
    await this.Auth.login(this.state.email, this.state.password)
      .then(res => {
        if (res === false) {
          return alert("Sorry wrong password or email");
        }
        console.log('res ', res);
        console.log('res.data ', res.data);
        this.setState({
          email: null,
          password: null,
          anonymous: false,
          user: res.data.user,
        });
        this.props.history.replace("/home");
      })
      .catch(err => {
        alert(err);
      })
  }

  logoutHandler = () => {
      this.setState({
        anonymous: true,
        isAdmin: false,
        user: null,
        message: null
      });
      this.Auth.logout();      
      this.props.history.replace('/login');
  }

  render () {
    console.log(this.state);
    return (
      <div className="App">
        <header className="App-header">
            <NavigationItems logout={this.logoutHandler} />
            {this.state.message}
            <Switch>
                <Route path="/home" render={() => <HomePage history={this.props.history} />} />
                <Route path="/login" render={() => <LoginPage change={this.handleChange} submitLoginForm={this.loginformSubmitHandler} history={this.props.history} /> } />
                <Route path="/register" render={() => <RegisterPage submit={this.signInHandler} history={this.props.history} /> } />
                <Route path="/admin" render={() => <AdminPage 
                  history={this.props.history} 
                  anonymous={this.state.anonymous}
                  user={this.state.user} />} />
            </Switch>
        </header>
      </div>
    );
  }
}

export default withRouter(App);
