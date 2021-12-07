#!/usr/bin/env bash

# Make dependencies available
export DAPP_REMAPPINGS=$(cat remappings.txt)
export DAPP_SOLC_VERSION=0.7.6

# If you're getting an "invalid character at offset" error, comment this out.
export DAPP_LINK_TEST_LIBRARIES=0
export DAPP_TEST_VERBOSITY=1
export DAPP_TEST_SMTTIMEOUT=500000

# Optimize your contracts before deploying to reduce runtime execution costs.
export DAPP_BUILD_OPTIMIZE=1
export DAPP_BUILD_OPTIMIZE_RUNS=1000000

# set so that we can deploy to local node w/o hosted private keys
export ETH_FROM=0xd1C0aa007067FDf5dbb2B42BCbFBF669F9Cc046C
export ETH_RPC_ACCOUNTS=true
export ETH_RPC_URL=http://127.0.0.1:8545
# export ETH_RPC_URL=https://eth-mainnet.alchemyapi.io/v2/o6UPhlAxnMIrCOpJrOFEcj_kFOciOJFY

# tweaking hevm gas price, probably;
export ETH_GAS=0x1fffffffffffff
export ETH_GAS_PRICE=0

# setting DappMock.sol main contract as wrapper
export DAPP_MOCKER=0xb1b7986dc747C94762baCf1940F9fF9e8c7e04b4

# dapp test --rpc

#Calls with dapp/seth to deploy a contract; failed at gasPrice setting for dapp hevm; need a workaround asap ⚠️
seth send $DAPP_MOCKER "callCreatePair()" --async
# dapp create DappMock --rpc 

# if [ "$DEEP_FUZZ" == "true" ]
# then 
#   export DAPP_TEST_FUZZ_RUNS=100000 # Fuzz for a long time if DEEP_FUZZ is set to true.
# else
#   export DAPP_TEST_FUZZ_RUNS=100 # Only fuzz briefly if DEEP_FUZZ is not set to true.
# fi