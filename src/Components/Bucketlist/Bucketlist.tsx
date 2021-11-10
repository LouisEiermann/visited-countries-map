import React, { useEffect, useState } from "react";
import BucketlistItem from "./BucketlistItem";
import styles from "./style.module.css";

const Bucketlist = () => {
  const [listitems, setListItems] = useState<any[]>([]);
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
      <h1>Bucket List:</h1>
      {listitems.map((listitem) => {
        return <BucketlistItem listitem={listitem} />;
      })}
    </div>
  );
};

export default Bucketlist;
