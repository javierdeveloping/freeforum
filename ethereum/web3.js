/*

import Web3 from "web3";

window.ethereum.request({ method: "eth_requestAccounts" });

const web3 = new Web3(window.ethereum);

export default web3;

*/


import Web3 from "web3";

let web3;

if (typeof window !== "undefined" && typeof window.ethereum !== "undefined") { //before it was window.web3 !== "undefined" to check if metamask had injected an instance of web3 in window object
    // We are in the browser and metamask is running.
    console.log("now browser with metamask");
    window.ethereum.request({ method: "eth_requestAccounts" });
    web3 = new Web3(window.ethereum);
} else {
    // We are on the server *OR* the user is not running metamask
    const provider = new Web3.providers.HttpProvider(
        'https://rinkeby.infura.io/v3/25de528aec4145f192c048f891f1e08d'
    );
    web3 = new Web3(provider);
    console.log("browser with no metamask or server rendering");
}

if (typeof window !== "undefined" && typeof window.ethereum === "undefined") {
    console.log("no metamask or similar wallet is installed");
}


export default web3;