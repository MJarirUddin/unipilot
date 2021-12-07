import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { expect } from "chai";
import { Contract } from "ethers";

export async function shouldBehaveLikeSetExchangeAddress(
  wallets: SignerWithAddress[],
  Unipilot: Contract,
  Ulm: Contract,
): Promise<void> {
  const ZERO_ADDR = "0x0000000000000000000000000000000000000000";
  it("Should fail setting exchange address with NG", async () => {
    await expect(
      Unipilot.connect(wallets[1]).setExchangeManagerAddress(Ulm.address),
    ).to.be.revertedWith("NG");
  });

  it("Should fail setting exchange address with IEA", async () => {
    await expect(Unipilot.setExchangeManagerAddress(ZERO_ADDR)).to.be.revertedWith("IEA");
  });

  it("Should successfully set the exchange address", async () => {
    expect(await Unipilot.setExchangeManagerAddress(Ulm.address));
  });
}
