import React from "react";
import styles from "./style.module.css";

const BucketlistItem = (props) => {
  const openPopup = () => {
    props.openPopup(props.listitem);
  };

  return (
    <div className={styles.itemContainer}>
      <div>{props.listitem.activity}</div>
      <input type="checkbox" defaultChecked={props.listitem.done} />
      <button onClick={openPopup}>Edit</button>
    </div>
  );
};

export default BucketlistItem;
