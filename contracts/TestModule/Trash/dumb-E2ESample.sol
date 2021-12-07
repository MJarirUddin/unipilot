// import "../test/TestERC20.sol";
// import "../interfaces/external/IERC20.sol";
// import "../interfaces/uniswap/IUniswapLiquidityManager.sol";
// //import "../base/ERC721Permit.sol";
// import "../base/UniswapLiquidityManager.sol";
// import "../Unipilot.sol";
// import "../UniStrategy.sol";
// import "../V3Oracle.sol";
// import "../base/ULMState.sol";
// //import '@uniswap/v3-periphery/contracts/libraries/TransferHelper.sol';
// import "@uniswap/v3-periphery/contracts/interfaces/ISwapRouter.sol";
// import "@uniswap/v3-core/contracts/libraries/FullMath.sol";
// //import "@uniswap/v3-core/contracts/interfaces/IUniswapV3Factory.sol";
// //import "@uniswap/v3-core/contracts/interfaces/IUniswapV3Pool.sol";
// contract SwapExamples {
//     ISwapRouter public immutable swapRouter;
//     constructor(ISwapRouter _swapRouter) {
//         swapRouter = _swapRouter;
//     }
//     function swapExactInputSingle(
//         uint256 amountIn,
//         address _token0,
//         address _token1,
//         uint24 fee
//     ) external returns (uint256 amountOut) {
//         TransferHelper.safeTransferFrom(_token0, msg.sender, address(this), amountIn);
//         TransferHelper.safeApprove(_token0, address(swapRouter), amountIn);
//         ISwapRouter.ExactInputSingleParams memory params = ISwapRouter
//             .ExactInputSingleParams({
//                 tokenIn: _token0,
//                 tokenOut: _token1,
//                 fee: fee,
//                 recipient: msg.sender,
//                 deadline: block.timestamp + 600,
//                 amountIn: amountIn,
//                 amountOutMinimum: 0,
//                 sqrtPriceLimitX96: 0
//             });
//         // The call to `exactInputSingle` executes the swap.
//         amountOut = swapRouter.exactInputSingle(params);
//     }
// }
// contract Setup {
//     address internal indexFund = 0x424A8F861a17CF1aF6F10136773588d745Cd0FaC;
//     address public v3Factory = 0x5b1869D9A4C187F2EAa108f3062412ecf0526b24;
//     address public swapAddr = 0xCfEB869F69431e42cdB54A4F4f105C19C080A601;
//     address public pilotWeth = 0xf6415c04aCf482d5Fe0043734A1215490A86cff4;
//     address public weth9 = 0xe78A0F7E598Cc8b0Bb87894B0F60dD2a88d6a8Ab;
//     UniswapLiquidityManager public ulm;
//     Unipilot public unipilot;
//     ULMState public ulmState;
//     V3Oracle public oracle;
//     UniStrategy public uniStrategy;
//     SwapExamples public swap;
//     constructor() {
//         address governance = msg.sender;
//         ulmState = new ULMState();
//         uniStrategy = new UniStrategy(governance);
//         oracle = new V3Oracle(
//             governance,
//             v3Factory,
//             weth9,
//             weth9,
//             weth9,
//             weth9,
//             weth9,
//             weth9
//         );
//         ulm = new UniswapLiquidityManager(
//             IUniswapLiquidityManager.UnipilotProtocolDetails({
//                 swapPercentage: 2,
//                 swapPriceThreshold: 100000,
//                 premium: 10000000000000000,
//                 gasPriceLimit: 1900226581,
//                 userPilotPercentage: 98,
//                 feesPercentageIndexFund: 2,
//                 pilotWethPair: pilotWeth,
//                 oracle: address(oracle),
//                 indexFund: indexFund,
//                 uniStrategy: address(uniStrategy)
//             }),
//             v3Factory
//         );
//         unipilot = new Unipilot(governance, address(ulm));
//         ulm.initialize(address(unipilot));
//         swap = new SwapExamples(ISwapRouterplies(swapAddr));
//     }
// }
// contract UnipilotUser {
//     Setup public contracts;
//     TestERC20 _token0;
//     TestERC20 _token1;
    
