import { deployContract } from "./utils";
import { constants, Wallet } from "ethers";
import { formatEther, parseEther } from "ethers/lib/utils";
import { ethers, network } from "hardhat";
import { task } from "hardhat/config";
import predictAddress from "../scripts/predictAddress.js";
import { Bytes, formatUnits, parseUnits, AbiCoder } from "ethers/lib/utils";

import { TASK_ACCOUNTS } from "./task-names";

task("deploy-unipilot", "Deploy all unipilot contracts")
  .addParam("governance", "governer address")
  .addParam("proxy", "minter proxy address")
  .setAction(async (cliArgs, { ethers, run, network }) => {
    await run("compile");

    const signer = (await ethers.getSigners())[0];
    console.log("Signer");
    console.log("  at", signer.address);
    console.log("  ETH", formatEther(await signer.getBalance()));

    const args1 = {
      governance: cliArgs.governance,
      ulm: await predictAddress(),
      proxy: cliArgs.proxy,
    };

    console.log("Network");
    console.log("   ", network.name);
    console.log("Task Args");
    console.log(args1);

    const unipilot = await deployContract(
      "Unipilot",
      await ethers.getContractFactory("Unipilot"),
      signer,
      [args1.governance, args1.ulm, args1.proxy],
    );

    const args2 = {
      uniswapFactory: "0x1F98431c8aD98523631AE4a59f267346ea31F984",
      pilotWeth: "0xf6415c04aCf482d5Fe0043734A1215490A86cff4",
      oracle: "0x06223F00c0Bc96613dc673180B72623c0E19608e",
      indexFund: "0x1f7DbA02edDD338cB52bc48B2aF2baddF2eaAAfd",
      uniStrategy: "0x451A055672bf0d7dA3D0424955203ff32f8F7389",
      unipilotAddress: unipilot.address,
      rebasePremium: "10000000000000000",
      gasPriceLimit: "1900226581",
      userPilotPercentage: "95",
      feesPercentageIndexFund: "10",
      swapPercentage: "2",
      swapPriceThreshold: parseUnits("1", 5),
    };

    const uniswapLiquidityManager = await deployContract(
      "UniswapLiquidityManager",
      await ethers.getContractFactory("UniswapLiquidityManager"),
      signer,
      [
        [
          args2.swapPercentage,
          args2.swapPriceThreshold,
          args2.rebasePremium,
          args2.gasPriceLimit,
          args2.userPilotPercentage,
          args2.feesPercentageIndexFund,
          args2.pilotWeth,
          args2.oracle,
          args2.indexFund,
          args2.uniStrategy,
          args2.unipilotAddress,
        ],
        args2.uniswapFactory,
      ],
    );

    await unipilot.deployTransaction.wait(5);
    await uniswapLiquidityManager.deployTransaction.wait(5);

    delay(60000);

    await run("verify:verify", {
      address: uniswapLiquidityManager.address,
      constructorArguments: [
        [
          args2.swapPercentage,
          args2.swapPriceThreshold,
          args2.rebasePremium,
          args2.gasPriceLimit,
          args2.userPilotPercentage,
          args2.feesPercentageIndexFund,
          args2.pilotWeth,
          args2.oracle,
          args2.indexFund,
          args2.uniStrategy,
          args2.unipilotAddress,
        ],
        args2.uniswapFactory,
      ],
    });

    await run("verify:verify", {
      address: unipilot.address,
      constructorArguments: [args1.governance, args1.ulm, args1.proxy],
    });
  });

function delay(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
