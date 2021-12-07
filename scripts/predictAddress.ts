import Web3 from "web3";
import RLP from "rlp";

const provider = "https://rinkeby.infura.io/v3/7d850c4d27e44521a613d92218f948cf";
// const provider = "https://goerli.infura.io/v3/98d49364a6d6475e842e7a63341ca0bf";

const web3 = new Web3(provider);

const predictAddress = async () => {
  const sender = "0xb89C3514942E0e5A1Def06C8a399BbE5B388C481";
  const nonce = await web3.eth.getTransactionCount(sender);
  const address =
    "0x" +
    web3.utils
      .sha3(RLP.encode([sender, nonce + 1]).toString())
      ?.slice(12)
      .substring(14);
  console.log(address);
  //   console.log(nonce);
};

export default predictAddress;
