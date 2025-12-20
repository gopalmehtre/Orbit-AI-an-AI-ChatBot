import React, { useContext, useEffect, useState } from 'react'
import "./ChatWindow.css";
import Chat from './Chat.jsx';
import {ScaleLoader} from 'react-spinners';
import { Context } from '../contexts/context.jsx';
import api from '../services/api.js';
import { v1 as uuidv1 } from "uuid";

export default function ChatWindow() {
  const {prompt, setPrompt, reply, setReply, currThreadId, setCurrThreadId, setPrevChats, setNewChat} = useContext(Context);
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if(!currThreadId) {
      setCurrThreadId(uuidv1());
    }
  }, [currThreadId, setCurrThreadId]);

  const getReply = async () => {
    if (!prompt || !currThreadId) {
      console.log("Missing prompt or threadId");
      setLoading(false);
      return;
    }

    setLoading(true);
    setNewChat(false);

    try {
      const response = await api.post('/chat', {
        message: prompt,
        threadId: currThreadId
      });
      const res = response.data;
      console.log(res);
      setReply(res.reply);

    } catch (err) {
      console.log(err);
    }
    setLoading(false);
  }

  useEffect(() => {
    if(prompt && reply) {
      setPrevChats(prevChats => 
        [...prevChats, {
          role: 'user',
          content: prompt,
        }, {
          role: 'assistant',
          content: reply
        }]
      );
    }
    setPrompt('');
  }, [reply]);

  const handleProfileClick = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className='chatWindow'>
      <div className='navbar'>
        <span>Orbit - AI <i className="fa-solid fa-chevron-down"></i></span>
        <div className='userIconDiv' onClick={handleProfileClick} >
            <span className='userIcon'>
              <i className="fa-solid fa-user"></i>
            </span>
        </div>
      </div>
      {
        isOpen &&
        <div className='dropDown'>
          <div className="dropDownItem"><i class="fa-solid fa-gear"></i> Settings</div>
          <div className="dropDownItem"><i class="fa-solid fa-cloud-arrow-up"></i> Upgrade plan</div>
          <div className="dropDownItem"><i class="fa-solid fa-arrow-right-from-bracket"></i> Log out</div>
        </div>
}
      <Chat/>

      {loading && <ScaleLoader color='#fff' />}

      <div className='chatInput'>
        <div className='inputBox'>
          <input placeholder='Ask anything' value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' ? getReply(): ''} />
          <button id='submit' onClick={getReply}>
            <i className="fa-solid fa-paper-plane">
          </i></button>
        </div>
        <p className='info'>
          AI can make mistakes. Use your Brain!
        </p>
      </div>
    </div>
  )
}
