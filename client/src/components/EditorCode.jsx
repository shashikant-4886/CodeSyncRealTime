import React, { useEffect, useRef } from "react";
import CodeMirror from "codemirror";
// import "codemirror/mode/javascript/javascript";

const EditorCode = () => {
  const codeTextArea = useRef();

  const init = async () => {
    // CodeMirror.fromTextArea(codeTextArea.current, {
    //   mode: { name: "javascript", json: true },
    // });
  };

  useEffect(() => {
    init();
  }, []);

  return (
    <div>
      <textarea ref={codeTextArea}></textarea>
    </div>
  );
};

export default EditorCode;
