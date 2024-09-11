import React, { useState, useEffect } from 'react';
import { connectToWallet } from './utils/walletConnection';
import { ethers } from 'ethers';
import ModeratorNFTABI from '../contracts/ModeratorNFT.json';  // Import ABI
import Leaderboard from './components/Leaderboard';
import PvPBattles from './components/PvPBattles';
import DailyQuest from './components/DailyQuest';
import Resources from './components/Resources';
import UpgradeTechnology from './components/UpgradeTechnology';

const moderatorNFTAddress = '0xYourModeratorNFTContractAddress';

const App = () => {
    const [signer, setSigner] = useState(null);
    const [isModerator, setIsModerator] = useState(false);

    useEffect(() => {
        const initSigner = async () => {
            const signer = await connectToWallet();
            setSigner(signer);

            // Check if the connected user is a moderator
            const moderatorContract = new ethers.Contract(moderatorNFTAddress, ModeratorNFTABI.abi, signer);
            const isModerator = await moderatorContract.isAddressModerator(signer.getAddress());
            setIsModerator(isModerator);
        };
        initSigner();
    }, []);

    // Function to resolve PvP battle (only for moderators or oracles)
    const resolveBattle = async (battleId, winnerAddress) => {
        if (isModerator) {
            alert(`Battle ${battleId} has been resolved! Winner: ${winnerAddress}`);
        } else {
            alert('You are not authorized to resolve battles.');
        }
    };

    return (
        <div>
            <h1>Web3 Game</h1>

            {/* Display components if the user is connected to MetaMask */}
            {signer && (
                <div>
                    {/* Leaderboard Section */}
                    <Leaderboard signer={signer} />

                    {/* PvP Battles Section */}
                    <PvPBattles signer={signer} resolveBattle={resolveBattle} isModerator={isModerator} />

                    {/* Daily Quest Section */}
                    <DailyQuest signer={signer} />

                    {/* Resources Section */}
                    <Resources signer={signer} />

                    {/* Technology Upgrade Section */}
                    <UpgradeTechnology signer={signer} />
                </div>
            )}

            {/* Show if the wallet is not connected */}
            {!signer && (
                <div>
                    <h2>Please connect your MetaMask wallet to access the game features.</h2>
                </div>
            )}
        </div>
    );
};

export default App;
