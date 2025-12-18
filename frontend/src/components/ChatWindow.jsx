import React, { useContext, useState } from 'react'
import "./ChatWindow.css";
import Chat from './Chat.jsx';
import {ScaleLoader} from 'react-spinners';
import { Context } from '../contexts/context.jsx';

export default function ChatWindow() {
  const {prompt, setPrompt, reply, setReply, currThreadId, setPrevChats, setNewChat} = useContext(Context);
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const getReply = async() => {
    setLoading(true);
    setNewChat(true);

    console.log("message", prompt, "threadId", currThreadId);
    
  }

  return (
    <div className='chatWindow'>
      <div className='navbar'>
        <span>Orbit - AI <i className="fa-solid fa-chevron-down"></i></span>
        <div className='userIconDiv'>
            <span className='userIcon'>
              <i className="fa-solid fa-user"></i>
            </span>
        </div>
      </div>
      
        {/* <div className='dropDown'>
          <div className="dropDownItem"><i class="fa-solid fa-gear"></i> Settings</div>
          <div className="dropDownItem"><i class="fa-solid fa-cloud-arrow-up"></i> Upgrade plan</div>
          <div className="dropDownItem"><i class="fa-solid fa-arrow-right-from-bracket"></i> Log out</div>
        </div> */}
      
      <Chat/>

      {/* <ScaleLoader color='#fff'></ScaleLoader> */}

      <div className='chatInput'>
        <div className='inputBox'>
          <input placeholder='Ask anything' value={prompt} />
          <div id='submit'><i className="fa-solid fa-paper-plane"></i></div>
        </div>
        <p className='info'>
          AI can make mistakes. Use your Brain!
        </p>
      </div>
    </div>
  )
}
