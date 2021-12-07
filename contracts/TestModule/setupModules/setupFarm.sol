// SPDX-License-Identifier: MIT
pragma solidity 0.7.6;
pragma abicoder v2;

import "../../UnipilotFarm.sol";
import "../../test/TestERC20.sol";

contract SetupUnipilotFarm{
    UnipilotFarm public farming;

    constructor(address _ulm, address _gov) {
        farming = new UnipilotFarm(_ulm, _gov);
    }

    // ==============================================FARMER BOI================================================
    
    function callFarming() public {
        farming.depositNFT(1);
    }

}