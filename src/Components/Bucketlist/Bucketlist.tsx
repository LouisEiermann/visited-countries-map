import React, { useEffect, useState } from "react";
import BucketlistItem from "./BucketlistItem";
import styles from "./style.module.css";
import Popup from "./Popup";
import { BucketListItemsContext } from "../../contexts/bucketListItemsContext";

const Bucketlist = () => {
  const [popup, setPopup] = useState(false);
  const [popupType, setPopupType] = useState("");
  const [itemToEdit, setItemToEdit] = useState({});
  //@ts-ignore
  const [state, dispatch] = React.useContext(BucketListItemsContext);
  const updateData = () => {
    fetch("/readitems", { method: "GET" }).then((res) => {
      res.json().then((data) => {
        dispatch({ type: "add_all", payload: data });
      });
    });
  };
  useEffect(() => {
    fetch("/readitems", { method: "GET" }).then((res) => {
      res.json().then((data) => {
        dispatch({ type: "add_all", payload: data });
      });
    });
  }, []);
  return (
    <div className={styles.container}>
      <h1>Bucket List</h1>
      <button
        className={styles.addActivityButton}
        onClick={() => {
          setPopup(true);
          setPopupType("add");
        }}
      >
        Add Activity
      </button>
      {state.items.map((listitem) => {
        return (
          <BucketlistItem
            key={listitem._id}
            listitem={listitem}
            openPopup={(e) => {
              setPopup(true);
              setPopupType("edit");
              setItemToEdit(e);
            }}
          />
        );
      })}
      {popup ? (
        <Popup
          listitem={itemToEdit}
          popuptype={popupType}
          closePopup={(e) => {
            setPopup(false);
          }}
          updateData={(e) => {
            updateData();
          }}
        />
      ) : null}
    </div>
  );
};

export default Bucketlist;
