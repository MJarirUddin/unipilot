// SPDX-License-Identifier: GPL-3.0-or-later
pragma solidity =0.7.6;

import "./DappMock.sol";
import "../lib/ds-test/src/test.sol";
import "./hevm.sol";

contract DappTest is DSTest {
    DappMock private dapp;    
    Hevm private hevm;
    bool private inited;
    address public pool;

    function setUp() public {
        dapp = DappMock(0xb1b7986dc747C94762baCf1940F9fF9e8c7e04b4);
        hevm = Hevm(0x7109709ECfa91a80626fF3989D68f67F5b1DD12D);
    }

    // function testCreatePair() public {
    //     pool = dapp.callCreatePair();
    //     assertTrue(true, "ulm create_pair failing!");
    // }

    function testUnipilotDeposit() public {
        dapp.callDeposit();
        assertTrue(true, "unipilot deposit failing!");
    }

    function test_basic_sanity() public {
        uint256 lastTime = block.timestamp;
        bool isWarped = block.timestamp > lastTime;
        assertTrue(!isWarped);
    }

    function test_can_time_travel() public {
        uint256 lastTime = block.timestamp;

        hevm.warp(lastTime + 500);

        bool isWarped = block.timestamp > lastTime;

        assertTrue(isWarped);
    }

    // function testBalances() public {
    //     uint256 bal0 = dapp.tokens().getToken0BalanceOf(pool);
    //     assertTrue(bal0!=0,"failing balance test");
    // }

}
