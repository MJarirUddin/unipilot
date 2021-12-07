import { Contract, ContractFactory } from "@ethersproject/contracts";
import { MaxUint256 } from "@ethersproject/constants";
// We require the Hardhat Runtime Environment explicitly here. This is optional but useful for running the
// script in a standalone fashion through `node <script>`. When running the script with `hardhat run <script>`,
// you'll find the Hardhat Runtime Environment's members available in the global scope.
import { ethers } from "hardhat";
import Web3 from "web3";
import { AbiItem } from "web3-utils";

import ERC20Artifact from "@openzeppelin/contracts/build/contracts/ERC20.json";
import UnipilotArtifact from "../artifacts/contracts/Unipilot.sol/Unipilot.json";
import UnipilotStrategyArtifact from "../artifacts/contracts/UniStrategy.sol/UniStrategy.json";
import UniswapLiquidityManagerArtifact from "../artifacts/contracts/base/UniswapLiquidityManager.sol/UniswapLiquidityManager.json";
import V3OracleStrategyArtifact from "../artifacts/contracts/V3Oracle.sol/V3Oracle.json";
import ULMStateArtifacts from "../artifacts/contracts/base/ULMState.sol/ULMState.json";
import LiquidityMigratorArtifacts from "../artifacts/contracts/LiquidityMigrator.sol/LiquidityMigrator.json";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/dist/src/signer-with-address";
import { Bytes, formatUnits, parseUnits, AbiCoder } from "ethers/lib/utils";
import { BigNumberish, Wallet } from "ethers";
import { parentPort } from "worker_threads";
import { stat } from "fs";
import { config as dotenvConfig } from "dotenv";
import { resolve } from "path";
import { send } from "process";
dotenvConfig({ path: resolve(__dirname, "../.env") });

const DAI_TOKEN_ADDRESS = "0xc7ad46e0b8a400bb3c915120d284aafba8fc4735";
const USDT_TOKEN_ADDRESS = "0xD9BA894E0097f8cC2BBc9D24D308b98e36dc6D02";
const USDC_TOKEN_ADDRESS = "0x4DBCdF9B62e891a7cec5A2568C3F4FAF9E8Abe2b";
const WETH_TOKEN_ADDRESS = "0xc778417e063141139fce010982780140aa0cd5ab";
const WBTC = "0xc4Cb39395dc41d81DE298Becebdf7e147F5Fc411";
const UNI_TOKEN_ADDRESS = "0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984";
const PILOT_TOKEN_ADDRESS = "0xb993eF69AD143B9DAdc417374d9Be7c4e6E3acBE";
const PILOT_COMP_NEW = "0x8526828f5ADd87cFE77D8053Cc95d1Fc9f7bA79B";
const PILOT2_TOKEN_ADDRESS = "0xb993eF69AD143B9DAdc417374d9Be7c4e6E3acBE";
const ANS2_TOKEN_ADDRESS = "0xF08fF5D10C650E6796d29D24ac7FBD766e3Bb505";
const TKN1_TOKEN_ADDRESS = "0x6df730f6e52c57be77db98a65116d2c38ec2be2b"; // DST
const TKN2_TOKEN_ADDRESS = "0xdf98809bbaee8d72ba88a80bc99308e30e04e4ab";
const LMO = "0xBCddF4E2aFb846486a253C920442aBC69Ac98f9b";
const PILOT = "0x18F10404cC1414e6ACBfEA16CCC97D9ed303e98C";
const MKR = "0xF9bA5210F91D0474bd1e1DcDAeC4C58E359AaD85";
const ethDaiSushiswap = "0xD08fEEaFD3559658Da770B8377D6b40016E0b773";
const ethDaiUniswap = "0x8B22F85d0c844Cf793690F6D9DFE9F11Ddb35449";
const TEST6 = "0x5FB330aa57D45c4f628bB9C665E81C9f10CB3040";
const MGA = "0xebe0d0dbda6d864b441aa7a35537c08764dedbc0";

const TTC33 = "0xB6118140b5Ad8A1449D1FeF850dA49eE4677D77A";
const TTC99 = "0xEc025986c17b4476dB7D3F3A6065f757C56f9CAe";

const TTCC66 = "0x7DE3863EBD5f164299a58be02a9d1b0ac95f6559"; //goerli
const TTCC22 = "0x5de53981F80D8227E57A42749A680b4D72A8f3eE"; //goerli
const poolGoerli = "0x10ca01FfEe8C0c2199011aCD910192a130576866";

const pool = "0x2c028E572c5e8708aA6264a0E87396e36E477DD0"; // TTCC99 & TKN5
const daiEThPAir = "0x0f04024bdA15F6e5D48Ed92938654a6449F483ed";
const daiEthPair1 = "0xAD24b6AC28bF47A04a72952945E2Ff486C0D6C7A"; // 10000
const uniEThPAir = "0x7b2A5f8956fF62b26aC87F22165F75185e2aD639";
const uniDaiPAir = "0x536b5cD0E89B9088d89a91Dd0297E1308aA65BDA";
const pilotEthPair = "0xf6415c04acf482d5fe0043734a1215490a86cff4";

const web3 = new Web3("https://rinkeby.infura.io/v3/98d49364a6d6475e842e7a63341ca0bf");
const contract = new web3.eth.Contract(
  UniswapLiquidityManagerArtifact.abi as AbiItem[],
  "0xE960F47C2165067d36a277132C8462CFe2e59E3c",
);

const contractUnipilot = new web3.eth.Contract(
  UnipilotArtifact.abi as AbiItem[],
  "0xd548D3bdc14A2195a9502e1A5B64a91587929F2C",
);

const contractULM = new web3.eth.Contract(
  ULMStateArtifacts.abi as AbiItem[],
  "0x8AB18f7ca9994bA506353168E0Fd4F7078e96DC1",
);

