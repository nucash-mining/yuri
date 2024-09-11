// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721.sol";

contract PvPBattles {
    IERC20 public yuriPlusToken;
    IERC721 public resourceContract;

    struct Battle {
        address player1;
        address player2;
        uint256 wagerYuri;
        uint256[] wageredResources;  // Resource token IDs wagered
        bool isActive;
        address winner;
    }

    Battle[] public battles;

    constructor(address _yuriPlusToken, address _resourceContract) {
        yuriPlusToken = IERC20(_yuriPlusToken);
        resourceContract = IERC721(_resourceContract);
    }

    // Initiate a battle between two players
    function initiateBattle(address player2, uint256 wagerYuri, uint256[] memory resources) external {
        require(yuriPlusToken.transferFrom(msg.sender, address(this), wagerYuri), "YURI+ transfer failed");
        
        for (uint256 i = 0; i < resources.length; i++) {
            require(resourceContract.ownerOf(resources[i]) == msg.sender, "You do not own this resource");
            resourceContract.transferFrom(msg.sender, address(this), resources[i]);  // Escrow the wagered resources
        }

        battles.push(Battle({
            player1: msg.sender,
            player2: player2,
            wagerYuri: wagerYuri,
            wageredResources: resources,
            isActive: true,
            winner: address(0)
        }));
    }

    // Resolve the battle (only owner or external oracle can call this)
    function resolveBattle(uint256 battleId, address winner) external onlyOwner {
        require(battles[battleId].isActive, "Battle not active");
        
        Battle memory battle = battles[battleId];

        // Pay the winner
        if (battle.wagerYuri > 0) {
            yuriPlusToken.transfer(winner, battle.wagerYuri);
        }

        // Transfer resources to the winner
        for (uint256 i = 0; i < battle.wageredResources.length; i++) {
            resourceContract.transferFrom(address(this), winner, battle.wageredResources[i]);
        }

        // Mark battle as resolved
        battles[battleId].isActive = false;
        battles[battleId].winner = winner;
    }

    // Get battle details
    function getBattleDetails(uint256 battleId) external view returns (Battle memory) {
        return battles[battleId];
    }
}
