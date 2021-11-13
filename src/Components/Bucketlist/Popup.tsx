import styles from "./style.module.css";
import React from "react";

const Popup = (props) => {
  const initialData = {
    _id: null,
    activity: "",
    done: false,
  };

  if (props.popuptype === "edit") {
    initialData._id = props.listitem._id;
    initialData.activity = props.listitem.activity;
    initialData.done = props.listitem.done;
  }

  const [listitem, updateListitem] = React.useState(initialData);
  const closePopup = () => {
    props.closePopup(false);
  };

  const handleChange = (e) => {
    updateListitem({
      ...listitem,
      // Trimming any whitespace
      activity: e.target.value.trim(),
    });
    console.log(listitem);
  };

  const submitActivity = (e) => {
    e.preventDefault();
    fetch("http://localhost:9000/createitem", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(listitem),
    });
    closePopup();
  };

  const updateActivity = (e) => {
    e.preventDefault();
    console.log(listitem);
    fetch("http://localhost:9000/updateitem", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(listitem),
    });
    closePopup();
  };

  const deleteActivity = (e) => {
    e.preventDefault();
    fetch("http://localhost:9000/deleteitem", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(props.listitem),
    });
    closePopup();
  };

  if (props.popuptype === "add") {
    return (
      <div className={styles.popup}>
        <div>Add Activity</div>
        <input type="text" name="activity" onChange={handleChange} />
        <button onClick={submitActivity}>Save</button>
        <button onClick={closePopup}>Close</button>
      </div>
    );
  } else {
    return (
      <div className={styles.popup}>
        <div>Edit Activity</div>
        <input
          type="text"
          onChange={handleChange}
          defaultValue={props.listitem.activity}
        />
        <button onClick={updateActivity}>Save</button>
        <button onClick={deleteActivity}>Delete</button>
        <button onClick={closePopup}>Close</button>
      </div>
    );
  }
};

export default Popup;
