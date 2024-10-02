// Filename: app/components/Chat.tsx
'use client'; // Add this directive

import { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabaseClient';
import BranchMessage from './BranchMessage';

const Chat = () => {
  const [messages, setMessages] = useState<any[]>([]);
  const [selectedMessage, setSelectedMessage] = useState<any | null>(null);
  const [newMessage, setNewMessage] = useState('');

  const fetchMessages = async () => {
    const { data } = await supabase.from('messages').select('*').order('created_at');
    setMessages(data || []);
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  const sendMessage = async () => {
    if (!newMessage) return;
    const { error } = await supabase
      .from('messages')
      .insert({ content: newMessage, parent_id: selectedMessage?.id || null });
    if (error) console.error(error);
    setNewMessage('');
    fetchMessages();
  };

  return (
    <div>
      <div className="mb-4">
        {messages.map((message) => (
          <div key={message.id} className="mb-2">
            <div>{message.content}</div>
            <button
              onClick={() => setSelectedMessage(message)}
              className="text-blue-500"
            >
              Branch
            </button>
          </div>
        ))}
      </div>
      {selectedMessage && (
        <BranchMessage
          message={selectedMessage}
          setSelectedMessage={setSelectedMessage}
          messages={messages}
        />
      )}
      <div className="flex">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          className="border p-2 flex-grow"
          placeholder="Type a message..."
        />
        <button onClick={sendMessage} className="bg-blue-500 text-white p-2">
          Send
        </button>
      </div>
    </div>
  );
};

export default Chat;
