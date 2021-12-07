/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import {
  ethers,
  EventFilter,
  Signer,
  BigNumber,
  BigNumberish,
  PopulatedTransaction,
  BaseContract,
  ContractTransaction,
  Overrides,
  PayableOverrides,
  CallOverrides,
} from "ethers";
import { BytesLike } from "@ethersproject/bytes";
import { Listener, Provider } from "@ethersproject/providers";
import { FunctionFragment, EventFragment, Result } from "@ethersproject/abi";
import { TypedEventFilter, TypedEvent, TypedListener } from "./commons";

interface UniswapLiquidityManagerInterface extends ethers.utils.Interface {
  functions: {
    "collect(bool,bool,uint256,bytes)": FunctionFragment;
    "createPair(address,address,bytes)": FunctionFragment;
    "deposit(address,address,uint256,uint256,uint256,uint256,bool,bytes)": FunctionFragment;
    "emergencyExit(address,bytes[10])": FunctionFragment;
    "getReserves(address,address,bytes)": FunctionFragment;
    "getUserFees(uint256)": FunctionFragment;
    "initialize(address)": FunctionFragment;
    "poolPositions(address)": FunctionFragment;
    "readjustFrequencyStatus(address)": FunctionFragment;
    "readjustLiquidity(address,address,uint24)": FunctionFragment;
    "setPilotProtocolDetails(tuple)": FunctionFragment;
    "setPoolIncentives(address,bool,bool,address,address)": FunctionFragment;
    "shouldReadjust(address,int24,int24)": FunctionFragment;
    "uniswapV3MintCallback(uint256,uint256,bytes)": FunctionFragment;
    "uniswapV3SwapCallback(int256,int256,bytes)": FunctionFragment;
    "updatePositionTotalAmounts(address)": FunctionFragment;
    "userPositions(uint256)": FunctionFragment;
    "withdraw(bool,bool,uint256,uint256,bytes)": FunctionFragment;
  };

