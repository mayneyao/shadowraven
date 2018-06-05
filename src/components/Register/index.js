import React, {Component} from 'react';

import Button from '@material-ui/core/Button';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';

import TextField from '@material-ui/core/TextField';

import JSEncrypt from 'jsencrypt';

import {HttpRequest, Neb} from 'nebulas';
import {contract} from '../../util';


function Transition(props) {
    return <Slide direction="up" {...props} />;
}


export default class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: true,
            address: localStorage.getItem('nasAddress'),
            nickname: ''
        }
    }

    handleClose = () => {
        this.setState({open: false});
    };

    handleChangeNickname = (e) => {
        this.setState({
            nickname: e.target.value
        })
    };


    handleCreate = () => {
        const {nickname, address} = this.state;
        // 1. 生成密钥对
        let crypt = new JSEncrypt({default_key_size: 1024});
        // 获取公钥

        let publicKey = crypt.getPublicKey();
        console.log(publicKey);

        // 2. 本地存储密钥对信息
        // 获取私钥
        let privateKey = crypt.getPrivateKey();
        localStorage.setItem('privateKey', privateKey);

        let neb = new Neb();
        neb.setRequest(new HttpRequest("https://testnet.nebulas.io"));
        let nebApi = neb.api;
        if (address) {
            let args = JSON.stringify([nickname, publicKey]);
            nebApi.getNebState().then(state => {
                nebApi.call({
                    chainID: state.chain_id,
                    from: address,
                    to: contract,
                    value: 0,
                    gasPrice: 1000000,
                    gasLimit: 2000000,
                    contract: {
                        function: 'createUser',
                        args
                    }
                }).then(function (resp) {
                    console.log(resp.result)
                });
            })
        }

    };

    render() {
        return <div style={{height: '100%'}}>
            <Dialog
                open={this.state.open}
                TransitionComponent={Transition}
                keepMounted
                onClose={this.handleClose}
                aria-labelledby="alert-dialog-slide-title"
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle id="alert-dialog-slide-title">
                    {"创建账户,取一个好名字吧"}
                </DialogTitle>
                <DialogContent>
                    <TextField
                        id="address"
                        label="nickname"
                        value={this.state.nickname}
                        style={{width: 200}}
                        onChange={this.handleChangeNickname}
                        margin="normal"
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={this.handleClose} color="primary">
                        取消
                    </Button>
                    <Button onClick={this.handleCreate} color="primary">
                        确定
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    }

}