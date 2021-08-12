import React from 'react';
import Layout from '../../components/Layout';
import Instructions from '../../components/Instructions';
import { Grid, Input,TextArea, Button, Form, Checkbox, Message } from 'semantic-ui-react';
import factory from '../../ethereum/factory';
import web3 from '../../ethereum/web3';
import { Link,Router } from '../../routes';

import Thread from '../../ethereum/thread.js';


class ThreadNew extends React.Component {

    
    constructor(props)
    {
        super(props);

        this.state={
        title:'',
        firstMessage:'',
        errorMessage:'',
        loading:false,
        ethereumClient: typeof window !== "undefined" && typeof window.ethereum !== "undefined"
        };

        console.log("ethereumClient ??? ",this.state.ethereumClient);
    }
    /*state = {
        title: '',
        firstMessage:'',
        errorMessage: '',
        loading: false,
        ethereumClient: true
    }*/

  
    render() {

        return ( 

            <Layout>
                    <Grid style={{marginTop:'10px',marginBottom:'5px'}}>
                    <Grid.Row>
                     <Grid.Column verticalAlign="middle">
                        <Link route={`/`}>
                            <a><span>Back</span></a>
                        </Link>
                        </Grid.Column>
                     </Grid.Row>         
                    <Grid.Row>
                     <Grid.Column verticalAlign="middle">
                       <h3>Create a new thread</h3>
                        </Grid.Column>
                     </Grid.Row>
                    <Grid.Row>
                    <Grid.Column >      
                     {this.state.ethereumClient ? this.createForm() : null}
                     {this.showInstructions()}
                    </Grid.Column> 
                     </Grid.Row>
                    </Grid>  
           
            </Layout>

        );
    }

    showInstructions()
    {
        return(<div style={{marginTop:"30px"}}><Instructions></Instructions></div>);
    }

    createForm()
    {
 
            return(
                <Form onSubmit = {this.onSubmit} error = {!!this.state.errorMessage }>
                <Form.Field >
                <label>Title</label> 
                <Input disabled={this.state.loading} placeholder='a title for your thread...' value = {this.state.title}
                onChange = {(event) => this.setState({title:event.target.value})}/> 
                    </Form.Field>
                    <Form.Field >
                <label>Message</label> 
                <TextArea disabled={this.state.loading} placeholder='leave empty or write a first message for your thread...'
                value = {this.state.firstMessage}
                onChange = {(event) => this.setState({firstMessage:event.target.value})}/> 
                    </Form.Field> 
                    <Message error header = "Ooops!"
                content = { this.state.errorMessage }/> 
                  <div><span style={{marginLeft:'20px'}}>Threads will be created on Rinkeby test network. </span> </div>
              
                  <div style={{fontWeight:"bold",color:"red",marginLeft:'20px',marginBottom:'20px'}}>
                      DO NOT USE THIS FORUM WITH ETHER FROM A WALLET IN ETHEREUM MAIN NETWORK!</div>
                  <div style={{marginLeft:'20px'}}><div style={{marginBottom:'20px'}}>*Due to the current development version, if a first message is written when creating a thread, a second transaction confirmation message could be prompted.</div></div>
                
                <Button loading = { this.state.loading } primary>Create</Button>
                   </Form>
            )
    }



    onSubmit = async(event) => {

        event.preventDefault();

        this.setState({ loading: true, errorMessage: '' });

        try {
            const accounts = await web3.eth.getAccounts();

            console.log("try onsubmit waiting...");
            const threadCreation = await factory.methods.createThread(this.state.title).send({ from: accounts[0] });

            //let getDeployedThreads = await factory.methods.getDeployedThreads().call();

            let threadAddress = "0x".concat(threadCreation.events.ThreadCreation.raw.data.slice(-40));

            console.log("addres:: ",threadAddress);
            let thread; 

            if(this.state.firstMessage.length > 0)
            {
                thread = Thread(threadAddress);

                await thread.methods.addPost(this.state.firstMessage)
                .send({from: accounts[0] });
            }

        
            const summary = await thread.methods.getSummary().call();

            console.log(summary);
               
            Router.pushRoute(`/threads/${threadAddress}`);

        } catch (err) {
            this.setState({ errorMessage: err.message });
        } finally {
            this.setState({ loading: false });
        }

    }

    changeInput(event) {
        console.log(event.target.value);
        this.setState({ title: event.target.value })
    }
}


export default ThreadNew;