import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import { withRouter } from 'react-router';

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
    user: null
  }
  
  componentDidMount() {
    this.callBackendAPI()
      .then(res => {
      console.log(res.data.message);
      this.setState({ message: res.data.message })
    })
      .catch(err => console.log(err))
    axios.post("/admin")
      .then(res => {
        const user = res.data;
        console.log(user);
        if (user.isAdmin) {
          this.setState({
            isAdmin: user.isAdmin,
            user: user,
            anonymous: this.state.anonymous
          });
        }
      });
  }

  callBackendAPI = () => {
    return axios.get('/express-backend')
  }

  logoutHandler = () => {
      this.Auth.logout();
      this.setState({
        anonymous: true,
        isAdmin: false,
        user: null
      });
      this.props.history.replace('/login');
  }

  render () {
    return (
      <div className="App">
        <header className="App-header">
            <NavigationItems logout={this.logoutHandler} />
            {this.state.message}
            <Switch>
                <Route path="/home" render={() => <HomePage history={this.props.history} />} />
                <Route path="/login" render={() => <LoginPage submit={this.signInHandler} history={this.props.history} /> } />
                <Route path="/register" render={() => <RegisterPage submit={this.signInHandler} history={this.props.history} /> } />
                <Route path="/admin" render={() => <AdminPage 
                  history={this.props.history} 
                  anonymous={this.state.anonymous}
                  isAdmin={this.state.isAdmin}
                  user={this.state.user} />} />
            </Switch>
        </header>
      </div>
    );
  }
}

export default withRouter(App);
