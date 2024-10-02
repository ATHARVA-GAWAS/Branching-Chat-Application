// Filename: app/components/BranchMessage.tsx
'use client'; // Add this directive

import { useState } from 'react';
import { supabase } from '../../lib/supabaseClient';

interface BranchMessageProps {
  message: any;
  setSelectedMessage: (message: null) => void;
  messages: any[];
}

const BranchMessage = ({ message, setSelectedMessage, messages }: BranchMessageProps) => {
  const [branchMessage, setBranchMessage] = useState('');

  const createBranch = async () => {
    if (!branchMessage) return;
    const { error } = await supabase
      .from('messages')
      .insert({ content: branchMessage, parent_id: message.id });
    if (error) console.error(error);
    setBranchMessage('');
  };

  const relatedMessages = messages.filter((msg) => msg.parent_id === message.id);

  return (
    <div className="border p-4 mb-4">
      <h3 className="font-bold">Branch for: {message.content}</h3>
      <input
        type="text"
        value={branchMessage}
        onChange={(e) => setBranchMessage(e.target.value)}
        className="border p-2 mb-2"
        placeholder="Type a message for this branch..."
      />
      <button onClick={createBranch} className="bg-blue-500 text-white p-2">
        Create Branch
      </button>
      <div className="mt-4">
        <h4 className="font-bold">Related Messages:</h4>
        {relatedMessages.map((msg) => (
          <div key={msg.id} className="pl-4">
            {msg.content}
          </div>
        ))}
      </div>
      <button
        onClick={() => setSelectedMessage(null)}
        className="text-red-500 mt-2"
      >
        Close Branch
      </button>
    </div>
  );
};

export default BranchMessage;
