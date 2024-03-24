import React from "react";
import { useLocation, useParams } from "react-router-dom";

const EditorPage = () => {
  const { room_id } = useParams();
  const { state: userData } = useLocation();
  const { userName } = userData;

  console.log(room_id, userName);

  return (
    <div className="editor">
      <div className="sidePanal">
        <div className="logo">
          <h2>Shashikant</h2>
          <p>Code Sync</p>
        </div>
      </div>
      <div className="codeEditor"></div>
    </div>
  );
};

export default EditorPage;
