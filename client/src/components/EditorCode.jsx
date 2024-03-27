import React, { useCallback, useEffect, useRef, useState } from "react";
import CodeMirror from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";
import { nord, nordInit } from "@uiw/codemirror-theme-nord";
import { ACTIONS } from "../socket.io/actions";

const EditorCode = ({ code, setCode, SocketRef, room_id }) => {
  const onChange = useCallback((val, viewUpdate) => {
    SocketRef.current.emit(ACTIONS.CODE_CHANGE, {
      roomId: room_id,
      code: val,
    });
    setCode(val);
  }, []);

  return (
    <CodeMirror
      value={code}
      height="100%"
      extensions={[javascript({ jsx: true })]}
      onChange={onChange}
      theme={nord}
    />
  );
};

export default EditorCode;
