// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract NFTMarketplace is Ownable {
    struct Listing {
        address seller;
        uint256 price;  // Price in YURI+ tokens
        bool active;
    }

    IERC20 public yuriPlusToken;
    IERC721 public playerInventory;

    mapping(uint256 => Listing) public listings;  // Maps NFT ID to a listing

    constructor(address _yuriPlusToken, address _playerInventory) {
        yuriPlusToken = IERC20(_yuriPlusToken);
        playerInventory = IERC721(_playerInventory);
    }

    // List an NFT for sale
    function listItem(uint256 tokenId, uint256 price) external {
        require(playerInventory.ownerOf(tokenId) == msg.sender, "You do not own this NFT");
        require(listings[tokenId].active == false, "Item is already listed");

        playerInventory.transferFrom(msg.sender, address(this), tokenId);  // Escrow the NFT
        listings[tokenId] = Listing({ seller: msg.sender, price: price, active: true });
    }

    // Purchase an NFT
    function purchaseItem(uint256 tokenId) external {
        Listing memory listing = listings[tokenId];
        require(listing.active, "Item is not for sale");
        require(yuriPlusToken.transferFrom(msg.sender, listing.seller, listing.price), "Payment failed");

        playerInventory.transferFrom(address(this), msg.sender, tokenId);  // Transfer NFT to buyer
        listings[tokenId].active = false;
    }
}
