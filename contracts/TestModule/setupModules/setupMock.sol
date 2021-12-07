// SPDX-License-Identifier: MIT
pragma solidity 0.7.6;
pragma abicoder v2;

import "../../test/TestERC20.sol";
import "../../base/UniswapLiquidityManager.sol";
import "../../Unipilot.sol";
import "../../UniStrategy.sol";
import "../../V3Oracle.sol";
import "../../base/ULMState.sol";
import "../../UnipilotFarm.sol";
import "@uniswap/v3-periphery/contracts/interfaces/ISwapRouter.sol";
import "@uniswap/v3-core/contracts/libraries/FullMath.sol";

contract MockUniswapV3Router {
    ISwapRouter public immutable swapRouter;

    constructor(ISwapRouter _swapRouter) {
        swapRouter = _swapRouter;
    }

    function swapExactInputSingle(
        uint256 amountIn,
        address token0,
        address token1,
        uint24 fee
    ) external returns (uint256 amountOut) {
        TransferHelper.safeTransferFrom(token0, msg.sender, address(this), amountIn);
        TransferHelper.safeApprove(token0, address(swapRouter), amountIn);
        ISwapRouter.ExactInputSingleParams memory params = ISwapRouter
            .ExactInputSingleParams({
                tokenIn: token0,
                tokenOut: token1,
                fee: fee,
                recipient: msg.sender,
                deadline: block.timestamp + 600,
                amountIn: amountIn,
                amountOutMinimum: 0,
                sqrtPriceLimitX96: 0
            });
        amountOut = swapRouter.exactInputSingle(params);
    }
}

contract SetupMock {
    address public governance;

    address public indexFund = 0x424A8F861a17CF1aF6F10136773588d745Cd0FaC;
    address public tokens = 0x7Cd3d8b74296758DFa089e0F00897b2fEcFc1e93;
    address public v3Factory = 0x222D12C1c56a53b1872d100AaB1D050e2262DBD1;
    address public swapAddr = 0x6d7B1AA92844A1e353f31BD29255F79B380B55F3;

    V3Oracle public oracle;
    Unipilot public unipilot;
    ULMState public ulmState;
    UniStrategy public uniStrategy;
    UniswapLiquidityManager public ulm;
    MockUniswapV3Router public swap;

    TestERC20 public token0;
    TestERC20 public token1;

    IUniswapLiquidityManager.UnipilotProtocolDetails public details;

    constructor(TestERC20 _token0, TestERC20 _token1) {
        governance = msg.sender;
        swap = new MockUniswapV3Router(ISwapRouter(swapAddr));
        initSetup();
        initTokens(_token0, _token1);
    }

    function initSetup() public {
        ulmState = new ULMState();
        uniStrategy = new UniStrategy(governance);
        oracle = new V3Oracle(
            governance,
            v3Factory,
            tokens,
            tokens,
            tokens,
            tokens,
            tokens,
            tokens
        );
        ulm = new UniswapLiquidityManager(
            IUniswapLiquidityManager.UnipilotProtocolDetails({
                swapPercentage: 2,
                swapPriceThreshold: 100000,
                premium: 10000000000000000,
                gasPriceLimit: 1900226581,
                userPilotPercentage: 98,
                feesPercentageIndexFund: 2,
                pilotWethPair: indexFund,
                oracle: address(oracle),
                indexFund: indexFund,
                uniStrategy: address(uniStrategy)
            }),
            v3Factory
        );
        unipilot = new Unipilot(governance, address(ulm));
        ulm.initialize(address(unipilot));
    }

    function initTokens(TestERC20 _token0, TestERC20 _token1) public {
        token0 = _token0;
        token1 = _token1;

    }
}
