import { AbiCoder } from "@ethersproject/abi";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { BigNumber, Contract, utils } from "ethers";
import { MaxUint256 } from "@ethersproject/constants";
import { parseUnits } from "@ethersproject/units";
import { expect } from "chai";
import snapshotGasCost from "../utils/snapshotGasCost";
import { generateFeeThroughSwap } from "../utils/SwapFunction/swap";
import { formatTokenBalance, logMessage } from "../utils/log";

export async function shouldBehaveLikeDeposit(
  wallets: SignerWithAddress[],
  swapRouter: Contract,
  ulm: Contract,
  unipilot: Contract,
  tokens: Contract[],
): Promise<void> {
  let abiCoder = new AbiCoder();
  const PILOT = tokens[0];
  const USDT = tokens[1];
  const USDC = tokens[3];
  const DAI = tokens[4];
  logMessage(
    "Signers",
    wallets[0].address,
    wallets[1].address,
    wallets[2].address,
    wallets[3].address,
  );

  it("Should fail deposit, vault does not exist", async () => {
    await DAI.transfer(wallets[2].address, parseUnits("50", "18"));
    await USDC.transfer(wallets[2].address, parseUnits("50", "6"));

    // approve tokens
    await DAI.connect(wallets[2]).approve(unipilot.address, MaxUint256);
    await USDC.connect(wallets[2]).approve(unipilot.address, MaxUint256);

    // logMessage(
    //   "SIG_BAL",
    //   formatTokenBalance(await DAI.connect(wallets[2]).balanceOf(wallets[2].address)),
    //   formatTokenBalance(await USDC.connect(wallets[2]).balanceOf(wallets[2].address)),
    // );

    let data = abiCoder.encode(["uint24", "uint256"], [3000, 0]);
    let depositParams: any = [
      wallets[2].address,
      ulm.address,
      DAI.address,
      USDC.address,
      parseUnits("50", "18"),
      parseUnits("50", "6"),
      0,
    ];

    await expect(unipilot.connect(wallets[2]).deposit(depositParams, data)).to.be
      .reverted;
  });

  it("ULM shouldn't have dust", async () => {
    expect(await DAI.balanceOf(ulm.address)).to.equals(0);
    expect(await USDC.balanceOf(ulm.address)).to.equals(0);
  });

  //   it("Snapshot gas cost, deposit()", async () => {
  //     await PILOT.transfer(wallets[2].address, parseUnits("10", "18"));
  //     await USDT.transfer(wallets[2].address, parseUnits("10", "6"));

  //     // approve tokens
  //     await PILOT.connect(wallets[2]).approve(unipilot.address, MaxUint256);
  //     await USDT.connect(wallets[2]).approve(unipilot.address, MaxUint256);

  //     logMessage(
  //       "SIG_BAL",
  //       formatTokenBalance(await PILOT.connect(wallets[2]).balanceOf(wallets[2].address)),
  //       formatTokenBalance(await USDT.connect(wallets[2]).balanceOf(wallets[2].address)),
  //     );

  //     let data = abiCoder.encode(["uint24", "uint256"], [3000, 0]);
  //     let depositParams: any = [
  //       wallets[2].address,
  //       ulm.address,
  //       PILOT.address,
  //       USDT.address,
  //       parseUnits("10", "18"),
  //       parseUnits("10", "6"),
  //     ];

  //     await snapshotGasCost(
  //       await unipilot.connect(wallets[2]).deposit(depositParams, data),
  //     );
  //   });

  it("Should successfully deposit", async () => {
    await PILOT.transfer(wallets[2].address, parseUnits("500", "18"));
    await USDT.transfer(wallets[2].address, parseUnits("500", "6"));

    await PILOT.connect(wallets[2]).approve(unipilot.address, MaxUint256);
    await USDT.connect(wallets[2]).approve(unipilot.address, MaxUint256);

    // logMessage(
    //   "SIG_BAL",
    //   formatTokenBalance(await PILOT.connect(wallets[2]).balanceOf(wallets[2].address)),
    //   formatTokenBalance(await USDT.connect(wallets[2]).balanceOf(wallets[2].address)),
    // );

    let data = abiCoder.encode(["uint24", "uint256"], [3000, 0]);
    let depositParams: any = [
      wallets[2].address,
      ulm.address,
      USDT.address,
      PILOT.address,
      parseUnits("500", "6"),
      parseUnits("500", "18"),
      0,
    ];

    expect(await unipilot.connect(wallets[2]).deposit(depositParams, data));

    // logMessage(
    //   "SIG_BAL",
    //   formatTokenBalance(await PILOT.connect(wallets[2]).balanceOf(wallets[2].address)),
    //   formatTokenBalance(await USDT.connect(wallets[2]).balanceOf(wallets[2].address)),
    // );
  });

  it("Should successfully deposit", async () => {
    await PILOT.transfer(wallets[2].address, parseUnits("1000", "18"));
    await USDT.transfer(wallets[2].address, parseUnits("1000", "6"));

    await PILOT.connect(wallets[2]).approve(unipilot.address, MaxUint256);
    await USDT.connect(wallets[2]).approve(unipilot.address, MaxUint256);

    // logMessage(
    //   "SIG_BAL",
    //   formatTokenBalance(await PILOT.connect(wallets[2]).balanceOf(wallets[2].address)),
    //   formatTokenBalance(await USDT.connect(wallets[2]).balanceOf(wallets[2].address)),
    // );

    let data = abiCoder.encode(["uint24", "uint256"], [3000, 0]);
    let depositParams: any = [
      wallets[2].address,
      ulm.address,
      USDT.address,
      PILOT.address,
      parseUnits("1000", "6"),
      parseUnits("1000", "18"),
      0,
    ];

    expect(await unipilot.connect(wallets[2]).deposit(depositParams, data));

    // logMessage(
    //   "SIG_BAL",
    //   formatTokenBalance(await PILOT.connect(wallets[2]).balanceOf(wallets[2].address)),
    //   formatTokenBalance(await USDT.connect(wallets[2]).balanceOf(wallets[2].address)),
    // );
  });

  it("Should successfully deposit", async () => {
    await PILOT.transfer(wallets[2].address, parseUnits("1000", "18"));
    await USDT.transfer(wallets[2].address, parseUnits("1000", "6"));

    await PILOT.connect(wallets[2]).approve(unipilot.address, MaxUint256);
    await USDT.connect(wallets[2]).approve(unipilot.address, MaxUint256);

    let data = abiCoder.encode(["uint24", "uint256"], [3000, 0]);
    let depositParams: any = [
      wallets[2].address,
      ulm.address,
      USDT.address,
      PILOT.address,
      parseUnits("1000", "6"),
      parseUnits("1000", "18"),
      0,
    ];

    logMessage(
      "SIG_BAL",
      formatTokenBalance(await PILOT.connect(wallets[2]).balanceOf(wallets[2].address)),
      formatTokenBalance(await USDT.connect(wallets[2]).balanceOf(wallets[2].address)),
    );

    logMessage(
      "ULM_BAL",
      formatTokenBalance(await PILOT.balanceOf(ulm.address)),
      formatTokenBalance(await USDT.balanceOf(ulm.address)),
    );

    const result = await unipilot
      .connect(wallets[2])
      .callStatic.deposit(depositParams, data);
    logMessage(
      "RESULT",
      //   result,
      result.amount0Added.toString(),
      result.amount1Added.toString(),
      // result.mintedTokenId.toString(),
    );
    expect(await unipilot.connect(wallets[2]).deposit(depositParams, data));

    logMessage(
      "SIG_BAL",
      formatTokenBalance(await PILOT.connect(wallets[2]).balanceOf(wallets[2].address)),
      formatTokenBalance(await USDT.connect(wallets[2]).balanceOf(wallets[2].address)),
    );

    logMessage(
      "ULM_BAL",
      formatTokenBalance(await PILOT.balanceOf(ulm.address)),
      formatTokenBalance(await USDT.balanceOf(ulm.address)),
    );
  });

  it("Should successfully deposit", async () => {
    await PILOT.transfer(wallets[2].address, parseUnits("500", "18"));
    await USDT.transfer(wallets[2].address, parseUnits("500", "6"));

    await PILOT.connect(wallets[2]).approve(unipilot.address, MaxUint256);
    await USDT.connect(wallets[2]).approve(unipilot.address, MaxUint256);

    // logMessage(
    //   "SIG_BAL",
    //   formatTokenBalance(await PILOT.connect(wallets[2]).balanceOf(wallets[2].address)),
    //   formatTokenBalance(await USDT.connect(wallets[2]).balanceOf(wallets[2].address)),
    // );

    let data = abiCoder.encode(["uint24", "uint256"], [3000, 0]);
    let depositParams: any = [
      wallets[2].address,
      ulm.address,
      USDT.address,
      PILOT.address,
      parseUnits("500", "6"),
      parseUnits("500", "18"),
      0,
    ];

    expect(await unipilot.connect(wallets[2]).deposit(depositParams, data));

    // logMessage(
    //   "SIG_BAL",
    //   formatTokenBalance(await PILOT.connect(wallets[2]).balanceOf(wallets[2].address)),
    //   formatTokenBalance(await USDT.connect(wallets[2]).balanceOf(wallets[2].address)),
    // );
  });

  it("Should generate fee through swap", async () => {
    expect(await generateFeeThroughSwap(swapRouter, wallets[0], PILOT, USDT));
  });

  //   it("ULM shouldn't have dust", async () => {
  //     expect(await PILOT.balanceOf(ulm.address)).to.equals(0);
  //     expect(await USDT.balanceOf(ulm.address)).to.equals(0);
  //   });
}
