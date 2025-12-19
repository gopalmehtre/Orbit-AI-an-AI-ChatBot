import React, { createContext, useState } from "react";

export const Context = createContext();

export const ContextProvider = ({ children }) => {
  const [prompt, setPrompt] = useState("");
  const [reply, setReply] = useState("");
  const [currThreadId, setCurrThreadId] = useState(null);
  const [prevChats, setPrevChats] = useState([]);
  const [newChat, setNewChat] = useState(false);

  return (
    <Context.Provider value={{
      prompt, setPrompt,
      reply, setReply,
      currThreadId, setCurrThreadId,
      prevChats, setPrevChats,
      newChat, setNewChat
    }}>
      {children}
    </Context.Provider>
  );
};