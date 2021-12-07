import { Signer } from "@ethersproject/abstract-signer";
import UniPilotArtifact from "../artifacts/contracts/Unipilot.sol/Unipilot.json";
import Erc20Artifact from "../artifacts/contracts/test/ERC20.sol/ERC20.json";
import ULMArtifact from "../artifacts/contracts/base/UniswapLiquidityManager.sol/UniswapLiquidityManager.json";
import WETH9Artifact from "./utils/test/WETH9.json";
import UlmStateArtifact from "../artifacts/contracts/base/ULMState.sol/ULMState.json";
import UniStrategyArtifact from "../artifacts/contracts/UniStrategy.sol/UniStrategy.json";
import { deployContract } from "ethereum-waffle";
import { BigNumber, Contract } from "ethers";
import { UniswapV3Deployer } from "./UniswapV3Deployer";
import OracleArtifact from "../artifacts/contracts/V3Oracle.sol/V3Oracle.json";
import LiquidityMigratorArtifact from "../artifacts/contracts/LiquidityMigrator.sol/LiquidityMigrator.json";
import IndexFundArtifact from "../artifacts/contracts/test/IndexFund.sol/IndexFund.json";
import MintProxyArtifact from "../artifacts/contracts/test/UnipilotTokenProxy.sol/UnipilotTokenProxy.json";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
export async function deployWETH9(deployer: any): Promise<Contract> {
  let weth9: Contract = await deployContract(deployer, WETH9Artifact, [], {
    gasPrice: 90000000000,
  });
  return weth9;
}

export async function deployUniStrategy(deployer: any): Promise<Contract> {
  let uniStrategy: Contract = await deployContract(
    deployer,
    UniStrategyArtifact,
    [deployer.address],
    {
      gasPrice: 90000000000,
    },
  );
  return uniStrategy;
}

export async function deployUniswapContracts(
  deployer: any,
  WETH9: Contract,
): Promise<{ [name: string]: Contract }> {
  let uniswapV3 = UniswapV3Deployer.deploy(deployer, WETH9);
  return uniswapV3;
}

export async function deployUlmState(deployer: any): Promise<Contract> {
  let ulmState: Contract = await deployContract(deployer, UlmStateArtifact, [], {
    gasPrice: 9000000000,
  });
  return ulmState;
}

export async function deployOracle(
  deployer: any,
  args: string[],
  liquidityValidationAmount: BigNumber,
): Promise<Contract> {
  let oracle: Contract = await deployContract(
    deployer,
    OracleArtifact,
    [
      args[0],
      args[1],
      args[2],
      args[3],
      args[4],
      args[5],
      args[6],
      liquidityValidationAmount,
    ],
    {
      gasPrice: 90000000000,
    },
  );
  return oracle;
}

export async function deployMigrator(
  deployer: any,
  Unipilot: string,
  Ulm: string,
  PositionManager: string,
  Factory: string,
): Promise<Contract> {
  let liquidityMigrator = await deployContract(
    deployer,
    LiquidityMigratorArtifact,
    [Unipilot, Ulm, PositionManager, Factory],
    {
      gasPrice: 90000000000,
    },
  );
  return liquidityMigrator;
}
export async function deployIndexFund(deployer: any): Promise<Contract> {
  let indexFund = await deployContract(
    deployer,
    IndexFundArtifact,
    [deployer.address, [deployer.address]],
    { gasPrice: 90000000000 },
  );
  return indexFund;
}

export async function deployMintProxy(
  deployer: SignerWithAddress,
  timelock: string,
): Promise<Contract> {
  let mintProxy: Contract = await deployContract(deployer, MintProxyArtifact, [timelock]);
  return mintProxy;
}

export async function deployULM(
  deployer: any,
  tuple: any[],
  factory: string,
): Promise<Contract> {
  let ulm = await deployContract(deployer, ULMArtifact, [tuple, factory], {
    gasPrice: 90000000000,
  });
  return ulm;
}

export async function deployUnipilot(
  deployer: any,
  ulmAddress: string,
  mintProxy: string,
): Promise<Contract> {
  let unipilot = await deployContract(
    deployer,
    UniPilotArtifact,
    [deployer.address, ulmAddress, mintProxy],
    {
      gasPrice: 90000000000,
    },
  );
  return unipilot;
}
