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
import NebPay from 'nebpay.js';


import {HttpRequest, Neb} from 'nebulas';
import {contract} from '../../util';


import {message} from '../../util/common';


function Transition(props) {
    return <Slide direction="up" {...props} />;
}


export default class Contacts extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            selectedAddress: null,
            address: '',
            contacts: []
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
    handleChangeAddress = (e) => {
        this.setState({
            address: e.target.value
        })
    };

    handleAddFriend = () => {
        const {address} = this.state;

        let nebPay = new NebPay();
        console.log(nebPay);
        let to = contract;
        let amount = 0;
        if (address) {
            let args = JSON.stringify([address]);
            nebPay.call(to, amount, 'requestAddFriend', args,
                {
                    listener: (data) => {
                        if (typeof data === 'object') {
                            message('请求已发出,等待对方确认');
                            console.log(data);
                            this.handleClose();
                        }
                    }
                }
            );
        }
    };

    componentDidMount() {
        let address = localStorage.getItem('nasAddress');
        let neb = new Neb();
        neb.setRequest(new HttpRequest("https://testnet.nebulas.io"));
        let nebApi = neb.api;
        let args = JSON.stringify([]);
        nebApi.getNebState().then((state) => {
            nebApi.call({
                chainID: state.chain_id,
                from: address,
                to: contract,
                value: 0,
                gasPrice: 1000000,
                gasLimit: 2000000,
                contract: {
                    function: 'getUserFriendList',
                    args: args
                }
            }).then((resp) => {
                let res = JSON.parse(resp.result);
                this.setState({contacts: res || []})
            });
        });
    }

    render() {

        const {selectedAddress, contacts} = this.state;

        return <div style={{height: '100%'}}>
            <div style={{overflowY: 'scroll', height: '100%'}}>
                <List>
                    {
                        contacts.map((item, index) => {
                            return <Link to={`/msg/${item.address}`} key={index}>
                                <ListItem button onClick={() => this.handleSelectAddress(item.address)}
                                          key={item.address}>
                                    <Avatar>
                                        <BeachAccessIcon/>
                                    </Avatar>
                                    <ListItemText primary={item.nickname} secondary={item.address}/>
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
                    <Button onClick={this.handleAddFriend} color="primary">
                        确定
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    }

}