import React, {Component} from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import BeachAccessIcon from '@material-ui/icons/BeachAccess';
import {Link} from "react-router-dom";

export default class RecentContacts extends Component {

    render() {
        const contacts = [
            {
                name: 'ABBBBBB',
            },
            {
                name: 'AAAAAA',
            },
            {
                name: 'BBBBBB',
            },
            {
                name: 'BBBBBB',
            },
            {
                name: '12312123',
            },
            {
                name: 'ABBBBBB',
            },
            {
                name: 'AAAAAA',
            },
        ];

        return <div style={{width: 300, height: 900, overflowY: 'scroll'}}>
            <List>
                {
                    contacts.map(item => {
                        return <Link to={`/msg/${item.name}`}>
                            <ListItem button>
                                <Avatar>
                                    <BeachAccessIcon/>
                                </Avatar>
                                <ListItemText primary={item.name} secondary="July 20, 2014"/>
                            </ListItem>
                        </Link>
                    })
                }
            </List>
        </div>
    }

}