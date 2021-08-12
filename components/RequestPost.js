import React from 'react';
import {List,Table, Button} from 'semantic-ui-react';
import web3 from '../ethereum/web3';
import Thread from '../ethereum/thread';
import { Link, Router } from '../routes';

class RequestPost extends React.Component{

    render(){

        const {Row, Cell} = Table;

        const {index,message,author} = this.props;

        console.log("index: ",index,"message: ",message," author: ",author,"index: ");


        return (
           

            <List.Item >
                <br></br>
            <List.Icon name='user circle' verticalAlign='top' />
              <List.Content>  
                <List.Header style={{fontSize:'14px'}}><span style={{overflowWrap:'break-word'}}>{author}</span><span style={{float:"right",overflowWrap:'break-word'}}>#{index+1}</span></List.Header>
                <List.Description style={{fontSize:'16px',marginTop:'7px'}}>{message}</List.Description>
              </List.Content >
              <br></br>
            </List.Item>
  
        );
    }

}

export default RequestPost;