import { useContext,useState,useEffect } from "react";
import Chat from "./Chat";
import "./ChatWindow.css";
import { MyContext } from "./MyContext.jsx";
import {ScaleLoader} from "react-spinners"


function ChatWindow() {

     const { prompt, setPrompt, reply, setReply, currThreadId, setCurrThreadId,prevChats,setPrevChats,setNewChat } = useContext(MyContext);
     const[loading,setLoading]=useState(false);
     const[isOpen,setIsOpen] = useState(false);   // set default false

    const getReply = async ()=>{
        setLoading(true);
        setNewChat(false);
        const options = {
            method:"POST",
            headers: {
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
               message:prompt,
               threadId: currThreadId,
            })
        }

        try {
           const response = await fetch("https://chatgpt-myf0.onrender.com/api/chat",options);
           const res = await response.json();
           console.log(res);
           setReply(res.reply);
        } catch(err) {
            console.log(err);
        }
        setLoading(false);
    }

    //append new Chat to PrevChats
    useEffect(()=>{
      if(prompt && reply){
        setPrevChats(()=>(
            [...prevChats,{
                role:"user",
                content:prompt
            },{
                role:"assistant",
                content:reply
            }]
        ))
      }
      setPrompt("");
    },[reply])




    const handleProfileClick = ()=> {
     setIsOpen(!isOpen);
    }


  return (
    <div className="chatWindow">
      <div className="navbar">
        <span>
          ChatGpt &nbsp; <i className="fa-solid fa-chevron-down"></i>
        </span>
        <div className="userIconDiv"  onClick={handleProfileClick}>
          <span>
            <i className="fa-solid fa-user userIcon"></i>
          </span>
        </div>
      </div>
      {
        isOpen &&
        <div className="dropDown">
            <div className="dropDownItems"><i className="fa-solid fa-gear"></i> Settings</div>
            <div className="dropDownItems"><i className="fa-solid fa-cloud-arrow-up"></i> Upgrade Plan</div>
            <div className="dropDownItems"><i className="fa-solid fa-right-from-bracket"></i> LogIn / LogOut </div>
        </div>
      }
      <Chat></Chat>
      <ScaleLoader color="#fff" loading={loading} ></ScaleLoader>
      <div className="chatInput">
        <div className="inputBox">
          <input
            placeholder="Ask anything"
            value={prompt}
            onChange={(e) => {
              setPrompt(e.target.value);
            }}
            onKeyDown={(e)=> {
                e.key == "Enter" ? getReply() : ''
            }}
          ></input>
          <div id="submit" onClick={getReply}>
            <i className="fa-solid fa-paper-plane"></i>
          </div>
        </div>
        <p className="info">
          ChatGpt can make mistakes . Check Important info . See Cookie
          Prefrences
        </p>
      </div>
    </div>
  );
}

export default ChatWindow;
