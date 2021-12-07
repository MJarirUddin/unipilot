/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import {
  Signer,
  utils,
  BigNumberish,
  Contract,
  ContractFactory,
  Overrides,
} from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type { TestERC20, TestERC20Interface } from "../TestERC20";

const _abi = [
  {
    inputs: [
      {
        internalType: "uint256",
        name: "amountToMint",
        type: "uint256",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
    ],
    name: "Approval",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
    ],
    name: "Transfer",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "allowance",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "approve",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "balanceOf",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "mint",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "recipient",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "transfer",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "sender",
        type: "address",
      },
      {
        internalType: "address",
        name: "recipient",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "transferFrom",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
];

const _bytecode =
  "0x608060405234801561001057600080fd5b5060405161063e38038061063e8339818101604052602081101561003357600080fd5b505161003f3382610045565b506100c8565b6001600160a01b0382166000908152602081905260409020548101818110156100a8576040805162461bcd60e51b815260206004820152601060248201526f6f766572666c6f772062616c616e636560801b604482015290519081900360640190fd5b6001600160a01b0390921660009081526020819052604090209190915550565b610567806100d76000396000f3fe608060405234801561001057600080fd5b50600436106100725760003560e01c806370a082311161005057806370a082311461011b578063a9059cbb14610153578063dd62ed3e1461017f57610072565b8063095ea7b31461007757806323b872dd146100b757806340c10f19146100ed575b600080fd5b6100a36004803603604081101561008d57600080fd5b506001600160a01b0381351690602001356101ad565b604080519115158252519081900360200190f35b6100a3600480360360608110156100cd57600080fd5b506001600160a01b03813581169160208101359091169060400135610213565b6101196004803603604081101561010357600080fd5b506001600160a01b03813516906020013561035f565b005b6101416004803603602081101561013157600080fd5b50356001600160a01b03166103ef565b60408051918252519081900360200190f35b6100a36004803603604081101561016957600080fd5b506001600160a01b038135169060200135610401565b6101416004803603604081101561019557600080fd5b506001600160a01b038135811691602001351661053d565b3360008181526001602090815260408083206001600160a01b038716808552908352818420869055815186815291519394909390927f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925928290030190a350600192915050565b6001600160a01b038216600090815260208190526040812054828101811115610283576040805162461bcd60e51b815260206004820152601a60248201527f6f766572666c6f772062616c616e636520726563697069656e74000000000000604482015290519081900360640190fd5b6001600160a01b03808516600090815260208190526040808220848701905591871681522054838110156102fe576040805162461bcd60e51b815260206004820152601860248201527f756e646572666c6f772062616c616e63652073656e6465720000000000000000604482015290519081900360640190fd5b6001600160a01b0380871660008181526020818152604091829020888603905581518881529151938916937fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef9281900390910190a350600195945050505050565b6001600160a01b0382166000908152602081905260409020548101818110156103cf576040805162461bcd60e51b815260206004820152601060248201527f6f766572666c6f772062616c616e636500000000000000000000000000000000604482015290519081900360640190fd5b6001600160a01b0390921660009081526020819052604090209190915550565b60006020819052908152604090205481565b3360009081526020819052604081205482811015610466576040805162461bcd60e51b815260206004820152601460248201527f696e73756666696369656e742062616c616e6365000000000000000000000000604482015290519081900360640190fd5b3360009081526020819052604080822085840390556001600160a01b03861682529020548084018111156104e1576040805162461bcd60e51b815260206004820152601a60248201527f726563697069656e742062616c616e6365206f766572666c6f77000000000000604482015290519081900360640190fd5b6001600160a01b0385166000818152602081815260409182902084880190558151878152915133927fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef92908290030190a3506001949350505050565b60016020908152600092835260408084209091529082529020548156fea164736f6c6343000706000a";

export class TestERC20__factory extends ContractFactory {
  constructor(signer?: Signer) {
    super(_abi, _bytecode, signer);
  }

  deploy(
    amountToMint: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<TestERC20> {
    return super.deploy(amountToMint, overrides || {}) as Promise<TestERC20>;
  }
  getDeployTransaction(
    amountToMint: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(amountToMint, overrides || {});
  }
  attach(address: string): TestERC20 {
    return super.attach(address) as TestERC20;
  }
  connect(signer: Signer): TestERC20__factory {
    return super.connect(signer) as TestERC20__factory;
  }
  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): TestERC20Interface {
    return new utils.Interface(_abi) as TestERC20Interface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): TestERC20 {
    return new Contract(address, _abi, signerOrProvider) as TestERC20;
  }
}