let wallet: SignerWithAddress;
let wallet2: SignerWithAddress;
let privateKey2: any = process.env.PRIVATE_KEY_2;
// let wallet: SignerWithAddress;
let unipilotContractInstance: Contract;
let uniStrategyContractInstance: Contract;
let v3OracleContractInstance: Contract;
let liquidityManagerInstance: Contract;
let liquidityMigratorInstance: Contract;
let ulmStateInstance: Contract;

async function updateStateVariables(): Promise<void> {
  const _wallet = await ethers.getSigners();
  wallet = _wallet[0];
  // wallet = wallet1;
}

async function updateStateVariables2(): Promise<void> {
  const _wallet = await ethers.getSigners();
  wallet2 = _wallet[1];
  console.log("wallet 2 address", wallet2.address);
}

async function initializeLiquidityManagerFromAddress(
  liquidityManagerAddress: string,
): Promise<void> {
  const uniswapLiquidityManagerContract = new ContractFactory(
    UniswapLiquidityManagerArtifact.abi,
    UniswapLiquidityManagerArtifact.bytecode,
    wallet,
  );
  liquidityManagerInstance = uniswapLiquidityManagerContract.attach(
    liquidityManagerAddress,
  );
}

async function initializeUnipilotFromAddress(unipilotAddress: string): Promise<void> {
  const unipilotContract = new ContractFactory(
    UnipilotArtifact.abi,
    UnipilotArtifact.bytecode,
    wallet,
  );
  unipilotContractInstance = unipilotContract.attach(unipilotAddress);
}

async function initializeLiquidityMigratorFromAddress(
  liquidityMigratorAddress: string,
): Promise<void> {
  const uniswapLiquidityMigratorContract = new ContractFactory(
    LiquidityMigratorArtifacts.abi,
    LiquidityMigratorArtifacts.bytecode,
    wallet,
  );
  liquidityMigratorInstance = uniswapLiquidityMigratorContract.attach(
    liquidityMigratorAddress,
  );
}

async function initializeUnipilotStrategyFromAddress(
  unipilotAddress: string,
): Promise<void> {
  const uniStrategyContract = new ContractFactory(
    UnipilotStrategyArtifact.abi,
    UnipilotStrategyArtifact.bytecode,
    wallet,
  );
  uniStrategyContractInstance = uniStrategyContract.attach(unipilotAddress);
}

async function initializeV3OracleFromAddress(unipilotAddress: string): Promise<void> {
  const v3OracleContract = new ContractFactory(
    V3OracleStrategyArtifact.abi,
    V3OracleStrategyArtifact.bytecode,
    wallet,
  );
  v3OracleContractInstance = v3OracleContract.attach(unipilotAddress);
}

async function initializeULMStateFromAddress(ulmAddress: string): Promise<void> {
  const instance = new ContractFactory(
    ULMStateArtifacts.abi,
    ULMStateArtifacts.bytecode,
    wallet,
  );
  ulmStateInstance = instance.attach(ulmAddress);
}

async function deployUnipilot(
  governance: string,
  liquidityManagerAddres: string,
  mintProxy: string,
): Promise<void> {
  const [wallet, wallet1] = await ethers.getSigners();
  const Unipilot: ContractFactory = await ethers.getContractFactory("Unipilot");
  const unipilot: Contract = await Unipilot.deploy(
    governance,
    liquidityManagerAddres,
    mintProxy,
  );
  await unipilot.deployed();

  console.log("Wallet Address -> ", wallet.address);
  console.log("Wallet Address -> ", wallet1.address);
  console.log("Unipilot deployed to -> ", unipilot.address);
  unipilotContractInstance = unipilot;
}

async function deployUniStrategy(governance: string): Promise<void> {
  const [wallet] = await ethers.getSigners();
  const UniStrategy: ContractFactory = await ethers.getContractFactory("UniStrategy");
  const uniStrategy: Contract = await UniStrategy.deploy(governance);
  await uniStrategy.deployed();

  console.log("Wallet Address -> ", wallet.address);
  console.log("UniStrategy deployed to -> ", uniStrategy.address);
  uniStrategyContractInstance = uniStrategy;
}

async function deployULMState(): Promise<void> {
  // const [wallet] = await ethers.getSigners();
  const ULMState: ContractFactory = await ethers.getContractFactory("ULMState");
  const ulmState: Contract = await ULMState.deploy();
  await ulmState.deployed();

  console.log("Wallet Address -> ", wallet.address);
  console.log("ULMState deployed to -> ", ulmState.address);
  ulmStateInstance = ulmState;
}

async function deployLiquidityManager(
  swapPercentage: BigNumberish,
  swapPriceThreshold: BigNumberish,
  rebasePremium: BigNumberish,
  gasPriceLimit: BigNumberish,
  userPilotPercentage: BigNumberish,
  feesPercentageIndexFund: BigNumberish,
  oracle: string,
  indexFund: string,
  uniStrategy: string,
  unipilotAddress: string,
): Promise<void> {
  const [wallet] = await ethers.getSigners();
  const LiquidityManager: ContractFactory = await ethers.getContractFactory(
    "UniswapLiquidityManager",
  );
  const uniswapFactory = "0x1F98431c8aD98523631AE4a59f267346ea31F984";

  const liquidityManager: Contract = await LiquidityManager.deploy(
    [
      swapPercentage,
      swapPriceThreshold,
      rebasePremium,
      gasPriceLimit,
      userPilotPercentage,
      feesPercentageIndexFund,
      oracle,
      indexFund,
      uniStrategy,
      unipilotAddress,
    ],
    uniswapFactory,
  );
  await liquidityManager.deployed();

  console.log("Wallet Address -> ", wallet.address);
  console.log("LiquidityManager deployed to -> ", liquidityManager.address);
  liquidityManagerInstance = liquidityManager;
}

