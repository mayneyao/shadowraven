import React, {Component} from 'react';
import Button from '@material-ui/core/Button';


import '../../App.css';

export default class PersonChat extends Component {

    constructor(props) {
        super(props)
        this.state = {
            inputMsg: ''
        }
    }

    // sendMsg = () => {
    //     let text = "This specification describes a JavaScript API for performing basic cryptographic operations in web applications, such as hashing, signature generation and verification, and encryption and decryption. Additionally, it describes an API for applications to generate and/or manage the keying material necessary to perform these operations. Uses for this API range from user or service authentication, document or code signing, and the confidentiality and integrity of communications."
    //     let msgList = splitStr(text, 117);
    //
    //     let enMsgList = []
    //     for (let i in msgList) {
    //         enMsgList.push(crypt.encrypt(msgList[i]))
    //     }
    //
    //     let deMsgList = []
    //     for (let j in enMsgList) {
    //         deMsgList.push(crypt.decrypt(enMsgList[j]))
    //     }
    //
    //     console.log(enMsgList, deMsgList)
    // };

    handleInputChange = (e) => {
        this.setState({
            inputMsg: e.target.value
        })
    };

    handleSendMsg = ()=>{
        const {inputMsg} = this.state;
        // enMsgList = this.encryptMsg(inputMsg)
    };
    componentDidMount() {
        // 1.获取address user info
        /*
        {
          nickname:'mayne',
          address: 'xxxxxxxxx',
          publicKey:'xxxxxxxxxxxxx'
        }
        */

        // 2.获取本人私钥

    }

    render() {

        let myAddress = localStorage.getItem('nasAddress');

        const {inputMsg} = this.state;
        const msgList = [
            {
                from: 'A',
                to: 'n1XyfmvA3Sc5F35neZRvnuHmoskHRVuwwXa',
                msg: '你好呀',
                timestamp: 12346,
            },
            {
                from: 'A',
                to: 'n1XyfmvA3Sc5F35neZRvnuHmoskHRVuwwXa',
                msg: '你好呀',
                timestamp: 12342,
            },
            {
                from: 'n1XyfmvA3Sc5F35neZRvnuHmoskHRVuwwXa',
                to: 'A',
                msg: '好好好大家都好',
                timestamp: 12343,
            },
            {
                from: 'A',
                to: 'n1XyfmvA3Sc5F35neZRvnuHmoskHRVuwwXa',
                msg: '你好呀',
                timestamp: 12341,
            },
        ];

        return <div className="chat-root">
            <div className="chat-msg">
                {
                    msgList.map(item => {
                        return item.from !== myAddress ? <div className="left">
                                <div className="msg">
                                    {item.msg}
                                </div>
                            </div> :
                            <div className="right">
                                <div className="msg self-msg">
                                    {item.msg}
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