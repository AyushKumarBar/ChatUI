import React, { useState, useEffect, useRef } from "react";
import NavBar from "./Components/NavBar";
import Text from "./Components/Text";
import Chat from "./chat.json";
import Input from "./Components/Input";
import "./App.css";

const App = () => {
  const [textMessage, setTextMessage] = useState([]);
  const scrollableContainerRef = useRef();

  const addMessage = (sender, message, timestamp = new Date().toISOString().slice(0, 19).replace("T", " ")) => {
    setTextMessage((prev) => [
      ...prev,
      {
        sender,
        timestamp,
        message,
      },
    ]);
  };

  const addBouncingDots = async () => {
    addMessage("assistant", <div key={Date.now()} className="bouncing-dots">
      {[1, 2, 3].map((index) => (
        <div key={index} className="bouncing-dot"></div>
      ))}
    </div>);

    await new Promise((resolve) => setTimeout(resolve, 1000));

    setTextMessage((prev) => {
      // Remove the bouncing dots message
      const updatedMessages = prev.filter((msg) => !React.isValidElement(msg.message));
      return updatedMessages;
    });
  };



  const getRandomAssistantMessage = () => {
    return Chat.chat[Math.floor(Math.random() * Chat.chat.length)].message;
  };

  const handleUserInput = (txt) => {
    addMessage("user", txt);
    addBouncingDots();

    setTimeout(() => {
      addMessage("assistant", getRandomAssistantMessage());
    }, 1100);
  };

  useEffect(() => {
    scrollableContainerRef.current.scrollTop = scrollableContainerRef.current.scrollHeight;
  }, [textMessage]);

  const timeFormat = (time, message) => {
    if (message === ". . .") {
      return "";
    } else if (!time) {
      return ""; // Handle cases where time is not available
    } else {
      return new Date(time).toLocaleString("en-US", {
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
      });
    }
  };

  return (
    <>
      <div>
        <NavBar />
      </div>
      <div className="container col-12 col-xxl-8 p-0" style={{ backgroundColor: "#FFEEDD" }}>
        <div ref={scrollableContainerRef} className="my-0 w-100 px-2" style={{ height: "80vh", overflowY: "auto" }}>
          {textMessage.map((chat, id) => (
            <div key={id} className={`d-flex justify-content-${chat.sender === "assistant" ? "start" : "end"} mb-2`}>
              <Text
                text={chat.message}
                user={chat.sender === "user" ? chat.sender : null}
                time={timeFormat(chat.timestamp, chat.message)}
              />
            </div>
          ))}
        </div>

        <div>
          <Input sendMessage={handleUserInput} />
        </div>
      </div>
    </>
  );
};

export default App;
