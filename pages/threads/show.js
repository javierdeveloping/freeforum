import React, { Compontn, createFactory } from "react";
import {Button, Header,Grid,Table,List } from "semantic-ui-react";
import Layout from '../../components/Layout';
import Thread from '../../ethereum/thread.js';
import web3 from '../../ethereum/web3';
import { Router } from '../../routes';
import {Link} from '../../routes';
import RequestPost from "../../components/RequestPost";

class ThreadShow extends React.Component {
    
    static async getInitialProps(props){

        console.log("address :",props.query.address);

        const thread = Thread(props.query.address);

        const summary = await thread.methods.getSummary().call();

        console.log("show summary ",summary);

        let posts;

        try{
            
            if(parseInt(summary[3]) > 0){
                console.log("here");
                posts = await Promise.all(
                    Array(parseInt(summary[3])).fill().map((element,index) => {
                        return thread.methods.posts(index).call()
                    })
                );
            }
        
            console.log(posts);
        }catch(err)
        {
            console.log("no posts for this posts or error retrieving data", err.Message);
        }

        return { 
            address: props.query.address,
            author:summary[0],
            title : summary[1],
            dateTime:summary[2],
            totalPosts:summary[3],
            active:summary[4],  
            posts:posts         
        };
    }
    
    renderPosts()
    {
        if(parseInt(this.props.totalPosts) == 0)
        {
            console.log("nothing to do here");
            return("No messages have been found for this");
        }


        return(
            <List animated celled>
            {this.props.posts.map((element,index) => {
                //console.log("index:",index);
            return  <RequestPost key={index} index={index} message={element[0]} author={element[2]} />     
            })}
            </List>
        );
                                  
    }


    render()
    {
 
        return(
            <Layout>
     

            <Grid style={{marginTop:'10px',marginBottom:'10px'}}>
                    <Grid.Row>
                     <Grid.Column verticalAlign="middle" width={8}>
                        <Link route={`/`}>
                            <a>Back</a>
                        </Link>
                        </Grid.Column>
                    <Grid.Column verticalAlign="middle" width={8} style={{backgroundColor:"none"}}>
                   
                        <Link route={`/threads/${this.props.address}/post`}>
                            <a>
                     <Button floated="right" content="Reply" icon="reply" primary></Button>
                     </a>
                     </Link>  
                        </Grid.Column>
                     </Grid.Row> 
                   
                    <Grid.Row>
                    <Grid.Column  verticalAlign="middle" style={{backgroundColor:"none"}}>
                        <span style={{backgroundColor:"none",color:"black",fontSize:'25px', overflowWrap:'break-word'}}>{this.props.title} </span>
                        <br></br>
                        <span style={{display:"block",backgroundColor:"none",color:"grey",textAlign:"right",overflowWrap:'break-word'}}>{this.props.author} </span>
                    </Grid.Column>
                    </Grid.Row>    
                    </Grid>   

            
            {this.renderPosts()} 
             
            </Layout>
        
        )
    }
    
}

export default ThreadShow;