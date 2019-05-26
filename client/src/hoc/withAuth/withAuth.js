import React, { Component } from 'react';
import AuthHelper from '../../helpers/AuthHelper';

export default function withAuth(AuthComponent) {
    const Auth = new AuthHelper();
    
    return class AuthWrapped extends Component {
        state = {
            confirm: null,
            loaded: false
        }

        componentWillMount() {
            if (!Auth.loggedIn()) {
                this.props.history.replace('/login');
            } else {
                try {
                    const confirm = Auth.getConfirm();
                    console.log("Confirmation is: ", confirm);
                    this.setState({
                        confirm: confirm,
                        loaded: true
                    });
                }
                catch(err) {
                    console.log(err);
                    Auth.logout();
                    this.props.history.replace('/login')
                }
            }
        }

        render () {
            if (this.state.loaded === true) {
                if (this.state.confirm) {
                    console.log("Confirmed");
                    return (
                        <AuthComponent 
                            histroy={this.props.history}
                            confirm={this.state.confirm} />
                    );
                }
                else {
                    console.log('not confirmed');
                    return null;
                }
            } else {
                console.log('not loaded');
                return null;
            }
        }
    }
}