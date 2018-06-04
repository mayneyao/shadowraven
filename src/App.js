import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import {Route, withRouter} from "react-router-dom";
import ContactsIcon from '@material-ui/icons/Contacts';
import ChatIcon from '@material-ui/icons/ChatBubble';
import SettingIcon from '@material-ui/icons/Settings';


import JSEncrypt from 'jsencrypt';
import Chat from './components/ChatTab';
import Setting from './components/Setting';


import './App.css';

import {getNasAddress} from './util/index';
import RecentContacts from "./components/RecentContacts/index";

import Contacts from "./components/Contacts/index";

const styles = {
    root: {
        flexGrow: 1,
    },
};

class CenteredTabs extends React.Component {

    handleChange = (event, value) => {
        this.setState({value}, () => {
            switch (value) {
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

    reg = () => {
        // 支持 512、1024、2048、4096
        // key 越长, 生成密钥和加密时间越长
        let crypt = new JSEncrypt({default_key_size: 1024});

        // 获取公钥
        let public_key = crypt.getPublicKey();
        console.log(public_key);

        // 获取私钥
        let private_key = crypt.getPrivateKey();
        console.log(private_key);
    };

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

    componentDidMount() {
        getNasAddress()
    }

    render() {

        const {classes} = this.props;
        // const {value} = this.state;
        console.log(this.props)
        let value = 0;
        if (this.props.location.pathname === "/") {
            value = 0
        } else if (this.props.location.pathname === "/contact") {
            value = 1
        } else if (this.props.location.pathname === "/setting") {
            value = 2
        }
        return (

            <div>
                <Paper>
                    <Tabs value={value}
                          onChange={this.handleChange}
                          textColor="primary"
                          centered>
                        <Tab icon={<ChatIcon/>}/>
                        <Tab icon={<ContactsIcon/>}/>
                        <Tab icon={<SettingIcon/>}/>
                    </Tabs>
                </Paper>
                <main style={{display: 'flex'}}>
                    <div style={{flex: 6}}>

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
                            path="/msg/:from"
                            component={Chat}
                        />

                        <Route
                            path="/setting"
                            component={Setting}
                        />
                    </div>
                </main>
            </div>
        );
    }
}

CenteredTabs.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withRouter(withStyles(styles)(CenteredTabs));