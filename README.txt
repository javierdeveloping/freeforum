Instructions

1) Execute npm install
2) Maybe not necessary, but run node compile.js to create bytecode and api interface of your smart contracts
3) npm run test -> mocha test to check everything works well using Ganache to create a local Ethereum network
4) In deploy.js -> insert your 12 mnemonic words that are used to create your wallet address, public key and private key. 
5) Run: node deploy.js -> create an instance of thread factory contract. Copy the address
6) Insert in factory.js the address of your deployed instance
7) Run server: npm run dev
8) Enter localhost:5000 (port by default) in your browser