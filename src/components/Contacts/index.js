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
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import {Link} from "react-router-dom";


function Transition(props) {
    return <Slide direction="up" {...props} />;
}


export default class Contacts extends Component {
    constructor(props) {
        super(props)
        this.state = {
            open: false,
            selectedAddress: null,
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
        ];

        return <div>
            <div style={{overflowY: 'scroll'}}>
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
                    {"Use Google's location service?"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-slide-description">
                        Let Google help apps determine location. This means sending anonymous location data to
                        Google, even when no apps are running.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={this.handleClose} color="primary">
                        Disagree
                    </Button>
                    <Button onClick={this.handleClose} color="primary">
                        Agree
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    }

}