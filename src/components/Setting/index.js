import React, {Component} from 'react';
import {HttpRequest, Neb} from 'nebulas';
import {contract} from '../../util';
import Button from '@material-ui/core/Button';
import NebPay from 'nebpay.js';

import {message} from '../../util/common';

export default class Setting extends Component {

    constructor(props) {
        super(props);
        this.state = {
            address: localStorage.getItem('nasAddress'),
            info: {},
        }
    }


    checkAddressIsRegistered = (address) => {

        let neb = new Neb();
        neb.setRequest(new HttpRequest("https://testnet.nebulas.io"));
        let nebApi = neb.api;
        let args = JSON.stringify([address]);
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
                this.setState(res)
            });
        });

        // console.log(api.())

        // 1. 地址已经注册返回
    };

    reg = () => {

        // 3. 注册用户

    };

    agreeRequest = (from) => {
        let nebPay = new NebPay();
        console.log(nebPay);
        let to = contract;
        let amount = 0;
        let args = JSON.stringify([from]);
        nebPay.call(to, amount, 'agreeRequest', args,
            {
                listener: (data) => {
                    if (typeof data === 'object') {
                        message('确认添加好友');
                        console.log(data);
                    }
                }
            }
        );
    };

    componentDidMount() {
        const {address} = this.state;
        if (address) {
            this.checkAddressIsRegistered(address)
        }
    }

    render() {

        const {address, nickname, publicKey} = this.state;
        return <div>
            {
                address ? <div>
                    <div>
                        昵称:{nickname}
                    </div>
                    <div>
                        钱包地址:{address}
                    </div>
                    <div>
                        公钥:{publicKey}
                    </div>
                </div> : <p>未检测到钱包插件</p>
            }
            {/*{*/}
                {/*receivedRequests && receivedRequests.map(item => {*/}
                    {/*return <div>{item.from} <Button onClick={() => this.agreeRequest(item.from)}>同意</Button></div>*/}
                {/*})*/}
            {/*}*/}
        </div>
    }

}