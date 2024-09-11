import React, { useState } from 'react';
import { discoverResource } from '../utils/resourceDiscovery';

const Resources = ({ signer }) => {
    const [resourceType, setResourceType] = useState('');

    const handleDiscoverResource = async () => {
        await discoverResource(signer, resourceType);
        alert('Resource discovered successfully!');
    };

    return (
        <div>
            <h2>Discover Resources</h2>
            <input 
                type="text" 
                value={resourceType} 
                onChange={(e) => setResourceType(e.target.value)} 
                placeholder="Enter resource type (e.g., Iron Ore)" 
            />
            <button onClick={handleDiscoverResource}>Discover</button>
        </div>
    );
};

export default Resources;
