import React from 'react';
import { Table, Button } from 'semantic-ui-react';
import web3 from '../ethereum/web3';
import { Link, Router } from '../routes';

class Instructions extends React.Component {

    render() {



        return ( <div style={{overflowWrap:'break-word'}}>
            <span>How to create threads and add messages:</span>
            <ol>
            <li>Remember Freedom forum is working on Rinkeby test network.</li>
            <li>Download <a href="https://metamask.io/download.html" target="_blank">Metamask</a> and create a Ethereum wallet address.</li> 
            <li>In Metamask, change network to Rinkeby test network.</li>
             <li>Get some free Ether using services such as <a href="https://faucet.rinkeby.io/" target="_blank">https://faucet.rinkeby.io/</a></li>
            </ol>
            <span>This page is not responsible for any event, liabilities and damages derived from users' behaviours, losses and theft of cryptocurrencies and other assets, security problems, etc.</span>
            </div>
        )

    }
}

export default Instructions;