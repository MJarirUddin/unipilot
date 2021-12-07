/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type { V3Oracle, V3OracleInterface } from "../V3Oracle";

const _abi = [
  {
    inputs: [
      {
        internalType: "address",
        name: "_governance",
        type: "address",
      },
      {
        internalType: "address",
        name: "_uniswapFactory",
        type: "address",
      },
      {
        internalType: "address",
        name: "_weth",
        type: "address",
      },
      {
        internalType: "address",
        name: "_pilot",
        type: "address",
      },
      {
        internalType: "address",
        name: "_dai",
        type: "address",
      },
      {
        internalType: "address",
        name: "_usdt",
        type: "address",
      },
      {
        internalType: "address",
        name: "_usdc",
        type: "address",
      },
      {
        internalType: "address",
        name: "_pilotWethPair",
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
        name: "oldGovernance",
        type: "address",
      },
      {
        indexed: false,
        internalType: "address",
        name: "newGovernance",
        type: "address",
      },
    ],
    name: "GovernanceUpdated",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "oldUlmState",
        type: "address",
      },
      {
        indexed: false,
        internalType: "address",
        name: "newUlmState",
        type: "address",
      },
    ],
    name: "ULMStateUpdated",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "token",
        type: "address",
      },
      {
        internalType: "address",
        name: "pool",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amountIn",
        type: "uint256",
      },
    ],
    name: "assetToEth",
    outputs: [
      {
        internalType: "uint256",
        name: "ethAmountOut",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "dai",
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
        name: "tokenOut",
        type: "address",
      },
      {
        internalType: "address",
        name: "pool",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amountIn",
        type: "uint256",
      },
    ],
    name: "ethToAsset",
    outputs: [
      {
        internalType: "uint256",
        name: "amountOut",
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
        name: "token",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "pool",
        type: "address",
      },
    ],
    name: "getPilotAmount",
    outputs: [
      {
        internalType: "uint256",
        name: "pilotAmount",
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
        name: "token0",
        type: "address",
      },
      {
        internalType: "address",
        name: "token1",
        type: "address",
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
        internalType: "address",
        name: "oracle0",
        type: "address",
      },
      {
        internalType: "address",
        name: "oracle1",
        type: "address",
      },
    ],
    name: "getPilotAmountForTokens",
    outputs: [
      {
        internalType: "uint256",
        name: "total",
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
        name: "tokenAlt",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "altAmount",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "wethAmount",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "altOracle",
        type: "address",
      },
    ],
    name: "getPilotAmountWethPair",
    outputs: [
      {
        internalType: "uint256",
        name: "amount",
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
        name: "tokenA",
        type: "address",
      },
      {
        internalType: "address",
        name: "tokenB",
        type: "address",
      },
      {
        internalType: "address",
        name: "pool",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_amountIn",
        type: "uint256",
      },
    ],
    name: "getPrice",
    outputs: [
      {
        internalType: "uint256",
        name: "amountOut",
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
        name: "token",
        type: "address",
      },
    ],
    name: "getTokenWethPairWithMaxLiquidity",
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
    inputs: [],
    name: "governance",
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
    inputs: [],
    name: "pilot",
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
    inputs: [],
    name: "pilotWethPair",
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
        name: "_governance",
        type: "address",
      },
    ],
    name: "setGovernance",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "uniswapFactory",
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
    inputs: [],
    name: "usdc",
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
    inputs: [],
    name: "usdt",
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
    inputs: [],
    name: "weth",
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
];

