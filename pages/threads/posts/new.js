import React from 'react';
import Layout from '../../../components/Layout';
import Instructions from '../../../components/Instructions';
import { Grid, Input, TextArea, Button, Form, Checkbox, Message } from 'semantic-ui-react';
import factory from '../../../ethereum/factory';
import web3 from '../../../ethereum/web3';
import { Link, Router } from '../../../routes';

import Thread from '../../../ethereum/thread.js';


class ThreadPostNew extends React.Component {

    static async getInitialProps(props){
        console.log("address :",props.query.address);

        let thread = Thread(props.query.address);

        const summary = await thread.methods.getSummary().call();

        console.log(summary);

        return { 
            address: props.query.address,
            title: summary[1]
        };
    }

    constructor(props) {
            super(props);

            this.state = {
                title: props.title,
                firstMessage: '',
                errorMessage: '',
                loading: false,
                ethereumClient: typeof window !== "undefined" && typeof window.ethereum !== "undefined",
                address:props.address
            };

            console.log("ethereumClient ??? ", this.state.ethereumClient);
            console.log(this.state.address);
        }
        /*state = {
            title: '',
            firstMessage:'',
            errorMessage: '',
            loading: false,
            ethereumClient: true
        }*/


    render() {

        return (<Layout>
            <Grid style = {
                { marginTop: '10px', marginBottom: '5px' }} >
            <Grid.Row >
            <Grid.Column verticalAlign = "middle" >
            <Link route = {`/`} >
            <a> <span> Back </span></a >
            </Link> 
            </Grid.Column> 
            </Grid.Row>          
            <Grid.Row >
            <Grid.Column verticalAlign = "middle">
            <h3 style={{color:"black", overflowWrap:'break-word'}}> Add a new post to: </h3>
            </Grid.Column> 
            </Grid.Row> 
            <Grid.Row >
            <Grid.Column verticalAlign = "middle">
            <h2 style={{color:"#1a69a4", overflowWrap:'break-word'}}>{this.state.title} </h2>
            </Grid.Column> 
            </Grid.Row> 
            <Grid.Row >
            <Grid.Column verticalAlign = "middle">
            <h3 style={{color:"grey", overflowWrap:'break-word'}}> {this.state.address} </h3>
            </Grid.Column> 
            </Grid.Row> 
            <Grid.Row >
            <Grid.Column > { this.state.ethereumClient ? this.createForm() : null } { this.showInstructions() } 
            </Grid.Column>  
            </Grid.Row > 
            </Grid>  
            </Layout>

        );
    }

    showInstructions() {
        return ( <div style = {
            {marginTop: "30px" }
        }> <Instructions></Instructions></div > );
    }

    createForm() {

        return ( 

            <Form onSubmit = { this.onSubmit } error = {!!this.state.errorMessage } >
            <Form.Field>
            <label> Message </label>  
            <TextArea disabled = { this.state.loading }
            placeholder = "write a message..."
            value = { this.state.firstMessage }
            onChange = {
                (event) => this.setState({ firstMessage: event.target.value })
            }
            />  
            </Form.Field > 
            <Message error header = "Ooops!"
            content = { this.state.errorMessage }
            />  
            <div> <span style = {
                { marginLeft: '20px' }
            } > Threads will be created on Rinkeby test network. </span> </div >

            <div style = {
                { fontWeight: "bold", color: "red", marginLeft: '20px', marginBottom: '20px' }
            }>DO NOT USE THIS FORUM WITH ETHER FROM A WALLET IN ETHEREUM MAIN NETWORK! 
            </div>

            <Button disabled={!(this.state.firstMessage.length > 0)}loading = { this.state.loading } primary > Post </Button> 
            </Form >
        )
    }



    onSubmit = async(event) => {

        event.preventDefault();

        this.setState({ loading: true, errorMessage: '' });

        try {
            const accounts = await web3.eth.getAccounts();

            let thread;

            if (this.state.firstMessage.length > 0) {
                thread = Thread(this.state.address);

                await thread.methods.addPost(this.state.firstMessage)
                    .send({ from: accounts[0] });
            }


            const summary = await thread.methods.getSummary().call();

            console.log(summary);

            Router.pushRoute(`/threads/${this.state.address}`);

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


export default ThreadPostNew;