async function setCoreAddresses(
  swapPercentage: BigNumberish,
  swapPriceThreshold: BigNumberish,
  rebasePremium: BigNumberish,
  gasPriceLimit: BigNumberish,
  userPilotPercentage: BigNumberish,
  feesPercentageIndexFund: BigNumberish,
  oracle: string,
  indexFund: string,
  uniStrategy: string,
  unipilotAddress: string,
): Promise<void> {
  const result = await liquidityManagerInstance.setPilotProtocolDetails(
    [
      swapPercentage,
      swapPriceThreshold,
      rebasePremium,
      gasPriceLimit,
      userPilotPercentage,
      feesPercentageIndexFund,
      oracle,
      indexFund,
      uniStrategy,
      unipilotAddress,
    ],
    {
      gasLimit: "10000000",
      gasPrice: "13535202943",
    },
  );
  console.log("TxHash -> ", result.hash);
}

async function deployLiquidityMigrator(): Promise<void> {
  const [wallet] = await ethers.getSigners();
  const unipilotAddress = "0x28C123559c78C986d1d6E5F3019444FD77a94cEA";
  const uniswapLiquidityManager = "0x44Ea985A44f9746b8110E07Fc135119687962F25";
  const periphery = "0xC36442b4a4522E871399CD717aBDD847Ab11FE88";
  const uniswapFactory = "0x1F98431c8aD98523631AE4a59f267346ea31F984";

  const LiquidityMigrator: ContractFactory = await ethers.getContractFactory(
    "LiquidityMigrator",
  );

  const liquidityMigrator: Contract = await LiquidityMigrator.deploy(
    unipilotAddress,
    uniswapLiquidityManager,
    periphery,
    uniswapFactory,
  );
  await liquidityMigrator.deployed();

  console.log("Wallet Address -> ", wallet.address);
  console.log("LiquidityMigrator deployed to -> ", liquidityMigrator.address);
  liquidityMigratorInstance = liquidityMigrator;
}

async function deployV3Oracle(): Promise<void> {
  const [wallet] = await ethers.getSigners();

  const governance = wallet.address;
  const uniswapFactory = "0x1F98431c8aD98523631AE4a59f267346ea31F984";
  const weth = "0xc778417E063141139Fce010982780140Aa0cD5Ab";
  const pilot = "0x18F10404cC1414e6ACBfEA16CCC97D9ed303e98C";
  const dai = "0xc7AD46e0b8a400Bb3C915120d284AafbA8fc4735";
  const usdt = "0xD9BA894E0097f8cC2BBc9D24D308b98e36dc6D02";
  const usdc = "0x4DBCdF9B62e891a7cec5A2568C3F4FAF9E8Abe2b";
  const pilotWethPair = "0xf6415c04aCf482d5Fe0043734A1215490A86cff4";

  const V3Oracle: ContractFactory = await ethers.getContractFactory("V3Oracle");
  const v3Oracle: Contract = await V3Oracle.deploy(
    governance,
    uniswapFactory,
    weth,
    pilot,
    dai,
    usdt,
    usdc,
    pilotWethPair,
  );
  await v3Oracle.deployed();

  console.log("Wallet Address -> ", wallet.address);
  console.log("V3Oracle deployed to -> ", v3Oracle.address);
  v3OracleContractInstance = v3Oracle;
}

async function getERC20Approval(
  tokenAddress: string,
  spenderAddress: string,
): Promise<void> {
  const tokenContract = new ContractFactory(
    ERC20Artifact.abi,
    ERC20Artifact.bytecode,
    wallet,
  );

  const tokenContractInstance = tokenContract.attach(tokenAddress);

  const approval = await tokenContractInstance.approve(spenderAddress, MaxUint256, {
    gasLimit: "10000000",
    gasPrice: "13535202943",
  });
  console.log("getERC20Approval -> ", approval.hash);
}

async function balanceOf(tokenAddress: string): Promise<void> {
  const tokenContract = new ContractFactory(
    ERC20Artifact.abi,
    ERC20Artifact.bytecode,
    wallet,
  );

  const tokenContractInstance = tokenContract.attach(tokenAddress);

  const balance = await tokenContractInstance.balanceOf(tokenAddress);
  console.log("Token balance -> ", balance.toString());
}

// async function deposit(
//   token0: string,
//   token1: string,
//   fee: BigNumberish,
//   amount0Desired: BigNumberish,
//   amount1Desired: BigNumberish,
//   tokenId: BigNumberish = "0",
//   // data: string
//   // value: BigNumberish = "100000000000000000",
// ): Promise<void> {
//   const [_token0, _token1, _amount0Desired, _amount1Desired] =
//     token0.toLowerCase() < token1.toLowerCase()
//       ? [token0, token1, amount0Desired, amount1Desired]
//       : [token1, token0, amount1Desired, amount0Desired];

//   const _deposit = await unipilotContractInstance.deposit(
//     [_token0, _token1, fee, _amount0Desired, _amount1Desired, tokenId],
//     // data,
//     {
//       gasLimit: "10000000",
//       // value: ethers.utils.parseEther("0.1"),
//     },
//   );
//   console.log("deposit -> ", _deposit.hash);
// }

async function deposit(
  sender: string,
  token0: string,
  token1: string,
  fee: BigNumberish,
  amount0Desired: BigNumberish,
  amount1Desired: BigNumberish,
  tokenId: BigNumberish = "0",
  // data: string
  // value: BigNumberish = "100000000000000000",
): Promise<void> {
  const abiCoder = new AbiCoder();
  const data = abiCoder.encode(["uint24"], [fee]);
  const LiquidityManagerAddress = "0xE960F47C2165067d36a277132C8462CFe2e59E3c";
  const [_token0, _token1, _amount0Desired, _amount1Desired] =
    token0.toLowerCase() < token1.toLowerCase()
      ? [token0, token1, amount0Desired, amount1Desired]
      : [token1, token0, amount1Desired, amount0Desired];

  const _deposit = await unipilotContractInstance.deposit(
    [
      sender,
      LiquidityManagerAddress,
      _token0,
      _token1,
      _amount0Desired,
      _amount1Desired,
      tokenId,
    ],
    data,
    {
      gasLimit: "10000000",
      gasPrice: "13535202943",
      value: ethers.utils.parseEther("0.5"),
    },
  );
  console.log("deposit -> ", _deposit.hash);
}

