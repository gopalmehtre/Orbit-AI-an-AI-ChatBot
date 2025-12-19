import React from 'react'
import './Sidebar.css';
import { useContext, useEffect } from 'react';
import { Context } from '../contexts/context.jsx';
import {v1 as uuidv1} from "uuid";
import api from '../services/api.js';

export default function Sidebar() {

  const {allThreads, setAllThreads, currThreadId, setNewChat, setPrompt, setReply, setCurrThreadId, setPrevChats} = useContext(Context);

  const getAllThreads = async() => {
    try {
      const response = await api.get('/thread');
      const res = await response.data;
      const filterData = res.map(thread => ({threadId : thread.threadId, title: thread.title}));

      setAllThreads(filterData);
    } catch(err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getAllThreads();
  },[currThreadId])

  const createNewChat = () => {
    setNewChat(true);
    setPrompt('');
    setReply(null);
    setCurrThreadId(uuidv1());
    setPrevChats([]);
  }

  const changeThread = async(newThreadId) => {
    setCurrThreadId(newThreadId);

    try{
      const response = await api.get(`/thread/${newThreadId}`);
      const res = await response.json();
      console.log(res);
      setPrevChats(res);
      setNewChat(false);
      setReply(null);
      
    } catch(err) {
      console.log(err);
      
    }
  }

  const deleteThread = async (threadId) => {
        try {
            const response = await api.delete(`/thread/${threadId}`);
            const res = await response.json();
            console.log(res);

            //updated threads re-render
            setAllThreads(prev => prev.filter(thread => thread.threadId !== threadId));

            if(threadId === currThreadId) {
                createNewChat();
            }

        } catch(err) {
            console.log(err);
        }
    }

  return (
    <section className='sidebar'>
        <button onClick={createNewChat}>
            <h3><i className="fa-solid fa-user-astronaut fa-2xl"></i> Orbit - AI</h3>
            <span>
                <i className="fa-solid fa-pen-to-square fa-xl"></i>
            </span>
        </button>

        <ul className="history">
                {
                    allThreads?.map((thread, idx) => (
                        <li key={idx} 
                            onClick={(e) => changeThread(thread.threadId)}
                            className={thread.threadId === currThreadId ? "highlighted": " "}
                        >
                            {thread.title}
                            <i className="fa-solid fa-trash"
                                onClick={(e) => {
                                    e.stopPropagation(); //stop event bubbling
                                    deleteThread(thread.threadId);
                                }}
                            ></i>
                        </li>
                    ))
                }
            </ul>
 
            <div className="sign">
                <p>By Gopal</p>
            </div>
    </section>
  )
}
