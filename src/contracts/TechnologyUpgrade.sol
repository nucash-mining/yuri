// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract TechnologyUpgrade is Ownable {
    IERC20 public yuriPlusToken;
    IERC721 public technologyContract;
    IERC721 public resourceContract;

    struct Upgrade {
        string name;
        uint256 cost;  // Cost in YURI+ tokens
        uint256[] requiredResources;  // Resource token IDs required for upgrade
    }

    mapping(uint256 => Upgrade) public availableUpgrades;  // Upgrade options for technologies
    mapping(uint256 => bool) public upgradedTechnologies;  // Tracks upgraded technologies

    constructor(address _yuriPlusToken, address _technologyContract, address _resourceContract) {
        yuriPlusToken = IERC20(_yuriPlusToken);
        technologyContract = IERC721(_technologyContract);
        resourceContract = IERC721(_resourceContract);
    }

    // Define a new upgrade
    function addUpgrade(uint256 techId, string memory upgradeName, uint256 cost, uint256[] memory requiredResources) external onlyOwner {
        availableUpgrades[techId] = Upgrade({ name: upgradeName, cost: cost, requiredResources: requiredResources });
    }

    // Upgrade a technology by paying YURI+ and resources
    function upgradeTechnology(uint256 techId, uint256[] memory resourceIds) external {
        require(!upgradedTechnologies[techId], "Technology is already upgraded");
        Upgrade memory upgrade = availableUpgrades[techId];
        require(upgrade.cost > 0, "No upgrade available");

        // Burn resources
        for (uint256 i = 0; i < resourceIds.length; i++) {
            require(resourceContract.ownerOf(resourceIds[i]) == msg.sender, "You do not own this resource");
            resourceContract.transferFrom(msg.sender, address(this), resourceIds[i]);  // Burn the resource
        }

        // Transfer YURI+ cost
        require(yuriPlusToken.transferFrom(msg.sender, address(this), upgrade.cost), "YURI+ payment failed");

        // Mark the technology as upgraded
        upgradedTechnologies[techId] = true;
    }
}
