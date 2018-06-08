import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import {Route, withRouter} from "react-router-dom";
import ContactsIcon from '@material-ui/icons/Contacts';
import ChatIcon from '@material-ui/icons/ChatBubble';
import SettingIcon from '@material-ui/icons/Settings';
import NotificationsIcon from '@material-ui/icons/Notifications';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';

import Chat from './components/ChatTab';
import Setting from './components/Setting';


import './App.css';

import {contract, getNasAddress} from './util/index';
import RecentContacts from "./components/RecentContacts/index";
import Contacts from "./components/Contacts/index";
import ContactDetail from "./components/ContactDetail/index";
import Register from "./components/Register/index";
import Request from "./components/Request/index";

import RequestDetail from "./components/Request/detail";
import {HttpRequest, Neb} from 'nebulas';


const styles = theme => ({
    root: {
        display: 'flex',
        position: 'absolute',
        height: '100%',
        width: '100%',
    }
    ,
    nav: {
        flex: 1,
        display: 'flex',
        flexDirection:
            'column',
        backgroundColor:
            '#eee'
    },

    nav2: {
        width: 300,
        flex: 6,
        borderRight: '1px solid #eee',
    },

    main: {
        flex: 30,
        height: '100%'
    },
    button: {
        margin: theme.spacing.unit,
    }
});

class CenteredTabs extends React.Component {


    constructor(props) {
        super(props)
        this.state = {
            createDialogOpen: false
        }
    }

    handleChange = (value) => {
        this.setState({value}, () => {
            switch (value) {
                case 3:
                    this.props.history.push("/request");
                    break;
                case 2:
                    this.props.history.push("/setting");
                    break;
                case 1:
                    this.props.history.push("/contact");
                    break;
                case 0:
                    this.props.history.push("/");
                    break;
            }

        });
    };

    checkUserRegistered = () => {
        let address = 'n1XyfmvA3Sc5F35neZRvnuHmoskHRVuwwXa';
        let neb = new Neb();
        neb.setRequest(new HttpRequest("https://testnet.nebulas.io"));
        let nebApi = neb.api;
        if (address) {
            let args = [];
            nebApi.getNebState().then(state => {
                nebApi.call({
                    chainID: state.chain_id,
                    from: address,
                    to: contract,
                    value: 0,
                    gasPrice: 1000000,
                    gasLimit: 2000000,
                    contract: {
                        function: 'getUserInfo',
                        args: args + ""
                    }
                }).then(function (resp) {
                    if (JSON.parse(resp.result)) {

                    }
                });
            })
        }
    };

    componentDidMount() {
        getNasAddress();
        this.checkUserRegistered();
    }

    render() {
        const {classes} = this.props;
        let value = 0;
        if (this.props.location.pathname === "/") {
            value = 0
        } else if (this.props.location.pathname === "/contact") {
            value = 1
        } else if (this.props.location.pathname === "/setting") {
            value = 2
        } else if (this.props.location.pathname === "/request") {
            value = 3
        }
        return (
            <div className={classes.root}>
                <nav className={classes.nav}>
                    <List component="nav">
                        <ListItem button onClick={() => this.handleChange(0)}>
                            <ListItemIcon>
                                <ChatIcon/>
                            </ListItemIcon>
                        </ListItem>
                        <ListItem button onClick={() => this.handleChange(1)}>
                            <ListItemIcon>
                                <ContactsIcon/>
                            </ListItemIcon>
                        </ListItem>
                        <ListItem button onClick={() => this.handleChange(3)}>
                            <ListItemIcon>
                                <NotificationsIcon/>
                            </ListItemIcon>
                        </ListItem>
                        <ListItem button onClick={() => this.handleChange(2)}>
                            <ListItemIcon>
                                <SettingIcon/>
                            </ListItemIcon>
                        </ListItem>

                    </List>
                </nav>

                <nav className={classes.nav2}>
                    <Route
                        path="/"
                        exact
                        component={RecentContacts}
                    />

                    <Route
                        path="/contact"
                        exact
                        component={Contacts}
                    />

                    <Route
                        path="/contact/:address"
                        exact
                        component={Contacts}
                    />
                    <Route
                        path="/msg/:from"
                        component={RecentContacts}
                    />
                    <Route
                        path="/request"
                        component={Request}
                    />
                </nav>
                <main className={classes.main}>

                    <Route
                        path="/request/:address"
                        exact
                        component={RequestDetail}
                    />

                    <Route
                        path="/contact/:address"
                        exact
                        component={ContactDetail}
                    />

                    <Route
                        path="/msg/:from"
                        component={Chat}
                    />

                    <Route
                        path="/setting"
                        component={Setting}
                    />

                    <Route
                        path="/register"
                        component={Register}
                    />

                </main>
            </div>
        );
    }
}

CenteredTabs.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withRouter(withStyles(styles)(CenteredTabs));