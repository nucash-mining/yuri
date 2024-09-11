import React, { useState } from 'react';
import { mintModeratorNFT } from '../utils/moderatorNFT';

const MintModerator = ({ signer }) => {
    const [username, setUsername] = useState('');

    const handleMintModerator = async () => {
        await mintModeratorNFT(signer, username);
        alert('Moderator NFT minted successfully!');
    };

    return (
        <div>
            <h2>Mint Moderator NFT</h2>
            <input 
                type="text" 
                value={username} 
                onChange={(e) => setUsername(e.target.value)} 
                placeholder="Enter Username" 
            />
            <button onClick={handleMintModerator}>Mint Moderator</button>
        </div>
    );
};

export default MintModerator;
