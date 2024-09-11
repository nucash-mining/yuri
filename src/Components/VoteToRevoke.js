import React, { useState } from 'react';
import { voteToRevokeModerator } from '../utils/moderatorVotes';

const VoteToRevoke = ({ signer }) => {
    const [targetModerator, setTargetModerator] = useState('');

    const handleVoteToRevoke = async () => {
        await voteToRevokeModerator(signer, targetModerator);
        alert('Vote to revoke moderator submitted!');
    };

    return (
        <div>
            <h2>Vote to Revoke Moderator</h2>
            <input 
                type="text" 
                value={targetModerator} 
                onChange={(e) => setTargetModerator(e.target.value)} 
                placeholder="Moderator Address" 
            />
            <button onClick={handleVoteToRevoke}>Vote to Revoke</button>
        </div>
    );
};

export default VoteToRevoke;
