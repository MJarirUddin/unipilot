import { expect, use } from "chai";
import { BigNumber, utils, Contract, ContractFactory } from "ethers";
import WETH9Artifacts from "./utils/test/WETH9.json";

import {
  deployIndexFund,
  deployMigrator,
  deployMintProxy,
  deployOracle,
  deployULM,
  deployUlmState,
  deployUnipilot,
  deployUniStrategy,
  deployUniswapContracts,
  deployWETH9,
} from "./stubs";
import { solidity } from "ethereum-waffle";
import hre from "hardhat";
import { deployPilot, deployToken } from "./TokenDeployer/TokenStubs";
import { shouldBehaveLikeUnipilotFunctions } from "./UnipilotFunctions/unipilotFunctions.behavior";
import { parseUnits } from "@ethersproject/units";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";

use(solidity);

describe("Initializing the testing suite", async () => {
  let uniswapV3Factory: Contract;
  let uniswapPositionManager: Contract;
  let swapRouter: Contract;
  let uniStrategy: Contract;
  let ulmState: Contract;
  let WETH9: Contract;
  let pilot: Contract;
  let USDT: Contract; //6
  let USDC: Contract; //6
  let DAI: Contract; //18
  let Oracle: Contract;
  let LiquidityMigrator: Contract;
  let IndexFund: Contract;
  let MintProxy: Contract;
  let ULM: Contract;
  let Unipilot: Contract;
  let status: boolean;

  before("Initiating the tests", async () => {
    let [wallet0, wallet1, wallet2, wallet3] = await hre.ethers.getSigners();
    WETH9 = await deployWETH9(wallet0);
    uniStrategy = await deployUniStrategy(wallet0);
    let uniswapv3Contracts = await deployUniswapContracts(wallet0, WETH9);
    uniswapV3Factory = uniswapv3Contracts.factory;
    uniswapPositionManager = uniswapv3Contracts.positionManager;
    swapRouter = uniswapv3Contracts.router;
    ulmState = await deployUlmState(wallet0);
    pilot = await deployPilot(wallet0);
    DAI = await deployToken(wallet0, "Dai Stablecoin", "DAI", 18);
    USDC = await deployToken(wallet0, "Usdc", "USDC", 6);
    USDT = await deployToken(wallet0, "Tether Stable", "USDT", 6);
    let args = [
      wallet0.address,
      uniswapV3Factory.address,
      WETH9.address,
      pilot.address,
      DAI.address,
      USDT.address,
      USDC.address,
    ];
    Oracle = await deployOracle(wallet0, args, parseUnits("100000", "18"));
    IndexFund = await deployIndexFund(wallet0);
    MintProxy = await deployMintProxy(wallet0, wallet0.address);
    const ZERO_ADDR = "0x0000000000000000000000000000000000000000";
    Unipilot = await deployUnipilot(wallet0, ZERO_ADDR, MintProxy.address);
    let tuple = [
      ZERO_ADDR,
      "0",
      "false",
      "2",
      parseUnits("1", "5"),
      "1900226581",
      "98",
      "2",
      Oracle.address,
      IndexFund.address,
      uniStrategy.address,
      Unipilot.address,
    ];

    ULM = await deployULM(wallet0, tuple, uniswapV3Factory.address);
    await Unipilot.setExchangeManagerAddress(ULM.address);
    await uniStrategy.updateUnipilotAddress(Unipilot.address);
    LiquidityMigrator = await deployMigrator(
      wallet0,
      Unipilot.address,
      ULM.address,
      uniswapPositionManager.address,
      uniswapV3Factory.address,
    );
    await MintProxy.updateMinter(Unipilot.address);
  });
  describe("Running the pilot functions", async () => {
    it("Runs Pilot Functions", async function () {
      console.log("WETH9::", WETH9.address);
      console.log("Strategy::", uniStrategy.address);
      console.log("FACTORY:: ", uniswapV3Factory.address);
      console.log("Position Manager", uniswapPositionManager.address);
      console.log("Swap Router", swapRouter.address);
      console.log("Ulm State::", ulmState.address);
      console.log("PILOT TOKEN::", pilot.address);
      console.log("DAI TOKEN::", DAI.address);
      console.log("USDT TOKEN::", USDT.address);
      console.log("USDC TOKEN::", USDC.address);
      console.log("ORACLE::", Oracle.address);
      console.log("Index Fund", IndexFund.address);
      console.log("Mint Proxy", MintProxy.address);
      console.log("ULM", ULM.address);
      console.log("Unipilot", Unipilot.address);
      console.log("MIGRATOR::", LiquidityMigrator.address);
      let [wallet0, wallet1, wallet2, wallet3] = await hre.ethers.getSigners();
      let wallets: SignerWithAddress[] = [wallet0, wallet1, wallet2, wallet3];
      let tokens: Contract[] = [pilot, USDT, WETH9, USDC, DAI];

      await shouldBehaveLikeUnipilotFunctions(
        wallets,
        uniswapV3Factory,
        swapRouter,
        uniStrategy,
        Oracle,
        ULM,
        MintProxy,
        ulmState,
        Unipilot,
        tokens,
      );
    });
  });
});
