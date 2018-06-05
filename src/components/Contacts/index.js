import React, {Component} from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import BeachAccessIcon from '@material-ui/icons/BeachAccess';

import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import {Link} from "react-router-dom";

import TextField from '@material-ui/core/TextField';


function Transition(props) {
    return <Slide direction="up" {...props} />;
}


export default class Contacts extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            selectedAddress: null,
            address: null,
        }
    }

    handleSelectAddress = (address) => {
        this.setState({
            selectedAddress: address
        })
    };
    handleClickOpen = () => {
        this.setState({open: true});
    };

    handleClose = () => {
        this.setState({open: false});
    };
    handleChangeAddress = () => {

    };

    render() {

        const {selectedAddress} = this.state;
        const contacts = [
            {
                name: 'mayne',
                address: 'n1XyfmvA3Sc5F35neZRvnuHmoskHRVuwwXa'
            },
            {
                name: 'ruter',
                address: 'n1U9yTcVAcQo3HUtnNSxaW2vZQjFWQXCn5D'
            },
            {
                name: 'xxx',
                address: 'n1KMmjBEQ8UNhum4pEYfvYpNB6V76paMYHh'
            },
            {
                name: 'mayne',
                address: 'n1XyfmvA3Sc5F35neZRvnuHmoskHRVuwwXa'
            },
            {
                name: 'ruter',
                address: 'n1U9yTcVAcQo3HUtnNSxaW2vZQjFWQXCn5D'
            },
            {
                name: 'xxx',
                address: 'n1KMmjBEQ8UNhum4pEYfvYpNB6V76paMYHh'
            },
            {
                name: 'mayne',
                address: 'n1XyfmvA3Sc5F35neZRvnuHmoskHRVuwwXa'
            },
            {
                name: 'ruter',
                address: 'n1U9yTcVAcQo3HUtnNSxaW2vZQjFWQXCn5D'
            },
            {
                name: 'xxx',
                address: 'n1KMmjBEQ8UNhum4pEYfvYpNB6V76paMYHh'
            },
            {
                name: 'mayne',
                address: 'n1XyfmvA3Sc5F35neZRvnuHmoskHRVuwwXa'
            },
            {
                name: 'ruter',
                address: 'n1U9yTcVAcQo3HUtnNSxaW2vZQjFWQXCn5D'
            },
            {
                name: 'xxx',
                address: 'n1KMmjBEQ8UNhum4pEYfvYpNB6V76paMYHh'
            },
            {
                name: 'mayne',
                address: 'n1XyfmvA3Sc5F35neZRvnuHmoskHRVuwwXa'
            },
            {
                name: 'ruter',
                address: 'n1U9yTcVAcQo3HUtnNSxaW2vZQjFWQXCn5D'
            },
            {
                name: 'xxx',
                address: 'n1KMmjBEQ8UNhum4pEYfvYpNB6V76paMYHh'
            },
        ];

        return <div style={{height: '100%'}}>
            <div style={{overflowY: 'scroll', height: '100%'}}>
                <List>
                    {
                        contacts.map((item, index) => {
                            return <Link to={`/contact/${item.address}`} key={index}>
                                <ListItem button onClick={() => this.handleSelectAddress(item.address)}
                                          key={item.address}>
                                    <Avatar>
                                        <BeachAccessIcon/>
                                    </Avatar>
                                    <ListItemText primary={item.name} secondary="July 20, 2014"/>
                                </ListItem>
                            </Link>

                        })
                    }
                </List>
            </div>
            <Button
                onClick={this.handleClickOpen}
                variant="fab"
                style={{position: 'absolute', bottom: '1em', right: '1em'}}
                color="primary">
                <AddIcon/>
            </Button>

            <Dialog
                open={this.state.open}
                TransitionComponent={Transition}
                keepMounted
                onClose={this.handleClose}
                aria-labelledby="alert-dialog-slide-title"
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle id="alert-dialog-slide-title">
                    {"通过钱包地址添加好友"}
                </DialogTitle>
                <DialogContent>
                    <TextField
                        id="address"
                        label="钱包地址"
                        value={this.state.address}
                        style={{width: 200}}
                        onChange={this.handleChangeAddress}
                        margin="normal"
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={this.handleClose} color="primary">
                        取消
                    </Button>
                    <Button onClick={this.handleClose} color="primary">
                        确定
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    }

}