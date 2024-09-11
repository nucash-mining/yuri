// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Leaderboard {
    struct PlayerStats {
        uint256 missionsCompleted;
        uint256 technologiesUpgraded;
        uint256 totalYuriSpent;
    }

    mapping(address => PlayerStats) public playerStats;

    // Update missions completed for a player
    function updateMissionsCompleted(address player) external {
        playerStats[player].missionsCompleted += 1;
    }

    // Update technologies upgraded for a player
    function updateTechnologiesUpgraded(address player) external {
        playerStats[player].technologiesUpgraded += 1;
    }

    // Update total YURI+ spent by a player
    function updateYuriSpent(address player, uint256 amount) external {
        playerStats[player].totalYuriSpent += amount;
    }

    // Get a player's stats
    function getPlayerStats(address player) external view returns (PlayerStats memory) {
        return playerStats[player];
    }

    // Get the top players (for leaderboard)
    function getTopPlayers() external view returns (address[] memory) {
        // Implementation depends on how you want to rank players (missions, YURI+, etc.)
        // Could return the top N players based on missionsCompleted or totalYuriSpent
    }
}