  encodeFunctionData(
    functionFragment: "collect",
    values: [boolean, boolean, BigNumberish, BytesLike]
  ): string;
  encodeFunctionData(
    functionFragment: "createPair",
    values: [string, string, BytesLike]
  ): string;
  encodeFunctionData(
    functionFragment: "deposit",
    values: [
      string,
      string,
      BigNumberish,
      BigNumberish,
      BigNumberish,
      BigNumberish,
      boolean,
      BytesLike
    ]
  ): string;
  encodeFunctionData(
    functionFragment: "emergencyExit",
    values: [
      string,
      [
        BytesLike,
        BytesLike,
        BytesLike,
        BytesLike,
        BytesLike,
        BytesLike,
        BytesLike,
        BytesLike,
        BytesLike,
        BytesLike
      ]
    ]
  ): string;
  encodeFunctionData(
    functionFragment: "getReserves",
    values: [string, string, BytesLike]
  ): string;
  encodeFunctionData(
    functionFragment: "getUserFees",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(functionFragment: "initialize", values: [string]): string;
  encodeFunctionData(
    functionFragment: "poolPositions",
    values: [string]
  ): string;
  encodeFunctionData(
    functionFragment: "readjustFrequencyStatus",
    values: [string]
  ): string;
  encodeFunctionData(
    functionFragment: "readjustLiquidity",
    values: [string, string, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "setPilotProtocolDetails",
    values: [
      {
        swapPercentage: BigNumberish;
        swapPriceThreshold: BigNumberish;
        premium: BigNumberish;
        gasPriceLimit: BigNumberish;
        userPilotPercentage: BigNumberish;
        feesPercentageIndexFund: BigNumberish;
        pilotWethPair: string;
        oracle: string;
        indexFund: string;
        uniStrategy: string;
      }
    ]
  ): string;
  encodeFunctionData(
    functionFragment: "setPoolIncentives",
    values: [string, boolean, boolean, string, string]
  ): string;
  encodeFunctionData(
    functionFragment: "shouldReadjust",
    values: [string, BigNumberish, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "uniswapV3MintCallback",
    values: [BigNumberish, BigNumberish, BytesLike]
  ): string;
  encodeFunctionData(
    functionFragment: "uniswapV3SwapCallback",
    values: [BigNumberish, BigNumberish, BytesLike]
  ): string;
  encodeFunctionData(
    functionFragment: "updatePositionTotalAmounts",
    values: [string]
  ): string;
  encodeFunctionData(
    functionFragment: "userPositions",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "withdraw",
    values: [boolean, boolean, BigNumberish, BigNumberish, BytesLike]
  ): string;

  decodeFunctionResult(functionFragment: "collect", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "createPair", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "deposit", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "emergencyExit",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getReserves",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getUserFees",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "initialize", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "poolPositions",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "readjustFrequencyStatus",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "readjustLiquidity",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "setPilotProtocolDetails",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "setPoolIncentives",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "shouldReadjust",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "uniswapV3MintCallback",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "uniswapV3SwapCallback",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "updatePositionTotalAmounts",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "userPositions",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "withdraw", data: BytesLike): Result;

  events: {
    "Collect(uint256,uint256,uint256,uint256,address,address)": EventFragment;
    "Deposited(address,uint256,uint256,uint256,uint256)": EventFragment;
    "PoolCreated(address,address,address,uint24,uint160)": EventFragment;
    "PoolReajusted(address,uint128,uint128,int24,int24,int24,int24)": EventFragment;
    "Withdrawn(address,address,uint256,uint256,uint256)": EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: "Collect"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "Deposited"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "PoolCreated"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "PoolReajusted"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "Withdrawn"): EventFragment;
}

export class UniswapLiquidityManager extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  listeners<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter?: TypedEventFilter<EventArgsArray, EventArgsObject>
  ): Array<TypedListener<EventArgsArray, EventArgsObject>>;
  off<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>,
    listener: TypedListener<EventArgsArray, EventArgsObject>
  ): this;
  on<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>,
    listener: TypedListener<EventArgsArray, EventArgsObject>
  ): this;
  once<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>,
    listener: TypedListener<EventArgsArray, EventArgsObject>
  ): this;
  removeListener<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>,
    listener: TypedListener<EventArgsArray, EventArgsObject>
  ): this;
  removeAllListeners<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>
  ): this;

  listeners(eventName?: string): Array<Listener>;
  off(eventName: string, listener: Listener): this;
  on(eventName: string, listener: Listener): this;
  once(eventName: string, listener: Listener): this;
  removeListener(eventName: string, listener: Listener): this;
  removeAllListeners(eventName?: string): this;

  queryFilter<EventArgsArray extends Array<any>, EventArgsObject>(
    event: TypedEventFilter<EventArgsArray, EventArgsObject>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TypedEvent<EventArgsArray & EventArgsObject>>>;

  interface: UniswapLiquidityManagerInterface;

  functions: {
    collect(
      pilotToken: boolean,
      wethToken: boolean,
      tokenId: BigNumberish,
      data: BytesLike,
      overrides?: PayableOverrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    createPair(
      _token0: string,
      _token1: string,
      data: BytesLike,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    deposit(
      token0: string,
      token1: string,
      amount0Desired: BigNumberish,
      amount1Desired: BigNumberish,
      shares: BigNumberish,
      tokenId: BigNumberish,
      isTokenMinted: boolean,
      data: BytesLike,
      overrides?: PayableOverrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    emergencyExit(
      recipient: string,
      data: [
        BytesLike,
        BytesLike,
        BytesLike,
        BytesLike,
        BytesLike,
        BytesLike,
        BytesLike,
        BytesLike,
        BytesLike,
        BytesLike
      ],
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    getReserves(
      token0: string,
      token1: string,
      data: BytesLike,
      overrides?: CallOverrides
    ): Promise<
      [BigNumber, BigNumber, BigNumber] & {
        totalAmount0: BigNumber;
        totalAmount1: BigNumber;
        totalLiquidity: BigNumber;
      }
    >;

    getUserFees(
      tokenId: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    initialize(
      unipilot: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    poolPositions(
      pool: string,
      overrides?: CallOverrides
    ): Promise<
      [
        [
          number,
          number,
          BigNumber,
          number,
          number,
          BigNumber,
          BigNumber,
          BigNumber,
          BigNumber,
          BigNumber,
          BigNumber,
          boolean,
          string,
          string,
          BigNumber,
          number,
          boolean,
          boolean
        ] & {
          baseTickLower: number;
          baseTickUpper: number;
          baseLiquidity: BigNumber;
          rangeTickLower: number;
          rangeTickUpper: number;
          rangeLiquidity: BigNumber;
          fees0: BigNumber;
          fees1: BigNumber;
          feeGrowthGlobal0: BigNumber;
          feeGrowthGlobal1: BigNumber;
          totalLiquidity: BigNumber;
          feesInPilot: boolean;
          oracle0: string;
          oracle1: string;
          timestamp: BigNumber;
          counter: number;
          status: boolean;
          managed: boolean;
        }
      ]
    >;

    readjustFrequencyStatus(
      pool: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    readjustLiquidity(
      token0: string,
      token1: string,
      fee: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    setPilotProtocolDetails(
      params: {
        swapPercentage: BigNumberish;
        swapPriceThreshold: BigNumberish;
        premium: BigNumberish;
        gasPriceLimit: BigNumberish;
        userPilotPercentage: BigNumberish;
        feesPercentageIndexFund: BigNumberish;
        pilotWethPair: string;
        oracle: string;
        indexFund: string;
        uniStrategy: string;
      },
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    setPoolIncentives(
      pool: string,
      feesInPilot_: boolean,
      managed_: boolean,
      oracle0: string,
      oracle1: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    shouldReadjust(
      pool: string,
      baseTickLower: BigNumberish,
      baseTickUpper: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[boolean] & { readjust: boolean }>;

    uniswapV3MintCallback(
      amount0Owed: BigNumberish,
      amount1Owed: BigNumberish,
      data: BytesLike,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    uniswapV3SwapCallback(
      amount0Delta: BigNumberish,
      amount1Delta: BigNumberish,
      data: BytesLike,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    updatePositionTotalAmounts(
      _pool: string,
      overrides?: CallOverrides
    ): Promise<
      [BigNumber, BigNumber, BigNumber] & {
        amount0: BigNumber;
        amount1: BigNumber;
        totalLiquidity: BigNumber;
      }
    >;

    userPositions(
      tokenId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<
      [
        [
          BigNumber,
          string,
          BigNumber,
          BigNumber,
          BigNumber,
          BigNumber,
          BigNumber
        ] & {
          nonce: BigNumber;
          pool: string;
          liquidity: BigNumber;
          feeGrowth0: BigNumber;
          feeGrowth1: BigNumber;
          tokensOwed0: BigNumber;
          tokensOwed1: BigNumber;
        }
      ]
    >;

    withdraw(
      pilotToken: boolean,
      wethToken: boolean,
      liquidity: BigNumberish,
      tokenId: BigNumberish,
      data: BytesLike,
      overrides?: PayableOverrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;
  };

  collect(
    pilotToken: boolean,
    wethToken: boolean,
    tokenId: BigNumberish,
    data: BytesLike,
    overrides?: PayableOverrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  createPair(
    _token0: string,
    _token1: string,
    data: BytesLike,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  deposit(
    token0: string,
    token1: string,
    amount0Desired: BigNumberish,
    amount1Desired: BigNumberish,
    shares: BigNumberish,
    tokenId: BigNumberish,
    isTokenMinted: boolean,
    data: BytesLike,
    overrides?: PayableOverrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  emergencyExit(
    recipient: string,
    data: [
      BytesLike,
      BytesLike,
      BytesLike,
      BytesLike,
      BytesLike,
      BytesLike,
      BytesLike,
      BytesLike,
      BytesLike,
      BytesLike
    ],
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  getReserves(
    token0: string,
    token1: string,
    data: BytesLike,
    overrides?: CallOverrides
  ): Promise<
    [BigNumber, BigNumber, BigNumber] & {
      totalAmount0: BigNumber;
      totalAmount1: BigNumber;
      totalLiquidity: BigNumber;
    }
  >;

  getUserFees(
    tokenId: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  initialize(
    unipilot: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  poolPositions(
    pool: string,
    overrides?: CallOverrides
  ): Promise<
    [
      number,
      number,
      BigNumber,
      number,
      number,
      BigNumber,
      BigNumber,
      BigNumber,
      BigNumber,
      BigNumber,
      BigNumber,
      boolean,
      string,
      string,
      BigNumber,
      number,
      boolean,
      boolean
    ] & {
      baseTickLower: number;
      baseTickUpper: number;
      baseLiquidity: BigNumber;
      rangeTickLower: number;
      rangeTickUpper: number;
      rangeLiquidity: BigNumber;
      fees0: BigNumber;
      fees1: BigNumber;
      feeGrowthGlobal0: BigNumber;
      feeGrowthGlobal1: BigNumber;
      totalLiquidity: BigNumber;
      feesInPilot: boolean;
      oracle0: string;
      oracle1: string;
      timestamp: BigNumber;
      counter: number;
      status: boolean;
      managed: boolean;
    }
  >;

  readjustFrequencyStatus(
    pool: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  readjustLiquidity(
    token0: string,
    token1: string,
    fee: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  setPilotProtocolDetails(
    params: {
      swapPercentage: BigNumberish;
      swapPriceThreshold: BigNumberish;
      premium: BigNumberish;
      gasPriceLimit: BigNumberish;
      userPilotPercentage: BigNumberish;
      feesPercentageIndexFund: BigNumberish;
      pilotWethPair: string;
      oracle: string;
      indexFund: string;
      uniStrategy: string;
    },
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  setPoolIncentives(
    pool: string,
    feesInPilot_: boolean,
    managed_: boolean,
    oracle0: string,
    oracle1: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  shouldReadjust(
    pool: string,
    baseTickLower: BigNumberish,
    baseTickUpper: BigNumberish,
    overrides?: CallOverrides
  ): Promise<boolean>;

  uniswapV3MintCallback(
    amount0Owed: BigNumberish,
    amount1Owed: BigNumberish,
    data: BytesLike,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  uniswapV3SwapCallback(
    amount0Delta: BigNumberish,
    amount1Delta: BigNumberish,
    data: BytesLike,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  updatePositionTotalAmounts(
    _pool: string,
    overrides?: CallOverrides
  ): Promise<
    [BigNumber, BigNumber, BigNumber] & {
      amount0: BigNumber;
      amount1: BigNumber;
      totalLiquidity: BigNumber;
    }
  >;

  userPositions(
    tokenId: BigNumberish,
    overrides?: CallOverrides
  ): Promise<
    [
      BigNumber,
      string,
      BigNumber,
      BigNumber,
      BigNumber,
      BigNumber,
      BigNumber
    ] & {
      nonce: BigNumber;
      pool: string;
      liquidity: BigNumber;
      feeGrowth0: BigNumber;
      feeGrowth1: BigNumber;
      tokensOwed0: BigNumber;
      tokensOwed1: BigNumber;
    }
  >;

  withdraw(
    pilotToken: boolean,
    wethToken: boolean,
    liquidity: BigNumberish,
    tokenId: BigNumberish,
    data: BytesLike,
    overrides?: PayableOverrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  callStatic: {
    collect(
      pilotToken: boolean,
      wethToken: boolean,
      tokenId: BigNumberish,
      data: BytesLike,
      overrides?: CallOverrides
    ): Promise<void>;

    createPair(
      _token0: string,
      _token1: string,
      data: BytesLike,
      overrides?: CallOverrides
    ): Promise<string>;

    deposit(
      token0: string,
      token1: string,
      amount0Desired: BigNumberish,
      amount1Desired: BigNumberish,
      shares: BigNumberish,
      tokenId: BigNumberish,
      isTokenMinted: boolean,
      data: BytesLike,
      overrides?: CallOverrides
    ): Promise<void>;

    emergencyExit(
      recipient: string,
      data: [
        BytesLike,
        BytesLike,
        BytesLike,
        BytesLike,
        BytesLike,
        BytesLike,
        BytesLike,
        BytesLike,
        BytesLike,
        BytesLike
      ],
      overrides?: CallOverrides
    ): Promise<void>;

    getReserves(
      token0: string,
      token1: string,
      data: BytesLike,
      overrides?: CallOverrides
    ): Promise<
      [BigNumber, BigNumber, BigNumber] & {
        totalAmount0: BigNumber;
        totalAmount1: BigNumber;
        totalLiquidity: BigNumber;
      }
    >;

    getUserFees(
      tokenId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[BigNumber, BigNumber] & { fees0: BigNumber; fees1: BigNumber }>;

    initialize(unipilot: string, overrides?: CallOverrides): Promise<void>;

    poolPositions(
      pool: string,
      overrides?: CallOverrides
    ): Promise<
      [
        number,
        number,
        BigNumber,
        number,
        number,
        BigNumber,
        BigNumber,
        BigNumber,
        BigNumber,
        BigNumber,
        BigNumber,
        boolean,
        string,
        string,
        BigNumber,
        number,
        boolean,
        boolean
      ] & {
        baseTickLower: number;
        baseTickUpper: number;
        baseLiquidity: BigNumber;
        rangeTickLower: number;
        rangeTickUpper: number;
        rangeLiquidity: BigNumber;
        fees0: BigNumber;
        fees1: BigNumber;
        feeGrowthGlobal0: BigNumber;
        feeGrowthGlobal1: BigNumber;
        totalLiquidity: BigNumber;
        feesInPilot: boolean;
        oracle0: string;
        oracle1: string;
        timestamp: BigNumber;
        counter: number;
        status: boolean;
        managed: boolean;
      }
    >;

    readjustFrequencyStatus(
      pool: string,
      overrides?: CallOverrides
    ): Promise<boolean>;

    readjustLiquidity(
      token0: string,
      token1: string,
      fee: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    setPilotProtocolDetails(
      params: {
        swapPercentage: BigNumberish;
        swapPriceThreshold: BigNumberish;
        premium: BigNumberish;
        gasPriceLimit: BigNumberish;
        userPilotPercentage: BigNumberish;
        feesPercentageIndexFund: BigNumberish;
        pilotWethPair: string;
        oracle: string;
        indexFund: string;
        uniStrategy: string;
      },
      overrides?: CallOverrides
    ): Promise<void>;

    setPoolIncentives(
      pool: string,
      feesInPilot_: boolean,
      managed_: boolean,
      oracle0: string,
      oracle1: string,
      overrides?: CallOverrides
    ): Promise<void>;

    shouldReadjust(
      pool: string,
      baseTickLower: BigNumberish,
      baseTickUpper: BigNumberish,
      overrides?: CallOverrides
    ): Promise<boolean>;

    uniswapV3MintCallback(
      amount0Owed: BigNumberish,
      amount1Owed: BigNumberish,
      data: BytesLike,
      overrides?: CallOverrides
    ): Promise<void>;

    uniswapV3SwapCallback(
      amount0Delta: BigNumberish,
      amount1Delta: BigNumberish,
      data: BytesLike,
      overrides?: CallOverrides
    ): Promise<void>;

    updatePositionTotalAmounts(
      _pool: string,
      overrides?: CallOverrides
    ): Promise<
      [BigNumber, BigNumber, BigNumber] & {
        amount0: BigNumber;
        amount1: BigNumber;
        totalLiquidity: BigNumber;
      }
    >;

    userPositions(
      tokenId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<
      [
        BigNumber,
        string,
        BigNumber,
        BigNumber,
        BigNumber,
        BigNumber,
        BigNumber
      ] & {
        nonce: BigNumber;
        pool: string;
        liquidity: BigNumber;
        feeGrowth0: BigNumber;
        feeGrowth1: BigNumber;
        tokensOwed0: BigNumber;
        tokensOwed1: BigNumber;
      }
    >;

    withdraw(
      pilotToken: boolean,
      wethToken: boolean,
      liquidity: BigNumberish,
      tokenId: BigNumberish,
      data: BytesLike,
      overrides?: CallOverrides
    ): Promise<void>;
  };

  filters: {
    Collect(
      tokenId?: null,
      userAmount0?: null,
      userAmount1?: null,
      pilotAmount?: null,
      pool?: null,
      recipient?: null
    ): TypedEventFilter<
      [BigNumber, BigNumber, BigNumber, BigNumber, string, string],
      {
        tokenId: BigNumber;
        userAmount0: BigNumber;
        userAmount1: BigNumber;
        pilotAmount: BigNumber;
        pool: string;
        recipient: string;
      }
    >;

    Deposited(
      pool?: string | null,
      tokenId?: null,
      amount0?: null,
      amount1?: null,
      liquidity?: null
    ): TypedEventFilter<
      [string, BigNumber, BigNumber, BigNumber, BigNumber],
      {
        pool: string;
        tokenId: BigNumber;
        amount0: BigNumber;
        amount1: BigNumber;
        liquidity: BigNumber;
      }
    >;

    PoolCreated(
      token0?: string | null,
      token1?: string | null,
      pool?: string | null,
      fee?: null,
      sqrtPriceX96?: null
    ): TypedEventFilter<
      [string, string, string, number, BigNumber],
      {
        token0: string;
        token1: string;
        pool: string;
        fee: number;
        sqrtPriceX96: BigNumber;
      }
    >;

    PoolReajusted(
      pool?: null,
      baseLiquidity?: null,
      rangeLiquidity?: null,
      newBaseTickLower?: null,
      newBaseTickUpper?: null,
      newRangeTickLower?: null,
      newRangeTickUpper?: null
    ): TypedEventFilter<
      [string, BigNumber, BigNumber, number, number, number, number],
      {
        pool: string;
        baseLiquidity: BigNumber;
        rangeLiquidity: BigNumber;
        newBaseTickLower: number;
        newBaseTickUpper: number;
        newRangeTickLower: number;
        newRangeTickUpper: number;
      }
    >;

    Withdrawn(
      pool?: string | null,
      recipient?: string | null,
      tokenId?: null,
      amount0?: null,
      amount1?: null
    ): TypedEventFilter<
      [string, string, BigNumber, BigNumber, BigNumber],
      {
        pool: string;
        recipient: string;
        tokenId: BigNumber;
        amount0: BigNumber;
        amount1: BigNumber;
      }
    >;
  };

  estimateGas: {
    collect(
      pilotToken: boolean,
      wethToken: boolean,
      tokenId: BigNumberish,
      data: BytesLike,
      overrides?: PayableOverrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    createPair(
      _token0: string,
      _token1: string,
      data: BytesLike,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    deposit(
      token0: string,
      token1: string,
      amount0Desired: BigNumberish,
      amount1Desired: BigNumberish,
      shares: BigNumberish,
      tokenId: BigNumberish,
      isTokenMinted: boolean,
      data: BytesLike,
      overrides?: PayableOverrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    emergencyExit(
      recipient: string,
      data: [
        BytesLike,
        BytesLike,
        BytesLike,
        BytesLike,
        BytesLike,
        BytesLike,
        BytesLike,
        BytesLike,
        BytesLike,
        BytesLike
      ],
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    getReserves(
      token0: string,
      token1: string,
      data: BytesLike,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getUserFees(
      tokenId: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    initialize(
      unipilot: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    poolPositions(pool: string, overrides?: CallOverrides): Promise<BigNumber>;

    readjustFrequencyStatus(
      pool: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    readjustLiquidity(
      token0: string,
      token1: string,
      fee: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    setPilotProtocolDetails(
      params: {
        swapPercentage: BigNumberish;
        swapPriceThreshold: BigNumberish;
        premium: BigNumberish;
        gasPriceLimit: BigNumberish;
        userPilotPercentage: BigNumberish;
        feesPercentageIndexFund: BigNumberish;
        pilotWethPair: string;
        oracle: string;
        indexFund: string;
        uniStrategy: string;
      },
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    setPoolIncentives(
      pool: string,
      feesInPilot_: boolean,
      managed_: boolean,
      oracle0: string,
      oracle1: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    shouldReadjust(
      pool: string,
      baseTickLower: BigNumberish,
      baseTickUpper: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    uniswapV3MintCallback(
      amount0Owed: BigNumberish,
      amount1Owed: BigNumberish,
      data: BytesLike,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    uniswapV3SwapCallback(
      amount0Delta: BigNumberish,
      amount1Delta: BigNumberish,
      data: BytesLike,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    updatePositionTotalAmounts(
      _pool: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    userPositions(
      tokenId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    withdraw(
      pilotToken: boolean,
      wethToken: boolean,
      liquidity: BigNumberish,
      tokenId: BigNumberish,
      data: BytesLike,
      overrides?: PayableOverrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    collect(
      pilotToken: boolean,
      wethToken: boolean,
      tokenId: BigNumberish,
      data: BytesLike,
      overrides?: PayableOverrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    createPair(
      _token0: string,
      _token1: string,
      data: BytesLike,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    deposit(
      token0: string,
      token1: string,
      amount0Desired: BigNumberish,
      amount1Desired: BigNumberish,
      shares: BigNumberish,
      tokenId: BigNumberish,
      isTokenMinted: boolean,
      data: BytesLike,
      overrides?: PayableOverrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    emergencyExit(
      recipient: string,
      data: [
        BytesLike,
        BytesLike,
        BytesLike,
        BytesLike,
        BytesLike,
        BytesLike,
        BytesLike,
        BytesLike,
        BytesLike,
        BytesLike
      ],
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    getReserves(
      token0: string,
      token1: string,
      data: BytesLike,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getUserFees(
      tokenId: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    initialize(
      unipilot: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    poolPositions(
      pool: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    readjustFrequencyStatus(
      pool: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    readjustLiquidity(
      token0: string,
      token1: string,
      fee: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    setPilotProtocolDetails(
      params: {
        swapPercentage: BigNumberish;
        swapPriceThreshold: BigNumberish;
        premium: BigNumberish;
        gasPriceLimit: BigNumberish;
        userPilotPercentage: BigNumberish;
        feesPercentageIndexFund: BigNumberish;
        pilotWethPair: string;
        oracle: string;
        indexFund: string;
        uniStrategy: string;
      },
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    setPoolIncentives(
      pool: string,
      feesInPilot_: boolean,
      managed_: boolean,
      oracle0: string,
      oracle1: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    shouldReadjust(
      pool: string,
      baseTickLower: BigNumberish,
      baseTickUpper: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    uniswapV3MintCallback(
      amount0Owed: BigNumberish,
      amount1Owed: BigNumberish,
      data: BytesLike,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    uniswapV3SwapCallback(
      amount0Delta: BigNumberish,
      amount1Delta: BigNumberish,
      data: BytesLike,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    updatePositionTotalAmounts(
      _pool: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    userPositions(
      tokenId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    withdraw(
      pilotToken: boolean,
      wethToken: boolean,
      liquidity: BigNumberish,
      tokenId: BigNumberish,
      data: BytesLike,
      overrides?: PayableOverrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;
  };
}
