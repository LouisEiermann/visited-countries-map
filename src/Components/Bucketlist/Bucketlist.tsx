import React, { useEffect, useState } from "react";
import BucketlistItem from "./BucketlistItem";
import styles from "./style.module.css";
import Popup from "./Popup";

const Bucketlist = () => {
  const [listitems, setListItems] = useState<any[]>([]);
  const [popup, setPopup] = useState(false);
  const [popupType, setPopupType] = useState("");
  const [listitem, setListitem] = useState({});
  useEffect(() => {
    fetch("http://localhost:9000/readitems", { method: "GET" }).then((res) => {
      res.json().then((data) => {
        console.log(data);
        setListItems(data);
      });
    });
  }, []);
  return (
    <div className={styles.container}>
      <h1>Bucket List</h1>
      <button
        onClick={() => {
          setPopup(true);
          setPopupType("add");
        }}
      >
        Add Activity
      </button>
      {listitems.map((listitem) => {
        return (
          <BucketlistItem
            listitem={listitem}
            openPopup={(e) => {
              setPopup(true);
              setPopupType("edit");
              setListitem(listitem);
            }}
          />
        );
      })}
      {popup ? (
        <Popup
          popuptype={popupType}
          listitem={listitem}
          closePopup={(e) => {
            setPopup(false);
          }}
        />
      ) : null}
    </div>
  );
};

export default Bucketlist;
