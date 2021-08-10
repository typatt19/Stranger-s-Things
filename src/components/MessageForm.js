import React, { useState } from 'react';
import { callApi } from '../api';

const MessageForm = ({token, postID}) => {
    const [writeMessage, setWriteMessage] = useState("");

const SendMessage = async (event) => {
    event.preventDefault();


    const data = await callApi({
        url: `posts/${postID}/messages`,
        method: 'POST',
        body:{
        message: {content: writeMessage}
        },
        token,
    });

    
    setWriteMessage("")
  };

  return (
    <>
        <form onSubmit={SendMessage}>
            <input
                type="text"
                placeholder="Type Message Here"
                required
                value={writeMessage}
                onChange={(event) => setWriteMessage(event.target.value)}
            ></input>
            <button 
        type="submit">
            Send Message
        </button>
        </form>
        
    </>
);
  };



  export default MessageForm;