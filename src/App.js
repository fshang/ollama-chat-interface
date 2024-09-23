import React, { useState, useRef, useEffect } from 'react';
import Settings from './Settings';
import './App.css';

function App() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [currentModel, setCurrentModel] = useState('qwen2.5:7b');
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = { role: 'user', content: input };
    setMessages(prevMessages => [...prevMessages, userMessage]);
    setInput('');

    try {
      console.log('Sending request to server...');
      const response = await fetch('http://localhost:11434/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model: currentModel,
          prompt: input,
          stream: false
        })
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log('Received response:', data);

      if (!data.response) {
        throw new Error('No response data received');
      }

      const botMessage = { role: 'assistant', content: '' };
      setMessages(prevMessages => [...prevMessages, botMessage]);
      setIsTyping(true);

      // 模拟打字机效果
      for (let i = 0; i < data.response.length; i++) {
        await new Promise(resolve => setTimeout(resolve, 20)); // 调整这个值以改变打字速度
        setMessages(prevMessages => {
          const newMessages = [...prevMessages];
          newMessages[newMessages.length - 1] = {
            ...newMessages[newMessages.length - 1],
            content: newMessages[newMessages.length - 1].content + data.response[i]
          };
          return newMessages;
        });
      }

      setIsTyping(false);
    } catch (error) {
      console.error('Error:', error);
      setMessages(prevMessages => [...prevMessages, { role: 'system', content: `Error: ${error.message}` }]);
    }
  };

  const handleModelChange = (newModel) => {
    setCurrentModel(newModel);
  };

  return (
    <div className="chat-container">
      <div className="chat-header">
        Chat with Ollama
        <button onClick={() => setShowSettings(true)} className="settings-button">⚙️</button>
      </div>
      <div className="chat-messages">
        {messages.map((message, index) => (
          <div key={index} className={`message-wrapper ${message.role}`}>
            <div className="avatar">
              {message.role === 'user' ? '👤' : '🤖'}
            </div>
            <div className="message-content">
              {message.content}
            </div>
          </div>
        ))}
        {isTyping && (
          <div className="message-wrapper assistant">
            <div className="avatar">🤖</div>
            <div className="message-content typing">...</div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>
      <form onSubmit={handleSubmit} className="chat-input-form">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type a message..."
          className="chat-input"
        />
        <button type="submit" className="chat-submit">Send</button>
      </form>
      {showSettings && (
        <Settings
          currentModel={currentModel}
          onModelChange={handleModelChange}
          onClose={() => setShowSettings(false)}
        />
      )}
    </div>
  );
}

export default App;
