import { AbiCoder } from "@ethersproject/abi";
import { parseUnits } from "@ethersproject/units";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { Contract } from "ethers";
import { shouldBehaveLikeCreatePool } from "../CreatePoolsUnipilot/createPool.behavior";
import { shouldBehaveLikeSetExchangeAddress } from "../SetExchangeAddress/setExchangeAddress.behavior";
import { shouldBehaveLikeSetGovernance } from "../SetGovernance/setGovernance.behavior";
import { shouldBehaveLikeWithdraw } from "../Withdraw/withdraw.behavior";
import { shouldBehaveLikeDeposit } from "../UniDepositUnipilot/deposit.behavior";
import { shouldBehaveLikeCollect } from "../CollectFee/collectFee.behavior";
import { shouldBehaveLikeReadjust } from "../ReadjustLiquidity/readjust.behavior";
import { shouldBehaveLikeStrategy } from "../UniStrategy/strategy.behavior";

export async function shouldBehaveLikeUnipilotFunctions(
  wallets: SignerWithAddress[],
  factory: Contract,
  swapRouter: Contract,
  uniStrategy: Contract,
  oracle: Contract,
  Ulm: Contract,
  mintProxy: Contract,
  ulmState: Contract,
  Unipilot: Contract,
  tokens: Contract[],
): Promise<void> {
  let pilot: string = tokens[0].address;
  let USDT: string = tokens[1].address;
  describe("Testing Pool Creation And Deposit", async () => {
    await shouldBehaveLikeCreatePool(wallets, Ulm, mintProxy, Unipilot, tokens);
  });

  describe("Testing Set Governance", async () => {
    await shouldBehaveLikeSetGovernance(wallets, Unipilot, Ulm);
  });

  describe("Testing Set Exchange Address", async () => {
    await shouldBehaveLikeSetExchangeAddress(wallets, Unipilot, Ulm);
  });

  describe("Testing Deposit", async () => {
    await shouldBehaveLikeDeposit(wallets, swapRouter, Ulm, Unipilot, tokens);
  });

  describe("Testing Collect", async () => {
    await shouldBehaveLikeCollect(
      wallets,
      factory,
      swapRouter,
      oracle,
      Ulm,
      Unipilot,
      tokens,
    );
  });

  describe("Testing Withdraw", async () => {
    await shouldBehaveLikeWithdraw(wallets, factory, oracle, Unipilot, Ulm, tokens);
  });

  describe("Testing Readjust", async () => {
    await shouldBehaveLikeReadjust(
      wallets,
      factory,
      swapRouter,
      Unipilot,
      Ulm,
      ulmState,
      tokens,
    );
  });

  // describe("Testing UniStrategy", async () => {
  //   await shouldBehaveLikeStrategy(
  //     wallets,
  //     factory,
  //     swapRouter,
  //     uniStrategy,
  //     Unipilot,
  //     Ulm,
  //     ulmState,
  //     tokens,
  //   );
  // });
}