async function createPoolAndDeposit(
  sender: string,
  token0: string,
  token1: string,
  fee: BigNumberish,
  amount0: BigNumberish,
  amount1: BigNumberish,
  tokenId: BigNumberish,
  sqrtPrice: BigNumberish,
): Promise<void> {
  const abiCoder = new AbiCoder();
  const data0 = abiCoder.encode(["uint24", "uint160"], [fee, sqrtPrice]);
  const data1 = abiCoder.encode(["uint24", "uint256"], [fee, tokenId]);
  const LiquidityManagerAddress = "0xE960F47C2165067d36a277132C8462CFe2e59E3c";
  const result = await unipilotContractInstance.createPoolAndDeposit(
    [sender, LiquidityManagerAddress, token0, token1, amount0, amount1],
    [data0, data1],
    {
      gasLimit: "26940870",
      gasPrice: "13535202943",
      // value: ethers.utils.parseEther("0.1"),
    },
  );
  console.log("PoolHash -> ", result.hash);
}

async function migrateV3(
  token0: string,
  token1: string,
  fee: BigNumberish,
  percentageToMigrate: BigNumberish,
  uniswapTokenId: BigNumberish,
  unipilotTtokenId: BigNumberish = "0",
  sqrtPriceX96: BigNumberish,
  refundAsETH: boolean,
): Promise<void> {
  const abiCoder = new AbiCoder();
  const data = abiCoder.encode(["uint24", "uint256"], [fee, unipilotTtokenId]);
  const LiquidityManagerAddress = "0xE960F47C2165067d36a277132C8462CFe2e59E3c";
  const UnipilotAddress = "0xd548D3bdc14A2195a9502e1A5B64a91587929F2C";
  const [_token0, _token1] =
    token0.toLowerCase() < token1.toLowerCase() ? [token0, token1] : [token1, token0];

  const _migrate = await liquidityMigratorInstance.migrateV3Liquidity(
    [
      LiquidityManagerAddress,
      UnipilotAddress,
      _token0,
      _token1,
      fee,
      percentageToMigrate,
      sqrtPriceX96,
      uniswapTokenId,
      unipilotTtokenId,
      refundAsETH,
    ],
    {
      gasLimit: "10000000",
      gasPrice: "13535202943",
      // value: ethers.utils.parseEther("0.1"),
    },
  );
  console.log("migrateV3 -> ", _migrate.hash);
}

async function migrateV2(
  pair: string,
  token0: string,
  token1: string,
  fee: BigNumberish,
  percentageToMigrate: BigNumberish,
  liquidityToMigrate: BigNumberish,
  sqrtPriceX96: BigNumberish,
  unipilotTokenId: BigNumberish,
  refundAsETH: boolean,
): Promise<void> {
  const LiquidityManagerAddress = "0xE960F47C2165067d36a277132C8462CFe2e59E3c";
  const UnipilotAddress = "0xd548D3bdc14A2195a9502e1A5B64a91587929F2C";
  const [_token0, _token1] =
    token0.toLowerCase() < token1.toLowerCase() ? [token0, token1] : [token1, token0];

  const _migrate = await liquidityMigratorInstance.migrateV2Liquidity(
    [
      pair,
      LiquidityManagerAddress,
      UnipilotAddress,
      _token0,
      _token1,
      fee,
      percentageToMigrate,
      liquidityToMigrate,
      sqrtPriceX96,
      unipilotTokenId,
      refundAsETH,
    ],
    {
      gasLimit: "10000000",
      gasPrice: "13535202943",
      // value: ethers.utils.parseEther("0.1"),
    },
  );
  console.log("migrateV3 -> ", _migrate.hash);
}

async function migrateVisor(
  pair: string,
  token0: string,
  token1: string,
  fee: BigNumberish,
  percentageToMigrate: BigNumberish,
  liquidityToMigrate: BigNumberish,
  sqrtPriceX96: BigNumberish,
  unipilotTokenId: BigNumberish,
  refundAsETH: boolean,
): Promise<void> {
  const LiquidityManagerAddress = "0xE960F47C2165067d36a277132C8462CFe2e59E3c";
  const UnipilotAddress = "0xd548D3bdc14A2195a9502e1A5B64a91587929F2C";
  const [_token0, _token1] =
    token0.toLowerCase() < token1.toLowerCase() ? [token0, token1] : [token1, token0];

  const _migrate = await liquidityMigratorInstance.migrateVisorLiquidity(
    [
      pair,
      LiquidityManagerAddress,
      UnipilotAddress,
      _token0,
      _token1,
      fee,
      percentageToMigrate,
      liquidityToMigrate,
      sqrtPriceX96,
      unipilotTokenId,
      refundAsETH,
    ],
    {
      gasLimit: "10000000",
      gasPrice: "13535202943",
      // value: ethers.utils.parseEther("0.1"),
    },
  );
  console.log("migrateV3 -> ", _migrate.hash);
}

async function migrateLixir(
  pair: string,
  token0: string,
  token1: string,
  fee: BigNumberish,
  percentageToMigrate: BigNumberish,
  liquidityToMigrate: BigNumberish,
  sqrtPriceX96: BigNumberish,
  unipilotTokenId: BigNumberish,
  refundAsETH: boolean,
): Promise<void> {
  const LiquidityManagerAddress = "0xE960F47C2165067d36a277132C8462CFe2e59E3c";
  const UnipilotAddress = "0xd548D3bdc14A2195a9502e1A5B64a91587929F2C";
  const [_token0, _token1] =
    token0.toLowerCase() < token1.toLowerCase() ? [token0, token1] : [token1, token0];

  const _migrate = await liquidityMigratorInstance.migrateLixirLiquidity(
    [
      pair,
      LiquidityManagerAddress,
      UnipilotAddress,
      _token0,
      _token1,
      fee,
      percentageToMigrate,
      liquidityToMigrate,
      sqrtPriceX96,
      unipilotTokenId,
      refundAsETH,
    ],
    {
      gasLimit: "10000000",
      gasPrice: "13535202943",
      // value: ethers.utils.parseEther("0.1"),
    },
  );
  console.log("migrateV3 -> ", _migrate.hash);
}

