// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract TechnologyCreation is ERC721, Ownable {
    uint256 public nextTokenId;
    mapping(uint256 => string) public tokenDetails; // Metadata for technologies

    IERC721 public resourceContract;
    IERC20 public yuriPlusToken;
    uint256 public creationCost = 100 * 10 ** 18;  // Cost in YURI+ to create a technology

    constructor(address _resourceContract, address _yuriPlusToken) ERC721("Technology", "TECH") {
        resourceContract = IERC721(_resourceContract);
        yuriPlusToken = IERC20(_yuriPlusToken);
    }

    // Function to create a technology by burning resources
    function createTechnology(address player, string memory techDetails, uint256[] memory resourceIds) external {
        require(yuriPlusToken.transferFrom(player, address(this), creationCost), "Insufficient YURI+");

        // Burn the resources used in creating the technology
        for (uint256 i = 0; i < resourceIds.length; i++) {
            require(resourceContract.ownerOf(resourceIds[i]) == player, "You do not own this resource");
            resourceContract.transferFrom(player, address(this), resourceIds[i]);  // Burn resource (transfer to contract)
        }

        nextTokenId++;
        _mint(player, nextTokenId);
        tokenDetails[nextTokenId] = techDetails;  // e.g., "Advanced AI", "Quantum Computing", etc.
    }

    // Get technology details by tokenId
    function getTechDetails(uint256 tokenId) external view returns (string memory) {
        return tokenDetails[tokenId];
    }

    // Set the cost of creating a technology
    function setCreationCost(uint256 newCost) external onlyOwner {
        creationCost = newCost;
    }
}
