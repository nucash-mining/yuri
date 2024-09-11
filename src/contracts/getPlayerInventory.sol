// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract PlayerInventory is ERC721, Ownable {
    uint256 public nextTokenId;
    mapping(uint256 => string) public tokenDetails;  // Stores metadata or details of the inventory item

    constructor() ERC721("GameInventory", "GINV") {}

    // Mint new NFT to represent a resource or technology for a player
    function mintInventoryItem(address to, string memory itemDetails) external onlyOwner {
        nextTokenId++;
        _mint(to, nextTokenId);
        tokenDetails[nextTokenId] = itemDetails;  // Store details about the inventory item
    }

    // View inventory item details
    function getItemDetails(uint256 tokenId) external view returns (string memory) {
        return tokenDetails[tokenId];
    }
}
