import { AbiCoder } from "@ethersproject/abi";
import { parseUnits } from "@ethersproject/units";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { expect } from "chai";
import { BigNumber, Contract, ethers } from "ethers";
import { MaxUint256 } from "@ethersproject/constants";
import { deployUnipilot } from "../stubs";
import { encodePriceSqrt } from "../utils/encodePriceSqrt";
import { formatTokenBalance, logMessage } from "../utils/log";
export async function shouldBehaveLikeCreatePool(
  wallets: SignerWithAddress[],
  ulm: Contract,
  mintProxy: Contract,
  unipilot: Contract,
  tokens: Contract[],
): Promise<void> {
  let abiCoder = new AbiCoder();
  it("Should fail creating pool with invalid exchange", async () => {
    let data = [
      abiCoder.encode(["uint24", "uint160"], [3000, encodePriceSqrt(1, 1).toString()]),
      abiCoder.encode(["uint24", "uint256"], [3000, 0]),
    ];

    let depositParams: any = [
      wallets[0].address,
      unipilot.address,
      tokens[0].address,
      tokens[1].address,
      parseUnits("10", "18"),
      parseUnits("10", "6"),
      0,
    ];
    await expect(unipilot.createPoolAndDeposit(depositParams, data)).to.be.revertedWith(
      "ENW",
    );
  });

  it("Should fail creating pool with fake unipilot", async () => {
    let fakeUnipilot: Contract = await deployUnipilot(
      wallets[0],
      ulm.address,
      mintProxy.address,
    );
    await tokens[0].approve(fakeUnipilot.address, MaxUint256);
    await tokens[1].approve(fakeUnipilot.address, MaxUint256);
    let data = [
      abiCoder.encode(["uint24", "uint160"], [3000, encodePriceSqrt(1, 1).toString()]),
      abiCoder.encode(["uint24", "uint256"], [3000, 0]),
    ];

    let depositParams: any = [
      wallets[0].address,
      ulm.address,
      tokens[0].address,
      tokens[1].address,
      parseUnits("10", "18"),
      parseUnits("10", "6"),
      0,
    ];
    await expect(fakeUnipilot.createPoolAndDeposit(depositParams, data)).to.be.reverted;
  });
  it("Should fail creating pool with STF", async () => {
    let data = [
      abiCoder.encode(["uint24", "uint160"], [3000, encodePriceSqrt(1, 1).toString()]),
      abiCoder.encode(["uint24", "uint256"], [3000, 0]),
    ];

    let depositParams: any = [
      wallets[0].address,
      ulm.address,
      tokens[0].address,
      tokens[1].address,
      parseUnits("10", "18"),
      parseUnits("10", "6"),
      0,
    ];

    await expect(unipilot.createPoolAndDeposit(depositParams, data)).to.be.revertedWith(
      "STF",
    );
  });
  it("Should create pool of 3000 tier", async () => {
    await tokens[0].approve(unipilot.address, MaxUint256);
    await tokens[1].approve(unipilot.address, MaxUint256);

    let data = [
      abiCoder.encode(["uint24", "uint160"], [3000, encodePriceSqrt(1, 1).toString()]),
      abiCoder.encode(["uint24", "uint256"], [3000, 0]),
    ];

    let depositParams: any = [
      wallets[0].address,
      ulm.address,
      tokens[0].address,
      tokens[1].address,
      parseUnits("1000", "18"),
      parseUnits("1000", "6"),
      0,
    ];
    const result = await unipilot.callStatic.createPoolAndDeposit(depositParams, data);
    // logMessage(
    //   "RESULT",
    //   //   result,
    //   result.amount0Base.toString(),
    //   result.amount1Base.toString(),
    //   result.amount0Range.toString(),
    //   result.amount1Range.toString(),
    //   result.mintedTokenId.toString(),
    // );
    expect(await unipilot.createPoolAndDeposit(depositParams, data));
  });

  it("Should create pool of 3000 tier, PILOT/WETH", async () => {
    await tokens[2].deposit({ value: "300000000000000000000" });

    // logMessage("WETH_BAL", (await tokens[2].balanceOf(wallets[0].address)).toString());
    await tokens[0].approve(unipilot.address, MaxUint256);
    await tokens[2].approve(unipilot.address, MaxUint256);

    let data = [
      abiCoder.encode(["uint24", "uint160"], [3000, encodePriceSqrt(1, 1).toString()]),
      abiCoder.encode(["uint24", "uint256"], [3000, 0]),
    ];

    let depositParams: any = [
      wallets[0].address,
      ulm.address,
      tokens[0].address,
      tokens[2].address,
      parseUnits("100", "18"),
      parseUnits("100", "18"),
      0,
    ];
    expect(await unipilot.createPoolAndDeposit(depositParams, data));
  });

  it("Should create pool of 3000 tier, USDT/WETH", async () => {
    await tokens[1].approve(unipilot.address, MaxUint256);
    await tokens[2].approve(unipilot.address, MaxUint256);

    let data = [
      abiCoder.encode(["uint24", "uint160"], [3000, encodePriceSqrt(1, 1).toString()]),
      abiCoder.encode(["uint24", "uint256"], [3000, 0]),
    ];

    let depositParams: any = [
      wallets[0].address,
      ulm.address,
      tokens[1].address,
      tokens[2].address,
      parseUnits("100", "6"),
      parseUnits("100", "18"),
      0,
    ];
    expect(await unipilot.createPoolAndDeposit(depositParams, data));
  });

  it("Should fail creating same pool of 3000 tier", async () => {
    await tokens[0].approve(unipilot.address, MaxUint256);
    await tokens[1].approve(unipilot.address, MaxUint256);
    let data = [
      abiCoder.encode(["uint24", "uint160"], [3000, encodePriceSqrt(1, 1).toString()]),
      abiCoder.encode(["uint24", "uint256"], [3000, 0]),
    ];

    let depositParams: any = [
      wallets[0].address,
      ulm.address,
      tokens[0].address,
      tokens[1].address,
      parseUnits("1000", "18"),
      parseUnits("1000", "6"),
      0,
    ];
    await expect(unipilot.createPoolAndDeposit(depositParams, data)).to.be.reverted;
  });
}

// "25052894984021797146183221489"
