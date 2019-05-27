import React from 'react';

import { NavLink } from 'react-router-dom';
import styles from './NavigationItem.module.css';

const NavigationItem = (props) => {
    return (
        <li className={styles.NavigationItem + ' ' +  (props.isActive ? styles.ActiveLink : '')}>
            <NavLink 
                onClick={props.click}
                to={props.link}
                exact={props.exact} >
                    {props.children}
            </NavLink>
        </li>
    );
}

export default NavigationItem;