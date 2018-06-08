import React, {Component} from 'react';
import Button from '@material-ui/core/Button';
import {HttpRequest, Neb} from 'nebulas';
import {contract, splitStr} from '../../util';
import JSEncrypt from 'jsencrypt';
import '../../App.css';
import NebPay from 'nebpay.js';

import {message} from '../../util/common';


export default class PersonChat extends Component {

    constructor(props) {
        super(props)
        this.state = {
            inputMsg: '',
            myPrivateKey: localStorage.getItem('privateKey'),
            msgList: []
        }
    }


    encryptMsg = (content) => {
        const {inputMsg, friendPublicKey, myPrivateKey} = this.state;

    };

    decryptMsg = (content) => {
        const {myPrivateKey} = this.state;
        let crypt = new JSEncrypt();
        crypt.setPrivateKey(myPrivateKey);

        let deMsgList = [];
        for (let j in content) {
            deMsgList.push(crypt.decrypt(content[j]))
        }
        return deMsgList.join("");
    };

    handleInputChange = (e) => {
        this.setState({
            inputMsg: e.target.value
        })
    };

    handleSendMsg = () => {
        const {inputMsg, friendPublicKey, myPrivateKey} = this.state;
        if (inputMsg.length) {
            let crypt = new JSEncrypt();
            crypt.setPublicKey(friendPublicKey);
            crypt.setPrivateKey(myPrivateKey);

            let msgList = splitStr(inputMsg, 117);

            let enMsgList = [];
            for (let i in msgList) {
                enMsgList.push(crypt.encrypt(msgList[i]))
            }

            let deMsgList = [];
            for (let j in enMsgList) {
                deMsgList.push(crypt.decrypt(enMsgList[j]))
            }

            console.log(friendPublicKey, myPrivateKey);
            console.log(enMsgList, deMsgList);

            // createMsg

            let nebPay = new NebPay();
            console.log(nebPay);
            let to = contract;
            let amount = 0;
            let from = localStorage.getItem('nasAddress');
            let args = JSON.stringify([from, this.props.match.params.from, enMsgList, 'person']);
            nebPay.call(to, amount, 'createMsg', args,
                {
                    listener: (data) => {
                        if (typeof data === 'object') {
                            message('发送成功');
                            console.log(data);
                        }
                    }
                }
            );
        }
    };

    fetchMsg = () => {
        const {from} = this.props.match.params;
        let address = localStorage.getItem('nasAddress');
        let neb = new Neb();
        neb.setRequest(new HttpRequest("https://testnet.nebulas.io"));
        let nebApi = neb.api;
        let args = JSON.stringify([from]);

        nebApi.getNebState().then((state) => {
            nebApi.call({
                chainID: state.chain_id,
                from: address,
                to: contract,
                value: 0,
                gasPrice: 1000000,
                gasLimit: 2000000,
                contract: {
                    function: 'getMsgWith',
                    args: args
                }
            }).then((resp) => {
                let res = JSON.parse(resp.result);
                console.log(res);
                this.setState({msgList: res})
            });
        });
    };

    componentDidMount() {
        const {from} = this.props.match.params;
        let address = localStorage.getItem('nasAddress');
        let neb = new Neb();
        neb.setRequest(new HttpRequest("https://testnet.nebulas.io"));
        let nebApi = neb.api;
        let args = JSON.stringify([from]);
        nebApi.getNebState().then((state) => {
            nebApi.call({
                chainID: state.chain_id,
                from: address,
                to: contract,
                value: 0,
                gasPrice: 1000000,
                gasLimit: 2000000,
                contract: {
                    function: 'getUserInfo',
                    args: args
                }
            }).then((resp) => {
                let res = JSON.parse(resp.result);
                this.setState({friendPublicKey: res.publicKey})
            });

        });

        this.fetchMsg()

        // 2.获取本人私钥

    }

    render() {

        let myAddress = localStorage.getItem('nasAddress');

        const {inputMsg, msgList} = this.state;


        return <div className="chat-root">
            <div className="chat-msg">
                {
                    msgList.map(item => {
                        return item.from !== myAddress ? <div className="left">
                                <div className="msg">
                                    {this.decryptMsg(item.content)}
                                </div>
                            </div> :
                            <div className="right">
                                <div className="msg self-msg">
                                    {this.decryptMsg(item.content)}
                                </div>
                            </div>
                    })
                }
            </div>
            <textarea className="chat-input" value={inputMsg} onChange={this.handleInputChange}/>

            <Button onClick={this.handleSendMsg}>发送</Button>
        </div>
    }

}