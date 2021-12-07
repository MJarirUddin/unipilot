import { AbiCoder } from "@ethersproject/abi";
import { parseUnits } from "@ethersproject/units";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { expect } from "chai";
import { BigNumber, Contract } from "ethers";
import { getFees, getUserFees } from "../CollectFee/collectFee.behavior";
import { formatTokenBalance, logMessage } from "../utils/log";

export async function shouldBehaveLikeWithdraw(
  wallets: SignerWithAddress[],
  factory: Contract,
  oracle: Contract,
  Unipilot: Contract,
  Ulm: Contract,
  tokens: Contract[],
): Promise<void> {
  /*
        struct WithdrawParams {
        bool pilotToken;
        bool wethToken;
        address exchangeAddress;
        uint256 liquidity;
        uint256 tokenId;
    }
    */
  let abiCoder = new AbiCoder();
  const PILOT = tokens[0];
  const USDT = tokens[1];
  const USDC = tokens[3];
  const DAI = tokens[4];
  it("should fail withdrawing with NA", async () => {
    let data = abiCoder.encode(["address"], [wallets[2].address]);
    let withdrawParams = [false, false, Ulm.address, parseUnits("1", "18"), 2];
    await expect(
      Unipilot.connect(wallets[2]).withdraw(withdrawParams, data),
    ).to.be.revertedWith("NA");
  });

  it("should fail withdrawing with IEA", async () => {
    let data = abiCoder.encode(["address"], [wallets[2].address]);
    let withdrawParams = [false, false, Ulm.address, parseUnits("1", "18"), 2];
    await expect(
      Unipilot.connect(wallets[2]).withdraw(withdrawParams, data),
    ).to.be.revertedWith("NA");
  });

  it("Should fail withdraw, unauthorized token", async () => {
    let data = abiCoder.encode(["address"], [wallets[2].address]);
    let withdrawParams = [false, false, Ulm.address, parseUnits("1", "18"), 1];
    await expect(
      Unipilot.connect(wallets[2]).withdraw(withdrawParams, data),
    ).to.be.revertedWith("NA");
  });

  it("Should fail withdraw, invalid exchange", async () => {
    let data = abiCoder.encode(["address"], [wallets[2].address]);
    let withdrawParams = [
      false,
      false,
      "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
      parseUnits("1", "18"),
      4,
    ];
    await expect(
      Unipilot.connect(wallets[2]).withdraw(withdrawParams, data),
    ).to.be.revertedWith("ENW");
  });

  it("Should fail withdraw, invalid liquidity provided", async () => {
    const position = await Ulm.userPositions(2);
    logMessage("POS_LIQ", position.liquidity.toString());
    let data = abiCoder.encode(["address"], [wallets[2].address]);
    let withdrawParams = [false, false, Ulm.address, 0, 2];
    await expect(Unipilot.connect(wallets[2]).withdraw(withdrawParams, data)).to.be
      .reverted;
  });

  it("Should successfully withdraw, in same tokens as the liquidity", async () => {
    const position = await Ulm.userPositions(4);
    // logMessage("WITHDRAW_POSITION ", position);
    let data = abiCoder.encode(["address"], [wallets[2].address]);
    let withdrawParams = [false, false, Ulm.address, position.liquidity.toString(), 4];

    logMessage(
      "SIG_BAL",
      formatTokenBalance(await PILOT.connect(wallets[2]).balanceOf(wallets[2].address)),
      formatTokenBalance(await USDT.connect(wallets[2]).balanceOf(wallets[2].address)),
    );

    logMessage(
      "ULM_BAL",
      formatTokenBalance(await PILOT.balanceOf(Ulm.address)),
      formatTokenBalance(await USDT.balanceOf(Ulm.address)),
    );

    const PILOT_USDT: string = await factory.getPool(PILOT.address, USDT.address, 3000);
    const ulmFee = await getFees(PILOT_USDT, Ulm);
    const userFee = await getUserFees(4, Ulm);
    logMessage("User Fees Amount", userFee.fees0.toString(), userFee.fees1.toString());

    // THIS IS NOT THE ACTUAL TEST AND SHOULD JUST BE AWAIT AND SHOULD NOT APPEAR INSIDE EXPECT
    expect(await Unipilot.connect(wallets[2]).withdraw(withdrawParams, data));

    // THIS IS THE ACTUAL TEST AND SHOULD BE EXPECT
    // expect(
    //   await PILOT.connect(wallets[2]).balanceOf(wallets[2].address),
    //   await USDT.connect(wallets[2]).balanceOf(wallets[2].address),
    // ).to.equals(
    //   BigNumber.from(userFee.fees1.toString())
    //     .mul(BigNumber.from("98"))
    //     .div("100")
    //     .add(BigNumber.from(parseUnits("500", "18")))
    //     .toString(),
    //   BigNumber.from(userFee.fees0.toString())
    //     .mul(BigNumber.from("98"))
    //     .div("100")
    //     .add(BigNumber.from(parseUnits("500", "6")))
    //     .toString(),
    // );

    const ulmFeeClaimed = await getFees(PILOT_USDT, Ulm);
    const userFeeClaimed = await getUserFees(4, Ulm);
    // logMessage(
    //   "ULM Fees Amount",
    //   ulmFeeClaimed.fee0.toString(),
    //   ulmFeeClaimed.fee1.toString(),
    //   ulmFeeClaimed.amount0.toString(),
    //   ulmFeeClaimed.amount1.toString(),
    //   ulmFeeClaimed.totalLiquidity.toString(),
    // );
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
      formatTokenBalance(await PILOT.balanceOf(Ulm.address)),
      formatTokenBalance(await USDT.balanceOf(Ulm.address)),
    );
  });

  it("Should successfully withdraw, in $PILOT token", async () => {
    const position = await Ulm.userPositions(7);
    // logMessage("WITHDRAW_POSITION ", position);
    let data = abiCoder.encode(["address"], [wallets[2].address]);
    let withdrawParams = [false, false, Ulm.address, position.liquidity.toString(), 6];

    logMessage(
      "SIG_BAL",
      formatTokenBalance(await PILOT.connect(wallets[2]).balanceOf(wallets[2].address)),
      formatTokenBalance(await USDT.connect(wallets[2]).balanceOf(wallets[2].address)),
    );

    logMessage(
      "ULM_BAL",
      formatTokenBalance(await PILOT.balanceOf(Ulm.address)),
      formatTokenBalance(await USDT.balanceOf(Ulm.address)),
    );

    const PILOT_USDT: string = await factory.getPool(PILOT.address, USDT.address, 3000);
    const ulmFee = await getFees(PILOT_USDT, Ulm);
    const userFee = await getUserFees(7, Ulm);
    // logMessage(
    //   "ULM Fees Amount",
    //   ulmFee.fee0.toString(),
    //   ulmFee.fee1.toString(),
    //   ulmFee.amount0.toString(),
    //   ulmFee.amount1.toString(),
    //   ulmFee.totalLiquidity.toString(),
    // );
    logMessage("User Fees Amount", userFee.fees0.toString(), userFee.fees1.toString());

    const equvPilot = await oracle
      .connect(wallets[2])
      .getPilotAmountForTokens(
        USDT.address,
        PILOT.address,
        BigNumber.from(parseUnits("500", "6"))
          .add(BigNumber.from(userFee.fees0.toString()))
          .toString(),
        BigNumber.from(parseUnits("500", "18"))
          .add(BigNumber.from(userFee.fees1.toString()))
          .toString(),
      );

    // THIS IS NOT THE ACTUAL TEST AND SHOULD JUST BE AWAIT AND SHOULD NOT APPEAR INSIDE EXPECT
    expect(await Unipilot.connect(wallets[2]).withdraw(withdrawParams, data));

    // THIS IS THE ACTUAL TEST AND SHOULD BE EXPECT
    // expect(await PILOT.connect(wallets[2]).balanceOf(wallets[2].address)).to.equals(
    //   equvPilot.toString(),
    // );

    const ulmFeeClaimed = await getFees(PILOT_USDT, Ulm);
    const userFeeClaimed = await getUserFees(7, Ulm);
    // logMessage(
    //   "ULM Fees Amount",
    //   ulmFeeClaimed.fee0.toString(),
    //   ulmFeeClaimed.fee1.toString(),
    //   ulmFeeClaimed.amount0.toString(),
    //   ulmFeeClaimed.amount1.toString(),
    //   ulmFeeClaimed.totalLiquidity.toString(),
    // );
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
      formatTokenBalance(await PILOT.balanceOf(Ulm.address)),
      formatTokenBalance(await USDT.balanceOf(Ulm.address)),
    );
  });

  // it("ULM shouldn't have dust", async () => {
  //   expect(await PILOT.balanceOf(Ulm.address)).to.equals(0);
  //   expect(await USDT.balanceOf(Ulm.address)).to.equals(0);
  // });
}
