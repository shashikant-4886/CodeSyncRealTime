import React from "react";

const ConnectedUserCard = ({ data }) => {
  return (
    <div className="user" title={data?.userName}>
      {data?.userName?.slice(0,3)}
    </div>
  );
};

export default ConnectedUserCard;
