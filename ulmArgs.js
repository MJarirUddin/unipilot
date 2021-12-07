module.exports = [
  [
    "2", // swapPercentage
    "100000", // swapPriceThreshold
    "10000000000000000",
    "1900226581", // gasPriceLimit
    "98", // userPilotPercentage
    "2", // indexFund amount (change for mainnet),
    "0x20B809da87c69d79F18b6A750E0349DaC070E7d5", // V3ORacle
    "0x1f7DbA02edDD338cB52bc48B2aF2baddF2eaAAfd", // indexFund
    "0xA1d72ED719C500E7B3CA1dC57Aa73796A954fCFC", // UniStrategy
    "0xB016d76d8F76817Be18c43E33E1Ef955CD47a658", // Unipilot
  ],
  "0x1F98431c8aD98523631AE4a59f267346ea31F984",
];

// yarn verify rinkeby contractAddress --constructor-args args.js
