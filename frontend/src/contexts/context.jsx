
import React, { createContext, useState } from "react";

export const Context = createContext();

export const ContextProvider = ({ children }) => {
  const [prompt, setPrompt] = useState("");
  const [reply, setReply] = useState("");
  const [currThreadId, setCurrThreadId] = useState(null);
  const [prevChats, setPrevChats] = useState([]);
  const [newChat, setNewChat] = useState(true);
  const [allThreads, setAllThreads] = useState([]);

  return (
    <Context.Provider value={{
      prompt, setPrompt,
      reply, setReply,
      currThreadId, setCurrThreadId,
      prevChats, setPrevChats,
      newChat, setNewChat,
      allThreads, setAllThreads
    }}>
      {children}
    </Context.Provider>
  );
};