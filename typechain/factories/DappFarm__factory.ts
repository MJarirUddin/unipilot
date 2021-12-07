/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type { DappFarm, DappFarmInterface } from "../DappFarm";

const _abi = [
  {
    inputs: [],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [],
    name: "farm",
    outputs: [
      {
        internalType: "contract SetupUnipilotFarm",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "mock",
    outputs: [
      {
        internalType: "contract SetupMock",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];

const _bytecode =
  "0x608060405234801561001057600080fd5b5060008054906101000a90046001600160a01b03166001600160a01b03166355bde9e36040518163ffffffff1660e01b815260040160206040518083038186803b15801561005d57600080fd5b505afa158015610071573d6000803e3d6000fd5b505050506040513d602081101561008757600080fd5b505160005460408051635aa6e67560e01b815290516001600160a01b0390921691635aa6e67591600480820192602092909190829003018186803b1580156100ce57600080fd5b505afa1580156100e2573d6000803e3d6000fd5b505050506040513d60208110156100f857600080fd5b50516040516101069061015f565b6001600160a01b03928316815291166020820152604080519182900301906000f080158015610139573d6000803e3d6000fd5b50600180546001600160a01b0319166001600160a01b039290921691909117905561016c565b613c8f8061022b83390190565b60b18061017a6000396000f3fe6080604052348015600f57600080fd5b506004361060325760003560e01c806336e9332d146037578063e543804a146066575b600080fd5b603d606c565b6040805173ffffffffffffffffffffffffffffffffffffffff9092168252519081900360200190f35b603d6088565b60015473ffffffffffffffffffffffffffffffffffffffff1681565b60005473ffffffffffffffffffffffffffffffffffffffff168156fea164736f6c6343000706000a608060405234801561001057600080fd5b50604051613c8f380380613c8f83398101604081905261002f916100b6565b818160405161003d9061008d565b6100489291906100e8565b604051809103906000f080158015610064573d6000803e3d6000fd5b50600080546001600160a01b0319166001600160a01b0392909216919091179055506101029050565b613a0e8061028183390190565b80516001600160a01b03811681146100b157600080fd5b919050565b600080604083850312156100c8578182fd5b6100d18361009a565b91506100df6020840161009a565b90509250929050565b6001600160a01b0392831681529116602082015260400190565b610170806101116000396000f3fe608060405234801561001057600080fd5b50600436106100365760003560e01c80634e3ad80f1461003b578063beaea4bb14610059575b600080fd5b610043610063565b6040516100509190610139565b60405180910390f35b61006161007f565b005b60005473ffffffffffffffffffffffffffffffffffffffff1681565b60005460405163748d3e5360e11b815273ffffffffffffffffffffffffffffffffffffffff9091169063e91a7ca6906100bd9060019060040161015a565b602060405180830381600087803b1580156100d757600080fd5b505af11580156100eb573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061010f9190610112565b50565b600060208284031215610123578081fd5b81518015158114610132578182fd5b9392505050565b73ffffffffffffffffffffffffffffffffffffffff91909116815260200190565b9081526020019056fea164736f6c6343000706000a60806040526000805460ff19166001179055670de0b6b3a7640000600c553480156200002a57600080fd5b5060405162003a0e38038062003a0e8339810160408190526200004d91620000af565b600980546001600160a01b03199081166001600160a01b039384161790915560088054600160a01b9216939092169290921760ff60a01b1916919091179055620000e6565b80516001600160a01b0381168114620000aa57600080fd5b919050565b60008060408385031215620000c2578182fd5b620000cd8362000092565b9150620000dd6020840162000092565b90509250929050565b61391880620000f66000396000f3fe6080604052600436106101e75760003560e01c80638a46311b11610102578063de03618611610095578063e91a7ca611610064578063e91a7ca6146105cd578063ef0b0a93146105ed578063f681581014610602578063fe78434a14610622576101ee565b8063de0361861461054a578063e0059c3d14610578578063e114d9bd14610598578063e6d1c428146105b8576101ee565b8063a48f3947116100d1578063a48f3947146104d5578063b2eb0097146104f5578063d2f9345f14610515578063d980811b14610535576101ee565b80638a46311b146104425780639a7b5f11146104625780639b26acca146104955780639eb85b70146104b5576101ee565b80634e046fec1161017a57806369f345501161014957806369f34550146103cd5780636a1af137146103ed57806376894f4c1461040d5780638017920914610422576101ee565b80634e046fec1461034557806351d70bc41461035a578063523a3f081461038b5780635aa6e675146103ab576101ee565b806326025674116101b657806326025674146102a85780632b09b4fd146102c857806349453e3e146102f85780634c70179d14610318576101ee565b8063023245d7146101f35780630e39aac914610215578063150b7a021461024b578063162c635814610278576101ee565b366101ee57005b600080fd5b3480156101ff57600080fd5b5061021361020e366004613384565b610642565b005b34801561022157600080fd5b50610235610230366004612f81565b610813565b604051610242919061379a565b60405180910390f35b34801561025757600080fd5b5061026b610266366004612fc1565b610851565b60405161024291906135bf565b34801561028457600080fd5b50610298610293366004612f11565b610861565b60405161024294939291906134ea565b3480156102b457600080fd5b506102136102c3366004612f11565b610892565b3480156102d457600080fd5b506102e86102e3366004613384565b610922565b60405161024294939291906137f1565b34801561030457600080fd5b506102136103133660046130e5565b610b02565b34801561032457600080fd5b50610338610333366004612f11565b610c1a565b604051610242919061357b565b34801561035157600080fd5b50610338610c2f565b34801561036657600080fd5b5061037a610375366004613384565b610c3f565b604051610242959493929190613495565b34801561039757600080fd5b506102136103a6366004613384565b610c7a565b3480156103b757600080fd5b506103c0610f5b565b60405161024291906133b4565b3480156103d957600080fd5b506102136103e8366004612f49565b610f6a565b3480156103f957600080fd5b50610213610408366004613384565b611094565b34801561041957600080fd5b50610235611227565b34801561042e57600080fd5b5061033861043d366004613384565b61122d565b34801561044e57600080fd5b5061033861045d366004612f11565b611242565b34801561046e57600080fd5b5061048261047d366004612f11565b61139b565b604051610242979695949392919061380c565b3480156104a157600080fd5b506102136104b0366004612f81565b6113dc565b3480156104c157600080fd5b506103386104d0366004613384565b611480565b3480156104e157600080fd5b506102136104f0366004613118565b611495565b34801561050157600080fd5b506103c0610510366004613384565b6115ff565b34801561052157600080fd5b50610213610530366004612f11565b611629565b34801561054157600080fd5b50610235611707565b34801561055657600080fd5b5061056a610565366004612f49565b61170d565b6040516102429291906137a3565b34801561058457600080fd5b50610213610593366004613077565b61178c565b3480156105a457600080fd5b506102356105b33660046130a2565b611820565b3480156105c457600080fd5b50610213611885565b3480156105d957600080fd5b506103386105e8366004613384565b61192a565b3480156105f957600080fd5b50610235611ebb565b34801561060e57600080fd5b5061021361061d366004613384565b611ec1565b34801561062e57600080fd5b5061021361063d366004613384565b611f42565b600081815260066020908152604080832080546001600160a01b03168452600483528184206005909352922061067784610c7a565b6001830154600383015461068a9161207f565b6003830155604051632142170760e11b815273de5bf92e3372aa59c73ca7dfc6cec599e1b2b08c906342842e0e906106ca903090339089906004016133c8565b600060405180830381600087803b1580156106e457600080fd5b505af11580156106f8573d6000803e3d6000fd5b505050600085815260026020819052604091829020805460ff19169055855490860154600386015492517f0127a8d3f57942833f6930572bce52ad882683e36eeb5830d199d3fa4bfa94679450610760936001600160a01b039384169390921691899161340f565b60405180910390a160038201546107985743808355600280840182905560006001808601829055840183905560038401929092558201555b82546000906107b0906001600160a01b0316866120e1565b600285015485549192506107d29183916001600160a01b0390811691166121b1565b50505060009182525060066020526040812080546001600160a01b031990811682556001820183905560028201805490911690556003810182905560040155565b6007602052826000526040600020602052816000526040600020818154811061083b57600080fd5b9060005260206000200160009250925050505481565b630a85bd0160e11b949350505050565b60056020526000908152604090208054600182015460028301546003909301546001600160a01b0390921692909184565b6009546001600160a01b031633146108c55760405162461bcd60e51b81526004016108bc90613729565b60405180910390fd5b600880546001600160a01b038381166001600160a01b03198316179092556040517fa4e6f4790d4cd79f956a51c215b32692961c2b48ee9ad20ecdedc83896ec092492610917921690849042906133c8565b60405180910390a150565b6000818152600660209081526040808320815160a0808201845282546001600160a01b03908116808452600180860154858901526002808701548416868901526003808801546060808901919091526004988901546080808a0191909152948c52888b52898c208a5160e081018c528154815281860154818e015281850154818d01528184015481840152998101548a87015260059081015460ff8082161515998c019990995261010090048816151560c08b0152885187168d528b52898c208a519586018b528054909616855292850154998401999099528301549682019690965295015493850193909352600854859485948594928591600160a01b9091041615610a6057610a3389826122c5565b96508260c0015115610a5357506001610a4c89826122c5565b9550610a5b565b816040015195505b610a6f565b82602001519650816040015195505b6000610a8885606001518961207f90919063ffffffff16565b9050610ab3670de0b6b3a7640000610aad87602001518461244f90919063ffffffff16565b906124af565b98506000610ace86608001518961207f90919063ffffffff16565b9050610af3670de0b6b3a7640000610aad88602001518461244f90919063ffffffff16565b96505050505050509193509193565b6009546001600160a01b03163314610b2c5760405162461bcd60e51b81526004016108bc90613729565b60005b8151811015610c1657600060036000848481518110610b4a57fe5b60200260200101516001600160a01b03166001600160a01b0316815260200190815260200160002060006101000a81548160ff0219169083151502179055507f2e365bdf4a1a6d9b98e84b7ccacb5f206df07655ede46e439a9c224e7e2204cb828281518110610bb657fe5b602002602001015160036000858581518110610bce57fe5b6020908102919091018101516001600160a01b031682528101919091526040908101600020549051610c06929160ff1690429061345b565b60405180910390a1600101610b2f565b5050565b60036020526000908152604090205460ff1681565b600854600160a01b900460ff1681565b600660205260009081526040902080546001820154600283015460038401546004909401546001600160a01b03938416949293909116919085565b60005460ff16600114610cd4576040805162461bcd60e51b815260206004820152601f60248201527f5265656e7472616e637947756172643a207265656e7472616e742063616c6c00604482015290519081900360640190fd5b6000805460ff19168155818152600660209081526040808320546001600160a01b031680845260049092529091206005015460ff16610d255760405162461bcd60e51b81526004016108bc9061365f565b600082815260066020908152604080832080546001600160a01b0390811685526004909352922060028301549091163314610d725760405162461bcd60e51b81526004016108bc906135ec565b81546001600160a01b031660009081526003602052604090205460ff16610dab5760405162461bcd60e51b81526004016108bc90613698565b600080600080610dba88610922565b6040516370a0823160e01b81529397509195509350915084907337c997b35c619c21323f3518b9357914e8b99525906370a0823190610dfd9030906004016133b4565b60206040518083038186803b158015610e1557600080fd5b505afa158015610e29573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610e4d919061339c565b1015610e6b5760405162461bcd60e51b81526004016108bc906136b6565b600185018390554360028087019190915560038701849055600b80548601905560008981526006602052604090200154610ec4907337c997b35c619c21323f3518b9357914e8b99525906001600160a01b031686612516565b6005850154610100900460ff1615610ee157610ee188838361257d565b85546001808801546003808a015492890154908901546040517f9b9d8da5d27dfe5549281e1b4073cb0efb18290496c0a8a02f79bb6f78b949f895610f3c956001600160a01b03909116948f94909391929091908c90613540565b60405180910390a150506000805460ff19166001179055505050505050565b6009546001600160a01b031681565b6009546001600160a01b03163314610f945760405162461bcd60e51b81526004016108bc90613729565b6001600160a01b038083166000908152600560205260409081902080548484166001600160a01b031982161790915590517fa0e4b2e70e75682ac0a14798ed92d56cdfc25f23b3a1a4868b6a89ebf89776a492610ff6921690849086906133ec565b60405180910390a1506001600160a01b0390811660008181526005602081815260408084208151608080820184528254808a1680845260018501805485890152600286018054868901526003870180546060978801528851958601895292855243858a018181529886018c81529686019081529b909a529790965290516001600160a01b031990911698169790971790555190915592519055519055565b6009546001600160a01b031633146110be5760405162461bcd60e51b81526004016108bc90613729565b6000600180548060200260200160405190810160405280929190818152602001828054801561111657602002820191906000526020600020905b81546001600160a01b031681526001909101906020018083116110f8575b5050505050905081600c8190555060005b8151811015611222576003600083838151811061114057fe5b6020908102919091018101516001600160a01b031682528101919091526040016000205460ff161561121a576004600083838151811061117c57fe5b60200260200101516001600160a01b03166001600160a01b03168152602001908152602001600020600301546000146111cb576111cb8282815181106111be57fe5b602002602001015161267f565b7f0756a8fb33d6a153eb3423590c4d7dc627b5be8291070abc6f198434edc2ad1f8282815181106111f857fe5b6020026020010151600c5460405161121192919061347c565b60405180910390a15b600101611127565b505050565b600b5481565b60026020526000908152604090205460ff1681565b6009546000906001600160a01b0316331461126f5760405162461bcd60e51b81526004016108bc90613729565b6001600160a01b03828116600090815260056020526040902054166112a65760405162461bcd60e51b81526004016108bc90613642565b6001600160a01b03821660009081526004602052604090819020600501805461ff001981166101009182900460ff1680159283029190911790925591517f9428b14715fa506a37634b78e263b6993d22ed1389aead8ae8edcbfd77b125ca9261131192918690613586565b60405180910390a16001600160a01b038216600090815260046020526040902060050154610100900460ff16156113505761134b826126e0565b611370565b6001600160a01b0382166000908152600560205260409020436003909101555b506001600160a01b038116600090815260046020526040902060050154610100900460ff165b919050565b600460208190526000918252604090912080546001820154600283015460038401549484015460059094015492949193909260ff8082169161010090041687565b6009546001600160a01b031633146114065760405162461bcd60e51b81526004016108bc90613729565b6001600160a01b03831661142c5760405162461bcd60e51b81526004016108bc90613608565b6114406001600160a01b0383168483612516565b7f77e495c0e82622b2e795fb14f2a956e1dd14664ea8dbc629c12f4859b416aaea838383604051611473939291906133c8565b60405180910390a1505050565b60009081526002602052604090205460ff1690565b6009546001600160a01b031633146114bf5760405162461bcd60e51b81526004016108bc90613729565b80518251146114e05760405162461bcd60e51b81526004016108bc9061370c565b60005b825181101561122257600360008483815181106114fc57fe5b6020908102919091018101516001600160a01b031682528101919091526040016000205460ff1615801561156b57506004600084838151811061153b57fe5b60200260200101516001600160a01b03166001600160a01b03168152602001908152602001600020600301546000145b156115a5576115a083828151811061157f57fe5b602002602001015183838151811061159357fe5b6020026020010151612763565b6115f7565b6001600360008584815181106115b757fe5b60200260200101516001600160a01b03166001600160a01b0316815260200190815260200160002060006101000a81548160ff0219169083151502179055505b6001016114e3565b6001818154811061160f57600080fd5b6000918252602090912001546001600160a01b0316905081565b6009546001600160a01b031633146116535760405162461bcd60e51b81526004016108bc90613729565b6001600160a01b03811660009081526004602052604090206005015460ff1615611685576116808161267f565b6116a5565b6001600160a01b0381166000908152600460205260409020436002909101555b6001600160a01b03811660009081526004602052604090819020600501805460ff8116801560ff19909216821790925591517f7d12eea0e5cab2f6a32b807301c1caffeb338666dbde5f1810ab8c4f85e32f8e92610917928592909190613438565b600c5481565b6001600160a01b038281166000908152600760209081526040808320938516835292815290829020805483518184028101840190945280845292606092909190849083018282801561177e57602002820191906000526020600020905b81548152602001906001019080831161176a575b505050505090509250929050565b6009546001600160a01b031633146117b65760405162461bcd60e51b81526004016108bc90613729565b6117bf8261267f565b6001600160a01b0382166000908152600460208190526040918290200180549083905590517fe346bcf94febb1a9b3532044446578f42556fca15e448581e3cceebef069ec48916118149185919085906134c9565b60405180910390a15050565b6000806118368585670de0b6b3a76400006129ae565b905061187a83611874611849898561244f565b6001600160a01b038b16600090815260046020526040902060030154670de0b6b3a7640000906129ae565b90612a5d565b979650505050505050565b6009546001600160a01b031633146118af5760405162461bcd60e51b81526004016108bc90613729565b600880547fffffffffffffffffffffff00ffffffffffffffffffffffffffffffffffffffff8116600160a01b9182900460ff168015928302919091179092556040517fe3124efa4603876b183777db0e9f8f4e39b40c6bb3fc4d52e3bb6775e749b1f99261192092909142906135a7565b60405180910390a1565b600854600090600160a01b900460ff166119565760405162461bcd60e51b81526004016108bc90613761565b600a54156119765760405162461bcd60e51b81526004016108bc90613745565b6040516331a9108f60e11b81528290339073de5bf92e3372aa59c73ca7dfc6cec599e1b2b08c90636352211e906119b190859060040161379a565b60206040518083038186803b1580156119c957600080fd5b505afa1580156119dd573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190611a019190612f2d565b6001600160a01b031614611a275760405162461bcd60e51b81526004016108bc906135ec565b6008546040516301e7f13760e41b815233916000916001600160a01b0390911690631e7f137090611a5c90889060040161379a565b60e06040518083038186803b158015611a7457600080fd5b505afa158015611a88573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190611aac9190613302565b6020808201516040808401516001600160a01b038316600090815260039094529220549293509160ff16611af25760405162461bcd60e51b81526004016108bc906136d2565b6008546040516335dca70360e01b81526000916001600160a01b0316906335dca70390611b239086906004016133b4565b6102406040518083038186803b158015611b3c57600080fd5b505afa158015611b50573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190611b7491906131d1565b610140810151909150828110801590611b8d5750600083115b611ba95760405162461bcd60e51b81526004016108bc9061377e565b6001600160a01b03841660009081526004602052604090208054600282015414611c06576000611be682600201544361207f90919063ffffffff16565b9050611bff8682600c5485600401548660010154611820565b6001830155505b6003810154611c159085612a5d565b81600301819055506040518060a00160405280866001600160a01b03168152602001858152602001886001600160a01b0316815260200182600101548152602001600660008d815260200190815260200160002060040154815250600660008c815260200190815260200160002060008201518160000160006101000a8154816001600160a01b0302191690836001600160a01b031602179055506020820151816001015560408201518160020160006101000a8154816001600160a01b0302191690836001600160a01b03160217905550606082015181600301556080820151816004015590505060076000886001600160a01b03166001600160a01b031681526020019081526020016000206000866001600160a01b03166001600160a01b031681526020019081526020016000208a90806001815401808255809150506001900390600052602060002001600090919091909150556001600260008c815260200190815260200160002060006101000a81548160ff02191690831515021790555073de5bf92e3372aa59c73ca7dfc6cec599e1b2b08c6001600160a01b03166342842e0e88308d6040518463ffffffff1660e01b8152600401611ddd939291906133c8565b600060405180830381600087803b158015611df757600080fd5b505af1158015611e0b573d6000803e3d6000fd5b505050506005810154610100900460ff1615611e2b57611e2b858b612ab7565b4381600201819055507f55e1b84deec6eefe49c2c96afe1d5b43ca37768907f7388696c6009e7bbe3b54858b600660008e815260200190815260200160002060010154846003015485600101548660040154600c54604051611e939796959493929190613540565b60405180910390a1505050600096875250506002602052505060409092205460ff1692915050565b600a5481565b6009546001600160a01b03163314611eeb5760405162461bcd60e51b81526004016108bc90613729565b438111611f0a5760405162461bcd60e51b81526004016108bc9061367c565b7fd92c3464a10ecea59217f3d2d1a916160b75f798612beba0674f7d15572d1fdd600a5482600a8190556040516109179291906137e3565b600081815260066020526040902060028101546001600160a01b03163314611f7c5760405162461bcd60e51b81526004016108bc90613625565b80546001600160a01b03166000908152600460209081526040808320600590925290912060018301546003830154611fb39161207f565b60038301556002830154604051632142170760e11b815273de5bf92e3372aa59c73ca7dfc6cec599e1b2b08c916342842e0e916120029130916001600160a01b039091169089906004016133c8565b600060405180830381600087803b15801561201c57600080fd5b505af1158015612030573d6000803e3d6000fd5b5050505081600301546000141561079857438083556002808401829055600060018086018290558401839055600384019290925582015582546000906107b0906001600160a01b0316866120e1565b6000828211156120d6576040805162461bcd60e51b815260206004820152601e60248201527f536166654d6174683a207375627472616374696f6e206f766572666c6f770000604482015290519081900360640190fd5b508082035b92915050565b3360009081526007602090815260408083206001600160a01b038616845282528083208054825181850281018501909352808352849383018282801561214657602002820191906000526020600020905b815481526020019060010190808311612132575b5050505050905060005b815181116121a9573360009081526007602090815260408083206001600160a01b0389168452909152902080548290811061218757fe5b90600052602060002001548414156121a1578092506121a9565b600101612150565b505092915050565b6001600160a01b0380831660009081526007602090815260408083209385168352929052205483106121f55760405162461bcd60e51b81526004016108bc906136ef565b6001600160a01b0382811660009081526007602090815260408083209385168352929052908120805461222990600161207f565b8154811061223357fe5b60009182526020808320909101546001600160a01b038087168452600783526040808520918716855292529120805491925082918690811061227157fe5b60009182526020808320909101929092556001600160a01b03808616825260078352604080832091861683529252208054806122a957fe5b6001900381819060005260206000200160009055905550505050565b6000828152600660205260408120546001600160a01b03166122e5612e1d565b60008460018111156122f357fe5b14156123435750604080516060810182526001600160a01b0383166000818152600460208181528583206001810154865260028101548287015293909252908190520154918101919091526123a0565b600184600181111561235157fe5b14156123a05750604080516060810182526001600160a01b0383166000818152600560209081528482206002810154855260030154818501529181526004918290528390200154918101919091525b600a5481602001511080156123b65750600a5443115b156123ee576123e7826123d88360200151600a5461207f90919063ffffffff16565b600c5460408501518551611820565b92506121a9565b600a54816020015111801561240557506000600a54115b1561241357805192506121a9565b600061242c82602001514361207f90919063ffffffff16565b90506124458382600c5485604001518660000151611820565b9695505050505050565b60008261245e575060006120db565b8282028284828161246b57fe5b04146124a85760405162461bcd60e51b81526004018080602001828103825260218152602001806138c16021913960400191505060405180910390fd5b9392505050565b6000808211612505576040805162461bcd60e51b815260206004820152601a60248201527f536166654d6174683a206469766973696f6e206279207a65726f000000000000604482015290519081900360640190fd5b81838161250e57fe5b049392505050565b604080516001600160a01b038416602482015260448082018490528251808303909101815260649091019091526020810180517bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1663a9059cbb60e01b179052611222908490612b5b565b6000838152600660209081526040808320546001600160a01b039081168452600590925291829020805492516370a0823160e01b81529092849216906370a08231906125cd9030906004016133b4565b60206040518083038186803b1580156125e557600080fd5b505afa1580156125f9573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061261d919061339c565b101561263b5760405162461bcd60e51b81526004016108bc906136b6565b436003820155600280820184905560008581526006602052604090206004810185905501548154612679916001600160a01b03918216911684612516565b50505050565b6001600160a01b0381166000908152600460205260409020600381015415610c165760006126d0836126be84600201544361207f90919063ffffffff16565b600c5485600401548660010154611820565b6001830155504360028201555050565b6001600160a01b038116600090815260056020908152604080832060049092529091206003015415610c165760006127538361272984600301544361207f90919063ffffffff16565b600c546001600160a01b038716600090815260046020819052604090912001546002870154611820565b6002830155504360038201555050565b600160036000846001600160a01b03166001600160a01b0316815260200190815260200160002060006101000a81548160ff0219169083151502179055506001829080600181540180825580915050600190039060005260206000200160009091909190916101000a8154816001600160a01b0302191690836001600160a01b031602179055506040518060e00160405280438152602001600081526020014381526020016000815260200182815260200160011515815260200160046000856001600160a01b03166001600160a01b0316815260200190815260200160002060050160019054906101000a900460ff16151581525060046000846001600160a01b03166001600160a01b03168152602001908152602001600020600082015181600001556020820151816001015560408201518160020155606082015181600301556080820151816004015560a08201518160050160006101000a81548160ff02191690831515021790555060c08201518160050160016101000a81548160ff0219169083151502179055509050507f0314a127947f2a3f74d5ee6c05752242c48803b68534b577cfd35c81d06fccfb82600c5460046000866001600160a01b03166001600160a01b031681526020019081526020016000206004015460046000876001600160a01b03166001600160a01b031681526020019081526020016000206002015460036000886001600160a01b03166001600160a01b0316815260200190815260200160002060009054906101000a900460ff16604051611814959493929190613510565b60008080600019858709868602925082811090839003039050806129e457600084116129d957600080fd5b5082900490506124a8565b8084116129f057600080fd5b6000848688096000868103871696879004966002600389028118808a02820302808a02820302808a02820302808a02820302808a02820302808a02909103029181900381900460010186841190950394909402919094039290920491909117919091029150509392505050565b6000828201838110156124a8576040805162461bcd60e51b815260206004820152601b60248201527f536166654d6174683a206164646974696f6e206f766572666c6f770000000000604482015290519081900360640190fd5b6001600160a01b03821660009081526005602052604090206001810154600382015414612b3b576000612af782600301544361207f90919063ffffffff16565b9050612b348482600c5460046000896001600160a01b03166001600160a01b03168152602001908152602001600020600401548660020154611820565b6002830155505b436003820155600201546000918252600660205260409091206004015550565b6000612bb0826040518060400160405280602081526020017f5361666545524332303a206c6f772d6c6576656c2063616c6c206661696c6564815250856001600160a01b0316612c0c9092919063ffffffff16565b80519091501561122257808060200190516020811015612bcf57600080fd5b50516112225760405162461bcd60e51b815260040180806020018281038252602a8152602001806138e2602a913960400191505060405180910390fd5b6060612c1b8484600085612c23565b949350505050565b606082471015612c645760405162461bcd60e51b815260040180806020018281038252602681526020018061389b6026913960400191505060405180910390fd5b612c6d85612d73565b612cbe576040805162461bcd60e51b815260206004820152601d60248201527f416464726573733a2063616c6c20746f206e6f6e2d636f6e7472616374000000604482015290519081900360640190fd5b600080866001600160a01b031685876040518082805190602001908083835b60208310612cfc5780518252601f199092019160209182019101612cdd565b6001836020036101000a03801982511681845116808217855250505050505090500191505060006040518083038185875af1925050503d8060008114612d5e576040519150601f19603f3d011682016040523d82523d6000602084013e612d63565b606091505b509150915061187a828286612d79565b3b151590565b60608315612d885750816124a8565b825115612d985782518084602001fd5b8160405162461bcd60e51b81526004018080602001828103825283818151815260200191508051906020019080838360005b83811015612de2578181015183820152602001612dca565b50505050905090810190601f168015612e0f5780820380516001836020036101000a031916815260200191505b509250505060405180910390fd5b60405180606001604052806000815260200160008152602001600081525090565b805161139681613882565b600082601f830112612e59578081fd5b81356020612e6e612e6983613864565b613840565b8281528181019085830183850287018401881015612e8a578586fd5b855b85811015612eb1578135612e9f81613882565b84529284019290840190600101612e8c565b5090979650505050505050565b8051801515811461139657600080fd5b8051600281900b811461139657600080fd5b80516fffffffffffffffffffffffffffffffff8116811461139657600080fd5b805160ff8116811461139657600080fd5b600060208284031215612f22578081fd5b81356124a881613882565b600060208284031215612f3e578081fd5b81516124a881613882565b60008060408385031215612f5b578081fd5b8235612f6681613882565b91506020830135612f7681613882565b809150509250929050565b600080600060608486031215612f95578081fd5b8335612fa081613882565b92506020840135612fb081613882565b929592945050506040919091013590565b60008060008060808587031215612fd6578182fd5b8435612fe181613882565b9350602085810135612ff281613882565b935060408601359250606086013567ffffffffffffffff80821115613015578384fd5b818801915088601f830112613028578384fd5b81358181111561303457fe5b613046601f8201601f19168501613840565b9150808252898482850101111561305b578485fd5b8084840185840137810190920192909252939692955090935050565b60008060408385031215613089578182fd5b823561309481613882565b946020939093013593505050565b600080600080600060a086880312156130b9578283fd5b85356130c481613882565b97602087013597506040870135966060810135965060800135945092505050565b6000602082840312156130f6578081fd5b813567ffffffffffffffff81111561310c578182fd5b612c1b84828501612e49565b6000806040838503121561312a578182fd5b823567ffffffffffffffff80821115613141578384fd5b61314d86838701612e49565b9350602091508185013581811115613163578384fd5b85019050601f81018613613175578283fd5b8035613183612e6982613864565b81815283810190838501858402850186018a101561319f578687fd5b8694505b838510156131c15780358352600194909401939185019185016131a3565b5080955050505050509250929050565b60006102408083850312156131e4578182fd5b6131ed81613840565b90506131f883612ece565b815261320660208401612ece565b602082015261321760408401612ee0565b604082015261322860608401612ece565b606082015261323960808401612ece565b608082015261324a60a08401612ee0565b60a082015260c0838101519082015260e08084015190820152610100808401519082015261012080840151908201526101408084015190820152610160613292818501612ebe565b908201526101806132a4848201612e3e565b908201526101a06132b6848201612e3e565b908201526101c083810151908201526101e06132d3818501612f00565b908201526102006132e5848201612ebe565b908201526102206132f7848201612ebe565b908201529392505050565b600060e08284031215613313578081fd5b60405160e0810181811067ffffffffffffffff8211171561333057fe5b6040528251815261334360208401612e3e565b602082015260408301516040820152606083015160608201526080830151608082015260a083015160a082015260c083015160c08201528091505092915050565b600060208284031215613395578081fd5b5035919050565b6000602082840312156133ad578081fd5b5051919050565b6001600160a01b0391909116815260200190565b6001600160a01b039384168152919092166020820152604081019190915260600190565b6001600160a01b0393841681529183166020830152909116604082015260600190565b6001600160a01b0394851681529290931660208301526040820152606081019190915260800190565b6001600160a01b0393909316835290151560208301521515604082015260600190565b6001600160a01b039390931683529015156020830152604082015260600190565b6001600160a01b03929092168252602082015260400190565b6001600160a01b03958616815260208101949094529190931660408301526060820192909252608081019190915260a00190565b6001600160a01b039390931683526020830191909152604082015260600190565b6001600160a01b0394909416845260208401929092526040830152606082015260800190565b6001600160a01b039590951685526020850193909352604084019190915260608301521515608082015260a00190565b6001600160a01b03979097168752602087019590955260408601939093526060850191909152608084015260a083015260c082015260e00190565b901515815260200190565b921515835290151560208301526001600160a01b0316604082015260600190565b92151583529015156020830152604082015260600190565b7fffffffff0000000000000000000000000000000000000000000000000000000091909116815260200190565b6020808252600290820152614e4f60f01b604082015260600190565b602080825260039082015262434e4560e81b604082015260600190565b6020808252600390820152624e4f4f60e81b604082015260600190565b602080825260039082015262544e4560e81b604082015260600190565b602080825260039082015262524e4160e81b604082015260600190565b6020808252600290820152612ba760f11b604082015260600190565b6020808252600490820152631412509360e21b604082015260600190565b60208082526002908201526124a360f11b604082015260600190565b602080825260039082015262504e5760e81b604082015260600190565b60208082526003908201526224a7a160e91b604082015260600190565b6020808252600390820152624c4e5360e81b604082015260600190565b6020808252600290820152614e4160f01b604082015260600190565b6020808252600290820152614c4160f01b604082015260600190565b602080825260039082015262464e4160e81b604082015260600190565b602080825260029082015261125360f21b604082015260600190565b90815260200190565b60006040820184835260206040818501528185518084526060860191508287019350845b81811015612eb1578451835293830193918301916001016137c7565b918252602082015260400190565b93845260208401929092526040830152606082015260800190565b9687526020870195909552604086019390935260608501919091526080840152151560a0830152151560c082015260e00190565b60405181810167ffffffffffffffff8111828210171561385c57fe5b604052919050565b600067ffffffffffffffff82111561387857fe5b5060209081020190565b6001600160a01b038116811461389757600080fd5b5056fe416464726573733a20696e73756666696369656e742062616c616e636520666f722063616c6c536166654d6174683a206d756c7469706c69636174696f6e206f766572666c6f775361666545524332303a204552433230206f7065726174696f6e20646964206e6f742073756363656564a164736f6c6343000706000a";

export class DappFarm__factory extends ContractFactory {
  constructor(signer?: Signer) {
    super(_abi, _bytecode, signer);
  }

  deploy(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<DappFarm> {
    return super.deploy(overrides || {}) as Promise<DappFarm>;
  }
  getDeployTransaction(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  attach(address: string): DappFarm {
    return super.attach(address) as DappFarm;
  }
  connect(signer: Signer): DappFarm__factory {
    return super.connect(signer) as DappFarm__factory;
  }
  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): DappFarmInterface {
    return new utils.Interface(_abi) as DappFarmInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): DappFarm {
    return new Contract(address, _abi, signerOrProvider) as DappFarm;
  }
}
