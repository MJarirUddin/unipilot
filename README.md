# Unipilot Dapptools

## Usage

### Pre Requisites


Before running any command, create a .env file with following syntax in root directory;

```sh
MNEMONIC=askjfnlkmvalmewvm
INFURA_API_KEY=alfmdsfldnvgla
```

Now make sure to install dependencies for hardhat compilation:


```sh
$ yarn install
```

### Compile

Compile the smart contracts with Hardhat:

```sh
$ yarn compile
```

### Test

Test the smart contracts with Hardhat:

1- Up the hardhat node
```sh
$ npx hardhat node
```

2- Run a simple test
```sh
$ npx hardhat test test/E2E.ts --network develop
```

### Setup for dapp tools and Uniswap V3

After following all of the above steps, run the following commands;

```sh
$ dapp testnet
```

```sh
$ npx hardhat deploy-uniswap --network develop
```
