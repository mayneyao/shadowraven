import React, {Component} from 'react';

export default class Setting extends Component {

    constructor(props) {
        super(props);
        this.state = {
            address: localStorage.getItem('nasAddress')
        }
    }


    checkAddressIsRegistered = (address) => {

        // 1. 地址已经注册返回
    };

    reg = () => {

        // 3. 注册用户

    };


    render() {

        const {address} = this.state;
        return <div>
            {
                address ? address : <p>未检测到钱包插件</p>
            }
        </div>
    }

}