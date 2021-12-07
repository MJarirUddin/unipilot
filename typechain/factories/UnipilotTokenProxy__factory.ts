/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type {
  UnipilotTokenProxy,
  UnipilotTokenProxyInterface,
} from "../UnipilotTokenProxy";

const _abi = [
  {
    inputs: [
      {
        internalType: "address",
        name: "_timelock",
        type: "address",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "minter",
        type: "address",
      },
      {
        indexed: false,
        internalType: "bool",
        name: "status",
        type: "bool",
      },
    ],
    name: "MinterUpdated",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "previousTimelock",
        type: "address",
      },
      {
        indexed: false,
        internalType: "address",
        name: "newTimelock",
        type: "address",
      },
    ],
    name: "TimelockUpdated",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_value",
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
        name: "",
        type: "address",
      },
    ],
    name: "minter",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "timelock",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_minter",
        type: "address",
      },
    ],
    name: "updateMinter",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_timelock",
        type: "address",
      },
    ],
    name: "updateTimelock",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

const _bytecode =
  "0x608060405234801561001057600080fd5b5060405161045a38038061045a8339818101604052602081101561003357600080fd5b5051600080546001600160a01b039092166001600160a01b03199092169190911790556103f5806100656000396000f3fe608060405234801561001057600080fd5b50600436106100675760003560e01c80634eb03f6e116100505780634eb03f6e146100d4578063a890c910146100fa578063d33219b41461012057610067565b80633dd08c381461006c57806340c10f19146100a6575b600080fd5b6100926004803603602081101561008257600080fd5b50356001600160a01b0316610144565b604080519115158252519081900360200190f35b6100d2600480360360408110156100bc57600080fd5b506001600160a01b038135169060200135610159565b005b6100d2600480360360208110156100ea57600080fd5b50356001600160a01b031661023b565b6100d26004803603602081101561011057600080fd5b50356001600160a01b0316610304565b6101286103d9565b604080516001600160a01b039092168252519081900360200190f35b60016020526000908152604090205460ff1681565b3360009081526001602052604090205460ff166101bd576040805162461bcd60e51b815260206004820152601e60248201527f50494c4f545f544f4b454e5f50524f58593a3a204e4f545f4d494e5445520000604482015290519081900360640190fd5b604080516340c10f1960e01b81526001600160a01b0384166004820152602481018390529051732e53716051be4bcce9f546fcfb0ef7632e505dbd916340c10f1991604480830192600092919082900301818387803b15801561021f57600080fd5b505af1158015610233573d6000803e3d6000fd5b505050505050565b6000546001600160a01b0316331461029a576040805162461bcd60e51b815260206004820181905260248201527f50494c4f545f544f4b454e5f50524f58593a3a204e4f545f54494d454c4f434b604482015290519081900360640190fd5b6001600160a01b038116600081815260016020908152604091829020805460ff81161560ff1990911681179091558251938452908301819052815190927fb21afb9ce9be0a676f8f317ff0ca072fb89a4f8ce2d1b6fe80f8755c14f1cb1992908290030190a15050565b6000546001600160a01b03163314610363576040805162461bcd60e51b815260206004820181905260248201527f50494c4f545f544f4b454e5f50524f58593a3a204e4f545f54494d454c4f434b604482015290519081900360640190fd5b600080547fffffffffffffffffffffffff000000000000000000000000000000000000000081166001600160a01b0384811691821790935560408051939092168352602083015280517fae97011a27b5efe7b1d76fe38e75cc498fd64cc24e407a9c6b2185d27f611f7e9281900390910190a150565b6000546001600160a01b03168156fea164736f6c6343000706000a";

export class UnipilotTokenProxy__factory extends ContractFactory {
  constructor(signer?: Signer) {
    super(_abi, _bytecode, signer);
  }

  deploy(
    _timelock: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<UnipilotTokenProxy> {
    return super.deploy(
      _timelock,
      overrides || {}
    ) as Promise<UnipilotTokenProxy>;
  }
  getDeployTransaction(
    _timelock: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(_timelock, overrides || {});
  }
  attach(address: string): UnipilotTokenProxy {
    return super.attach(address) as UnipilotTokenProxy;
  }
  connect(signer: Signer): UnipilotTokenProxy__factory {
    return super.connect(signer) as UnipilotTokenProxy__factory;
  }
  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): UnipilotTokenProxyInterface {
    return new utils.Interface(_abi) as UnipilotTokenProxyInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): UnipilotTokenProxy {
    return new Contract(address, _abi, signerOrProvider) as UnipilotTokenProxy;
  }
}
