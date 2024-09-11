// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract ResourceDiscovery is ERC721, Ownable {
    uint256 public nextTokenId;
    mapping(uint256 => string) public tokenDetails; // Metadata for resources (e.g., type of resource)

    IERC20 public yuriPlusToken;
    uint256 public discoveryCost = 50 * 10 ** 18;  // Cost in YURI+ for discovering a resource

    constructor(address _yuriPlusToken) ERC721("Resource", "RES") {
        yuriPlusToken = IERC20(_yuriPlusToken);
    }

    // Discover a new resource by paying YURI+ tokens
    function discoverResource(address player, string memory resourceType) external {
        require(yuriPlusToken.transferFrom(player, address(this), discoveryCost), "Insufficient YURI+");

        nextTokenId++;
        _mint(player, nextTokenId);
        tokenDetails[nextTokenId] = resourceType;  // e.g., "Iron Ore", "Energy", "Gold", etc.
    }

    // Set the cost of discovering resources
    function setDiscoveryCost(uint256 newCost) external onlyOwner {
        discoveryCost = newCost;
    }

    // Get resource details by tokenId
    function getResourceDetails(uint256 tokenId) external view returns (string memory) {
        return tokenDetails[tokenId];
    }
}
