import React, {Component} from 'react';


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

        const {from} = this.props.match.params;

        return <div>

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
    }

}