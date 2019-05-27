import React, { Component } from 'react';
import axios from '../../axios';

import Welcome from '../Welcome/Welcome';
import Vote from '../Vote/Vote';
import AuthHelper from '../../helpers/AuthHelper';

class HomePage extends Component {
    Auth = new AuthHelper();

    getName = () => {
        const user = this.Auth.getConfirm().firstName;
        return user;
    }

    render() {
        const name = this.getName();
        return (
            <div>
                <Welcome name={name} />
                <Vote />
            </div>
        );
    }
}

export default HomePage;