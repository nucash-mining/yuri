import React, { useEffect, useState } from 'react';
import { getTopModerators } from '../utils/topModerators';

const TopModerators = ({ signer }) => {
    const [topModerators, setTopModerators] = useState([]);

    useEffect(() => {
        const loadTopModerators = async () => {
            const topMods = await getTopModerators(signer);
            setTopModerators(topMods);
        };
        loadTopModerators();
    }, [signer]);

    return (
        <div>
            <h2>Top Moderators</h2>
            <ul>
                {topModerators.map((mod, index) => (
                    <li key={index}>{mod}</li>
                ))}
            </ul>
        </div>
    );
};

export default TopModerators;
