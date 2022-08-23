// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract TMATIC is ERC20, Ownable {
    constructor() ERC20("ERC20 TEST TOKEN", "E20") {
        _mint(msg.sender, 99000000 * 10**decimals());
    }
}
