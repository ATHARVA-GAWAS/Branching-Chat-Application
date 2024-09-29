'use client'; // This is required for client-side components

import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabaseClient';

const BranchMessage = ({ messageId }: { messageId: number }) => {
  const [branches, setBranches] = useState<any[]>([]);
  const [input, setInput] = useState<string>('');

  const fetchBranches = async () => {
    const { data, error } = await supabase
      .from('branches')
      .select('*')
      .eq('message_id', messageId);
    if (error) {
      console.error('Error fetching branches:', error);
      return;
    }
    setBranches(data || []);
  };

  const handleBranchMessage = async () => {
    if (input.trim() === '') return;

    const { data, error } = await supabase
      .from('branches')
      .insert([{ message_id: messageId, content: input }])
      .select('*');

    if (error) {
      console.error('Error creating branch message:', error);
      return;
    }

    setBranches((prevBranches) => [...prevBranches, data ? data[0] : null]);
    setInput('');
  };

  useEffect(() => {
    fetchBranches();
  }, [messageId]);

  return (
    <div style={{ marginTop: '10px' }}>
      <button onClick={handleBranchMessage} style={{ marginRight: '10px' }}>
        Branch
      </button>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Create a branch"
        style={{ marginRight: '10px' }}
      />
      <div style={{ marginTop: '10px', paddingLeft: '20px' }}>
        {branches.map((branch) => (
          <div key={branch.id} style={{ border: '1px solid #e0e0e0', padding: '5px', marginTop: '5px', borderRadius: '5px' }}>
            <p>{branch.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BranchMessage;