async function migratePopsicle(
  pair: string,
  token0: string,
  token1: string,
  fee: BigNumberish,
  percentageToMigrate: BigNumberish,
  liquidityToMigrate: BigNumberish,
  sqrtPriceX96: BigNumberish,
  unipilotTokenId: BigNumberish,
  refundAsETH: boolean,
): Promise<void> {
  const LiquidityManagerAddress = "0xE960F47C2165067d36a277132C8462CFe2e59E3c";
  const UnipilotAddress = "0xd548D3bdc14A2195a9502e1A5B64a91587929F2C";
  const [_token0, _token1] =
    token0.toLowerCase() < token1.toLowerCase() ? [token0, token1] : [token1, token0];

  const migrator = new ContractFactory(
    LiquidityMigratorArtifacts.abi,
    LiquidityMigratorArtifacts.bytecode,
    wallet2,
  );
  const contractInstance = migrator.attach("0xbaAFe6A3d7612090a3345c2c98344242Cb0A27B9");
  const _migrate = await contractInstance.migratePopsicleLiquidity(
    [
      pair,
      LiquidityManagerAddress,
      UnipilotAddress,
      _token0,
      _token1,
      fee,
      percentageToMigrate,
      liquidityToMigrate,
      sqrtPriceX96,
      unipilotTokenId,
      refundAsETH,
    ],
    {
      gasLimit: "10000000",
      gasPrice: "13535202943",
      // value: ethers.utils.parseEther("0.1"),
    },
  );
  console.log("migrateV3 -> ", _migrate.hash);
}

// async function collect(
//   pilotToken: boolean,
//   wethToken: boolean,
//   recipient: string,
//   exchangeAddress: string,
//   tokenId: BigNumberish,
//   data: string,
// ): Promise<void> {
//   const _collect = await unipilotContractInstance.collect(
//     pilotToken,
//     recipient,
//     tokenId,
//     exchangeAddress,
//     data,
//     {
//       gasLimit: "10000000",
//     },
//   );
//   console.log("collect -> ", _collect.hash);
// }

async function collect(
  pilotToken: boolean,
  wethToken: boolean,
  exchangeAddress: string,
  recipient: string,
  tokenId: BigNumberish,
): Promise<void> {
  const data = new AbiCoder().encode(["address"], [recipient]);
  const _collect = await unipilotContractInstance.collect(
    [pilotToken, wethToken, exchangeAddress, tokenId],
    data,
    {
      gasLimit: "10000000",
      gasPrice: "13535202943",
    },
  );
  console.log("collect -> ", _collect.hash);
}

// async function withdraw(
//   pilotToken: boolean,
//   wethToken: boolean,
//   exchangeAddress: string,
//   recipient: string,
//   tokenId: BigNumberish,
//   liquidity: BigNumberish,
//   data: string,
// ): Promise<void> {
//   const _collect = await unipilotContractInstance.withdraw(
//     pilotToken,
//     wethToken,
//     exchangeAddress,
//     recipient,
//     tokenId,
//     liquidity,
//     data,
//     {
//       gasLimit: "10000000",
//     },
//   );
//   console.log("withdraw -> ", _collect.hash);
// }

async function withdraw(
  pilotToken: boolean,
  wethToken: boolean,
  exchangeAddress: string,
  recipient: string,
  tokenId: BigNumberish,
  liquidity: BigNumberish,
): Promise<void> {
  const abiCoder = new AbiCoder();
  const data = abiCoder.encode(["address"], [recipient]);
  const _collect = await unipilotContractInstance.withdraw(
    [pilotToken, wethToken, exchangeAddress, liquidity, tokenId],
    data,
    {
      gasLimit: "20000000",
      gasPrice: "13535202943",
    },
  );
  console.log("withdraw -> ", _collect.hash);
}

async function wethPairsAndLiquidity(token: string): Promise<void> {
  // const result = await unipilotContractInstance.getTotalAmounts(pool);
  const resul1 = await v3OracleContractInstance.checkWethPairsAndLiquidity(token);
  console.log("Best WETH Pair -> ", resul1.toString());
}

async function checkPoolValidation(
  token0: string,
  token1: string,
  amount0: BigNumberish,
  amount1: BigNumberish,
): Promise<void> {
  const _collect = await liquidityManagerInstance.checkPoolValidation(
    token0,
    token1,
    amount0,
    amount1,
  );
  console.log("Pool Validation -> ", _collect.toString());
}

async function rebase(token0: string, token1: string, fee: BigNumberish): Promise<void> {
  const result = await liquidityManagerInstance.readjustLiquidity(token0, token1, fee, {
    gasLimit: "10000000",
    gasPrice: "13535202943",
  });
  console.log("Rebase Hash -> ", result.hash);
}

async function createPool(
  token0: string,
  token1: string,
  fee: BigNumberish,
): Promise<void> {
  const result = await unipilotContractInstance._createPair(token0, token1, fee, {
    gasLimit: "10000000",
  });
  console.log("PoolHash -> ", result.hash);
}

async function collectFees(
  pilotToken: boolean,
  recipient: string,
  nftId: BigNumberish,
): Promise<void> {
  const result = await unipilotContractInstance.collect(pilotToken, recipient, nftId, {
    gasLimit: "10000000",
  });
  console.log("TxHash -> ", result.hash);
}

async function setULM(ulm: string): Promise<void> {
  const result = await unipilotContractInstance.setExchangeManagerAddress(ulm, {
    gasLimit: "10000000",
  });
  console.log("TxHash -> ", result.hash);
}

