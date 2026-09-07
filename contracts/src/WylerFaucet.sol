// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title WylerTestnetFaucet
 * @dev A simple smart contract that dispenses Native WYLR to users for testing purposes.
 */
contract WylerTestnetFaucet is Ownable {
    uint256 public dripAmount = 10000 * 10**18; // 10,000 WYLR
    uint256 public cooldownTime = 1 days;

    mapping(address => uint256) public lastAccessTime;

    event DripSent(address indexed to, uint256 amount);
    event FaucetFunded(address indexed funder, uint256 amount);

    constructor() Ownable(msg.sender) {}

    /**
     * @dev Allows anyone to fund the Faucet with Native WYLR so it has liquidity to distribute.
     */
    receive() external payable {
        emit FaucetFunded(msg.sender, msg.value);
    }

    /**
     * @dev Core function called by the "Claim Tokens" button.
     *      Checks cooldown limits, ensures the faucet has balance, and sends the WYLR to the user.
     */
    function requestTokens() external {
        require(block.timestamp >= lastAccessTime[msg.sender] + cooldownTime, "You must wait 24 hours between claims.");
        require(address(this).balance >= dripAmount, "Faucet is out of funds! Please contact admin.");

        lastAccessTime[msg.sender] = block.timestamp;

        // Send Native WYLR to the user
        (bool success, ) = msg.sender.call{value: dripAmount}("");
        require(success, "Token transfer failed.");

        emit DripSent(msg.sender, dripAmount);
    }

    /**
     * @dev Admin overrides allowing the owner to modify the drip economics.
     */
    function setDripAmount(uint256 _newAmount) external onlyOwner {
        dripAmount = _newAmount;
    }

    function setCooldownTime(uint256 _newCooldown) external onlyOwner {
        cooldownTime = _newCooldown;
    }

    /**
     * @dev Emergency withdraw functionality purely for the testnet owner.
     */
    function emergencyWithdraw() external onlyOwner {
        (bool success, ) = owner().call{value: address(this).balance}("");
        require(success, "Withdraw failed.");
    }
}
