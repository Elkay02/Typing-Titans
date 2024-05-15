import { useEffect, useState, FormEvent } from 'react'
import './Chat.css'
import socket from '../../socket';

const Chat = () => {

  const [text, setText] = useState('');
  const [messages, setMessages] = useState<string[]>([]);

  const handleSend = (e: FormEvent) => {
    e.preventDefault();
    setMessages(prevMsgs => [...prevMsgs, text]);
    socket.emit('send-message', text)
    setText('');
  }

  useEffect(() => {
    const receiveMessage = (msg: string) => {
      setMessages(prevMsgs => [...prevMsgs, msg]);
    };

    socket.on('receive-message', receiveMessage);

    return () => {
      socket.off('receive-message', receiveMessage);
    };
  }, []);

  useEffect(() => {
    const element = document.getElementById("messages-container");
    if (element) {
      element.scrollTop = element.scrollHeight;
    }
  }, [messages]);

  return (
    <div id='chat-box'>
      <div id='messages-container'>
       {messages.map((msg => (
        <h2 id='left'>{msg}</h2>
       )))}
      </div>
      <form id='chat-input-container' onSubmit={handleSend}>
        <input type="text" id='chat-input' placeholder='Send Message...' value={text} onChange={(e) => setText(e.target.value)}/>
      </form>
    </div>
  )
}

export default Chat