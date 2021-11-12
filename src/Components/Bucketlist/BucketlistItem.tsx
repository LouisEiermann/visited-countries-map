import React from "react";
import styles from "./style.module.css";

const BucketlistItem = (props) => {
  return (
    <div className={styles.itemContainer}>
      <div>{props.listitem.activity}</div>
      <input type="checkbox" checked={props.listitem.done} />
      <button>Edit</button>
    </div>
  );
};

export default BucketlistItem;
