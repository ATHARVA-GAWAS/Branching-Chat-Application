'use client'; // This is required for client-side components

import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabaseClient';
import BranchMessage from './BranchMessage';

const Chat = () => {
  const [messages, setMessages] = useState<any[]>([]);
  const [input, setInput] = useState<string>('');

  const fetchMessages = async () => {
    const { data, error } = await supabase.from('messages').select('*');
    if (error) {
      console.error('Error fetching messages:', error);
      return;
    }
    setMessages(data || []);
  };

  const handleSendMessage = async () => {
    if (input.trim() === '') return;

    const { data, error } = await supabase
      .from('messages')
      .insert([{ content: input }])
      .select('*');

    if (error) {
      console.error('Error sending message:', error);
      return;
    }

    setMessages((prevMessages) => [...prevMessages, data ? data[0] : null]);
    setInput('');
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: 'auto' }}>
      <h1>Chat Application</h1>
      <div style={{ border: '1px solid #ccc', padding: '10px', marginBottom: '10px', height: '400px', overflowY: 'scroll' }}>
        {messages.map((msg) => (
          <div key={msg.id} style={{ margin: '10px 0', border: '1px solid #f0f0f0', padding: '10px', borderRadius: '5px' }}>
            <p>{msg.content}</p>
            <BranchMessage messageId={msg.id} />
          </div>
        ))}
      </div>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Type a message"
        style={{ width: 'calc(100% - 70px)', padding: '10px', marginRight: '10px' }}
      />
      <button onClick={handleSendMessage} disabled={!input.trim()} style={{ padding: '10px' }}>
        Send
      </button>
    </div>
  );
};

export default Chat;
