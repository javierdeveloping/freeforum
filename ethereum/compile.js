const path = require("path");
const solc = require("solc");
const fs = require("fs-extra");

const buildPath = path.resolve(__dirname, "build");
fs.removeSync(buildPath);

const threadPath = path.resolve(__dirname, "contracts", "Thread.sol");
const source = fs.readFileSync(threadPath, "utf8");

var input = {
    language: 'Solidity',
    sources: {
        'Thread.sol': {
            content: source
        }
    },
    settings: {
        outputSelection: {
            '*': {
                '*': ['*']
            }
        }
    }
};

var output = JSON.parse(solc.compile(JSON.stringify(input)));

console.log("output: ", output);

//console.log("source. ", source);

//const output = solc.compile(source, 1).contracts;

//var output = solc.compile(source, 1);

fs.ensureDirSync(buildPath);

for (var contractName in output.contracts['Thread.sol']) {
    /*console.log("\n", contractName,
        ': ',
        output.contracts['Thread.sol'][contractName].evm.bytecode.object
    );*/

    console.log("contractName: ", contractName);
    console.log("bytecode: ", output.contracts['Thread.sol'][contractName].evm.bytecode.object);
    console.log("abi: ", output.contracts['Thread.sol'][contractName].abi);


    fs.outputJsonSync(
        path.resolve(buildPath, contractName + ".json"),
        output.contracts['Thread.sol'][contractName]
    );




}