const _bytecode =
  "0x61014060405234801561001157600080fd5b506040516112a23803806112a2833981810160405261010081101561003557600080fd5b5080516020820151604083015160608085015160808087015160a08089015160c0808b015160e09b8c0151600180546001600160a01b039283166001600160a01b0319918216179091556001600160601b0319928a1b83166101005293891b8216909c5293871b8416905293851b8216905293831b8416905292901b16610120526000805493909216921691909117905560805160601c60a05160601c60c05160601c60e05160601c6101005160601c6101205160601c61115e6101446000398061067252806108935250806104af525080610453525080610813525080610531528061056952806106ae52806107ef525080610370528061047d52806104d352806104fc525061115e6000f3fe608060405234801561001057600080fd5b50600436106101005760003560e01c80635aa6e67511610097578063ab033ea911610066578063ab033ea9146102a1578063bb4a1d3a146102c9578063f4b9fa75146102d1578063f592d4f9146102d957610100565b80635aa6e6751461021f5780636ea4a236146102275780638bdb2afa14610263578063a9cf0fcf1461026b57610100565b80633e413bee116100d35780633e413bee1461019f5780633fc8cef3146101a75780633ff01ddf146101af5780634e757bad146101e557610100565b8063096f5c53146101055780630975094d146101295780632f48ab7d1461014f57806338f1b61f14610157575b600080fd5b61010d610323565b604080516001600160a01b039092168252519081900360200190f35b61010d6004803603602081101561013f57600080fd5b50356001600160a01b0316610332565b61010d610451565b61018d6004803603606081101561016d57600080fd5b506001600160a01b03813581169160208101359091169060400135610475565b60408051918252519081900360200190f35b61010d6104ad565b61010d6104d1565b61018d600480360360608110156101c557600080fd5b506001600160a01b038135811691602081013590911690604001356104f5565b61018d600480360360808110156101fb57600080fd5b506001600160a01b0381358116916020810135916040820135916060013516610523565b61010d6105c3565b61018d6004803603608081101561023d57600080fd5b506001600160a01b038135811691602081013582169160408201351690606001356105d2565b61010d610670565b61018d6004803603606081101561028157600080fd5b506001600160a01b03813581169160208101359160409091013516610694565b6102c7600480360360208110156102b757600080fd5b50356001600160a01b03166106e6565b005b61010d6107ed565b61010d610811565b61018d600480360360c08110156102ef57600080fd5b506001600160a01b0381358116916020810135821691604082013591606081013591608082013581169160a0013516610835565b6001546001600160a01b031681565b60408051606081018252610bb881526101f4602082015261271091810191909152600090819081908180805b60038160ff161015610444576103ac887f0000000000000000000000000000000000000000000000000000000000000000868460ff166003811061039e57fe5b602002015161ffff1661085b565b95506001600160a01b0386161561043c57856001600160a01b0316631a6865026040518163ffffffff1660e01b815260040160206040518083038186803b1580156103f657600080fd5b505afa15801561040a573d6000803e3d6000fd5b505050506040513d602081101561042057600080fd5b50516001600160801b031694508285111561043c578492508591505b60010161035e565b509450505050505b919050565b7f000000000000000000000000000000000000000000000000000000000000000081565b60006104a3847f000000000000000000000000000000000000000000000000000000000000000085856105d2565b90505b9392505050565b7f000000000000000000000000000000000000000000000000000000000000000081565b7f000000000000000000000000000000000000000000000000000000000000000081565b60006104a37f00000000000000000000000000000000000000000000000000000000000000008585856105d2565b6001546000908190610560907f0000000000000000000000000000000000000000000000000000000000000000906001600160a01b0316866104f5565b905060008590507f00000000000000000000000000000000000000000000000000000000000000006001600160a01b0316876001600160a01b0316146105ae576105ab878786610694565b90505b6105b8828261090d565b979650505050505050565b6000546001600160a01b031681565b600080836001600160a01b031663252c09d760006040518263ffffffff1660e01b81526004018082815260200191505060806040518083038186803b15801561061a57600080fd5b505afa15801561062e573d6000803e3d6000fd5b505050506040513d608081101561064457600080fd5b5051905060006106578542849003610967565b60020b90506105b88161066986610c67565b8989610c7d565b7f000000000000000000000000000000000000000000000000000000000000000081565b6000806106a2858486610475565b6001549091506106dd907f0000000000000000000000000000000000000000000000000000000000000000906001600160a01b0316836104f5565b95945050505050565b6000546001600160a01b0316331461072a576040805162461bcd60e51b81526020600482015260026024820152614e4760f01b604482015290519081900360640190fd5b6001600160a01b03811661076b576040805162461bcd60e51b815260206004820152600360248201526249474160e81b604482015290519081900360640190fd5b600054604080516001600160a01b039283168152918316602083015280517f434a2db650703b36c824e745330d6397cdaa9ee2cc891a4938ae853e1c50b68d9281900390910190a1600080547fffffffffffffffffffffffff0000000000000000000000000000000000000000166001600160a01b0392909216919091179055565b7f000000000000000000000000000000000000000000000000000000000000000081565b7f000000000000000000000000000000000000000000000000000000000000000081565b6000610842878685610694565b945061084f868584610694565b93506105b8858561090d565b60408051630b4c774160e11b81526001600160a01b038581166004830152848116602483015262ffffff8416604483015291516000927f00000000000000000000000000000000000000000000000000000000000000001691631698ee82916064808301926020929190829003018186803b1580156108d957600080fd5b505afa1580156108ed573d6000803e3d6000fd5b505050506040513d602081101561090357600080fd5b5051949350505050565b6000828201838110156104a6576040805162461bcd60e51b815260206004820152601b60248201527f536166654d6174683a206164646974696f6e206f766572666c6f770000000000604482015290519081900360640190fd5b600063ffffffff82166109a6576040805162461bcd60e51b8152602060048201526002602482015261042560f41b604482015290519081900360640190fd5b60408051600280825260608201835260009260208301908036833701905050905082816000815181106109d557fe5b602002602001019063ffffffff16908163ffffffff16815250506000816001815181106109fe57fe5b63ffffffff90921660209283029190910182015260405163883bdbfd60e01b8152600481018281528351602483015283516000936001600160a01b0389169363883bdbfd938793909283926044019185820191028083838b5b83811015610a6f578181015183820152602001610a57565b505050509050019250505060006040518083038186803b158015610a9257600080fd5b505afa158015610aa6573d6000803e3d6000fd5b505050506040513d6000823e601f3d908101601f191682016040908152811015610acf57600080fd5b8101908080516040519392919084640100000000821115610aef57600080fd5b908301906020820185811115610b0457600080fd5b8251866020820283011164010000000082111715610b2157600080fd5b82525081516020918201928201910280838360005b83811015610b4e578181015183820152602001610b36565b5050505090500160405260200180516040519392919084640100000000821115610b7757600080fd5b908301906020820185811115610b8c57600080fd5b8251866020820283011164010000000082111715610ba957600080fd5b82525081516020918201928201910280838360005b83811015610bd6578181015183820152602001610bbe565b50505050905001604052505050509050600081600081518110610bf557fe5b602002602001015182600181518110610c0a57fe5b60200260200101510390508463ffffffff168160060b81610c2757fe5b05935060008160060b128015610c5157508463ffffffff168160060b81610c4a57fe5b0760060b15155b15610c5e57600019909301925b50505092915050565b806001600160801b038116811461044c57600080fd5b600080610c8986610d70565b90506001600160801b036001600160a01b03821611610cf8576001600160a01b0380821680029084811690861610610cd857610cd3600160c01b876001600160801b0316836110a2565b610cf0565b610cf081876001600160801b0316600160c01b6110a2565b925050610d67565b6000610d176001600160a01b03831680680100000000000000006110a2565b9050836001600160a01b0316856001600160a01b031610610d4f57610d4a600160801b876001600160801b0316836110a2565b6105b8565b6105b881876001600160801b0316600160801b6110a2565b50949350505050565b60008060008360020b12610d87578260020b610d8f565b8260020b6000035b9050620d89e8811115610dcd576040805162461bcd60e51b81526020600482015260016024820152601560fa1b604482015290519081900360640190fd5b600060018216610de157600160801b610df3565b6ffffcb933bd6fad37aa2d162d1a5940015b70ffffffffffffffffffffffffffffffffff1690506002821615610e27576ffff97272373d413259a46990580e213a0260801c5b6004821615610e46576ffff2e50f5f656932ef12357cf3c7fdcc0260801c5b6008821615610e65576fffe5caca7e10e4e61c3624eaa0941cd00260801c5b6010821615610e84576fffcb9843d60f6159c9db58835c9266440260801c5b6020821615610ea3576fff973b41fa98c081472e6896dfb254c00260801c5b6040821615610ec2576fff2ea16466c96a3843ec78b326b528610260801c5b6080821615610ee1576ffe5dee046a99a2a811c461f1969c30530260801c5b610100821615610f01576ffcbe86c7900a88aedcffc83b479aa3a40260801c5b610200821615610f21576ff987a7253ac413176f2b074cf7815e540260801c5b610400821615610f41576ff3392b0822b70005940c7a398e4b70f30260801c5b610800821615610f61576fe7159475a2c29b7443b29c7fa6e889d90260801c5b611000821615610f81576fd097f3bdfd2022b8845ad8f792aa58250260801c5b612000821615610fa1576fa9f746462d870fdf8a65dc1f90e061e50260801c5b614000821615610fc1576f70d869a156d2a1b890bb3df62baf32f70260801c5b618000821615610fe1576f31be135f97d08fd981231505542fcfa60260801c5b62010000821615611002576f09aa508b5b7a84e1c677de54f3e99bc90260801c5b62020000821615611022576e5d6af8dedb81196699c329225ee6040260801c5b62040000821615611041576d2216e584f5fa1ea926041bedfe980260801c5b6208000082161561105e576b048a170391f7dc42444e8fa20260801c5b60008460020b131561107957806000198161107557fe5b0490505b64010000000081061561108d576001611090565b60005b60ff16602082901c0192505050919050565b60008080600019858709868602925082811090839003039050806110d857600084116110cd57600080fd5b5082900490506104a6565b8084116110e457600080fd5b6000848688096000868103871696879004966002600389028118808a02820302808a02820302808a02820302808a02820302808a02820302808a0290910302918190038190046001018684119095039490940291909403929092049190911791909102915050939250505056fea164736f6c6343000706000a";

