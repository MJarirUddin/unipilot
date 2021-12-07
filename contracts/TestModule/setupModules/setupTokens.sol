// SPDX-License-Identifier: MIT
pragma solidity 0.7.6;
pragma abicoder v2;

import "../../test/TestERC20.sol";

contract SetupTokens {
    TestERC20 public token0;
    TestERC20 public token1;

    constructor(address _mintTo) {
        initTokens();
        minter(_mintTo);
    }

    function getToken0BalanceOf(address sender) public view returns (uint256 bal0){
        bal0 = token0.balanceOf(sender);
    }

    function initTokens() internal {
        token0 = new TestERC20(1e18 ether);
        token1 = new TestERC20(1e18 ether);

        if (address(token0) > address(token1)) {
            (token0, token1) = (token1, token0);
        }
    }

    function minter(address mintTo) public {
        token0.mint(address(mintTo), 1e12 ether);
        token1.mint(address(mintTo), 1e12 ether);
    }
}
