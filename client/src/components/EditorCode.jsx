import React, { useCallback, useEffect, useRef, useState } from "react";
import CodeMirror from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";
import { nord, nordInit } from "@uiw/codemirror-theme-nord";

const EditorCode = () => {
  const [code, setCode] = useState("console.log('hello world!');");

  const onChange = useCallback((val, viewUpdate) => {
    console.log("val:", val);
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
