import React, { useState } from 'react';
import { createTechnology } from '../utils/technologyCreation';

const CreateTechnologies = ({ signer }) => {
    const [techDetails, setTechDetails] = useState('');
    const [resourceIds, setResourceIds] = useState([]);

    const handleCreateTechnology = async () => {
        await createTechnology(signer, techDetails, resourceIds);
        alert('Technology created successfully!');
    };

    return (
        <div>
            <h2>Create Technologies</h2>
            <input 
                type="text" 
                value={techDetails} 
                onChange={(e) => setTechDetails(e.target.value)} 
                placeholder="Enter technology details (e.g., Quantum AI)" 
            />
            <input 
                type="text" 
                value={resourceIds} 
                onChange={(e) => setResourceIds(e.target.value.split(','))} 
                placeholder="Enter resource IDs (comma-separated)" 
            />
            <button onClick={handleCreateTechnology}>Create Technology</button>
        </div>
    );
};

export default CreateTechnologies;
