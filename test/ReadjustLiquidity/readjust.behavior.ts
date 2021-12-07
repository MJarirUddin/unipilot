import { AbiCoder } from "@ethersproject/abi";
import { parseUnits } from "@ethersproject/units";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { expect } from "chai";
import { Contract } from "ethers";
import { MaxUint256 } from "@ethersproject/constants";
import { logMessage } from "../utils/log";
import { generateFeeThroughSwap } from "../utils/SwapFunction/swap";

export async function shouldBehaveLikeReadjust(
  wallets: SignerWithAddress[],
  factory: Contract,
  swapRouter: Contract,
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

  it("Should generate fee through swap", async () => {
    expect(await generateFeeThroughSwap(swapRouter, wallets[0], PILOT, USDT));
  });

  it("Should fail readjust, pool already in range", async () => {
    const captian = wallets[3];

    const POOL: string = await factory.getPool(PILOT.address, WETH.address, 3000);
    //const shouldReadj = await ulmState.connect(captian).shouldReadjust(POOL, Ulm.address);
    const readjFreqStatus = await Ulm.connect(captian).callStatic.readjustFrequencyStatus(
      POOL,
    );
    logMessage("READJ_FRS ---> ", readjFreqStatus);

    await expect(
      Ulm.connect(captian).readjustLiquidity(WETH.address, PILOT.address, 3000),
    ).to.be.reverted;
  });

  it("Should successfullly readjust liquidity", async () => {
    const captian = wallets[3];

    const POOL: string = await factory.getPool(PILOT.address, USDT.address, 3000);
    //const shouldReadj = await ulmState.connect(captian).shouldReadjust(POOL, Ulm.address);
    const readjFreqStatus = await Ulm.connect(captian).callStatic.readjustFrequencyStatus(
      POOL,
    );
    logMessage("READJ_FS ---> ", readjFreqStatus);

    expect(
      await Ulm.connect(captian).readjustLiquidity(USDT.address, PILOT.address, 3000),
    );
  });

  it("Should generate fee through swap", async () => {
    expect(await generateFeeThroughSwap(swapRouter, wallets[0], PILOT, USDT));
  });

  it("Should generate fee through swap", async () => {
    expect(await generateFeeThroughSwap(swapRouter, wallets[0], PILOT, USDT));
  });

  it("Should successfullly readjust liquidity", async () => {
    const captian = wallets[3];
    const POOL: string = await factory.getPool(PILOT.address, USDT.address, 3000);
    //const shouldReadj = await ulmState.connect(captian).shouldReadjust(POOL, Ulm.address);
    const readjFreqStatus = await Ulm.connect(captian).callStatic.readjustFrequencyStatus(
      POOL,
    );
    logMessage("READJ_FRS ---> ", readjFreqStatus);

    expect(
      await Ulm.connect(captian).readjustLiquidity(USDT.address, PILOT.address, 3000),
    );
  });

  it("Should generate fee through swap", async () => {
    expect(await generateFeeThroughSwap(swapRouter, wallets[0], PILOT, USDT));
  });

  it("Should fail readjust liquidity, more than 2 readjusts within 24hrs", async () => {
    const captian = wallets[3];

    const POOL: string = await factory.getPool(PILOT.address, USDT.address, 3000);
    //const shouldReadj = await ulmState.connect(captian).shouldReadjust(POOL, Ulm.address);
    const readjFreqStatus = await Ulm.connect(captian).callStatic.readjustFrequencyStatus(
      POOL,
    );
    logMessage("READJ_FS ---> ", readjFreqStatus);

    expect(
      await Ulm.connect(captian).readjustLiquidity(USDT.address, PILOT.address, 3000),
    );
  });
}
