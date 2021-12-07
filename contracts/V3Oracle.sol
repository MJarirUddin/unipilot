// SPDX-License-Identifier: MIT
pragma solidity 0.7.6;

import "./oracle/libraries/SafeUint128.sol";
import "./oracle/libraries/OracleLibrary.sol";
import "./oracle/interfaces/IOracle.sol";

import "@openzeppelin/contracts/math/SafeMath.sol";

import "@uniswap/v3-periphery/contracts/libraries/PoolAddress.sol";
import "@uniswap/v3-core/contracts/interfaces/IUniswapV3Pool.sol";
import "@uniswap/v3-core/contracts/interfaces/IUniswapV3Factory.sol";

contract V3Oracle is IOracle {
    using SafeMath for uint256;

    address public governance;
    address public immutable weth;
    address public immutable pilot;
    address public immutable dai;
    address public immutable usdt;
    address public immutable usdc;
    address public immutable uniswapFactory;

    address public pilotWethPair;

    modifier onlyGovernance() {
        require(msg.sender == governance, "NG");
        _;
    }

    constructor(
        address _governance,
        address _uniswapFactory,
        address _weth,
        address _pilot,
        address _dai,
        address _usdt,
        address _usdc,
        address _pilotWethPair
    ) {
        (governance, uniswapFactory, weth, pilot, dai, usdt, usdc, pilotWethPair) = (
            _governance,
            _uniswapFactory,
            _weth,
            _pilot,
            _dai,
            _usdt,
            _usdc,
            _pilotWethPair
        );
    }

    /// @notice sets new address for the admin role
    function setGovernance(address _governance) external onlyGovernance {
        require(_governance != address(0), "IGA");
        emit GovernanceUpdated(governance, _governance);
        governance = _governance;
    }

    function getPoolAddress(
        address token0,
        address token1,
        uint24 fee
    ) private view returns (address) {
        return IUniswapV3Factory(uniswapFactory).getPool(token0, token1, fee);
    }

    function getPoolDetails(address pool)
        private
        view
        returns (
            address token0,
            address token1,
            uint24 fee,
            uint16 poolCardinality,
            uint128 liquidity,
            uint160 sqrtPriceX96,
            int24 currentTick,
            int24 tickSpacing
        )
    {
        IUniswapV3Pool uniswapPool = IUniswapV3Pool(pool);
        token0 = uniswapPool.token0();
        token1 = uniswapPool.token1();
        fee = uniswapPool.fee();
        liquidity = uniswapPool.liquidity();
        (sqrtPriceX96, currentTick, , poolCardinality, , , ) = uniswapPool.slot0();
        tickSpacing = uniswapPool.tickSpacing();
    }

    /**
     *   @notice This function returns a pool address of the given token with WETH
     *   which has the maximum liquidity among all fee tiers
     *   @param token: address of token
     *   @return address: pair
     **/
    function getTokenWethPairWithMaxLiquidity(address token)
        public
        view
        override
        returns (address)
    {
        address pair;
        uint256 liquidity;
        uint16[3] memory feeTier = [3000, 500, 10000];
        uint256 maxLiquidity;
        address tempPair = address(0);
        for (uint8 tierIndex = 0; tierIndex < feeTier.length; tierIndex++) {
            pair = getPoolAddress(token, weth, feeTier[tierIndex]);
            if (pair != address(0)) {
                liquidity = IUniswapV3Pool(pair).liquidity();
                if (liquidity > maxLiquidity) {
                    maxLiquidity = liquidity;
                    tempPair = pair;
                }
            }
        }
        return tempPair;
    }

    /**
     *   @notice This function returns the pilot amount equivalent to the liquidity
     *   provided in the tokens. It is used when the user chooses to collect fees
     *   in $PILOT
     *   @param token0: address of token0
     *   @param token1: address of token1
     *   @param amount0: amount of token0
     *   @param amount1: amount of token1
     *   @return total uint256
     **/
    function getPilotAmountForTokens(
        address token0,
        address token1,
        uint256 amount0,
        uint256 amount1,
        address oracle0,
        address oracle1
    ) external view override returns (uint256 total) {
        amount0 = getPilotAmount(token0, amount0, oracle0);
        amount1 = getPilotAmount(token1, amount1, oracle1);
        total = amount0.add(amount1);
    }

    /**
     *   @notice This function returns pilot amount equivalent to the liqudity
     *   provided in the WETH pairs.
     *   @param tokenAlt: address of alt token
     *   @param altAmount: amount of alt token
     *   @param wethAmount: amount of weth token
     **/
    function getPilotAmountWethPair(
        address tokenAlt,
        uint256 altAmount,
        uint256 wethAmount,
        address altOracle
    ) external view override returns (uint256 amount) {
        uint256 pilotAmount0 = ethToAsset(pilot, pilotWethPair, wethAmount);
        uint256 pilotAmount1 = altAmount;
        if (tokenAlt != pilot) {
            pilotAmount1 = getPilotAmount(tokenAlt, altAmount, altOracle);
        }
        amount = pilotAmount0.add(pilotAmount1);
    }

    /**
     *   @notice This function returns the pilot amount equivalent to the
     *   token value provided
     *   @param token: address of token
     *   @param amount: amount of token
     *   @return pilotAmount uint256
     **/
    function getPilotAmount(
        address token,
        uint256 amount,
        address pool
    ) public view override returns (uint256 pilotAmount) {
        uint256 ethAmount = assetToEth(token, pool, amount);
        pilotAmount = ethToAsset(pilot, pilotWethPair, ethAmount);
    }

    /**
     *   @notice This function returns the price of an asset into eth value
     *   @param token: address of the token
     *   @param pool: fee tier
     *   @param amountIn: amount of provided token
     *   @return ethAmountOut uint256
     **/
    function assetToEth(
        address token,
        address pool,
        uint256 amountIn
    ) public view override returns (uint256 ethAmountOut) {
        return getPrice(token, weth, pool, amountIn);
    }

    /**
     *   @notice This function returns the price of eth into a desired asset
     *   @param tokenOut: address of desired token
     *   @param pool: fee tier
     *   @param amountIn: amount of eth provided
     *   @return amountOut uint256
     **/
    function ethToAsset(
        address tokenOut,
        address pool,
        uint256 amountIn
    ) public view override returns (uint256 amountOut) {
        return getPrice(weth, tokenOut, pool, amountIn);
    }

    /**
     *   @notice This function returns the price of a token equivalent
     *   to the price of the other token in a pool
     *   @param tokenA: address of tokenA
     *   @param tokenB: address of tokenB
     *   @param pool: fee tier of the intended pool
     *   @param _amountIn: amount of tokenIn
     *   @return amountOut The out amount from Oracle
     **/
    function getPrice(
        address tokenA,
        address tokenB,
        address pool,
        uint256 _amountIn
    ) public view override returns (uint256 amountOut) {
        (uint32 lastTimeStamp, , , ) = IUniswapV3Pool(pool).observations(0);
        int256 twapTick = OracleLibrary.consult(
            pool,
            uint32(block.timestamp) - lastTimeStamp
        );
        return
            OracleLibrary.getQuoteAtTick(
                int24(twapTick),
                SafeUint128.toUint128(_amountIn),
                tokenA,
                tokenB
            );
    }
}
