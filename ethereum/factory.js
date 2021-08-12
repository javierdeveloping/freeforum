import web3 from './web3.js';
import threadFactory from './build/ThreadFactory.json';

const instance = new web3.eth.Contract(threadFactory.abi,
    "0x9F9C60C726c43ecD24ca0eCe7e7F21e976E02a2A"
);

export default instance