//     constructor(TestERC20 _token0_, TestERC20 _token1_) {
//         contracts = new Setup();
//         _token0 = _token0_;
//         _token1 = _token1_;
//         if (address(_token0) > address(_token1)) {
//             (_token0, _token1) = (_token1, _token0);
//         }
//     }
//     function balance0() public view returns (uint256) {
//         uint256 bal = _token0.balanceOf(address(this));
//         return bal;
//         // address tokenc0 = address(token1);
//         // return tokenc0;
//     }
//     function balance1() public view returns (uint256) {
//         uint256 bal = _token1.balanceOf(address(this));
//         return bal;
//         // address tokenc0 = address(token1);
//         // return tokenc0;
//     }
//     function balance0fULM() public view returns (uint256) {
//         uint256 bal = _token0.balanceOf(address(contracts.ulm()));
//         return bal;
//         // address tokenc0 = address(token1);
//         // return tokenc0;
//     }
//     function balance1fULM() public view returns (uint256) {
//         uint256 bal = _token1.balanceOf(address(contracts.ulm()));
//         return bal;
//         // address tokenc0 = address(token1);
//         // return tokenc0;
//     }
//     function createpair(uint24 fee, uint160 sqrt) public returns (address pool) {
//         //uint24 fee = 3000;
//         //uint160 sqrt = 25052894984021797146183221489;
//         pool = contracts.ulm().createPair(
//             address(_token0),
//             address(_token1),
//             abi.encode(fee, sqrt)
//         );
//     }
//     function depositT(uint24 fee, uint256 tokenID, uint256 amount0, uint256 amount1) public returns (uint256 amount0added , uint256 amount1added){
//         //uint24 fee = 3000;
//         //uint256 tokenId = 0;
//         (amount0added, amount1added) = contracts.unipilot().deposit(
//             IExchangeManager.DepositParams({
//                 recipient: address(this),
//                 exchangeManagerAddress: address(contracts.ulm()),
//                 token0: address(_token0),
//                 token1: address(_token1),
//                 amount0Desired: amount0,
//                 amount1Desired: amount1,
//                 tokenId : tokenID
//             }),
//             abi.encode(fee)
//         );
//     }
//     function swapNigga(uint24 fee,uint256 _amountin, uint256 loop) public returns (uint256 amoutout) {
//         for (uint256 i = 0; i < loop; i++) {
//             amoutout = contracts.swap().swapExactInputSingle(
//                     _amountin,
//                     address(_token0),
//                     address(_token1),
//                     fee
//             );
//         }
//     }
//     function collectO(uint256 nft, bool _pilotToken, bool _wethToken) public {
//         contracts.unipilot().collect(
//             IExchangeManager.CollectParams({
//                 pilotToken: _pilotToken,
//                 wethToken: _wethToken,
//                 exchangeManagerAddress: address(contracts.ulm()),
//                 tokenId: nft
//             }),
//             abi.encode(address(this))
//         );
//     }
//     function shouldrebase(uint24 _fee) public view returns(bool nod){
        
       
//         address pool = contracts.ulm().getPoolAddress(
//             address(_token0),
//             address(_token1),
//             _fee
//         );
//         IUniswapLiquidityManager.LiquidityPosition memory lp = contracts.ulm().poolPositions(pool);   
//         nod = contracts.ulm().shouldReadjust(pool, lp.baseTickLower, lp.baseTickUpper);
//     }
//     function rebase(uint24 fee) public returns(bool nod){
//        nod = shouldrebase(fee);
//        if(nod){
//             contracts.ulm().readjustLiquidity(
//                 address(_token0), 
//                 address(_token1), 
//                 fee
//             );
//         }
//     }
//     function withdrawal(uint256 _nft,bool _pilotToken, bool _wethToken , uint256 dv) public {
//         IUniswapLiquidityManager.Position memory pos = contracts.ulm().userPositions(_nft);   
//         uint256 userLiquidity = pos.liquidity;
//         uint256 liquid = userLiquidity / dv;
//         // require(removeLiquidity <= userLiquidity, "you asked for too much");
//         for (uint256 index = 0; index < dv; index++) {
//                 contracts.unipilot().withdraw(
//                 IExchangeManager.WithdrawParams({
//                     pilotToken: _pilotToken,
//                     wethToken: _wethToken,
//                     exchangeManagerAddress: address(contracts.ulm()),
//                     liquidity: liquid,
//                     tokenId: _nft
//                 }),
//                 abi.encode(address(this))
//             );
//         } 
//     }
//     // function calculateFeeAll(address _pool) public returns (uint256 fee0 , uint256 fee1) {
//     //     (fee0, fee1 , )= contracts.ulm().updatePositionTotalAmounts(_pool);
//     // }
//     // function collectfee1 () public returns (uint256 fee0 , uint256 fee1) {
//     //     (fee0, fee1)= contracts.ulm().getUserFees(1);
//     // }
//     // function unipilotPos (address _pool) public returns(uint128 fee0, uint128 fee1){
//     //     calculateFeeAll(_pool);
//     //     (int24 baseTickLower, int24 baseTickUpper , , int24 rangeTickLower, int24 rangeTickUpper , , , , , ,) = 
//     //         IUniswapLiquidityManager(contracts.ulm()).liquidityPositions(_pool);
//     //     (, , , uint128 tokensOwed0, uint128 tokensOwed1) = 
//     //     IUniswapV3Pool(_pool).positions(keccak256(abi.encodePacked(address(contracts.ulm()), baseTickLower , baseTickUpper)));
//     //      (, , , uint128 _tokensOwed0, uint128 _tokensOwed1) = 
//     //     IUniswapV3Pool(_pool).positions(keccak256(abi.encodePacked(address(contracts.ulm()), rangeTickLower , rangeTickUpper)));
//     //     fee0 = tokensOwed0 + _tokensOwed0;
//     //     fee1 = tokensOwed1 + _tokensOwed1;
//     // }
// }
 
 
// contract E2E {
//     using SafeMath for uint256;
    
