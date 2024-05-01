import React, { useState } from "react";

export default function Input(props) {
  const [text, setText] = useState("");
  function handleSend(e) {
    if (text.length !== 0) {
      props.sendMessage(text);
      setText("");
    }
  }

  return (
    <div
      style={{ backgroundColor: "#FFEEDD" }}
      className="container d-flex align-items-center  p-2 my-2 px-5 fixed-bottom  "
    >
      <input
        id="input"
        placeholder="Message"
        style={{ height: "40px" }}
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="w-100 p-3 rounded-4 border-1"
        type="text"
      />
      <button
        onClick={handleSend}
        style={{
          backgroundColor: "#E29578",
        }}
        className="text-light material-symbols-outlined  p-2 rounded-5 border-0 mx-2"
      >
        send
      </button>
    </div>
  );
}
