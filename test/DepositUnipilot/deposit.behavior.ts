import { AbiCoder } from "@ethersproject/abi";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { BigNumber, Contract, utils } from "ethers";
import { MaxUint256 } from "@ethersproject/constants";
import { parseUnits } from "@ethersproject/units";
import { expect } from "chai";

export async function shouldBehaveLikeDeposit(
  wallets: SignerWithAddress[],
  ulm: Contract,
  unipilot: Contract,
  tokens: Contract[],
): Promise<void> {
  let abiCoder = new AbiCoder();
  let transferredTokenId: BigNumber;
  logMessage(
    "Signers",
    wallets[0].address,
    wallets[1].address,
    wallets[2].address,
    wallets[3].address,
  );

  it("Should fail deposit, invalid exchange", async () => {
    let data = abiCoder.encode(["uint24", "uint256"], [3000, 0]);
    let depositParams: any = [
      wallets[0].address,
      "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
      tokens[0].address,
      tokens[1].address,
      parseUnits("10", "18"),
      parseUnits("10", "18"),
    ];

    await expect(unipilot.deposit(depositParams, data)).to.be.revertedWith("ENW");
  });

  it("Should fail deposit, both token amount is zero", async () => {
    // transfer tokens to wallet2
    await tokens[0].transfer(wallets[2].address, parseUnits("50", "18"));
    await tokens[1].transfer(wallets[2].address, parseUnits("50", "18"));

    // approve tokens
    await tokens[0].connect(wallets[2]).approve(unipilot.address, MaxUint256);
    await tokens[1].connect(wallets[2]).approve(unipilot.address, MaxUint256);

    let data = abiCoder.encode(["uint24", "uint256"], [3000, 0]);
    let depositParams: any = [
      wallets[2].address,
      ulm.address,
      tokens[0].address,
      tokens[1].address,
      parseUnits("0", "18"),
      parseUnits("0", "18"),
    ];

    await expect(
      unipilot.connect(wallets[2]).deposit(depositParams, data),
    ).to.be.revertedWith("IA");
  });

  it("Should fail deposit, zero token0 amount", async () => {
    let data = abiCoder.encode(["uint24", "uint256"], [3000, 0]);
    let depositParams: any = [
      wallets[2].address,
      ulm.address,
      tokens[0].address,
      tokens[1].address,
      parseUnits("0", "18"),
      parseUnits("10", "18"),
    ];

    await expect(
      unipilot.connect(wallets[2]).deposit(depositParams, data),
    ).to.be.revertedWith("CRS");
  });

  it("Should fail deposit, zero token1 amount", async () => {
    let data = abiCoder.encode(["uint24", "uint256"], [3000, 0]);
    let depositParams: any = [
      wallets[2].address,
      ulm.address,
      tokens[0].address,
      tokens[1].address,
      parseUnits("10", "18"),
      parseUnits("0", "18"),
    ];

    await expect(
      unipilot.connect(wallets[2]).deposit(depositParams, data),
    ).to.be.revertedWith("CRS");
  });

  it("Should fail deposit [❌ Token, ❌ Allowance]", async () => {
    // transfer tokens to wallet2
    await tokens[0]
      .connect(wallets[2])
      .transfer(wallets[0].address, parseUnits("50", "18"));
    await tokens[1]
      .connect(wallets[2])
      .transfer(wallets[0].address, parseUnits("50", "18"));

    // approve tokens
    await tokens[0].connect(wallets[2]).approve(unipilot.address, 0);
    await tokens[1].connect(wallets[2]).approve(unipilot.address, 0);

    let data = abiCoder.encode(["uint24", "uint256"], [3000, 0]);
    let depositParams: any = [
      wallets[2].address,
      ulm.address,
      tokens[0].address,
      tokens[1].address,
      parseUnits("10", "18"),
      parseUnits("10", "18"),
    ];

    await expect(
      unipilot.connect(wallets[2]).deposit(depositParams, data),
    ).to.be.revertedWith("STF");
  });

  it("Should fail deposit [❌ Token, ✅ Allowance]", async () => {
    // approve tokens
    await tokens[0].connect(wallets[2]).approve(unipilot.address, MaxUint256);
    await tokens[1].connect(wallets[2]).approve(unipilot.address, MaxUint256);

    let data = abiCoder.encode(["uint24", "uint256"], [3000, 0]);
    let depositParams: any = [
      wallets[2].address,
      ulm.address,
      tokens[0].address,
      tokens[1].address,
      parseUnits("10", "18"),
      parseUnits("10", "18"),
    ];

    await expect(
      unipilot.connect(wallets[2]).deposit(depositParams, data),
    ).to.be.revertedWith("STF");
  });

  it("Should fail deposit [✅ Token, ❌ Allowance]", async () => {
    // transfer tokens to wallet2
    await tokens[0].transfer(wallets[2].address, parseUnits("50", "18"));
    await tokens[1].transfer(wallets[2].address, parseUnits("50", "18"));

    await tokens[0].connect(wallets[2]).approve(unipilot.address, 0);
    await tokens[1].connect(wallets[2]).approve(unipilot.address, 0);

    let data = abiCoder.encode(["uint24", "uint256"], [3000, 0]);
    let depositParams: any = [
      wallets[2].address,
      ulm.address,
      tokens[0].address,
      tokens[1].address,
      parseUnits("10", "18"),
      parseUnits("10", "18"),
    ];

    await expect(
      unipilot.connect(wallets[2]).deposit(depositParams, data),
    ).to.be.revertedWith("STF");
  });

  it("Should successfully deposit, large amount", async () => {
    let data = abiCoder.encode(["uint24", "uint256"], [3000, 0]);
    let depositParams: any = [
      wallets[0].address,
      ulm.address,
      tokens[0].address,
      tokens[1].address,
      parseUnits("50", "18"),
      parseUnits("50", "18"),
    ];
    // logMessage(
    //   "Signer Balance",
    //   BigNumber.from(await tokens[0].balanceOf(wallets[0].address)).toString(),
    //   BigNumber.from(await tokens[1].balanceOf(wallets[0].address)).toString(),
    // );
    // logMessage("Current Signer", await unipilot.signer.getAddress());
    expect(await unipilot.deposit(depositParams, data));
  });

  // This will not fail because user is allowed to mint new positions for same pool but handled on dApp
  //   it("Should fail deposit with 0 NFT again", async () => {
  //     let data = abiCoder.encode(["uint24", "uint256"], [3000, 0]);
  //     let depositParams: any = [
  //       wallets[0].address,
  //       ulm.address,
  //       tokens[0].address,
  //       tokens[1].address,
  //       parseUnits("10", "18"),
  //       parseUnits("10", "18"),
  //     ];
  //     await expect(unipilot.deposit(depositParams, data)).to.be.revertedWith("STF");
  //   });

  it("Should successfully deposit [✅ Token, ✅ Allowance]", async () => {
    // logMessage("Signer 1", wallets[0].address);
    // logMessage("Signer 2", wallets[2].address);

    // logMessage(
    //   "Token 0 Balance",
    //   BigNumber.from(await tokens[0].balanceOf(wallets[2].address)).toString(),
    // );
    // logMessage(
    //   "Token 1 Balance",
    //   BigNumber.from(await tokens[1].balanceOf(wallets[2].address)).toString(),
    // );

    // approve tokens
    await tokens[0].connect(wallets[2]).approve(unipilot.address, MaxUint256);
    await tokens[1].connect(wallets[2]).approve(unipilot.address, MaxUint256);
    // logMessage(
    //   "Token 0 Allowance",
    //   BigNumber.from(
    //     await tokens[0].allowance(wallets[2].address, unipilot.address),
    //   ).toString(),
    // );
    // logMessage(
    //   "Token 1 Allowance",
    //   BigNumber.from(
    //     await tokens[1].allowance(wallets[2].address, unipilot.address),
    //   ).toString(),
    // );

    let data = abiCoder.encode(["uint24", "uint256"], [3000, 0]);
    let depositParams: any = [
      wallets[2].address,
      ulm.address,
      tokens[0].address,
      tokens[1].address,
      parseUnits("10", "18"),
      parseUnits("10", "18"),
    ];

    expect(await unipilot.connect(wallets[2]).deposit(depositParams, data));
  });

  it("Should successfully deposit, increase liquidity", async () => {
    let data = abiCoder.encode(["uint24", "uint256"], [3000, 2]);
    let depositParams: any = [
      wallets[0].address,
      ulm.address,
      tokens[0].address,
      tokens[1].address,
      parseUnits("10", "18"),
      parseUnits("10", "18"),
    ];

    // const balance = await unipilot.balanceOf(wallets[0].address);
    // logMessage("Balance", balance);

    expect(await unipilot.deposit(depositParams, data));
  });

  it("Should successfully deposit, in proportion to token reserves", async () => {
    // Approving tokens
    await tokens[0].connect(wallets[2]).approve(unipilot.address, MaxUint256);
    await tokens[1].connect(wallets[2]).approve(unipilot.address, MaxUint256);

    let data = abiCoder.encode(["uint24", "uint256"], [3000, 0]);
    let depositParams: any = [
      wallets[2].address,
      ulm.address,
      tokens[0].address,
      tokens[1].address,
      parseUnits("10", "18"),
      parseUnits("15", "18"),
    ];
    // logMessage("UNIPILOT", await unipilot.signer.getAddress());

    // logMessage(
    //   "Token 0 Balance",
    //   BigNumber.from(await tokens[0].balanceOf(wallets[2].address)).toString(),
    // );
    // logMessage(
    //   "Token 1 Balance",
    //   BigNumber.from(await tokens[1].balanceOf(wallets[2].address)).toString(),
    // );

    expect(await unipilot.connect(wallets[2]).deposit(depositParams, data));

    // logMessage(
    //   "Token 0 Balance",
    //   BigNumber.from(await tokens[0].balanceOf(wallets[2].address)).toString(),
    // );
    // logMessage(
    //   "Token 1 Balance",
    //   BigNumber.from(await tokens[1].balanceOf(wallets[2].address)).toString(),
    // );

    // logMessage(
    //   "ULM token0",
    //   BigNumber.from(await tokens[0].balanceOf(ulm.address)).toString(),
    // );
    // logMessage(
    //   "ULM token1",
    //   BigNumber.from(await tokens[1].balanceOf(ulm.address)).toString(),
    // );
  });

  it("Should successfully deposit & return NFT", async () => {
    let data = abiCoder.encode(["uint24", "uint256"], [3000, 0]);
    let depositParams: any = [
      wallets[2].address,
      ulm.address,
      tokens[0].address,
      tokens[1].address,
      parseUnits("10", "18"),
      parseUnits("10", "18"),
    ];
    // logMessage(
    //   "RESULT_BALANCE",
    //   BigNumber.from(
    //     await unipilot.connect(wallets[2]).balanceOf(wallets[2].address),
    //   ).toString(),
    // );
    const result = await unipilot
      .connect(wallets[2])
      .callStatic.deposit(depositParams, data);

    // logMessage("RESULT", result);
    // logMessage("RESULT", result.mintedTokenId.toString());

    const res = await unipilot
      .connect(wallets[2])
      .callStatic.deposit(depositParams, data);

    // logMessage(
    //   "RESULT_BALANCE",
    //   BigNumber.from(
    //     await unipilot.connect(wallets[2]).balanceOf(wallets[2].address),
    //   ).toString(),
    // );
    expect(res.mintedTokenId.toString()).to.equals(result.mintedTokenId.toString());
  });

  it("Should successfully deposit, transfer minted NFT", async () => {
    let data = abiCoder.encode(["uint24", "uint256"], [3000, 0]);
    let depositParams: any = [
      wallets[2].address,
      ulm.address,
      tokens[0].address,
      tokens[1].address,
      parseUnits("10", "18"),
      parseUnits("10", "18"),
    ];

    const meta = await unipilot
      .connect(wallets[2])
      .callStatic.deposit(depositParams, data);
    await unipilot.connect(wallets[2]).deposit(depositParams, data);
    // wallet3 will use this NFT to increase liquidity by calling deposit() in the next test
    await unipilot
      .connect(wallets[2])
      .transferFrom(
        wallets[2].address,
        wallets[3].address,
        meta.mintedTokenId.toString(),
      );
    // logMessage("NFT ID", meta.mintedTokenId.toString());
    transferredTokenId = meta.mintedTokenId;

    expect(await unipilot.ownerOf(meta.mintedTokenId)).to.equals(wallets[3].address);
  });

  it("Should fail deposit, using previously received unipilot NFT", async () => {
    // transfer tokens to wallet3
    await tokens[0].transfer(wallets[3].address, parseUnits("100", "18"));
    await tokens[1].transfer(wallets[3].address, parseUnits("100", "18"));

    // approve tokens
    await tokens[0].connect(wallets[3]).approve(unipilot.address, MaxUint256);
    await tokens[1].connect(wallets[3]).approve(unipilot.address, MaxUint256);

    // logMessage("NFT ID", transferredTokenId);
    let data = abiCoder.encode(["uint24", "uint256"], [3000, transferredTokenId]);
    let depositParams: any = [
      wallets[3].address,
      ulm.address,
      tokens[0].address,
      tokens[1].address,
      parseUnits("20", "18"),
      parseUnits("20", "18"),
    ];

    await expect(
      unipilot.connect(wallets[3]).deposit(depositParams, data),
    ).to.be.revertedWith("");
  });

  //   it("Should successfully deposit, large amount", async () => {
  //     // transfer tokens to wallet3
  //     await tokens[0].transfer(wallets[3].address, parseUnits("50", "18"));
  //     await tokens[1].transfer(wallets[3].address, parseUnits("50", "18"));

  //     // Token approval has already been given

  //     let data = abiCoder.encode(["uint24", "uint256"], [3000, 0]);
  //     let depositParams: any = [
  //       wallets[3].address,
  //       ulm.address,
  //       tokens[0].address,
  //       tokens[1].address,
  //       parseUnits("50", "18"),
  //       parseUnits("50", "18"),
  //     ];

  //     // logMessage(
  //     //   "Signer Balance",
  //     //   BigNumber.from(await tokens[0].balanceOf(wallets[3].address)).toString(),
  //     //   BigNumber.from(await tokens[1].balanceOf(wallets[3].address)).toString(),
  //     // );
  //     // logMessage(
  //     //   "ULM Balance",
  //     //   BigNumber.from(await tokens[0].balanceOf(ulm.address)).toString(),
  //     //   BigNumber.from(await tokens[1].balanceOf(ulm.address)).toString(),
  //     // );
  //     expect(await unipilot.connect(wallets[3]).deposit(depositParams, data));
  //     // logMessage(
  //     //   "Signer Balance",
  //     //   BigNumber.from(await tokens[0].balanceOf(wallets[3].address)).toString(),
  //     //   BigNumber.from(await tokens[1].balanceOf(wallets[3].address)).toString(),
  //     // );
  //     // logMessage(
  //     //   "ULM Balance",
  //     //   BigNumber.from(await tokens[0].balanceOf(ulm.address)).toString(),
  //     //   BigNumber.from(await tokens[1].balanceOf(ulm.address)).toString(),
  //     // );
  //   });
}

function logMessage(msg: string, ...params: any) {
  if (true) {
    console.log(msg, "-->", ...params);
  }
}
