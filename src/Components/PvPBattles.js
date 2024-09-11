import React, { useState } from 'react';
import { initiateBattle } from '../utils/pvpBattles';

const PvPBattles = ({ signer }) => {
    const [player2, setPlayer2] = useState('');
    const [wagerYuri, setWagerYuri] = useState('');
    const [resourceIds, setResourceIds] = useState([]);

    const handleInitiateBattle = async () => {
        await initiateBattle(signer, player2, wagerYuri, resourceIds);
        alert('Battle initiated successfully!');
    };

    return (
        <div>
            <h2>Initiate PvP Battle</h2>
            <input 
                type="text" 
                value={player2} 
                onChange={(e) => setPlayer2(e.target.value)} 
                placeholder="Opponent's Address" 
            />
            <input 
                type="text" 
                value={wagerYuri} 
                onChange={(e) => setWagerYuri(e.target.value)} 
                placeholder="Wager in YURI+" 
            />
            <input 
                type="text" 
                value={resourceIds} 
                onChange={(e) => setResourceIds(e.target.value.split(','))} 
                placeholder="Resource IDs (comma-separated)" 
            />
            <button onClick={handleInitiateBattle}>Initiate Battle</button>
        </div>
    );
};

export default PvPBattles;
