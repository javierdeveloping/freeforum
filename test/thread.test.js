const assert = require('assert');
const ganache = require('ganache-cli');

const Web3 = require('web3');
const web3 = new Web3(ganache.provider());

const compiledFactory = require('../ethereum/build/ThreadFactory.json');
const compiledThread = require('../ethereum/build/Thread.json');

let accounts;
let factory;
let threadAddress;
let thread;

const run = async() => {

    accounts = await web3.eth.getAccounts();

    factory = await new web3.eth.Contract(compiledFactory.abi).
    deploy({ data: compiledFactory.evm.bytecode.object }).
    send({ from: accounts[0], gas: '6000000' });

    await factory.methods.createThread('main thread is here').
    send({ from: accounts[0], gas: '1000000' });

    let summary = await factory.methods.getDeployedThreads().call();

    console.log("ei", summary);


}

//run();


beforeEach(async() => {

    accounts = await web3.eth.getAccounts();

    factory = await new web3.eth.Contract(compiledFactory.abi).
    deploy({ data: compiledFactory.evm.bytecode.object }).
    send({ from: accounts[0], gas: '6000000' });

    await factory.methods.createThread('main thread is here').
    send({ from: accounts[0], gas: '1000000' });


    const addresses = await factory.methods.getDeployedThreads().call();
    threadAddress = addresses[0];
    thread = await new web3.eth.Contract(
        compiledThread.abi, threadAddress
    );

});

describe('Thread contracts test', () => {

    it('deploys a factory and a thread', () => {
        assert.ok(factory.options.address);
        assert.ok(thread.options.address);
    });

    it('marks caller as the thread manager', async() => {

        const manager = await thread.methods.manager().call();

        assert.equal(manager, accounts[0]);
    });

    it('returns thread address after creation', async() => {

        let threadNewAddress = await factory.methods.createThread('secondary thread is here').
        send({ from: accounts[0], gas: '1000000' })
            //console.log("factory: ", factory);
            // console.log("threadNewAddress: ", threadNewAddress);
        console.log(threadNewAddress.events.ThreadCreation.raw);
        assert.ok(threadNewAddress);

        let threadNewAddress3 = await factory.methods.createThread('third thread is here').
        send({ from: accounts[0], gas: '1000000' });

        console.log("threadNewAddress3: ", threadNewAddress3);

        console.log(threadNewAddress3.events.ThreadCreation.raw);
        assert.ok(threadNewAddress3);

        console.log("contract address: ", "0x".concat(threadNewAddress3.events.ThreadCreation.raw.data.slice(-40)));








    });

    it('adds posts with given message', async() => {

        let message = "i am a new participant, how are you?"
        await thread.methods.addPost(message)
            .send({ from: accounts[0], gas: '1000000' });

        let post = await thread.methods.posts(0).call();

        assert.ok(post);
        assert.equal(post.message, message);


    });

    it('manager can delete the thread', async() => {



        try {
            await thread.methods.disable()
                .send({ from: accounts[0], gas: '1000000' });

            await new web3.eth.Contract(
                compiledThread.abi, threadAddress);
        } catch (err) {
            assert(err);
        }

        //assert.equal(manager, accounts[0]);
    });

    it('only manager can delete the thread', async() => {
        try {
            await thread.methods.disable()
                .send({ from: accounts[1], gas: '1000000' });

            assert(false);
        } catch (err) {
            assert(err);
        }

    });

    it('returns a summary of the thread', async() => {

        let summary = await thread.methods.getSummary().call();

        assert.ok(summary);
        assert.equal(accounts[0], summary[0]);

    });


});