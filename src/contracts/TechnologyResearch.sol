// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract TechnologyResearch is Ownable {
    IERC20 public yuriPlusToken;
    ERC721 public playerInventory;

    uint256 public researchCost = 100 * 10 ** 18;  // Cost in YURI+

    constructor(address _yuriPlusToken, address _playerInventory) {
        yuriPlusToken = IERC20(_yuriPlusToken);
        playerInventory = ERC721(_playerInventory);
    }

    // Function to research and unlock new technology
    function researchTechnology(address player, string memory itemDetails) external {
        require(yuriPlusToken.transferFrom(player, address(this), researchCost), "Payment failed");

        uint256 newTokenId = playerInventory.totalSupply() + 1;
        playerInventory.mint(player, newTokenId, itemDetails);  // Mint new technology NFT
    }

    // Allow the owner to set the research cost
    function setResearchCost(uint256 newCost) external onlyOwner {
        researchCost = newCost;
    }
}
