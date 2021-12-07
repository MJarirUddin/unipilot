// SPDX-License-Identifier: GPL-3.0-or-later
pragma solidity =0.7.6;
pragma abicoder v2;

import "contracts/TestModule/setupModules/setupMock.sol";
import "contracts/TestModule/setupModules/setupTokens.sol";

contract DappMock {
    SetupMock public mock;
    SetupTokens public tokens;

    TestERC20 public token0;
    TestERC20 public token1;

    constructor() {
        init();
        mock = new SetupMock(token0, token1);
    }

    function init() public {
        tokens = new SetupTokens(address(this));

        token0 = tokens.token0();
        token1 = tokens.token1();

        uint128 seed = 10;
        poolParams = forgePoolParams(seed);
    }

    // ==============================================HELPERS================================================

    struct PoolParams {
        uint24 fee;
        int24 tickSpacing;
        int24 minTick;
        int24 maxTick;
        uint24 tickCount;
        uint160 startPrice;
        int24 startTick;
    }
    PoolParams private poolParams;

    function forgePoolParams(uint128 _seed)
        internal
        pure
        returns (PoolParams memory _poolParams)
    {
        //
        // decide on one of the three fees, and corresponding tickSpacing
        //
        if (_seed % 3 == 0) {
            _poolParams.fee = uint24(500);
            _poolParams.tickSpacing = int24(10);
        } else if (_seed % 3 == 1) {
            _poolParams.fee = uint24(3000);
            _poolParams.tickSpacing = int24(60);
        } else if (_seed % 3 == 2) {
            _poolParams.fee = uint24(10000);
            _poolParams.tickSpacing = int24(2000);
        }
        _poolParams.maxTick =
            (int24(887272) / _poolParams.tickSpacing) *
            _poolParams.tickSpacing;
        _poolParams.minTick = -_poolParams.maxTick;
        _poolParams.tickCount = uint24(_poolParams.maxTick / _poolParams.tickSpacing);
        //
        // set the initial price
        //
        _poolParams.startTick = int24(
            (_seed % uint128(_poolParams.tickCount)) * uint128(_poolParams.tickSpacing)
        );
        if (_seed % 3 == 0) {
            // set below 0
            _poolParams.startPrice = TickMath.getSqrtRatioAtTick(-_poolParams.startTick);
        } else if (_seed % 3 == 1) {
            // set at 0
            _poolParams.startPrice = TickMath.getSqrtRatioAtTick(0);
            _poolParams.startTick = 0;
        } else if (_seed % 3 == 2) {
            // set above 0
            _poolParams.startPrice = TickMath.getSqrtRatioAtTick(_poolParams.startTick);
        }
    }

    // ==============================================ULM CALLER================================================
    function callCreatePair() public returns (address pool_) {
        bytes memory data = abi.encode(poolParams.fee, poolParams.startPrice);
        pool_ = mock.ulm().createPair(address(token0), address(token1), data);
    }

    // ==============================================UNIPILOT CALLER================================================
    function callDeposit() public returns (uint256 a0, uint256 a1) {
        uint256 amount0 = 10 ether;
        uint256 amount1 = 10 ether;
        (a0, a1) = mock.unipilot().deposit(
            IExchangeManager.DepositParams({
                recipient: address(this),
                exchangeManagerAddress: address(mock.ulm()),
                token0: address(token0),
                token1: address(token1),
                amount0Desired: amount0,
                amount1Desired: amount1,
                tokenId: 0
            }),
            abi.encode(poolParams.fee)
        );
    }
}