export class V3Oracle__factory extends ContractFactory {
  constructor(signer?: Signer) {
    super(_abi, _bytecode, signer);
  }

  deploy(
    _governance: string,
    _uniswapFactory: string,
    _weth: string,
    _pilot: string,
    _dai: string,
    _usdt: string,
    _usdc: string,
    _pilotWethPair: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<V3Oracle> {
    return super.deploy(
      _governance,
      _uniswapFactory,
      _weth,
      _pilot,
      _dai,
      _usdt,
      _usdc,
      _pilotWethPair,
      overrides || {}
    ) as Promise<V3Oracle>;
  }
  getDeployTransaction(
    _governance: string,
    _uniswapFactory: string,
    _weth: string,
    _pilot: string,
    _dai: string,
    _usdt: string,
    _usdc: string,
    _pilotWethPair: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(
      _governance,
      _uniswapFactory,
      _weth,
      _pilot,
      _dai,
      _usdt,
      _usdc,
      _pilotWethPair,
      overrides || {}
    );
  }
  attach(address: string): V3Oracle {
    return super.attach(address) as V3Oracle;
  }
  connect(signer: Signer): V3Oracle__factory {
    return super.connect(signer) as V3Oracle__factory;
  }
  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): V3OracleInterface {
    return new utils.Interface(_abi) as V3OracleInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): V3Oracle {
    return new Contract(address, _abi, signerOrProvider) as V3Oracle;
  }
}
