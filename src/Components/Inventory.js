import React, { useEffect, useState } from 'react';
import { getResourceInventory, getTechnologyInventory } from '../utils/inventory';

const Inventory = ({ signer }) => {
    const [resources, setResources] = useState([]);
    const [technologies, setTechnologies] = useState([]);

    useEffect(() => {
        const loadInventory = async () => {
            const res = await getResourceInventory(signer);
            const tech = await getTechnologyInventory(signer);
            setResources(res);
            setTechnologies(tech);
        };

        loadInventory();
    }, [signer]);

    return (
        <div>
            <h2>Your Inventory</h2>
            <h3>Resources</h3>
            <ul>
                {resources.map((res, index) => (
                    <li key={index}>{res}</li>
                ))}
            </ul>
            <h3>Technologies</h3>
            <ul>
                {technologies.map((tech, index) => (
                    <li key={index}>{tech}</li>
                ))}
            </ul>
        </div>
    );
};

export default Inventory;
