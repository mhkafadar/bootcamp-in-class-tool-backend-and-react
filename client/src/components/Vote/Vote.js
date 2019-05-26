import React from 'react';

import styles from './Vote.module.css';

const Vote = (props) => {
    return (
        <div className={styles.Vote}>
            < div className = {
                styles.Rectangle + ' ' + styles.Green
            } >
                <p className={styles.Text}>Finished!</p>
            </div>

            <div className={styles.Rectangle + ' ' + styles.Red}>
                <p className={styles.Text}>I'm LOST!</p>
            </div>
        </div>
    );
}

export default Vote;