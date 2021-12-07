import { AbiCoder } from "@ethersproject/abi";
import { parseUnits } from "@ethersproject/units";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { BigNumber, BigNumberish, Contract } from "ethers";
import { expect } from "chai";
import { generateFeeThroughSwap } from "../utils/SwapFunction/swap";
import { formatTokenBalance, logMessage } from "../utils/log";

export async function shouldBehaveLikeCollect(
  wallets: SignerWithAddress[],
  factory: Contract,
  swapRouter: Contract,
  oracle: Contract,
  ulm: Contract,
  unipilot: Contract,
  tokens: Contract[],
): Promise<void> {
  let abiCoder = new AbiCoder();
  const PILOT = tokens[0];
  const USDT = tokens[1];
  const USDC = tokens[3];
  const DAI = tokens[4];

  it("Should generate fee through swap", async () => {
    expect(await generateFeeThroughSwap(swapRouter, wallets[0], PILOT, USDT));
  });

  it("Should fail collect, unauthorized token", async () => {
    const data = abiCoder.encode(["address"], [wallets[2].address]);
    const collectParams = {
      pilotToken: false,
      wethToken: false,
      exchangeManagerAddress: ulm.address,
      tokenId: 1,
    };
    await expect(
      unipilot.connect(wallets[2]).collect(collectParams, data),
    ).to.be.revertedWith("NA");
  });

  it("Should fail collect, invalid exchange", async () => {
    const data = abiCoder.encode(["address"], [wallets[2].address]);
    const collectParams = {
      pilotToken: false,
      wethToken: false,
      exchangeManagerAddress: "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
      tokenId: 4,
    };
    await expect(
      unipilot.connect(wallets[2]).collect(collectParams, data),
    ).to.be.revertedWith("ENW");
  });

  // it("Should successfully collect fee, in same tokens as the liquidity", async () => {
  //   const data = abiCoder.encode(["address"], [wallets[2].address]);
  //   const collectParams = {
  //     pilotToken: false,
  //     wethToken: false,
  //     exchangeManagerAddress: ulm.address,
  //     tokenId: 5,
  //   };

  //   logMessage(
  //     "SIG_BAL",
  //     formatTokenBalance(await PILOT.connect(wallets[2]).balanceOf(wallets[2].address)),
  //     formatTokenBalance(await USDT.connect(wallets[2]).balanceOf(wallets[2].address)),
  //   );

  //   logMessage(
  //     "ULM_BAL",
  //     formatTokenBalance(await PILOT.balanceOf(ulm.address)),
  //     formatTokenBalance(await USDT.balanceOf(ulm.address)),
  //   );

  //   const PILOT_USDT: string = await factory.getPool(PILOT.address, USDT.address, 3000);
  //   const ulmFee = await getFees(PILOT_USDT, ulm);
  //   const userFee = await getUserFees(5, ulm);
  //   logMessage("User Fees Amount", userFee.fees0.toString(), userFee.fees1.toString());

  //   expect(await unipilot.connect(wallets[2]).collect(collectParams, data));

  //   //     expect(
  //   //       await PILOT.connect(wallets[2]).balanceOf(wallets[2].address),
  //   //       await USDT.connect(wallets[2]).balanceOf(wallets[2].address),
  //   //     ).to.equals(
  //   //       BigNumber.from(userFee.fees1.toString())
  //   //         .mul(BigNumber.from("98"))
  //   //         .div("100")
  //   //         .toString(),
  //   //       BigNumber.from(userFee.fees0.toString())
  //   //         .mul(BigNumber.from("98"))
  //   //         .div("100")
  //   //         .toString(),
  //   //     );

  //   const ulmFeeClaimed = await getFees(PILOT_USDT, ulm);
  //   const userFeeClaimed = await getUserFees(5, ulm);
  //   logMessage(
  //     "ULM Fees Amount",
  //     ulmFeeClaimed.fee0.toString(),
  //     ulmFeeClaimed.fee1.toString(),
  //   );
  //   logMessage(
  //     "User Fees Amount",
  //     userFeeClaimed.fees0.toString(),
  //     userFeeClaimed.fees1.toString(),
  //   );

  //   logMessage(
  //     "SIG_BAL",
  //     formatTokenBalance(await PILOT.connect(wallets[2]).balanceOf(wallets[2].address)),
  //     formatTokenBalance(await USDT.connect(wallets[2]).balanceOf(wallets[2].address)),
  //   );

  //   logMessage(
  //     "ULM_BAL",
  //     formatTokenBalance(await PILOT.balanceOf(ulm.address)),
  //     formatTokenBalance(await USDT.balanceOf(ulm.address)),
  //   );
  // });

  it("Should successfully collect fee, in PILOT token", async () => {
    // empty wallet2 balance
    await PILOT.connect(wallets[2]).transfer(
      wallets[0].address,
      await PILOT.connect(wallets[2]).balanceOf(wallets[2].address),
    );
    await USDT.connect(wallets[2]).transfer(
      wallets[0].address,
      await USDT.connect(wallets[2]).balanceOf(wallets[2].address),
    );

    const data = abiCoder.encode(["address"], [wallets[2].address]);
    const collectParams = {
      pilotToken: true,
      wethToken: false,
      exchangeManagerAddress: ulm.address,
      tokenId: 6,
    };

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

    const PILOT_USDT: string = await factory.getPool(PILOT.address, USDT.address, 3000);
    const ulmFee = await getFees(PILOT_USDT, ulm);
    const userFee = await getUserFees(6, ulm);
    logMessage(
      "ULM Fees Amount",
      ulmFee.amount0.toString(),
      ulmFee.amount1.toString(),
      ulmFee.totalLiquidity.toString(),
    );
    logMessage("User Fees Amount", userFee.fees0.toString(), userFee.fees1.toString());

    const feeEquvPilot = await oracle
      .connect(wallets[2])
      .getPilotAmountForTokens(
        USDT.address,
        PILOT.address,
        userFee.fees0.toString(),
        userFee.fees1.toString(),
      );

    expect(await unipilot.connect(wallets[2]).collect(collectParams, data));

    // expect(await PILOT.connect(wallets[2]).balanceOf(wallets[2].address)).to.equals(
    //   feeEquvPilot,
    // );

    const ulmFeeClaimed = await getFees(PILOT_USDT, ulm);
    const userFeeClaimed = await getUserFees(6, ulm);
    logMessage(
      "User Fees Amount",
      userFeeClaimed.fees0.toString(),
      userFeeClaimed.fees1.toString(),
    );

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

    // empty wallet2 balance
    await PILOT.connect(wallets[2]).transfer(
      wallets[0].address,
      await PILOT.connect(wallets[2]).balanceOf(wallets[2].address),
    );
    await USDT.connect(wallets[2]).transfer(
      wallets[0].address,
      await USDT.connect(wallets[2]).balanceOf(wallets[2].address),
    );
  });
}

export async function getFees(pool: string, contract: Contract): Promise<any> {
  const result = await contract.callStatic.updatePositionTotalAmounts(pool);
  console.log(
    "ULM Fees Amount -> ",
    result.amount0.toString(),
    result.amount1.toString(),
    result.totalLiquidity.toString(),
  );
  return result;
}

export async function getUserFees(
  tokenId: BigNumberish,
  contract: Contract,
): Promise<any> {
  const result = await contract.callStatic.getUserFees(tokenId);
  return result;
}
