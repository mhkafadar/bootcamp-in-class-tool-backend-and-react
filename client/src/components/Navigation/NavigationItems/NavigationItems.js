import React, { Component } from 'react';
import { withRouter } from 'react-router';

import AuthHelper from '../../../helpers/AuthHelper';
import styles from './NavigationItems.module.css';
import NavigationItem from './NavigationItem/NavigationItem';

class NavigationItems extends Component {
    Auth = new AuthHelper();

    isActive = (link) => {
        return this.props.location.pathname === link;
    }

    render () {
        const navBar = (this.Auth.isLoggedIn()) ? (
                <ul className={styles.NavigationItems}>
                    <NavigationItem isActive={this.isActive("/home")} link="/home">Home</NavigationItem>
                    <NavigationItem isActive={this.isActive("/admin")} link="/admin">Admin</NavigationItem>
                    <NavigationItem click={this.props.logout} link="/login">Logout</NavigationItem>
                </ul>
            )
         : (
                <ul className={styles.NavigationItems}>
                    <NavigationItem isActive={this.isActive("/login")} link="/login">Login</NavigationItem>
                    <NavigationItem isActive={this.isActive("/register")} link="/register">Register</NavigationItem>
                </ul>
            )
        return navBar; 
    }
}

export default withRouter(NavigationItems);