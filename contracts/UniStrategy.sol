// SPDX-License-Identifier: GPL-3.0-or-later
pragma solidity =0.7.6;
pragma abicoder v2;

import "./interfaces/IUnipilot.sol";
import "./interfaces/IUniStrategy.sol";

import "@uniswap/v3-core/contracts/libraries/TickMath.sol";
import "@uniswap/v3-core/contracts/interfaces/IUniswapV3Pool.sol";

/**
 * @title UniStrategy.
 * @author Mubashir-ali-baig.
 * @notice
 *   This contract calculates suitable tick ranges to fully deposit liquidity asset.
 *   It maintains two strategies for unipilot vaults
 *   1) Base order => For depositing in-range liquidity
 *   2) Range order => To distribute remaining assets behind or ahead of base order ticks,
 *   so that users liquidity does not abruptly goes out of range
 *   @dev These ranges are named as follows.
 *   Base => upper and lower ticks for main range to deposit
 *   Ask => Upper and lower ticks ahead of the current tick and base upper
 *   Bid => Upper and lower ticks behind the current and base lower
 **/
contract UniStrategy is IUniStrategy {
    /// @dev governance address is set on deployment for the governance based functions
    address public governance;
    /// @dev unipilot address;
    address public unipilot;
    /// @dev rangeMultiplier is multiplied with tick spacing to calculate range order spread
    int24 public rangeMultiplier;
    /// @dev baseMultiplier is multiplied with tick spacing to calculate base order spread
    int24 public baseMultiplier;
    /// @dev rangeOrder is the range calculate the spread behind and ahead of the base range
    int24 private rangeOrder;
    /// @dev maxTwapDeviation is the max time weighted average deviation of price from the normal range in both directions
    int24 private maxTwapDeviation;
    /// @dev readjustMultiplier is the percentage multiplier of raedjust threshold
    int24 private readjustMultiplier;
    /// @dev twapDuration is the minimum duration in which the diviated price moves
    uint32 private twapDuration;

    constructor(address _governance) {
        governance = _governance;
        maxTwapDeviation = 1200;
        twapDuration = 60; // 3600
        rangeMultiplier = 5; // 60
        baseMultiplier = 4; // 60
        readjustMultiplier = 10;
    }

    /// @dev poolStrategy maintains the base,range multipliers and
    ///  twap variations for each pool
    mapping(address => PoolStrategy) internal poolStrategy;

    modifier onlyGovernance() {
        require(msg.sender == governance, "NG");
        _;
    }

    modifier onlyExchange() {
        require(IUnipilot(unipilot).exchangeManagerWhitelist(msg.sender), "ENW");
        _;
    }

    /**
     *   @notice This function returns base,ask and bid range ticks for the given pool
     *   - It fetches the current tick and tick spacing of the pool
     *   - Multiples the tick spacing with pools base and range multipliers
     *   - Calculates pools twap and verifies whether it is under the maxtwapdeviation
     *   - If the price is under the deviation limit, it returns the base ranges along with range order ticks
     *   @param _pool: pool address
     **/
    function getTicks(address _pool)
        external
        override
        onlyExchange
        returns (
            int24 baseLower,
            int24 baseUpper,
            int24 bidLower,
            int24 bidUpper,
            int24 askLower,
            int24 askUpper
        )
    {
        (int24 tick, int24 tickSpacing) = getCurrentTick(_pool);
        if (poolStrategy[_pool].baseThreshold == 0) {
            poolStrategy[_pool] = PoolStrategy({
                baseThreshold: tickSpacing * baseMultiplier,
                rangeThreshold: tickSpacing * rangeMultiplier,
                maxTwapDeviation: maxTwapDeviation,
                readjustThreshold: ((tickSpacing * baseMultiplier) * readjustMultiplier) /
                    100,
                twapDuration: twapDuration
            });
        }
        rangeOrder = poolStrategy[_pool].rangeThreshold;
        int24 maxThreshold = poolStrategy[_pool].baseThreshold > rangeOrder
            ? poolStrategy[_pool].baseThreshold
            : rangeOrder;

        require(
            (tick > TickMath.MIN_TICK + maxThreshold + tickSpacing) &&
                (tick < (TickMath.MAX_TICK - maxThreshold - tickSpacing)),
            "IT"
        );
        int24 twap = calculateTwap(_pool);
        int24 deviation = tick > twap ? tick - twap : twap - tick;

        require(deviation <= poolStrategy[_pool].maxTwapDeviation, "MTF");

        int24 tickFloor = _floor(tick, tickSpacing);
        int24 tickCeil = tickFloor + tickSpacing;

        baseLower = tickFloor - poolStrategy[_pool].baseThreshold;
        baseUpper = tickFloor + poolStrategy[_pool].baseThreshold;
        bidLower = tickFloor - rangeOrder;
        bidUpper = tickFloor;
        askLower = tickCeil;
        askUpper = tickCeil + rangeOrder;
    }

    /**
     *   @notice This function sets the global multipier value of the range order
     *   @param _rangeMultiplier: a multiplier value to decide the spread of range order
     **/
    function setRangeMultiplier(int24 _rangeMultiplier) external onlyGovernance {
        require(_rangeMultiplier > 0, "IRM");
        emit RangeMultiplierUpdated(rangeMultiplier, rangeMultiplier = _rangeMultiplier);
        // rangeMultiplier = _rangeMultiplier;
    }

    /**
     *   @notice This function updates the base range mutiplier
     *   @param _baseMultiplier: a mutiplier value to decide the spread of base range
     **/
    function setBaseMutiplier(int24 _baseMultiplier) external onlyGovernance {
        require(_baseMultiplier > 0, "IBM");
        emit BaseMultiplierUpdated(baseMultiplier, baseMultiplier = _baseMultiplier);
        // baseMultiplier = _baseMultiplier;
    }

    /**
     *   @notice This function updates the deviation limit of tick spread
     *   @param _twapDeviation: a value to decide the maximum price deviation
     **/
    function setMaxTwapDeviation(int24 _twapDeviation) external onlyGovernance {
        emit MaxTwapDeviationUpdated(maxTwapDeviation, maxTwapDeviation = _twapDeviation);
        // maxTwapDeviation = _twapDeviation;
    }

    /**
     *   @notice This function updates the twap duration
     *   @param _twapDuration: a value for the duration of recalbiration of the twap
     **/
    function setTwapDuration(uint32 _twapDuration) external onlyGovernance {
        emit TwapDurationUpdated(twapDuration, twapDuration = _twapDuration);
        // twapDuration = _twapDuration;
    }

    function setReadjustMultiplier(int24 _readjustMultipier) external onlyGovernance {
        require(_readjustMultipier > 0, "IREM");
        // emit ReadjustMultiplierUpdated(
        //     readjustMultiplier,
        //     readjustMultiplier = _readjustMultipier
        // );
    }

    /**
     *   @notice This function updates the range,base threshold and twap values specific to a pool
     *   @param params: struct values of PoolStrategy struct, the values can be inspected from interface
     *   @param _pool<: pool address
     **/
    function changeStrategy(PoolStrategy memory params, address _pool)
        external
        onlyGovernance
    {
        PoolStrategy memory oldStrategy = poolStrategy[_pool];
        validateStrategy(params.baseThreshold, IUniswapV3Pool(_pool).tickSpacing());
        emit StrategyUpdated(
            oldStrategy,
            poolStrategy[_pool] = PoolStrategy({
                baseThreshold: params.baseThreshold,
                rangeThreshold: params.rangeThreshold,
                maxTwapDeviation: params.maxTwapDeviation,
                readjustThreshold: params.readjustThreshold,
                twapDuration: params.twapDuration
            })
        );
    }

    function updateUnipilotAddress(address _unipilot) external onlyGovernance {
        require(_unipilot != address(0), "ZA");
        unipilot = _unipilot;
    }

    function getStrategy(address _pool)
        external
        view
        returns (PoolStrategy memory strategy)
    {
        strategy = poolStrategy[_pool];
    }

    function getReadjustThreshold(address _pool)
        external
        view
        override
        returns (int24 readjustThreshold)
    {
        readjustThreshold = poolStrategy[_pool].readjustThreshold;
    }

    /**
     *   @notice This function calculates the current twap of pool
     *   @param pool: pool address
     **/
    function calculateTwap(address pool) internal view returns (int24 twap) {
        uint128 inRangeLiquidity = IUniswapV3Pool(pool).liquidity();
        if (inRangeLiquidity == 0) {
            (uint160 sqrtPriceX96, , , , , , ) = IUniswapV3Pool(pool).slot0();
            twap = TickMath.getTickAtSqrtRatio(sqrtPriceX96);
        } else {
            twap = getTwap(pool);
        }
    }

    /**
     *   @notice This function fetches the twap of pool from the observation
     *   @param _pool: pool address
     **/
    function getTwap(address _pool) public view returns (int24) {
        uint32[] memory secondsAgo = new uint32[](2);
        secondsAgo[0] = poolStrategy[_pool].twapDuration;
        secondsAgo[1] = 0;
        (int56[] memory tickCumulatives, ) = IUniswapV3Pool(_pool).observe(secondsAgo);
        return
            int24(
                (tickCumulatives[1] - tickCumulatives[0]) /
                    int56(int32(poolStrategy[_pool].twapDuration))
            );
    }

    /**
     *   @notice This function calculates the lower tick value from the current tick
     *   @param tick: current tick of the pool
     *   @param tickSpacing: tick spacing according to the fee tier
     **/
    function _floor(int24 tick, int24 tickSpacing) internal pure returns (int24) {
        int24 compressed = tick / tickSpacing;
        if (tick < 0 && tick % tickSpacing != 0) compressed--;
        return compressed * tickSpacing;
    }

    /**
     *   @notice This function fetches the current tick of the pool
     *   @param pool: pool address
     **/
    function getCurrentTick(address pool)
        internal
        view
        returns (int24 tick, int24 tickSpacing)
    {
        (, tick, , , , , ) = IUniswapV3PoolState(pool).slot0();
        tickSpacing = IUniswapV3Pool(pool).tickSpacing();
    }

    /**
     *   @notice This function validates that the updating strategy of the pool during the update
     *   @param _strategy: a value for baseThreshold
     *   @param _tickSpacing: spacing of tick according to fee tier
     **/
    function validateStrategy(int24 _strategy, int24 _tickSpacing) internal pure {
        require(
            _strategy <= TickMath.MAX_TICK &&
                _strategy % _tickSpacing == 0 &&
                _strategy > 0,
            "INS"
        );
    }
}
