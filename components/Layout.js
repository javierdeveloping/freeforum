import React from 'react';
import Header from './Header.js';
import { Container } from 'semantic-ui-react';
import Head from 'next/head';


export default (props) => 
{ 
    return(
        
        <Container> 
            <Head>
                    <link async rel="stylesheet" href="//cdn.jsdelivr.net/npm/semantic-ui@latest/dist/semantic.min.css"/>
                    <script async src="//cdn.jsdelivr.net/npm/semantic-ui@latest/dist/semantic.min.js"></script>
            </Head>
        <Header></Header>
        {props.children}
        </Container> 
    );
};