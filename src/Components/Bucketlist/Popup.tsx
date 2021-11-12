import styles from "./style.module.css";
import React from "react";

const Popup = (props) => {
  const initialData = Object.freeze({
    activity: "",
    done: false,
  });

  const [data, updateData] = React.useState(initialData);
  const closePopup = () => {
    props.closePopup(false);
  };

  const handleChange = (e) => {
    updateData({
      ...data,
      // Trimming any whitespace
      [e.target.name]: e.target.value.trim(),
    });
  };

  const submitActivity = (e) => {
    e.preventDefault();
    fetch("http://localhost:9000/createitem", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
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
      <div className={styles.popup + " " + styles.container}>
        <div>Add Activity</div>
        <input type="text" name="activity" onChange={handleChange} />
        <button onClick={submitActivity}>Save</button>
        <button onClick={closePopup}>Close</button>
      </div>
    );
  } else {
    return (
      <div className={styles.popup + " " + styles.container}>
        <div>Edit Activity</div>
        <input
          type="text"
          onChange={handleChange}
          value={props.listitem.activity}
        />
        <button onClick={submitActivity}>Save</button>
        <button onClick={deleteActivity}>Delete</button>
        <button onClick={closePopup}>Close</button>
      </div>
    );
  }
};

export default Popup;
