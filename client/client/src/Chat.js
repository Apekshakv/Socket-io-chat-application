import React, { useState, useEffect } from 'react';
import queryString from 'query-string';
import io from 'socket.io-client';
import './Chart.css'
let socket;

const Chat = () => {
  const [name, setName] = useState('');
  const [room, setRoom] = useState('');
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);

  const ENDPOINT = 'http://localhost:5000';

  useEffect(() => {
    const { name, room } = queryString.parse(window.location.search);

    socket = io(ENDPOINT);
    setName(name);
    setRoom(room);

    socket.emit('join', { name, room }, (error) => {
      if (error) alert(error);
    });

    return () => {
      socket.emit('disconnect');
      socket.off();
    };
  }, []);

  useEffect(() => {
    if (socket) {
      socket.on('message', (message) => {
        setMessages((msgs) => [...msgs, message]);
      });
    }
  }, []);

  const sendMessage = (e) => {
    e.preventDefault();
    if (message.trim()) {
      socket.emit('sendMessage', message, () => setMessage(''));
    }
  };

  return (
    <div className='aug'>
      <h1>CHAT</h1>
      <h2>Room: {room}</h2>

      <div >
        {messages.map((msg, i) => (
          <div key={i}>
            <strong>{msg.user}</strong>: {msg.text}
          </div>
        ))}
      </div>

      <form onSubmit={sendMessage}>
        <input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault();
              sendMessage(e);
            }
          }}
          placeholder="Type a message..."
        />
        <button type="submit" disabled={!message.trim()}>Send</button>
      </form>
    </div>
  );
};

export default Chat;


