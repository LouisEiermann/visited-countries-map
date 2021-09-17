import React from "react";
import styles from './style.module.css';

const BucketlistItem = () => {

    const activities = ["Activity 1", "Activity 2", "Activity 3", "Activity 4", "Activity 5"];

    return (
        <div>
            {activities.map(activity => (
                <div className={styles.container}>
                    <div>{activity}</div>
                    <input type="checkbox"/>
                </div>
            ))}
        </div>
    );
};

export default BucketlistItem;