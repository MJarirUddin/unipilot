/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Contract, Signer, utils } from "ethers";
import { Provider } from "@ethersproject/providers";
import type { IUniStrategy, IUniStrategyInterface } from "../IUniStrategy";

const _abi = [
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "int24",
        name: "oldMultiplier",
        type: "int24",
      },
      {
        indexed: false,
        internalType: "int24",
        name: "newMultiplier",
        type: "int24",
      },
    ],
    name: "BaseMultiplierUpdated",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "int24",
        name: "oldDeviation",
        type: "int24",
      },
      {
        indexed: false,
        internalType: "int24",
        name: "newDeviation",
        type: "int24",
      },
    ],
    name: "MaxTwapDeviationUpdated",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint24",
        name: "oldThreshold",
        type: "uint24",
      },
      {
        indexed: false,
        internalType: "uint24",
        name: "newThreshold",
        type: "uint24",
      },
    ],
    name: "PriceThresholdUpdated",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "int24",
        name: "oldMultiplier",
        type: "int24",
      },
      {
        indexed: false,
        internalType: "int24",
        name: "newMultiplier",
        type: "int24",
      },
    ],
    name: "RangeMultiplierUpdated",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        components: [
          {
            internalType: "int24",
            name: "baseThreshold",
            type: "int24",
          },
          {
            internalType: "int24",
            name: "rangeThreshold",
            type: "int24",
          },
          {
            internalType: "int24",
            name: "maxTwapDeviation",
            type: "int24",
          },
          {
            internalType: "int24",
            name: "readjustThreshold",
            type: "int24",
          },
          {
            internalType: "uint32",
            name: "twapDuration",
            type: "uint32",
          },
        ],
        indexed: false,
        internalType: "struct IUniStrategy.PoolStrategy",
        name: "oldStrategy",
        type: "tuple",
      },
      {
        components: [
          {
            internalType: "int24",
            name: "baseThreshold",
            type: "int24",
          },
          {
            internalType: "int24",
            name: "rangeThreshold",
            type: "int24",
          },
          {
            internalType: "int24",
            name: "maxTwapDeviation",
            type: "int24",
          },
          {
            internalType: "int24",
            name: "readjustThreshold",
            type: "int24",
          },
          {
            internalType: "uint32",
            name: "twapDuration",
            type: "uint32",
          },
        ],
        indexed: false,
        internalType: "struct IUniStrategy.PoolStrategy",
        name: "newStrategy",
        type: "tuple",
      },
    ],
    name: "StrategyUpdated",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint8",
        name: "oldPercentage",
        type: "uint8",
      },
      {
        indexed: false,
        internalType: "uint8",
        name: "newPercentage",
        type: "uint8",
      },
    ],
    name: "SwapPercentageUpdated",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint32",
        name: "oldDuration",
        type: "uint32",
      },
      {
        indexed: false,
        internalType: "uint32",
        name: "newDuration",
        type: "uint32",
      },
    ],
    name: "TwapDurationUpdated",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_pool",
        type: "address",
      },
    ],
    name: "getReadjustThreshold",
    outputs: [
      {
        internalType: "int24",
        name: "readjustThreshold",
        type: "int24",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_pool",
        type: "address",
      },
    ],
    name: "getTicks",
    outputs: [
      {
        internalType: "int24",
        name: "baseLower",
        type: "int24",
      },
      {
        internalType: "int24",
        name: "baseUpper",
        type: "int24",
      },
      {
        internalType: "int24",
        name: "bidLower",
        type: "int24",
      },
      {
        internalType: "int24",
        name: "bidUpper",
        type: "int24",
      },
      {
        internalType: "int24",
        name: "askLower",
        type: "int24",
      },
      {
        internalType: "int24",
        name: "askUpper",
        type: "int24",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
];

export class IUniStrategy__factory {
  static readonly abi = _abi;
  static createInterface(): IUniStrategyInterface {
    return new utils.Interface(_abi) as IUniStrategyInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): IUniStrategy {
    return new Contract(address, _abi, signerOrProvider) as IUniStrategy;
  }
}