async function setGasPriceLimit(gasPriceLimit: BigNumberish): Promise<void> {
  const result = await liquidityManagerInstance.setGasPriceLimit(gasPriceLimit, {
    gasLimit: "10000000",
    gasPrice: "13535202943",
  });
  console.log("TxHash -> ", result.hash);
}

async function setSwapPercentage(swapPercentage: BigNumberish): Promise<void> {
  const result = await uniStrategyContractInstance.setSwapPercentage(swapPercentage, {
    gasLimit: "10000000",
    gasPrice: "13535202943",
  });
  console.log("TxHash -> ", result.hash);
}

async function getPair(token0: string, token1: string, fee: BigNumberish): Promise<void> {
  const pair = await ulmStateInstance.getPoolAddress(token0, token1, fee);
  console.log("Pair Address -> ", pair.toString());
}

async function getShares(
  reserve0: BigNumberish,
  reserve1: BigNumberish,
  totalLiquidity: BigNumberish,
  amount0Desired: BigNumberish,
  amount1Desired: BigNumberish,
): Promise<void> {
  const shares = await unipilotContractInstance.getSharesAndAmounts(
    reserve0,
    reserve1,
    totalLiquidity,
    amount0Desired,
    amount1Desired,
  );
  console.log("Shares -> ", shares.toString());
}

async function getPoolDetails(pool: string): Promise<void> {
  const pair = await ulmStateInstance.getPoolDetails(pool);
  console.log("Pool Details -> ", pair.toString());
}

async function getTotalAmounts(pool: string, nftId: BigNumberish): Promise<string> {
  // const result = await unipilotContractInstance.getTotalAmounts(pool);
  const resul1 = await liquidityManagerInstance.poolPositions(pool);
  const resul12 = await liquidityManagerInstance.userPositions(nftId);
  console.log("Pool Positions -> ", resul1.toString());
  console.log("User Positions -> ", resul12.toString());
  return "resul1[resul1.length -1].toString()";
}

async function getTokenAmounts(pool: string): Promise<void> {
  // const result = await unipilotContractInstance.getTotalAmounts(pool);
  const resul1 = await liquidityManagerInstance.getTotalAmounts(pool);
  console.log("Token Amounts -> ", resul1.toString());
}

async function getPilotAmount(
  tokenAlt: string,
  altAmount: BigNumberish,
  wethAmount: BigNumberish,
): Promise<void> {
  // const result = await unipilotContractInstance.getTotalAmounts(pool);
  const resul1 = await v3OracleContractInstance.getPilotAmountWethPair(
    tokenAlt,
    altAmount,
    wethAmount,
  );
  console.log("Pilot Amounts -> ", resul1.toString());
}

async function getFees(pool: string): Promise<void> {
  const result = await contract.methods.getPoolFees(pool).call();
  console.log("Fees Amount -> ", result);
}

async function getUserFees(tokenId: BigNumberish): Promise<void> {
  const result = await contract.methods.getUserFees(tokenId).call();
  console.log("User Fees Amount -> ", result);
}

async function getLiquidityRatio(
  pool: string,
  lowerTick: BigNumberish,
  upperTick: BigNumberish,
): Promise<void> {
  const result = await ulmStateInstance.getLiquidityRatios(pool, lowerTick, upperTick);
  console.log("User Fees Amount -> ", result.toString());
}

async function getPositionDetails(tokenId: BigNumberish): Promise<void> {
  const LiquidityManagerAddress = "0xE960F47C2165067d36a277132C8462CFe2e59E3c";
  const result = await contractULM.methods
    .getPositionDetails(tokenId, LiquidityManagerAddress)
    .call();
  console.log("User Position details -> ", result);
}

async function setReadjustPremiumForPools(
  pool: string,
  premium: BigNumberish,
  gasPriceLimit: BigNumberish,
  premiumStatus: boolean,
): Promise<void> {
  const result = await liquidityManagerInstance.setReadjustPremiumForPools(
    pool,
    premium,
    gasPriceLimit,
    premiumStatus,
    {
      gasLimit: "10000000",
    },
  );
  console.log("TxHash -> ", result.hash);
}

async function setPilotProtocolDetails(
  _recipient: string,
  poolPercentage: BigNumberish,
  status: boolean,
): Promise<void> {
  const result = await liquidityManagerInstance.setPilotProtocolDetails(
    _recipient,
    poolPercentage,
    status,
    {
      gasLimit: "10000000",
    },
  );
  console.log("TxHash -> ", result.hash);
}

async function toggleFeesInPilot(pool: string): Promise<void> {
  const result = await liquidityManagerInstance.toggleFeesInPilot(pool, {
    gasLimit: "10000000",
    gasPrice: "1900226581",
  });
  console.log("TxHash -> ", result.hash);
}

async function setReadjustDetails(
  _premium: BigNumberish,
  _gasPriceLimit: BigNumberish,
  _readjustSwapStatus: boolean,
): Promise<void> {
  const result = await liquidityManagerInstance.setReadjustDetails(
    _premium,
    _gasPriceLimit,
    _readjustSwapStatus,
    {
      gasLimit: "10000000",
      gasPrice: "13535202943",
    },
  );
  console.log("TxHash -> ", result.hash);
}

async function setPoolIncentives(
  pool: string,
  feesInPilot: boolean,
  managed: boolean,
  oracle0: string,
  oracle1: string,
): Promise<void> {
  const result = await liquidityManagerInstance.setPoolIncentives(
    pool,
    feesInPilot,
    managed,
    oracle0,
    oracle1,
    {
      gasLimit: "10000000",
      gasPrice: "13535202943",
    },
  );
  console.log("TxHash -> ", result.hash);
}

async function shouldReadjust(pair: string): Promise<void> {
  const resul1 = await liquidityManagerInstance.shouldReadjust(pair, "52740", "53220");
  console.log("Should Rebase -> ", resul1.toString());
}

