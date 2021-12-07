/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type { ULMState, ULMStateInterface } from "../ULMState";

const _abi = [
  {
    inputs: [
      {
        internalType: "address",
        name: "pool",
        type: "address",
      },
    ],
    name: "getPoolDetails",
    outputs: [
      {
        internalType: "address",
        name: "token0",
        type: "address",
      },
      {
        internalType: "address",
        name: "token1",
        type: "address",
      },
      {
        internalType: "uint24",
        name: "fee",
        type: "uint24",
      },
      {
        internalType: "uint16",
        name: "poolCardinality",
        type: "uint16",
      },
      {
        internalType: "uint128",
        name: "liquidity",
        type: "uint128",
      },
      {
        internalType: "uint160",
        name: "sqrtPriceX96",
        type: "uint160",
      },
      {
        internalType: "int24",
        name: "currentTick",
        type: "int24",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "liquidityManagerAddress",
        type: "address",
      },
    ],
    name: "getPositionDetails",
    outputs: [
      {
        internalType: "address",
        name: "pool",
        type: "address",
      },
      {
        internalType: "address",
        name: "token0",
        type: "address",
      },
      {
        internalType: "address",
        name: "token1",
        type: "address",
      },
      {
        internalType: "int24",
        name: "currentTick",
        type: "int24",
      },
      {
        internalType: "uint24",
        name: "fee",
        type: "uint24",
      },
      {
        internalType: "uint256",
        name: "liquidity",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "amount0",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "amount1",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "totalLiquidity",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];

const _bytecode =
  "0x608060405234801561001057600080fd5b5061077e806100206000396000f3fe608060405234801561001057600080fd5b50600436106100365760003560e01c8063bb5f30ce1461003b578063d3e90fa01461006c575b600080fd5b61004e61004936600461062a565b610092565b6040516100639998979695949392919061069a565b60405180910390f35b61007f61007a366004610476565b6101f0565b60405161006397969594939291906106f2565b6000806000806000806000806000808a90506000816001600160a01b0316631e7f13708e6040518263ffffffff1660e01b81526004016100d29190610750565b60e06040518083038186803b1580156100ea57600080fd5b505afa1580156100fe573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061012291906104b5565b602081015160405163602c231d60e01b81529192506001600160a01b0384169163602c231d9161015491600401610686565b60606040518083038186803b15801561016c57600080fd5b505afa158015610180573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906101a49190610659565b602084015192975090955093506101ba906101f0565b909192509091509050809b50819a50829c50839d505050505080602001519a508060400151955050509295985092959850929598565b600080600080600080600080889050806001600160a01b0316630dfe16816040518163ffffffff1660e01b815260040160206040518083038186803b15801561023857600080fd5b505afa15801561024c573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906102709190610499565b9750806001600160a01b031663d21220a76040518163ffffffff1660e01b815260040160206040518083038186803b1580156102ab57600080fd5b505afa1580156102bf573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906102e39190610499565b9650806001600160a01b031663ddca3f436040518163ffffffff1660e01b815260040160206040518083038186803b15801561031e57600080fd5b505afa158015610332573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906103569190610607565b9550806001600160a01b0316631a6865026040518163ffffffff1660e01b815260040160206040518083038186803b15801561039157600080fd5b505afa1580156103a5573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906103c99190610537565b9350806001600160a01b0316633850c7bd6040518163ffffffff1660e01b815260040160e06040518083038186803b15801561040457600080fd5b505afa158015610418573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061043c9190610567565b509c9e9b9d50999b5099969850919650949350505050565b805161045f81610759565b919050565b805161ffff8116811461045f57600080fd5b600060208284031215610487578081fd5b813561049281610759565b9392505050565b6000602082840312156104aa578081fd5b815161049281610759565b600060e082840312156104c6578081fd5b60405160e0810181811067ffffffffffffffff821117156104e357fe5b604052825181526104f660208401610454565b602082015260408301516040820152606083015160608201526080830151608082015260a083015160a082015260c083015160c08201528091505092915050565b600060208284031215610548578081fd5b81516fffffffffffffffffffffffffffffffff81168114610492578182fd5b600080600080600080600060e0888a031215610581578283fd5b875161058c81610759565b8097505060208801518060020b81146105a3578384fd5b95506105b160408901610464565b94506105bf60608901610464565b93506105cd60808901610464565b925060a088015160ff811681146105e2578283fd5b60c089015190925080151581146105f7578182fd5b8091505092959891949750929550565b600060208284031215610618578081fd5b815162ffffff81168114610492578182fd5b6000806040838503121561063c578182fd5b82359150602083013561064e81610759565b809150509250929050565b60008060006060848603121561066d578283fd5b8351925060208401519150604084015190509250925092565b6001600160a01b0391909116815260200190565b6001600160a01b03998a168152978916602089015295909716604087015260029390930b606086015262ffffff91909116608085015260a084015260c083015260e08201929092526101008101919091526101200190565b6001600160a01b039788168152958716602087015262ffffff94909416604086015261ffff9290921660608501526fffffffffffffffffffffffffffffffff16608084015290921660a082015260029190910b60c082015260e00190565b90815260200190565b6001600160a01b038116811461076e57600080fd5b5056fea164736f6c6343000706000a";

export class ULMState__factory extends ContractFactory {
  constructor(signer?: Signer) {
    super(_abi, _bytecode, signer);
  }

  deploy(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ULMState> {
    return super.deploy(overrides || {}) as Promise<ULMState>;
  }
  getDeployTransaction(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  attach(address: string): ULMState {
    return super.attach(address) as ULMState;
  }
  connect(signer: Signer): ULMState__factory {
    return super.connect(signer) as ULMState__factory;
  }
  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): ULMStateInterface {
    return new utils.Interface(_abi) as ULMStateInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): ULMState {
    return new Contract(address, _abi, signerOrProvider) as ULMState;
  }
}