import React, { useEffect, useState } from 'react';
import { getPlayerStats, getTopPlayers } from '../utils/leaderboard';

const Leaderboard = ({ signer }) => {
    const [topPlayers, setTopPlayers] = useState([]);
    
    useEffect(() => {
        const loadTopPlayers = async () => {
            const players = await getTopPlayers(signer);
            setTopPlayers(players);
        };
        loadTopPlayers();
    }, [signer]);

    return (
        <div>
            <h2>Leaderboard</h2>
            <table>
                <thead>
                    <tr>
                        <th>Player</th>
                        <th>Missions Completed</th>
                        <th>Technologies Upgraded</th>
                        <th>Total YURI+ Spent</th>
                    </tr>
                </thead>
                <tbody>
                    {topPlayers.map((player, index) => (
                        <tr key={index}>
                            <td>{player}</td>
                            <td>{/* Fetch missions completed for this player */}</td>
                            <td>{/* Fetch technologies upgraded for this player */}</td>
                            <td>{/* Fetch total YURI+ spent for this player */}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Leaderboard;