async function main(): Promise<void> {
  await updateStateVariables();
  // await deployULMState();
  // await deployUnipilot(wallet.address, "0xE960F47C2165067d36a277132C8462CFe2e59E3c", "0x3fcA8b07a4364747DbBAa6676f9A9054fCfAfC65");
  // await deployLiquidityManager(
  //   "2",
  //   "100000", // swapPriceThreshold
  //   "10000000000000000",
  //   "1900226581", // gasPriceLimit
  //   "98", // userPilotPercentage
  //   "2", // indexFund amount (change for mainnet),
  //   "0x20B809da87c69d79F18b6A750E0349DaC070E7d5", // V3ORacle
  //   "0x1f7DbA02edDD338cB52bc48B2aF2baddF2eaAAfd", // indexFund
  //   "0x451A055672bf0d7dA3D0424955203ff32f8F7389", // UniStrategy
  //   "0xB016d76d8F76817Be18c43E33E1Ef955CD47a658", // Unipilot
  // );
  // await deployV3Oracle();
  // await deployLiquidityMigrator();
  // await deployUniStrategy(wallet.address);
  await initializeUnipilotFromAddress("0xd548D3bdc14A2195a9502e1A5B64a91587929F2C");
  await initializeLiquidityManagerFromAddress(
    "0xE960F47C2165067d36a277132C8462CFe2e59E3c",
  );
  // await initializeUnipilotStrategyFromAddress("0x737E634e9DA3053b4B12B7Bfb61271D3aBD3043B"); // newAddress: 0x24607fdC0d480797DD37c8C8Fb60ebEfF32f5679, oldWorking: 0x3CaeBd0718Fbc3397ED047f1660A6E0A977a954E
  // await initializeV3OracleFromAddress("0x389288a4De8655395b9c321Ee513668B2bA09945");
  await initializeULMStateFromAddress("0xFDbC00CE07c6d8199e646D75AB1a97D6bc8648E3");
  // await initializeLiquidityMigratorFromAddress("0x9C17A96F6f0c40ca003a1EB1CF46ba6869485F32");

  // await getERC20Approval(TKN2_TOKEN_ADDRESS, "0x0cCDda6197589A15DfACC09B135551E5Fb808664");
  // await getERC20Approval(TTC99, "0x0cCDda6197589A15DfACC09B135551E5Fb808664");
  // await setTTT("0xd548D3bdc14A2195a9502e1A5B64a91587929F2C");
  // await setULM("0xE960F47C2165067d36a277132C8462CFe2e59E3c");
  // await setCoreAddresses(
  //   "1", // swapPercentage
  //   "100000", // swapPriceThreshold
  //   "10000000000000000", // rebase premium
  //   "1900226591", // gasPriceLimit
  //   "95", // userPilotPercentage
  //   "15", // indexFund amount (change for mainnet),
  //   "0x20B809da87c69d79F18b6A750E0349DaC070E7d5", // V3ORacle
  //   "0xa0e9E6B79a3e1AB87FeB209567eF3E0373210a89", // indexFund
  //   "0x451A055672bf0d7dA3D0424955203ff32f8F7389", // UniStrategy
  //   "0xd548D3bdc14A2195a9502e1A5B64a91587929F2C", // Unipilot
  // );
  // await setLiquidityManager("0xE960F47C2165067d36a277132C8462CFe2e59E3c");
  await getERC20Approval(MGA, unipilotContractInstance.address);
  // await getERC20Approval("0x18f10404cc1414e6acbfea16ccc97d9ed303e98c", unipilotContractInstance.address);
  // await balanceOf("0x0000000000000000000000000000000000000000");
  // await test(TKN1_TOKEN_ADDRESS, TKN2_TOKEN_ADDRESS, 3000, parseUnits("1", 18), parseUnits("0.1", 18));
  // await test(DAI_TOKEN_ADDRESS, WETH_TOKEN_ADDRESS, 3000, parseUnits("10", 18), s parseUnits("0.1", 18));
  await deposit(
    wallet.address,
    WETH_TOKEN_ADDRESS,
    MGA,
    3000,
    parseUnits("0.5", 18),
    parseUnits("20", 18),
    0,
  );
  // await setPoolIncentives("0xf6415c04acf482d5fe0043734a1215490a86cff4", true, true, "0xf6415c04acf482d5fe0043734a1215490a86cff4", "0xf6415c04acf482d5fe0043734a1215490a86cff4")
  // await refundETH();
  // await setGasPriceLimit("1500226581");
  // await setReadjustDetails(parseUnits("10", 18), "13535202943", true);
  // await deposit(wallet.address, LMO, PILOT_TOKEN_ADDRESS, 3000, parseUnits("0.39395", 18), parseUnits("545088100", 18), 0);
  // await deposit(wallet.address, WETH_TOKEN_ADDRESS, DAI_TOKEN_ADDRESS, 3000, parseUnits("5", 18), parseUnits("74377200", 18), 0);
  // await rebase(WETH_TOKEN_ADDRESS, MGA, 3000);
  // await setSwapPercentage("50");
  // await createPoolAndDeposit(wallet.address, TKN2_TOKEN_ADDRESS, TTC99, 500, parseUnits("10", 18), parseUnits("10", 18), 0, "79228162514264337593543950336");
  // await migrateV3(DAI_TOKEN_ADDRESS, WETH_TOKEN_ADDRESS, 3000, 50, 9562, 0, 0, true);
  // await migrateV2(
  //   "0x7e8d0e1ad361eba94abc06898f52d9e2c4cda04b",
  //   WETH_TOKEN_ADDRESS,
  //   DAI_TOKEN_ADDRESS,
  //   3000,
  //   50,
  //   "3546510893367704586591626",
  //   "79228162514264337593543950336",
  //   0,
  //   true,
  // );
  // await migrateVisor(
  //   "0x0cCDda6197589A15DfACC09B135551E5Fb808664",
  //   LMO,
  //   TTC99,
  //   3000,
  //   50,
  //   "495124729352229994719",
  //   "79228162514264337593543950336",
  //   0,
  //   true,
  // );

  // await migrateLixir(
  //   "0xAf0A0e0EdCD926e74665F686bc0FDE33b1a7B42c",
  //   LMO,
  //   WETH_TOKEN_ADDRESS,
  //   3000,
  //   50,
  //   "252584025463281501820",
  //   "79228162514264337593543950336",
  //   0,
  //   true,
  // );

  // await migratePopsicle(
  //   "0x17b57339b45D5cAcCe71e8CF11137c585B9F0074",
  //   WETH_TOKEN_ADDRESS,
  //   WBTC,
  //   3000,
  //   100,
  //   ethers.utils.parseUnits("2364.899", 18),
  //   "0",
  //   0,
  //   true,
  // );
  // await toggleFeesInPilot(daiEThPAir);
  // await setReadjustPremiumForPools(pool, parseUnits("8", 18), "1900226581", true, true);
  // await setPilotProtocolDetails("0x522A02DE738e7BFca3866086e8429851f4bFCB83", 10, true);
  // await getPool(pool);
  // await wethPairsAndLiquidity(TTC99);
  // await stablePairsAndLiquidity(LMO);
  // await shouldReadjust("0x536CDE2f52eAD60C7C47947546CC0B785Ae4f407");
  // await checkPoolValidation(TKN2_TOKEN_ADDRESS, LMO, parseUnits("0", 18), parseUnits("0.009", 18));
  // await getPoolLiquidity(TTC33, LMO, parseUnits("1", 18), parseUnits("1", 18));
  // await getUSDAmount(uniDaiPAir, parseUnits("1", 18));
  // await getWETHAmount(uniEThPAir, parseUnits("1", 18));
  // await setLiquidityManager("0xdB50F46CCCA8Ba1Dce3a4af9EC92a46c798404A1");
  // await getPoolDetails("0x7ffa8d777c60f8c2b0d602307b6c5c8b21ee8b52");
  // await getPoolDetails("0x536CDE2f52eAD60C7C47947546CC0B785Ae4f407");
  await getTotalAmounts("0xf6415c04acf482d5fe0043734a1215490a86cff4", 1);
  // await getPair("0x7E7b5f8F8DF342e5d31BE5397C8222282bF7B3e1", "0xaB311d1A59F4e753406C4895e4681Fbd15D4dCbC", 3000);
  // await getTicks();
  // await getFees(pool);
  // await getFees("0x49AE3ef59dD699F843985Ea7859ff2F5eb16d5EE");
  // await getFees("0x6F7c74221E50aE0106599E6AeD5eE3E948972B0c");
  // await getFees("0x3f0f1716A5a802829D92B6e48cF3Cc5Eac0FEbaf"); /// TTCC99/WETH 0.05
  // await getFees("0x8B7B939926d131990a48b56a33F6034b5506F42b"); //WET/TEST6
  // await getTotalAmounts("0x536CDE2f52eAD60C7C47947546CC0B785Ae4f407", 2); // competetion 13 pool id
  await getUserFees(1);
  // await getFees(poolGoerli);
  // await getTokenAmounts(daiEThPAir);
  // await getPositionDetails(1);
  // await getTotalAmounts("0x49AE3ef59dD699F843985Ea7859ff2F5eb16d5EE", 233);
  // await getPoolDetails("0x92c4d042fc4d87ee70095f0985f1d3076fdbdad2");
  // await getLiquidityRatio(daiEThPAir, -887220, 887220);
  // await getShares("92725641", 0, "46736247036622575185", "43036157846441782345206", parseUnits("0", 18));
  // await getShares(parseUnits("20", 18), parseUnits("20", 18), 4472135954, parseUnits("20", 18), parseUnits("20", 18));
  // await getShares(parseUnits("0", 18), parseUnits("20", 18), 4472135954, parseUnits("20", 18), parseUnits("20", 18));
  // await getShares(parseUnits("20", 18), parseUnits("0", 18), 4472135954, parseUnits("20", 18), parseUnits("20", 18));
  // await getPilotAmount("0x023eca468e70818a3a94d4cdffd6e5d1a3707812", 0, "299999999");
  // await getOraclePrices(TKN2_TOKEN_ADDRESS, 3000, parseUnits("1", 18));
  // await getPrices(TTC33, DAI_TOKEN_ADDRESS, 3000, parseUnits("1", 18));
  // await createPoolAndDeposit("0xE960F47C2165067d36a277132C8462CFe2e59E3c", TTC99, DAI_TOKEN_ADDRESS, 500, parseUnits("10", 18), parseUnits("0.1", 18), 0, "79228162514264337593543950336");
  // await getTokenAmounts(daiEThPAir);
  // await withdraw(
  //   true,
  //   false,
  //   "0xE960F47C2165067d36a277132C8462CFe2e59E3c",
  //   wallet.address,
  //   1,
  //   "20000000000000000000",
  // );
  // await withdraw(true, wallet.address, 1, "10000000000000000000");
  // await unwrapWETH("9999999999999998", wallet.address); // for multicall
  // await sweepTokens(DAI_TOKEN_ADDRESS, 0, wallet.address); // for multicall
  // await withdrawForETH(false, false, wallet.address, wallet.address, 2, "10000000000000000000", "0x0000000000000000000000000000000000000000");
  // await collectFeesForWETHPairs(true, false, wallet.address, wallet.address, 2,"0x0000000000000000000000000000000000000000");
  await collect(
    true,
    false,
    "0xE960F47C2165067d36a277132C8462CFe2e59E3c",
    wallet.address,
    2,
  );
}

// We recommend this pattern to be able to use async/await everywhere and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error: Error) => {
    console.error(error);
    process.exit(1);
  });

// TKN5 tokenIn > increase fees0
// TTCC99 tokenIn > increase fees1
