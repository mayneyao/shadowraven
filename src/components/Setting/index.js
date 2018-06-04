import React, {Component} from 'react';
import JSEncrypt from 'jsencrypt';

export default class Setting extends Component {

    constructor(props) {
        super(props);
        this.state = {
            address: null
        }
    }


    checkAddressIsRegistered = (address) =>{

        // 1. 地址已经注册返回
    };

    reg = () => {

        // 1. 生成密钥对
        // 支持 512、1024、2048、4096
        // key 越长, 生成密钥和加密时间越长
        let crypt = new JSEncrypt({default_key_size: 1024});

        // 获取公钥
        let public_key = crypt.getPublicKey();
        console.log(public_key);

        // 获取私钥
        let private_key = crypt.getPrivateKey();
        console.log(private_key);

        // 2. 本地存储密钥对信息


        // 3. 注册用户

    };


    render() {

        let address = localStorage.getItem('nasAddress');

        return <div>
            {
                address ? address : <p>未检测到钱包插件</p>
            }
        </div
        >
    }

}