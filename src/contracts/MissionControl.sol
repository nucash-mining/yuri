// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract MissionControl is Ownable {
    IERC20 public yuriPlusToken; // Reference to the YURI+ token

    struct Mission {
        string name;
        uint256 requiredStake; // Amount of YURI+ required to participate
        uint256 reward;        // Reward in YURI+
        bool active;
    }

    Mission[] public missions;
    mapping(address => mapping(uint256 => bool)) public missionParticipants;  // Tracks if a player is part of a mission

    constructor(address yuriPlusAddress) {
        yuriPlusToken = IERC20(yuriPlusAddress);
    }

    // Create new missions
    function createMission(string memory _name, uint256 _requiredStake, uint256 _reward) external onlyOwner {
        missions.push(Mission({ name: _name, requiredStake: _requiredStake, reward: _reward, active: true }));
    }

    // Players stake YURI+ tokens to participate in a mission
    function participateInMission(uint256 missionId) external {
        Mission memory mission = missions[missionId];
        require(mission.active, "Mission is not active");
        require(yuriPlusToken.transferFrom(msg.sender, address(this), mission.requiredStake), "Stake failed");

        // Track the participant
        missionParticipants[msg.sender][missionId] = true;
    }

    // Reward participants upon mission completion
    function completeMission(uint256 missionId, address[] calldata participants) external onlyOwner {
        Mission memory mission = missions[missionId];
        require(mission.active, "Mission is not active");

        for (uint256 i = 0; i < participants.length; i++) {
            require(missionParticipants[participants[i]][missionId], "Player did not participate in the mission");

            // Transfer reward to the player
            yuriPlusToken.transfer(participants[i], mission.reward);
        }

        // Mark mission as inactive
        missions[missionId].active = false;
    }
}
