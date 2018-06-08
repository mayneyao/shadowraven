import React, {Component} from 'react';
import Button from '@material-ui/core/Button';
import {HttpRequest, Neb} from 'nebulas';
import {contract} from '../../util';
import NebPay from 'nebpay.js';


import {message} from '../../util/common';


export default class Notifications extends Component {
    constructor(props) {
        super(props);
        this.state = {
            requestList: []
        };
    }


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
        let neb = new Neb();
        neb.setRequest(new HttpRequest("https://testnet.nebulas.io"));
        let nebApi = neb.api;
        let args = JSON.stringify([]);
        nebApi.getNebState().then((state) => {
            nebApi.call({
                chainID: state.chain_id,
                from: localStorage.getItem('nasAddress'),
                to: contract,
                value: 0,
                gasPrice: 1000000,
                gasLimit: 2000000,
                contract: {
                    function: 'getUserReceivedRequestList',
                    args: args
                }
            }).then((resp) => {
                let res = JSON.parse(resp.result);
                this.setState({
                    requestList: res || []
                });
            });
        });

    }

    render() {
        const {requestList} = this.state;

        const {address} = this.props.match.params;

        let request = requestList.filter(item => item.from === address)[0];

        return <div style={{height: '100%'}}>
            <p>
                {request && request.nickname}请求添加您为好友
            </p>
            <Button onClick={() => this.agreeRequest(request && request.from)}>同意</Button>

        </div>
    }

}