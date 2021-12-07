import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { expect } from "chai";
import { Contract } from "ethers";

export async function shouldBehaveLikeSetGovernance(
  wallets: SignerWithAddress[],
  Unipilot: Contract,
  Ulm: Contract,
): Promise<void> {
  const ZERO_ADDR = "0x0000000000000000000000000000000000000000";
  it("should fail with IGA", async () => {
    await expect(Unipilot.setGovernance(ZERO_ADDR)).to.be.revertedWith("IGA");
  });

  it("should fail setting governace with unauthorized address", async () => {
    await expect(
      Unipilot.connect(wallets[1]).setGovernance(wallets[2].address),
    ).to.be.revertedWith("NG");
  });

  it("should successfully set governance", async () => {
    expect(await Unipilot.setGovernance(wallets[0].address));
  });
}
