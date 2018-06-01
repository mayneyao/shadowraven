import React, {Component} from 'react';

import {HashRouter as Router, Link, Redirect, Route, Switch} from "react-router-dom";
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/Inbox';


import PersonChat from './components/PersonChat';

import {withStyles} from '@material-ui/core/styles';
import './App.css';


const style = {
    root: {
        display: 'flex',
        height: '1000px',
    },
    nav1: {
        flex: 1,
        width: '72px',
        backgroundColor: '#222'
    },
    nav2: {
        flex: 5,
        width: '256px',
        backgroundColor: '#333',
        color: '#eee'
    },

    main: {
        flex: 20,
    }
};


const routes = [

    {
        path: '/msg',
        component: () => <ListItem button>
            <ListItemIcon>
                <InboxIcon/>
            </ListItemIcon>
            <ListItemText primary="好友"/>
        </ListItem>
    },

    {
        path: '/msg/:from',
        component: (props) => <PersonChat {...props}/>
    },
];

const myMsg = [
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

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            username: 'B'
        }
    }

    render() {
        const {classes} = this.props;

        const {username} = this.state;
        const {hash} = window.location;
        console.log(window.location);
        console.log(hash)
        return (

            <Router>
                <div className={classes.root}>
                    <div role="nav1" className={classes.nav1}>
                        这里是导航1
                    </div>
                    <div role="nav2" className={classes.nav2}>
                        <div>
                            {
                                hash.indexOf('msg') > -1 && <ListItem button>
                                    <ListItemIcon>
                                        <InboxIcon/>
                                    </ListItemIcon>
                                    <ListItemText primary="好友"/>
                                </ListItem>
                            }
                        </div>
                        <div>私信</div>
                        {
                            myMsg.filter(item => item.to === username).map(item => {
                                return <Link to={`/msg/from/${item.from}`}>
                                    <ListItem button>
                                        <ListItemIcon>
                                            <InboxIcon/>
                                        </ListItemIcon>
                                        <ListItemText primary={item.from}/>
                                    </ListItem>
                                </Link>

                            })
                        }
                        <div>

                        </div>
                    </div>
                    <div role="main" className={classes.main}>
                        {
                            routes.map((item, index) => <Route
                                key={`menu${index}`}
                                path={item.path}
                                exact={true}
                                component={item.component}
                            />)
                        }

                    </div>
                </div>
            </Router>

        );
    }
}

export default withStyles(style)(App);
