import React, {Component} from 'react';


import '../../App.css';

export default class PersonChat extends Component {


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

    render() {

        let myAddress = localStorage.getItem('nasAddress');

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

        return <div>
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
            <textarea className="chat-input"/>
        </div>
    }

}