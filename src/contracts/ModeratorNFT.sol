// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract ModeratorNFT is ERC721, Ownable {
    uint256 public nextTokenId;
    mapping(address => bool) public isModerator;
    mapping(address => string) public moderatorUsername;
    mapping(address => uint256) public moderatorScore;

    uint256 constant MIN_APPROVALS = 3; // Minimum approvals to revoke a moderator
    mapping(address => mapping(address => bool)) public revocationVotes; // track votes
    mapping(address => uint256) public revocationVoteCount;

    address[] public topModerators;

    constructor() ERC721("ModeratorNFT", "MOD") {}

    // Modifier to check if the sender is a moderator
    modifier onlyModerator() {
        require(isModerator[msg.sender], "You are not a moderator");
        _;
    }

    // Mint a new Moderator NFT and grant moderator status with a username
    function mintModeratorNFT(address to, string memory username) external onlyModeratorOrOwner {
        _mint(to, nextTokenId);
        isModerator[to] = true;
        moderatorUsername[to] = username;
        nextTokenId++;
        updateTopModerators();
    }

    // Burn Moderator NFT and revoke moderator status
    function burn(uint256 tokenId) public {
        require(ownerOf(tokenId) == msg.sender, "You do not own this Moderator NFT");
        isModerator[msg.sender] = false;
        super._burn(tokenId);
        updateTopModerators();
    }

    // Transfer moderator role via NFT transfer
    function transferFrom(address from, address to, uint256 tokenId) public override {
        super.transferFrom(from, to, tokenId);
        isModerator[from] = false;
        isModerator[to] = true;
        moderatorUsername[to] = moderatorUsername[from]; // Transfer the username
        updateTopModerators();
    }

    // Vote to revoke a moderator's privileges
    function voteToRevokeModerator(address targetModerator) external onlyTopModerators {
        require(isModerator[targetModerator], "Target is not a moderator");
        require(!revocationVotes[msg.sender][targetModerator], "Already voted");

        revocationVotes[msg.sender][targetModerator] = true;
        revocationVoteCount[targetModerator]++;

        if (revocationVoteCount[targetModerator] >= MIN_APPROVALS) {
            // Revoke the moderator
            _revokeModerator(targetModerator);
        }
    }

    // Revoke moderator privileges directly by the contract owner
    function ownerRevokeModerator(address targetModerator) external onlyOwner {
        _revokeModerator(targetModerator);
    }

    // Internal function to revoke a moderator's privileges
    function _revokeModerator(address targetModerator) internal {
        require(isModerator[targetModerator], "Target is not a moderator");

        // Find the token ID of the moderator to burn it
        for (uint256 tokenId = 0; tokenId < nextTokenId; tokenId++) {
            if (ownerOf(tokenId) == targetModerator) {
                _burn(tokenId);
                isModerator[targetModerator] = false;
                delete moderatorUsername[targetModerator];
                updateTopModerators();
                break;
            }
        }
    }

    // Update top moderators based on their score
    function updateTopModerators() internal {
        // This is a simplified version; you might want to sort moderators by score in descending order.
        delete topModerators;
        for (uint256 i = 0; i < nextTokenId; i++) {
            address moderator = ownerOf(i);
            if (isModerator[moderator]) {
                topModerators.push(moderator);
            }
        }
    }

    // Function to get the top-ranked moderators
    function getTopModerators() public view returns (address[] memory) {
        return topModerators;
    }

    // Check if the caller is a top-ranked moderator (in the top 3)
    modifier onlyTopModerators() {
        require(isTopRankedModerator(msg.sender), "You are not a top-ranked moderator");
        _;
    }

    // Function to check if the moderator is in the top 3 based on their score
    function isTopRankedModerator(address moderator) public view returns (bool) {
        uint256 rank = 0;
        for (uint256 i = 0; i < topModerators.length && rank < 3; i++) {
            if (topModerators[i] == moderator) {
                return true;
            }
            rank++;
        }
        return false;
    }

    // Function to update moderator score
    function updateModeratorScore(address moderator, uint256 score) external onlyOwner {
        moderatorScore[moderator] = score;
        updateTopModerators();
    }

    // Allow contract owner or moderator to mint NFTs
    modifier onlyModeratorOrOwner() {
        require(msg.sender == owner() || isModerator[msg.sender], "Not authorized");
        _;
    }
}
