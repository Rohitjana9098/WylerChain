// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";

/**
 * @title WylerLiquidStaking (stWYLR)
 * @dev A core protocol contract for WylerChain that allows users to deposit native WYLR
 *      in exchange for yielding stWYLR (Staked WYLR) receipt tokens.
 */
contract WylerLiquidStaking is ERC20, Ownable, ReentrancyGuard {
    // Exchange rate: 1 WYLR = 1 stWYLR (simplistic mapping for testnet)
    uint256 public totalStaked;

    event Staked(address indexed user, uint256 amount);
    event Unstaked(address indexed user, uint256 amount);
    event RewardsClaimed(address indexed user, uint256 reward);

    constructor() ERC20("Staked WYLR", "stWYLR") Ownable(msg.sender) {}

    /**
     * @dev User stakes native WYLR. The contract locks the WYLR and mints stWYLR to the user.
     */
    function stake() external payable nonReentrant {
        require(msg.value > 0, "Cannot stake 0 WYLR");
        
        totalStaked += msg.value;
        
        // Mint the equivalent amount of stWYLR to the user
        _mint(msg.sender, msg.value);

        emit Staked(msg.sender, msg.value);
    }

    /**
     * @dev In a full production contract, the user burns stWYLR to withdraw their locked WYLR + rewards.
     *      For this testnet phase, it is a 1:1 burn-to-withdraw.
     */
    function unstake(uint256 amount) external nonReentrant {
        require(amount > 0, "Cannot unstake 0 WYLR");
        require(balanceOf(msg.sender) >= amount, "Insufficient stWYLR balance");

        // Burn the stWYLR receipt token
        _burn(msg.sender, amount);
        
        totalStaked -= amount;

        // Return the native WYLR to the user
        (bool success, ) = msg.sender.call{value: amount}("");
        require(success, "WYLR transfer failed");

        emit Unstaked(msg.sender, amount);
    }

    /**
     * @dev A placeholder for reward distribution logic (Mocks the "Claim Rewards" button).
     */
    function claimRewards() external nonReentrant {
        // Logic to calculate yield over time and distribute it
        emit RewardsClaimed(msg.sender, 0);
    }
}
