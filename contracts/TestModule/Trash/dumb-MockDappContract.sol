// // SPDX-License-Identifier: MIT
// pragma solidity 0.7.6;
// pragma abicoder v2;

// import "./setupMock.sol";


// contract MockUnipilot {
//     SetupAllMocks public contracts;

//     TestERC20 public token0;
//     TestERC20 public token1;

//     constructor(TestERC20 _token0, TestERC20 _token1) {
//         token0 = _token0;
//         token1 = _token1;
//         contracts = new SetupAllMocks();
//     }

//     function doCreatePair(uint24 fee, uint160 sqrt) public returns (address pool) {
//         //uint24 fee = 3000;
//         //uint160 sqrt = 25052894984021797146183221489;
//         pool = contracts.ulm().createPair(
//             address(contracts.token0()),
//             address(contracts.token1()),
//             abi.encode(fee, sqrt)
//         );
//     }

//     function doDeposit(
//         uint24 fee,
//         uint256 tokenId,
//         uint256 amount0,
//         uint256 amount1
//     ) public returns (uint256) {
//         (, , uint256 mintedTokenId) = contracts.unipilot().deposit(
//             IExchangeManager.DepositParams({
//                 sender: address(this),
//                 exchangeAddress: address(contracts.ulm()),
//                 token0: address(contracts.token0()),
//                 token1: address(contracts.token1()),
//                 amount0Desired: amount0,
//                 amount1Desired: amount1
//             }),
//             abi.encode(fee, tokenId)
//         );
//         return mintedTokenId;
//     }

//     function doSwap(
//         uint24 fee,
//         uint256 _amountin,
//         uint256 loop
//     ) public returns (uint256 amoutout) {
//         for (uint256 i = 0; i < loop; i++) {
//             amoutout = contracts.swap().swapExactInputSingle(
//                 _amountin,
//                 address(contracts.token0()),
//                 address(contracts.token1()),
//                 fee
//             );
//         }
//     }

//     function doCollect(
//         uint256 nft,
//         bool _pilotToken,
//         bool _wethToken
//     ) public {
//         contracts.unipilot().collect(
//             IExchangeManager.CollectParams({
//                 pilotToken: _pilotToken,
//                 wethToken: _wethToken,
//                 exchangeAddress: address(contracts.ulm()),
//                 tokenId: nft
//             }),
//             abi.encode(address(this))
//         );
//     }

//     function doShouldRebase(uint24 _fee) public view returns (bool nod) {
//         address pool = contracts.ulm()._getPoolAddress(
//             address(contracts.token0()),
//             address(contracts.token1()),
//             _fee
//         );
//         nod = contracts.ulmState().shouldReadjust(pool, address(contracts.ulm()));
//     }

//     function doRebase(uint24 fee) public {
//         bool nod = doShouldRebase(fee);
//         if (nod) {
//             contracts.ulm().readjustLiquidity(
//                 address(contracts.token0()),
//                 address(contracts.token1()),
//                 fee
//             );
//         }
//     }

//     function doWithdraw(
//         uint256 _nft,
//         bool _pilotToken,
//         bool _wethToken,
//         uint256 dv
//     ) public {
//         (, , uint256 userLiquidity, , , , ) = IUniswapLiquidityManager(contracts.ulm())
//             .positions(_nft);
//         uint256 liquid = userLiquidity / dv;
//         for (uint256 index = 0; index < dv; index++) {
//             contracts.unipilot().withdraw(
//                 IExchangeManager.WithdrawParams({
//                     pilotToken: _pilotToken,
//                     wethToken: _wethToken,
//                     exchangeAddress: address(contracts.ulm()),
//                     liquidity: liquid,
//                     tokenId: _nft
//                 }),
//                 abi.encode(address(this))
//             );
//         }
//     }
// }

// contract E2E {
//     using SafeMath for uint256;

//     struct PoolParams {
//         uint24 fee;
//         int24 tickSpacing;
//         int24 minTick;
//         int24 maxTick;
//         uint24 tickCount;
//         uint160 startPrice;
//         int24 startTick;
//     }

//     PoolParams public poolParams;
//     MockUnipilot public user;

