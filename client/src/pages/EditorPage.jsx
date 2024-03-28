import React, { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import ConnectedUserCard from "../components/ConnectedUserCard";
import EditorCode from "../components/EditorCode";
import Confirm from "../components/Confirm";
import { initSocket } from "../socket.io/socket";
import { ACTIONS } from "../socket.io/actions";
import { toast } from "react-toastify";

const EditorPage = () => {
  const { state: userData } = useLocation();
  const { userName } = userData;
  const { room_id } = useParams();
  const navigate = useNavigate();

  const [clientList, setClientList] = useState([]);
  const [code, setCode] = useState("console.log('hello world!');");

  const [leavRoomPopup, setLeavRoomPopup] = useState(false);

  const SocketRef = useRef(null);

  const handleError = (err) => {
    console.log("Connection Error =>>>>>", err);
    navigate("/");
    toast.error("Socket Connection Failed !!. Try again Later.");
  };

  const init = async () => {
    SocketRef.current = await initSocket();

    SocketRef.current.on("connect_error", (err) => {
      return handleError(err);
    });
    SocketRef.current.on("connect_failed", (err) => {
      return handleError(err);
    });

    SocketRef.current.emit(ACTIONS.JOIN, {
      room_id: room_id,
      userName: userName,
    });

    SocketRef.current.on(ACTIONS.JOINED, (data) => {
      console.log("DATA =>>>>>>>>>>>>>>>>>>>>>", data);
      if (userName !== data.userName) {
        toast.success(`${data.userName} is Join The Our Group !!`);
      } else {
        toast.success(`Welcone to the Group ${data.userName} !!`);
      }

      setClientList(data.clients);

      SocketRef.current.emit(ACTIONS.SYNC_CODE, {
        socket_id: data.socketId,
        room_id,
      });
    });

    SocketRef.current.on(ACTIONS.DISCONNECTED, ({ socket_id, userName }) => {
      toast.error(`${userName} Left the Room !!`);

      setClientList((prev) =>
        prev.filter((ele) => ele.socket_id !== socket_id)
      );
    });

    SocketRef.current.on(ACTIONS.CODE_CHANGE, ({ code: codeNew }) => {
      setCode(codeNew);
    });
  };

  useEffect(() => {
    init();

    return () => {
      SocketRef.current.disconnect({ roomId: room_id });
      SocketRef.current.off(ACTIONS.JOINED);
      SocketRef.current.off(ACTIONS.DISCONNECTED);
      SocketRef.current.off(ACTIONS.CODE_CHANGE);
    };
  }, []);

  const leavRoom = () => {
    navigate("/");

    setLeavRoomPopup((prev) => !prev);
    toast.success("Your Are Exit Room Successfully !!");
  };

  return (
    <>
      <div className="editor">
        <div className="sidePanal">
          <div className="upper_sourse">
            <div className="logo">
              <h2>Shashikant</h2>
              <p>Code Sync</p>
            </div>

            <div className="connected_users">
              <h4>Connected Users</h4>

              <div className="users">
                {clientList?.map((client) => {
                  return (
                    <ConnectedUserCard key={client.socket_id} data={client} />
                  );
                })}
              </div>
            </div>
          </div>
          <div className="side_bar_foot">
            <button
              className="fill_btn copy_room_id"
              onClick={() => {
                navigator.clipboard.writeText(room_id);
                toast.success("Room ID Copy Successfull !!");
              }}
            >
              Copy Room ID
            </button>
            <button className="fill_btn" onClick={() => setLeavRoomPopup(true)}>
              Leav Room
            </button>
          </div>
        </div>

        <div className="codeEditor">
          <EditorCode
            room_id={room_id}
            code={code}
            setCode={setCode}
            SocketRef={SocketRef}
          />
        </div>
      </div>

      {/* Leave Room Confirm Start ================>>>>>>>>>>>>>> */}
      <Confirm
        visibal={leavRoomPopup}
        title={"Title"}
        description={`Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ducimus in
          odit rerum vitae assumenda architecto aperiam, expedita, facere fuga
          odio officia explicabo provident debitis? Molestiae minima placeat
          delectus sapiente repudiandae.`}
        accept={() => {
          leavRoom();
        }}
        reject={() => {
          setLeavRoomPopup((prev) => !prev);
        }}
      />
      {/* Leave Room Confirm End ================>>>>>>>>>>>>>> */}
    </>
  );
};

export default EditorPage;
