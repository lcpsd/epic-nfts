// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.0;

// OpenZapelin
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

import "hardhat/console.sol";

// inherit
contract EpicNFT is ERC721URIStorage {
    // OpenZapelin track Tokens
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    constructor() ERC721 ("SquareNFT", "SQUARE") {
        console.log("ok");
    }

    // NFT Maker
    function makeNFT() public {
        // Get current tokenId. Starts at zero
        uint256 newItemId = _tokenIds.current();

        // mint NFT to sender using msg.sender
        _safeMint(msg.sender, newItemId);

        // Set the NFT data. A json with keys "name", "description", "image"
        _setTokenURI(newItemId, "https://jsonkeeper.com/b/9ZIK");

        // Increment the counter
        _tokenIds.increment();

        console.log("Item number %s minted!", newItemId);
    }
}