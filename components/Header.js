import React from 'react';
import {Grid,Container,Header, Icon, Menu } from 'semantic-ui-react';
import {Link} from '../routes';

export default () => {

    return (

        <Grid style={{marginTop:'15px'}}>
                    <Grid.Row colums={3}>
                    <Grid.Column width={1}>
                    </Grid.Column>
                    <Link route={`/`}>
                    <Grid.Column style={{cursor:"pointer"}} verticalAlign="middle" width={14}>
                    <Header as='h2' color="black" style={{backgroundColor:"none",display:'block'}} >
                        <Icon name='world' color="blue" />
                        <Header.Content >Freedom forum
                        <Header.Subheader style={{fontSize:'16px'}}>Open and read threads, post new messages inside a thread, enjoy!</Header.Subheader>
                        </Header.Content>
                    </Header>
                    </Grid.Column>
                    </Link>
                    <Grid.Column width={1}>
                    </Grid.Column>
                    </Grid.Row>    
         </Grid>   
    );

}