const HDWalletProvider = require('truffle-hdwallet-provider');
const Web3 = require('web3');

const compiledFactory = require('./build/ThreadFactory.json');

const provider = new HDWalletProvider('12 mnemonic word insert here', 'https://rinkeby.infura.io/v3/25de528aec4145f192c048f891f1e08d');

const web3 = new Web3(provider);

//make a function to use async syntax

const deploy = async() => {

    const accounts = await web3.eth.getAccounts();

    console.log(accounts);

    console.log('Attempting to deploy from account', accounts[0]);

    const result = await new web3.eth.Contract(compiledFactory.abi) //JSON.parse(compiledFactory.interface)
        .deploy({ data: compiledFactory.evm.bytecode.object }) //no arguments in this contract
        .send({ from: accounts[0], gas: '9000000' });

    //record the address where our contract ended up at

    console.log("\nContract deployed to", result.options.address, "\n");

};

deploy();