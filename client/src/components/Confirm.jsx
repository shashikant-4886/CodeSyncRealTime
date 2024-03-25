import React from "react";

const Confirm = ({ visibal, title, description, accept, reject }) => {
  return visibal ? (
    <div className="confirm">
      <div className="mainPopup">
        <h3 className="title">{title}</h3>
        <p className="description">{description}</p>

        <div className="controll">
          <button className="fill_btn calcle_btn" onClick={reject}>Cancle</button>
          <button className="fill_btn" onClick={accept}>Yes</button>
        </div>
      </div>
    </div>
  ) : (
    ""
  );
};

export default Confirm;
