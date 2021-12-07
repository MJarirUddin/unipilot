// SPDX-License-Identifier: GPL-3.0-or-later
pragma solidity =0.7.6;

import "contracts/TestModule/setupModules/setupFarm.sol";
import "contracts/TestModule/setupModules/setupMock.sol";

contract DappFarm {
    SetupMock public mock;
    SetupUnipilotFarm public farm;

    constructor() {
        farm = new SetupUnipilotFarm(address(mock.ulm()), address(mock.governance()));
    }

    // Write Props, tests below
}

