import web3 from './web3';
import Thread from './build/Thread.json';

export default (address) => {
    return new web3.eth.Contract(Thread.abi, address);
}