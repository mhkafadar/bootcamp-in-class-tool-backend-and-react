import React from 'react';

import styles from './Input.module.css';

const Input = (props) => {
    return (
        <div>
            <input 
                className={styles.Input} 
                placeholder={props.placeholder}
                name={props.name}
                type={props.type}
                onChange={props.change} ></input>  
        </div>
    );
}

export default Input;