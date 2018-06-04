import React, {Component} from 'react';
import Slide from '@material-ui/core/Slide';


function Transition(props) {
    return <Slide direction="up" {...props} />;
}


export default class Contacts extends Component {
    constructor(props) {
        super(props)
        this.state = {
            open: false,
            selectedAddress: null,
        }
    }


    render() {


        const contacts = [
            {
                name: 'mayne',
                address: 'n1XyfmvA3Sc5F35neZRvnuHmoskHRVuwwXa'
            },
            {
                name: 'ruter',
                address: 'n1U9yTcVAcQo3HUtnNSxaW2vZQjFWQXCn5D'
            },
            {
                name: 'xxx',
                address: 'n1KMmjBEQ8UNhum4pEYfvYpNB6V76paMYHh'
            },
        ];

        const {address} = this.props.match.params;

        return <div>
            <div style={{flex: 7}}>
                {
                    address && <div style={{padding: '1em'}}>
                        <div>
                            昵称: {contacts.filter(item => item.address === address)[0].name}
                        </div>

                        <div>
                            地址: {contacts.filter(item => item.address === address)[0].address}
                        </div>
                    </div>
                }

            </div>
        </div>
    }

}