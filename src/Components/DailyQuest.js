import React, { useEffect, useState } from 'react';
import { completeQuest, isEligibleForQuest } from '../utils/dailyQuest';

const DailyQuest = ({ signer }) => {
    const [eligible, setEligible] = useState(false);
    const [resourceId, setResourceId] = useState('');

    useEffect(() => {
        const checkEligibility = async () => {
            const eligible = await isEligibleForQuest(signer);
            setEligible(eligible);
        };
        checkEligibility();
    }, [signer]);

    const handleCompleteQuest = async () => {
        if (eligible) {
            await completeQuest(signer, resourceId);
            alert('Quest completed and reward received!');
        } else {
            alert('You are not eligible for a quest today.');
        }
    };

    return (
        <div>
            <h2>Daily Quest</h2>
            <input 
                type="text" 
                value={resourceId} 
                onChange={(e) => setResourceId(e.target.value)} 
                placeholder="Resource ID for reward" 
            />
            <button onClick={handleCompleteQuest} disabled={!eligible}>Complete Quest</button>
        </div>
    );
};

export default DailyQuest;
