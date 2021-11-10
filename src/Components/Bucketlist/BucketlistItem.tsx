import React from "react";

const BucketlistItem = (props) => {
  return (
    <div>
      <div>
        <div>{props.listitem.activity}</div>
        <input type="checkbox" checked={props.listitem.done} />
      </div>
    </div>
  );
};

export default BucketlistItem;