//     UnipilotUser public user;
//     uint256[] public nftID;
//     address public pool;
//     address public pool0;
//     uint256 public nft; 
//     TestERC20 public token0;
//     TestERC20 public token1;
//     bool usercreated;
//     bool public minted;
//     bool public inited;
//     uint256 public loopCounter;
//     constructor () {
//         token0 = new TestERC20(1e18 ether);
//         token1 = new TestERC20(1e18 ether);
//         //createUser();
//         cPair_Test();
//     }
//     struct PoolParams {
//         uint24 fee;
//         int24 tickSpacing;
//         int24 minTick;
//         int24 maxTick;
//         uint24 tickCount;
//         uint160 startPrice;
//         int24 startTick;
//     }
//     PoolParams poolParams;
//     function createUser() internal {
        
//          if(!usercreated){
            
//                 user =  new UnipilotUser(token0, token1);
//                 token0.mint(address(user), 1000000000000000000 ether);
//                 token1.mint(address(user), 1000000000000000000 ether);
            
//              usercreated = true;
//          }
//     }
//     function balance() public view returns(uint256 bal) {
//         bal = user.balance0();
//     }
//     function balancePool() public view returns(uint256 bal0 , uint256 bal1) {
//         bal0 = token0.balanceOf(address(pool));
//         bal1 = token1.balanceOf(address(pool));
//     }
//     function balance0ULM() public view returns(uint256 bal) {
//         bal = user.balance0fULM();
//     }
//     function balance1ULM() public view returns(uint256 bal) {
//         bal = user.balance1fULM();
//     }
//     function forgePoolParams(uint128 _seed) internal view returns (PoolParams memory _poolParams) {
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
//         _poolParams.maxTick = (int24(887272) / _poolParams.tickSpacing) * _poolParams.tickSpacing;
//         _poolParams.minTick = -_poolParams.maxTick;
//         _poolParams.tickCount = uint24(_poolParams.maxTick / _poolParams.tickSpacing);
//         //
//         // set the initial price
//         //
//         _poolParams.startTick = int24((_seed % uint128(_poolParams.tickCount)) * uint128(_poolParams.tickSpacing));
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
//     function cPair_Test() internal {
//             createUser();
//             uint128 _seed = 15;    
//             poolParams = forgePoolParams(_seed);
       
//             pool =   user.createpair(poolParams.fee, poolParams.startPrice);
//             user.depositT(poolParams.fee, 0 , 100 ether, 100 ether);
//             nftID.push(nft);
//             inited = true;
//     }
//     function deposite_init(uint256 _amount0 , uint256 _amount1, uint256 loop) public payable {
        
