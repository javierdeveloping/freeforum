import React from 'react';
import {Table, Button} from 'semantic-ui-react';
import web3 from '../ethereum/web3';
import Thread from '../ethereum/thread';
import { Link, Router } from '../routes';

class RequestRow extends React.Component{

    render(){

        const {Row, Cell} = Table;

        const {title,author,totalPosts,address} = this.props;

        console.log("title: ",title," author: ",author," totalPosts: ",
        totalPosts, "hostedAt: ",address);


        return (
            <Link route={`/threads/${address}`}>
        <Row style={{cursor:"pointer"}}>
           
            <Cell>{title}</Cell>
            <Cell>{author}</Cell>
            <Cell>{totalPosts}</Cell>

        </Row>
        </Link>);
    }

}

export default RequestRow;