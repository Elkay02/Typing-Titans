import { useEffect, useState, FormEvent } from 'react'
import './Chat.css'
import socket from '../../socket';

interface Message{
  content: string,
  author: string
}

const Chat = () => {

  const [text, setText] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);

  const handleSend = (e: FormEvent) => {
    e.preventDefault();
    const msg: Message = {content: text, author: 'You: '}
    setMessages(prevMsgs => [...prevMsgs, msg]);
    socket.emit('send-message', text)
    setText('');
  }

  useEffect(() => {
    const receiveMessage = (content: string, author: string) => {
      const msg: Message = { content: content, author: author }
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
       {messages.map(((msg, index) => (
         <h2 key={index} className={msg.author === 'You: ' ? 'message sent' : 'message received'}>
          {msg.author} 
          <span id='message-content'>{msg.content}</span>
        </h2>
       )))}
      </div>
      <form id='chat-input-container' onSubmit={handleSend}>
        <input type="text" id='chat-input' placeholder='Send Message...' value={text} onChange={(e) => setText(e.target.value)}/>
      </form>
    </div>
  )
}

export default Chat