//         if(!inited) cPair_Test();
          
//         loopCounter = loop;
//         for(uint256 j = 0 ; j < loop; j++ ){
//             user.depositT(poolParams.fee, 0 , _amount0, _amount1);
//             nftID.push(nft++);   
//         }
        
//     }
  
//     // function deposite_Test(uint128 _seed, uint256 _amount0, uint256 _amount1) public {
//     //         //cPair_Test(); 
//     //         //deposite_init();
//     //     for(uint256 k = 0; k < 10 ; k++){
//     //         user[k].depositT(poolParams.fee ,nftID[k+1], _amount0, _amount1);
//     //         uint256 bal0 = user[k].balance0fULM();
//     //         uint256 bal1 = user[k].balance1fULM();
//     //         assert(bal0 == 0 && bal1 == 0);
//     //     }
        
//     // }
//     function collect_test(bool _pilotToken, bool _wethToken ) public {
//         require(loopCounter > 0 , "run deposite first");
//         for (uint256 index = 0; index < loopCounter; index++) {
//            user.collectO(nftID[index+1] , _pilotToken , _wethToken);
//         } 
//     }
//     // function pilotFeeOnUniswap() public returns(uint256 userfeeminustwo){
//     //     (uint256 fee0, uint256 fee1) = user.calculateFeeAll(pool);
//     //    uint256 ten_percent = FullMath.mulDiv(fee0, 10 , 100);
//     //    uint256 two_per_of_ten_per = FullMath.mulDiv(ten_percent, 2 , 100);
//     //      userfeeminustwo = ten_percent - two_per_of_ten_per;
        
//     // }
//     // function UserfeeOnPilot() public returns(uint256 userfeeminustwo) {
//     //      (uint256 _fee0, ) = user.collectfee1();
//     //     uint256 twoper =  FullMath.mulDiv(_fee0, 2 , 100);
//     //     userfeeminustwo = _fee0 - twoper;
//     // }
//     // function cal_for_single_user_uniswap() public returns (uint256 res0 , uint256 res1){
//     //     (uint128 fee0 ,uint128 fee1) = user.unipilotPos(pool);
//     //     uint256 tenper0 =  FullMath.mulDiv(fee0, 10 , 100);
//     //     uint256 tenper1 =  FullMath.mulDiv(fee1, 10 , 100);
//     //     uint256 twoper0 =  FullMath.mulDiv(tenper0, 2 , 100);
//     //     uint256 twoper1 =  FullMath.mulDiv(tenper1, 2 , 100);
//     //     res0 = tenper0 - twoper0;
//     //     res1 = tenper1 - twoper1;
//     // }
//     // function cal_for_all_user_uniswap() public returns (uint256 res0 , uint256 res1){
//     //     (uint128 fee0 ,uint128 fee1) = user.unipilotPos(pool);
//     //     uint256 twoper0 =  FullMath.mulDiv(fee0, 2 , 100);
//     //     uint256 twoper1 =  FullMath.mulDiv(fee1, 2 , 100);
//     //     res0 = fee0 - twoper0;
//     //     res1 = fee1 - twoper1;
//     // }
//     function addrs () public view returns (
//         address ulm, 
//         address upilot ,
//         address usr, 
//         address pol, 
//         TestERC20 tok0 ,
//         TestERC20 tok1) {
//             ulm = address(user.contracts().ulm());
//             upilot = address(user.contracts().unipilot());
//             usr = address(user);
//             pol = pool;
//             tok0 = token0;
//             tok1 = token1; 
//     }
//     // function updateUlmFees() public {
//     //     user.contracts().ulm()._collectPositionFees(pool);
        
