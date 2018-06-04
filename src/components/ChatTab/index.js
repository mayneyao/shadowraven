import React, {Component} from 'react';

import RecentContacts from '../RecentContacts';

export default class PersonChat extends Component {

    render() {
        const msgList = [
            {
                from: 'A',
                to: 'B',
                msg: '你好呀',
                timestamp: 12346,
            },
            {
                from: 'A',
                to: 'B',
                msg: '你好呀',
                timestamp: 12342,
            },
            {
                from: 'B',
                to: 'A',
                msg: '你好呀',
                timestamp: 12343,
            },
            {
                from: 'A',
                to: 'B',
                msg: '你好呀',
                timestamp: 12341,
            },
        ];

        return <div style={{display: 'flex'}}>
            <RecentContacts/>
            <div>
                <div className="chat-msg" style={{height: 600, borderBottom: '1px solid #eee'}}>
                    {
                        msgList.map(item => {
                            return <div>
                                {
                                    item.msg
                                }
                            </div>


                        })
                    }
                </div>
                <div className="chat-input" style={{height: 300}}>
                    <input type="text"/>
                </div>
            </div>
        </div>
    }

}