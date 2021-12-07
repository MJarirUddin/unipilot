import { AbiCoder } from "@ethersproject/abi";
import { parseUnits } from "@ethersproject/units";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { expect } from "chai";
import { Contract } from "ethers";

export async function shouldBehaveLikeStrategy(
  wallets: SignerWithAddress[],
  factory: Contract,
  swapRouter: Contract,
  uniStrategy: Contract,
  Unipilot: Contract,
  Ulm: Contract,
  ulmState: Contract,
  tokens: Contract[],
): Promise<void> {
  let abiCoder = new AbiCoder();
  const PILOT = tokens[0];
  const USDT = tokens[1];
  const WETH = tokens[2];
  const USDC = tokens[3];
  const DAI = tokens[4];
  const owner = wallets[0];

  it("Should fail set price threshold, unauthorized", async () => {
    await expect(
      uniStrategy.connect(wallets[3]).setPricethreshold(parseUnits("1", "4")),
    ).to.be.revertedWith("Strategy:: Not governance");
  });

  it("Should fail set price threshold, zero value", async () => {
    await expect(uniStrategy.connect(owner).setPricethreshold(0)).to.be.revertedWith(
      "UniStrategy:: Invalid Price Impact",
    );
  });

  it("Should successfully set price threshold", async () => {
    expect(await uniStrategy.connect(owner).setPricethreshold(parseUnits("1", "4")));
  });

  it("Should fail set range multiplier, unauthorized", async () => {
    await expect(
      uniStrategy.connect(wallets[3]).setRangeMultiplier("10"),
    ).to.be.revertedWith("Strategy:: Not governance");
  });

  it("Should fail set range multiplier, zero value", async () => {
    await expect(uniStrategy.connect(owner).setRangeMultiplier(0)).to.be.revertedWith(
      "UniStrategy:: INVALID_MULTIPLIER",
    );
  });

  it("Should successfully set range multiplier", async () => {
    expect(await uniStrategy.connect(owner).setRangeMultiplier("10"));
  });

  it("Should fail set base multiplier, unauthorized", async () => {
    await expect(
      uniStrategy.connect(wallets[3]).setBaseMutiplier("10"),
    ).to.be.revertedWith("Strategy:: Not governance");
  });

  it("Should fail set base multiplier, zero value", async () => {
    await expect(uniStrategy.connect(owner).setBaseMutiplier(0)).to.be.revertedWith(
      "UniStrategy:: INVALID_MULTIPLIER",
    );
  });

  it("Should successfully set base multiplier", async () => {
    expect(await uniStrategy.connect(owner).setBaseMutiplier("10"));
  });

  it("Should fail set max twap deviation, unauthorized", async () => {
    await expect(
      uniStrategy.connect(wallets[3]).setMaxTwapDeviation("10"),
    ).to.be.revertedWith("Strategy:: Not governance");
  });

  it("Should successfully set max twap deviation", async () => {
    expect(await uniStrategy.connect(owner).setMaxTwapDeviation("10"));
  });

  it("Should fail set twap duration, unauthorized", async () => {
    await expect(
      uniStrategy.connect(wallets[3]).setTwapDuration("10"),
    ).to.be.revertedWith("Strategy:: Not governance");
  });

  it("Should fail set twap duration", async () => {
    expect(await uniStrategy.connect(owner).setTwapDuration("10"));
  });

  it("Should fail change strategy, unauthorized", async () => {
    const PILOT_USDT: string = await factory.getPool(PILOT.address, USDT.address, 3000);
    const params = {
      baseThreshold: "10",
      rangeMultiplier: "10",
      maxTwapDeviation: "10",
      twapDuration: "10",
    };

    await expect(
      uniStrategy.connect(wallets[3]).changeStrategy(params, PILOT_USDT),
    ).to.be.revertedWith("Strategy:: Not governance");
  });

  //   it("Should successfully change strategy", async () => {
  //     const PILOT_USDT: string = await factory.getPool(PILOT.address, USDT.address, 3000);
  //     const params = {
  //       baseThreshold: "10",
  //       rangeMultiplier: "10",
  //       maxTwapDeviation: "10",
  //       twapDuration: "10",
  //     };

  //     expect(await uniStrategy.connect(owner).changeStrategy(params, PILOT_USDT));
  //   });
}