//     // }
//     // function ulm_Bal_After_Collect_Fee() public view returns(uint256 res0){
//     //     uint256 bal = balance0ULM();
//     //     uint256 twoper0 =  FullMath.mulDiv(bal, 2 , 100);
//     //     res0 = bal.sub(twoper0);
//     // }
//     function subtracter(uint256 a, uint256 b) public view returns(uint256 sub){
//         sub = a.sub(b);
//     }
//     function _getCurrentTick() public view returns (int24 tick, uint160 sqrt) {
//         (sqrt, tick, , , , , ) = IUniswapV3Pool(pool).slot0();
//     }
//     // function property_cpairAndDep() public returns(uint256 bal0, uint256 bal1 ){
//     //     uint24 fee0 = 500;
//     //     uint24 fee1 = 3000;
//     //     poolParams = forgePoolParams(15);
//     //     pool0 =   user.createpair(fee0, poolParams.startPrice);
//     //     user.contracts().unipilot().createPoolAndDeposit(
//     //         IExchangeManager.DepositParams({
//     //             sender: address(this),
//     //             exchangeAddress: address(user.contracts().ulm()),
//     //             token0: address(token0),
//     //             token1: address(token1),
//     //             amount0Desired: 1000000 ether,
//     //             amount1Desired: 1000000 ether
//     //         }),
//     //         [abi.encode(fee1, poolParams.startPrice),abi.encode(fee0, 0)]
//     //     );
//     //     address pool1 = user.contracts().ulm()._getPoolAddress(address(token0) , address(token1) , fee1);
//     //     bal0 = token0.balanceOf(pool0);
//     //     bal1 = token0.balanceOf(pool1);
//     // }
//     function swaps(uint256 amount , uint256 loop) public {
//         user.swapNigga(poolParams.fee , amount, loop);
//     }
//     function property_readjust()public returns(bool a){
//        a = user.rebase(poolParams.fee);
//     }
//      function property_withdraw(bool _pilotToken, bool _wethToken , uint256 dv) public {
//         require(loopCounter > 0 , "run deposite first");
//         for (uint256 index = 0; index < loopCounter; index++) {
//                 user.withdrawal(nftID[index+1], _pilotToken ,_wethToken ,dv );   
//         }
//     }
// }




















// =========================================================================================================================




// contract UnipilotUser {
//     SetupAllMocks public contracts;

//     TestERC20 _token0;
//     TestERC20 _token1;

//     constructor(TestERC20 _token0_, TestERC20 _token1_) {
//         contracts = new SetupAllMocks();

//         _token0 = _token0_;
//         _token1 = _token1_;
        
//         if (address(_token0) > address(_token1)) {
//             (_token0, _token1) = (_token1, _token0);
//         }
//     }

//     function createpair(uint24 fee, uint160 sqrt) public returns (address pool) {
//         //uint24 fee = 3000;
//         //uint160 sqrt = 25052894984021797146183221489;
//         pool = contracts.ulm().createPair(
//             address(_token0),
//             address(_token1),
//             abi.encode(fee, sqrt)
//         );
//     }

//     function depositT(
//         uint24 fee,
//         uint256 tokenID,
//         uint256 amount0,
//         uint256 amount1
//     ) public returns (uint256 amount0added, uint256 amount1added) {
//         //uint24 fee = 3000;
//         //uint256 tokenId = 0;
//         (amount0added, amount1added) = contracts.unipilot().deposit(
//             IExchangeManager.DepositParams({
//                 recipient: address(this),
//                 exchangeManagerAddress: address(contracts.ulm()),
//                 token0: address(_token0),
//                 token1: address(_token1),
//                 amount0Desired: amount0,
//                 amount1Desired: amount1,
//                 tokenId: tokenID
//             }),
//             abi.encode(fee)
//         );
//     }

//     function swapNigga(
//         uint24 fee,
//         uint256 _amountin,
//         uint256 loop
//     ) public returns (uint256 amoutout) {
//         for (uint256 i = 0; i < loop; i++) {
//             amoutout = contracts.swap().swapExactInputSingle(
//                 _amountin,
//                 address(_token0),
//                 address(_token1),
//                 fee
//             );
//         }
//     }

//     function collectO(
//         uint256 nft,
//         bool _pilotToken,
//         bool _wethToken
//     ) public {
//         contracts.unipilot().collect(
//             IExchangeManager.CollectParams({
//                 pilotToken: _pilotToken,
//                 wethToken: _wethToken,
//                 exchangeManagerAddress: address(contracts.ulm()),
//                 tokenId: nft
//             }),
//             abi.encode(address(this))
//         );
//     }

//     function rebase(uint24 fee) public returns (bool nod) {
//         // nod = shouldrebase(fee);
//         // if(nod){
//         contracts.ulm().readjustLiquidity(address(_token0), address(_token1), fee);
//         //}
//     }

