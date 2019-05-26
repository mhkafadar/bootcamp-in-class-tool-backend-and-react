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

class App extends Component {
  state = {
    message: '',
  }
  
  componentDidMount() {
    this.callBackendAPI()
      .then(res => {
      console.log(res.data.message);
      this.setState({ message: res.data.message })
    })
      .catch(err => console.log(err))
  }

  callBackendAPI = () => {
    return axios.get('/express-backend')
  }

  signInHandler = (event) => {
    event.preventDefault();
    const name = event.target[0].value;
    this.props.history.push('/home');
  }

  render () {
    const name = this.state.name;

    return (
      <div className="App">
        <header className="App-header">
            <NavigationItems />
            {this.state.message}
            <Switch>
                <Route path="/home" render={() => <HomePage history={this.props.history} />} />
                <Route path="/login" render={() => <LoginPage submit={this.signInHandler} history={this.props.history} /> } />
                <Route path="/register" render={() => <RegisterPage submit={this.signInHandler} history={this.props.history} /> } />
                <Route path="/admin" render={() => <AdminPage history={this.props.history} />} />
            </Switch>
        </header>
      </div>
    );
  }
}

export default withRouter(App);
