// contracts/Nftool.sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract Nftool is ERC721Enumerable {
    using Counters for Counters.Counter;

    Counters.Counter private _tokenIds;

    struct Tool {
        bytes32 contentHash;
        string content;
        string title;
        string author;
        string url;
        uint256 timeStamp;
    }

    mapping(uint256 => Tool) private _defaultApprovals;
    mapping(bytes32 => uint256) private _operatorId;

    constructor() ERC721("Nftool", "TOL") {}

    function createNftool(Tool memory nft, address ownerAddress) public returns (uint256) {
        require(_operatorId[nft.contentHash] == 0, "Nftool: sorry this content is already owned by someone");
        _tokenIds.increment();

        uint256 newItemId = _tokenIds.current();
        _mint(ownerAddress, newItemId);
        _defaultApprovals[newItemId] = nft;
        _operatorId[nft.contentHash] = newItemId;

        return newItemId;
    }

    function getTOOLById(uint256 id) public view returns (Tool memory) {
        return _defaultApprovals[id];
    }

    function getTOOLByHash(bytes32 contentHashed) public view returns (uint256) {
        return _operatorId[contentHashed];
    }
}