//     function withdrawal(
//         uint256 _nft,
//         bool _pilotToken,
//         bool _wethToken,
//         uint256 dv
//     ) public {
//         (, , uint256 userLiquidity, , , , ) = contracts.ulm().userPositions(_nft);
//         uint256 liquid = userLiquidity / dv;
//         // require(removeLiquidity <= userLiquidity, "you asked for too much");
//         for (uint256 index = 0; index < dv; index++) {
//             contracts.unipilot().withdraw(
//                 IExchangeManager.WithdrawParams({
//                     pilotToken: _pilotToken,
//                     wethToken: _wethToken,
//                     exchangeManagerAddress: address(contracts.ulm()),
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

//     UnipilotUser public user;
//     uint256[] public nftID;
//     address public pool;
//     address public pool0;
//     uint256 public nft;
//     TestERC20 public token0;
//     TestERC20 public token1;
//     bool usercreated;
//     bool public minted;
//     bool public inited;
//     uint256 public loopCounter;

//     constructor() {
//         token0 = new TestERC20(1e18 ether);
//         token1 = new TestERC20(1e18 ether);
//         //createUser();
//         cPair_Test();
//     }

//     struct PoolParams {
//         uint24 fee;
//         int24 tickSpacing;
//         int24 minTick;
//         int24 maxTick;
//         uint24 tickCount;
//         uint160 startPrice;
//         int24 startTick;
//     }
//     PoolParams poolParams;

//     function createUser() internal {
//         if (!usercreated) {
//             user = new UnipilotUser(token0, token1);
//             token0.mint(address(user), 1000000000000000000 ether);
//             token1.mint(address(user), 1000000000000000000 ether);

//             usercreated = true;
//         }
//     }

//     function balance() public view returns (uint256 bal) {
//         bal = user.balance0();
//     }

//     function balancePool() public view returns (uint256 bal0, uint256 bal1) {
//         bal0 = token0.balanceOf(address(pool));
//         bal1 = token1.balanceOf(address(pool));
//     }

//     function balance0ULM() public view returns (uint256 bal) {
//         bal = user.balance0fULM();
//     }

//     function balance1ULM() public view returns (uint256 bal) {
//         bal = user.balance1fULM();
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

//     function cPair_Test() internal {
//         createUser();
//         uint128 _seed = 15;
//         poolParams = forgePoolParams(_seed);

//         pool = user.createpair(poolParams.fee, poolParams.startPrice);
//         user.depositT(poolParams.fee, 0, 100 ether, 100 ether);
//         nftID.push(nft);
//         inited = true;
//     }

//     function deposite_init(
//         uint256 _amount0,
//         uint256 _amount1,
//         uint256 loop
//     ) public payable {
//         if (!inited) cPair_Test();

//         loopCounter = loop;
//         for (uint256 j = 0; j < loop; j++) {
//             nft = user.depositT(poolParams.fee, 0, _amount0, _amount1);
//             nftID.push(nft);
//         }
//     }

//     // function deposite_Test(uint128 _seed, uint256 _amount0, uint256 _amount1) public {
//     //         //cPair_Test();
//     //         //deposite_init();
//     //     for(uint256 k = 0; k < 10 ; k++){
//     //         user[k].depositT(poolParams.fee ,nftID[k+1], _amount0, _amount1);
//     //         uint256 bal0 = user[k].balance0fULM();
//     //         uint256 bal1 = user[k].balance1fULM();
//     //         assert(bal0 == 0 && bal1 == 0);
//     //     }

//     // }
//     function collect_test(bool _pilotToken, bool _wethToken) public {
//         require(loopCounter > 0, "run deposite first");
//         for (uint256 index = 0; index < loopCounter; index++) {
//             user.collectO(nftID[index + 1], _pilotToken, _wethToken);
//         }
//     }

//     // function pilotFeeOnUniswap() public returns(uint256 userfeeminustwo){
//     //     (uint256 fee0, uint256 fee1) = user.calculateFeeAll(pool);
//     //    uint256 ten_percent = FullMath.mulDiv(fee0, 10 , 100);
//     //    uint256 two_per_of_ten_per = FullMath.mulDiv(ten_percent, 2 , 100);
//     //      userfeeminustwo = ten_percent - two_per_of_ten_per;

