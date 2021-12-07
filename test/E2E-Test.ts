const { ethers } = require("hardhat");

let contractFact: any;
let contractInst: any;
describe("======= Testing Mock Setup E2E for Unipilot =======", async function () {
  this.beforeAll(async () => {
    contractFact = await ethers.getContractFactory("DappMock");
    contractInst = await contractFact.deploy();
    await contractInst.deployed();    
  });

  it("Should print contract", async () => {
    console.log("DappMock's address:", contractInst.address);
  });

  it("Should create a pool on V3", async () => {
    const pool = await contractInst.callCreatePair();
    console.log("Pool address:", pool);
  });
  

  
  // it("Should call Swap Test", async () => {
  //   console.log("calling testSwap ...");
  //   await contractInst.swapTest(10000000000, 1);
  // });


  // it("Should call Rebase Test", async () => {
  //   console.log("calling testRebase ...");
  //   await contractInst.rebaseTest();
  // });

  // it("Should call Collect Test", async () => {
  //   console.log("calling testCollect ...");
  //   await contractInst.collectTest(false, false);
  // });

  // it("Should call Withdraw Test", async () => {
  //   console.log("calling withdraw ...");
  //   await contractInst.withdrawTest(false, false, 4);
  // });
});
