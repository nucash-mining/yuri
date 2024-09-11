// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract DailyQuest is Ownable {
    IERC20 public yuriPlusToken;
    IERC721 public resourceContract;
    mapping(address => uint256) public lastQuestCompletion;  // Track when each player last completed a quest

    constructor(address _yuriPlusToken, address _resourceContract) {
        yuriPlusToken = IERC20(_yuriPlusToken);
        resourceContract = IERC721(_resourceContract);
    }

    // Daily quest completion
    function completeQuest(address player, uint256 resourceId) external onlyOwner {
        require(block.timestamp > lastQuestCompletion[player] + 1 days, "Quest can only be completed once per day");

        // Reward the player with a resource or limited-edition technology
        resourceContract.transferFrom(address(this), player, resourceId);
        lastQuestCompletion[player] = block.timestamp;
    }

    // Check if a player is eligible for a quest
    function isEligibleForQuest(address player) external view returns (bool) {
        return block.timestamp > lastQuestCompletion[player] + 1 days;
    }
}
