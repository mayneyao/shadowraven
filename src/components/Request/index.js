import React, {Component} from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import BeachAccessIcon from '@material-ui/icons/BeachAccess';
import {Link} from "react-router-dom";
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

        return <div style={{height: '100%'}}>
            <List style={{overflowY: 'scroll', height: '98%'}}>
                {
                    requestList.map((item, index) => {
                        return <Link to={`/request/${item.from}`} key={index}>
                            <ListItem button>
                                <Avatar>
                                    <BeachAccessIcon/>
                                </Avatar>
                                <ListItemText primary={item.nickname} secondary="July 20, 2014"/>
                            </ListItem>
                        </Link>
                    })
                }
            </List>
        </div>
    }

}