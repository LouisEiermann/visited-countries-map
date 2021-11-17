import styles from "./style.module.css";
import React from "react";

const BucketlistItem = (props) => {
  let listitem = {};
  Object.assign(listitem, props.listitem);

  const openPopup = () => {
    props.openPopup(props.listitem);
  };

  const handleChange = (e) => {
    //@ts-ignore
    listitem.done = e.target.checked;
    updateActivity();
  };

  const updateData = () => {
    setTimeout(() => {
      props.updateData();
    }, 100);
  };

  const updateActivity = () => {
    fetch("/updateitem", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(listitem),
    }).then(() => {
      updateData();
    });
  };

  return (
    <div className={styles.itemContainer}>
      <div>{props.listitem.activity}</div>
      <input
        type="checkbox"
        name="done"
        onChange={(e) => handleChange(e)}
        defaultChecked={props.listitem.done}
        className={styles.checkbox}
      />
      <button onClick={openPopup}>Edit</button>
    </div>
  );
};

export default BucketlistItem;
