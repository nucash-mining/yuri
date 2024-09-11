import React, { useState } from 'react';
import { upgradeTechnology } from '../utils/technologyUpgrade';

const UpgradeTechnology = ({ signer }) => {
    const [techId, setTechId] = useState('');
    const [resourceIds, setResourceIds] = useState([]);

    const handleUpgradeTechnology = async () => {
        await upgradeTechnology(signer, techId, resourceIds);
        alert('Technology upgraded successfully!');
    };

    return (
        <div>
            <h2>Upgrade Technology</h2>
            <input 
                type="text" 
                value={techId} 
                onChange={(e) => setTechId(e.target.value)} 
                placeholder="Technology ID" 
            />
            <input 
                type="text" 
                value={resourceIds} 
                onChange={(e) => setResourceIds(e.target.value.split(','))} 
                placeholder="Resource IDs (comma-separated)" 
            />
            <button onClick={handleUpgradeTechnology}>Upgrade Technology</button>
        </div>
    );
};

export default UpgradeTechnology;
