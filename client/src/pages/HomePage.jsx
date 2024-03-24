import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { v4 as uuidv4 } from "uuid";

const HomePage = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({ roomId: "", userName: "" });

  const onChangeHandaler = (e) => {
    let value = e.target.value;
    setUserData((prev) => {
      return { ...prev, [e.target.name]: value.toUpperCase() };
    });
  };

  const createNewRoom = () => {
    let room_id = uuidv4();
    setUserData((prev) => {
      return { ...prev, roomId: room_id.toUpperCase() };
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();

    if (!userData.roomId || !userData.userName) {
      return toast.error("Please Fill The Fields !!! ");
    }

    navigate(`/editor/${userData.roomId}`, { state: userData });
  };

  return (
    <div className="home_page">
      <div className="form">
        <div className="logo">
          <h2>Shashikant</h2>
          <p>Code Sync</p>
        </div>
        <form className="join_form" onSubmit={onSubmit}>
          <div className="input">
            <label htmlFor="room_id">Enter Your Room Id</label>
            <input
              type="text"
              id="room_id"
              placeholder="Room Id"
              name="roomId"
              onChange={onChangeHandaler}
              value={userData.roomId}
            />
          </div>
          <div className="input">
            <label htmlFor="user_name">Enter Your User Name</label>
            <input
              type="text"
              id="user_name"
              placeholder="User Name"
              name="userName"
              onChange={onChangeHandaler}
              value={userData.userName}
            />
          </div>

          <div className="join">
            <button type="submit" className="fill_btn">
              Join Now
            </button>
          </div>
        </form>

        <div className="message">
          <p>You Can Create Invitation</p>
          <button className="text_btn" onClick={createNewRoom}>
            Click Here
          </button>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
