import React, {Component} from 'react';

export default class Setting extends Component {

    constructor(props) {
        super(props);
        this.state = {
            address: null
        }
    }

    render() {

        let address = localStorage.getItem('nasAddress');

        return <div>
            {
                address ? address : <p>为检测到钱包插件</p>
            }
        </div
        >
    }

}