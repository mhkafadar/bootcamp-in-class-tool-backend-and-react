import React, { Component } from 'react';
import { withRouter } from 'react-router';

import styles from './NavigationItems.module.css';
import NavigationItem from './NavigationItem/NavigationItem';

class NavigationItems extends Component {
    isActive = (link) => {
        return this.props.location.pathname === link;
    }

    render () {
        return (
            <ul className={styles.NavigationItems}>
                <NavigationItem isActive={this.isActive("/login")} link="/login">Login</NavigationItem>
                <NavigationItem isActive={this.isActive("/register")} link="/register">Register</NavigationItem>
                <NavigationItem isActive={this.isActive("/home")} link="/home">Home</NavigationItem>
                <NavigationItem isActive={this.isActive("/admin")} link="/admin">Admin</NavigationItem>
            </ul>
        );
    }
}

export default withRouter(NavigationItems);