// SPDX-License-Identifier: MIT
pragma solidity 0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";

contract rootERC1155Token is ERC1155, Ownable {

    string public name;
    string public symbol;

    mapping(uint => string) private tokenURI;

    constructor() ERC1155("") {
        name = "Root ERC 1155 Token",
        symbol = "rootERC1155Token"
    }

    function mint(
        address _to,
        uint256 _id,
        uint256 _amount,
    ) public {
        _mint(_to, _id, _amount, "");
    }

    function mintBatch(
        address _to,
        uint256[] calldata _ids
        uint256[] calldata _amounts
    ) public {
        _mintBatch(_to, _ids, _amount, "");
    }

    function setURI(uint256 _id, string memory _uri) external onlyOwner {
        tokenURI[_id] = _uri;
        emit URI(_uri, _id);
    }

    function uri(uint256 _id) public override view returns (string memory) {
        return tokenURI[_id];
    }
}