//     TestERC20 public token0;
//     TestERC20 public token1;

//     uint256[] public nftID;
//     uint256 public nft;

//     uint256 public loopCounter;
//     address public pool;

//     bool public usercreated;
//     bool public inited;

//     constructor() {
//         token0 = new TestERC20(1e18 ether);
//         token1 = new TestERC20(1e18 ether);
//         init();

//         if (address(token0) > address(token1)) {
//             (token0, token1) = (token1, token0);
//         }
//     }

//     // ===================================SETUP===============================
//     function createUser() internal {
//         if (!usercreated) {
//             user = new MockUnipilot(token0, token1);
//             token0.mint(address(user), 1000000000000000000 ether);
//             token1.mint(address(user), 1000000000000000000 ether);

//             usercreated = true;
//         }
//     }

//     function forgePoolParams(uint128 _seed)
//         internal
//         view
//         returns (PoolParams memory _poolParams)
//     {
//         //
//         // decide on one of the three fees, and corresponding tickSpacing
//         //
//         if (_seed % 3 == 0) {
//             _poolParams.fee = uint24(500);
//             _poolParams.tickSpacing = int24(10);
//         } else if (_seed % 3 == 1) {
//             _poolParams.fee = uint24(3000);
//             _poolParams.tickSpacing = int24(60);
//         } else if (_seed % 3 == 2) {
//             _poolParams.fee = uint24(10000);
//             _poolParams.tickSpacing = int24(2000);
//         }
//         _poolParams.maxTick =
//             (int24(887272) / _poolParams.tickSpacing) *
//             _poolParams.tickSpacing;
//         _poolParams.minTick = -_poolParams.maxTick;
//         _poolParams.tickCount = uint24(_poolParams.maxTick / _poolParams.tickSpacing);
//         //
//         // set the initial price
//         //
//         _poolParams.startTick = int24(
//             (_seed % uint128(_poolParams.tickCount)) * uint128(_poolParams.tickSpacing)
//         );
//         if (_seed % 3 == 0) {
//             // set below 0
//             _poolParams.startPrice = TickMath.getSqrtRatioAtTick(-_poolParams.startTick);
//         } else if (_seed % 3 == 1) {
//             // set at 0
//             _poolParams.startPrice = TickMath.getSqrtRatioAtTick(0);
//             _poolParams.startTick = 0;
//         } else if (_seed % 3 == 2) {
//             // set above 0
//             _poolParams.startPrice = TickMath.getSqrtRatioAtTick(_poolParams.startTick);
//         }
//     }

//     function init() internal {
//         createUser();
//         uint128 _seed = 15;
//         poolParams = forgePoolParams(_seed);

//         pool = user.createpair(poolParams.fee, poolParams.startPrice);
//         user.depositT(poolParams.fee, 0, 100 ether, 100 ether);
//         nftID.push(nft);
//         inited = true;
//     }

//     function depositTest(
//         uint256 _amount0,
//         uint256 _amount1,
//         uint256 loop
//     ) public payable {
//         if (!inited) init();

//         loopCounter = loop;
//         for (uint256 j = 0; j < loop; j++) {
//             nft = user.doDeposit(poolParams.fee, 0, _amount0, _amount1);
//             nftID.push(nft);
//         }
//     }

//     function rebaseTest() public {
//         user.doRebase(poolParams.fee);
//     }

//     function swapTest(uint256 _amountin, uint256 loop) public {
//         user.doSwap(poolParams.fee, _amountin, loop);
//     }

//     function withdrawTest(
//         bool _pilotToken,
//         bool _wethToken,
//         uint256 dv
//     ) public {
//         require(loopCounter > 0, "run deposite first");
//         for (uint256 index = 0; index < loopCounter; index++) {
//             user.doWithdraw(nftID[index + 1], _pilotToken, _wethToken, dv);
//         }
//     }

//     function collectTest(bool _pilotToken, bool _wethToken) public {
//         require(loopCounter > 0, "run deposite first");
//         for (uint256 index = 0; index < loopCounter; index++) {
//             user.doCollect(nftID[index + 1], _pilotToken, _wethToken);
//         }
//     }
// }