//     // }
//     // function UserfeeOnPilot() public returns(uint256 userfeeminustwo) {
//     //      (uint256 _fee0, ) = user.collectfee1();
//     //     uint256 twoper =  FullMath.mulDiv(_fee0, 2 , 100);
//     //     userfeeminustwo = _fee0 - twoper;
//     // }
//     // function cal_for_single_user_uniswap() public returns (uint256 res0 , uint256 res1){
//     //     (uint128 fee0 ,uint128 fee1) = user.unipilotPos(pool);
//     //     uint256 tenper0 =  FullMath.mulDiv(fee0, 10 , 100);
//     //     uint256 tenper1 =  FullMath.mulDiv(fee1, 10 , 100);
//     //     uint256 twoper0 =  FullMath.mulDiv(tenper0, 2 , 100);
//     //     uint256 twoper1 =  FullMath.mulDiv(tenper1, 2 , 100);
//     //     res0 = tenper0 - twoper0;
//     //     res1 = tenper1 - twoper1;
//     // }
//     // function cal_for_all_user_uniswap() public returns (uint256 res0 , uint256 res1){
//     //     (uint128 fee0 ,uint128 fee1) = user.unipilotPos(pool);
//     //     uint256 twoper0 =  FullMath.mulDiv(fee0, 2 , 100);
//     //     uint256 twoper1 =  FullMath.mulDiv(fee1, 2 , 100);
//     //     res0 = fee0 - twoper0;
//     //     res1 = fee1 - twoper1;
//     // }
//     function addrs()
//         public
//         view
//         returns (
//             address ulm,
//             address upilot,
//             address usr,
//             address pol,
//             TestERC20 tok0,
//             TestERC20 tok1
//         )
//     {
//         ulm = address(user.contracts().ulm());
//         upilot = address(user.contracts().unipilot());
//         usr = address(user);
//         pol = pool;
//         tok0 = token0;
//         tok1 = token1;
//     }

//     // function updateUlmFees() public {
//     //     user.contracts().ulm()._collectPositionFees(pool);

//     // }
//     // function ulm_Bal_After_Collect_Fee() public view returns(uint256 res0){
//     //     uint256 bal = balance0ULM();
//     //     uint256 twoper0 =  FullMath.mulDiv(bal, 2 , 100);
//     //     res0 = bal.sub(twoper0);
//     // }
//     function subtracter(uint256 a, uint256 b) public view returns (uint256 sub) {
//         sub = a.sub(b);
//     }

//     function _getCurrentTick() public view returns (int24 tick, uint160 sqrt) {
//         (sqrt, tick, , , , , ) = IUniswapV3Pool(pool).slot0();
//     }

//     // function property_cpairAndDep() public returns(uint256 bal0, uint256 bal1 ){
//     //     uint24 fee0 = 500;
//     //     uint24 fee1 = 3000;
//     //     poolParams = forgePoolParams(15);
//     //     pool0 =   user.createpair(fee0, poolParams.startPrice);
//     //     user.contracts().unipilot().createPoolAndDeposit(
//     //         IExchangeManager.DepositParams({
//     //             sender: address(this),
//     //             exchangeAddress: address(user.contracts().ulm()),
//     //             token0: address(token0),
//     //             token1: address(token1),
//     //             amount0Desired: 1000000 ether,
//     //             amount1Desired: 1000000 ether
//     //         }),
//     //         [abi.encode(fee1, poolParams.startPrice),abi.encode(fee0, 0)]
//     //     );
//     //     address pool1 = user.contracts().ulm()._getPoolAddress(address(token0) , address(token1) , fee1);
//     //     bal0 = token0.balanceOf(pool0);
//     //     bal1 = token0.balanceOf(pool1);
//     // }
//     function swaps(uint256 amount, uint256 loop) public {
//         user.swapNigga(poolParams.fee, amount, loop);
//     }

//     function property_readjust() public returns (bool a) {
//         a = user.rebase(poolParams.fee);
//     }

//     function property_withdraw(
//         bool _pilotToken,
//         bool _wethToken,
//         uint256 dv
//     ) public {
//         require(loopCounter > 0, "run deposite first");
//         for (uint256 index = 0; index < loopCounter; index++) {
//             user.withdrawal(nftID[index + 1], _pilotToken, _wethToken, dv);
//         }
//     }
// }