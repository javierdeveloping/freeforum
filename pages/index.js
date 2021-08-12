import React from 'react';
import factory from '../ethereum/factory';
import { Table,Grid,Button, Card } from 'semantic-ui-react';
import Layout from '../components/Layout.js';
import { Link, Router } from '../routes';
import Thread from '../ethereum/thread';
import RequestRow from "../components/RequestRow";


class ThreadIndex extends React.Component {

        static async getInitialProps(){
                const threadsAddresses = await factory.methods.getDeployedThreads().call();     
                console.log("Threads list: ",threadsAddresses);
                console.log("threads size: ",threadsAddresses.length);

                let count=0;

                const threadsDetails = await Promise.all(
                    threadsAddresses.map((element) => {
                        let thread = Thread(element);                 
                        return thread.methods.getSummary().call();
                    })
                );

                console.log("details: ",threadsDetails);

                let threads=Array();
                
                threadsDetails.map((element,index)=>{
                    if(element[4]){
                        element[5]=threadsAddresses[index];
                        threads.push(element);
                        console.log("element: ",element);
                    count++;
                }});

                return {threads:threads, count:count};
                  
               
              
        }

        renderThreads()
        {
            const {Header, Row, HeaderCell, Body} = Table;

            return(
                    <Table celled selectable>
                    <Header>
                        <Row>                     
                            <HeaderCell>Topic</HeaderCell>
                            <HeaderCell>Author</HeaderCell>
                            <HeaderCell>Total posts</HeaderCell>
                        </Row>
                    </Header>
                    <Body>
                        {this.renderRows()}
                    </Body>
                </Table>);
        }

        renderRows(){
            return this.props.threads.map((element,index) => {
                 return  <RequestRow key={index} title={element[1]} author={element[0]} totalPosts={element[3]} address={element[5]} />     
        })};


        render() {
            return(
            <Layout>
                <Grid style={{marginTop:'10px',marginBottom:'10px'}}>
                    <Grid.Row>
                    <Grid.Column width={8} verticalAlign="middle" style={{backgroundColor:"none"}}>
                        <h3 style={{backgroundColor:"none",color:"#1a69a4"}}>Open threads ({this.props.count})</h3>
                    </Grid.Column>
                    <Grid.Column width={8} verticalAlign="middle">
                    <Link route="/threads/new">
                    <a>
                     <Button floated="right" content="New thread" icon="add" primary></Button>
                     </a>
                 </Link>  
                    </Grid.Column>
                    </Grid.Row>    
                    </Grid>                                    
                    {this.renderThreads()}
            
            </Layout>
            );  
        }
    }

export default ThreadIndex;