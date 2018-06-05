class ShadowRaven {
    constructor() {
        LocalContractStorage.defineMapProperty(this, 'user');
        LocalContractStorage.defineMapProperty(this, 'userFriendList');
        LocalContractStorage.defineMapProperty(this, 'userGroupList');
        LocalContractStorage.defineMapProperty(this, 'userReceivedRequestList');
        LocalContractStorage.defineMapProperty(this, 'fromToMsgList');
        LocalContractStorage.defineMapProperty(this, 'msg');
        LocalContractStorage.defineMapProperty(this, 'group');
    }

    init() {
        //todo
    }

    // 创建用户
    createUser(nickname, publicKey) {
        const address = Blockchain.transaction.from;
        if (!this.user.get(address)) {
            this.user.put(address, {nickname, publicKey});
        }
        return true
    }

    // 获取用户信息
    getUserInfo() {
        const address = Blockchain.transaction.from;
        return this.user.get(address)
    }


    // 发送好友请求
    requestAddFriend(to) {
        let from = {from: Blockchain.transaction.from, type: 'person'};
        from.nickname = this.user.get(from.from).nickname;

        let toUserInfo = this.user.get(to);

        if (toUserInfo) {

            let userReceivedRequestList = this.userReceivedRequestList.get(to) || [];
            userReceivedRequestList.push(Object.assign(from, {to}));
            this.userReceivedRequestList.put(to, userReceivedRequestList);
            return true

        } else {
            return {success: false, msg: '请求的用户不存在'}
        }
    }

    // a同意将b添加为好友
    addFriend(me, friendAddress) {
        let friendInfo = this.user.get(friendAddress);
        let myFriendList = this.userFriendList.get(me) || [];
        if (!myFriendList.some(item => item.address === address)) {
            myFriendList.push({
                nickname: friendInfo.nickname,
                address
            });
            this.userFriendList.put(me, myFriendList);
            return true
        }
    }

    // 删除来之{from}的请求

    deleteRequest(from) {
        const me = Blockchain.transaction.from;
        let myReceivedRequestList = this.userReceivedRequestList.get(me);
        let myNewReceivedRequestList = myReceivedRequestList.filter(item => item !== from);
        this.userReceivedRequestList.put(me, myNewReceivedRequestList);
        return true
    }

    // 同意来自{from}的好友请求
    agreeRequest(from) {
        const me = Blockchain.transaction.from;
        let myReceivedRequestList = this.userReceivedRequestList.get(me);
        let thisFriendRequest = myReceivedRequestList.filter(item => item.from === from);
        if (thisFriendRequest.length) {
            // 互加好友
            this.addFriend(me, from);
            this.addFriend(from, me);
            // 删除请求
            this.deleteRequest(from);
            return true
        } else {
            return {success: false, msg: '该好友请求不存在'}
        }
    }


    // 创建消息
    createMsg(from, to, content, type) {
        const hash = Blockchain.transaction.hash;
        let date = new Date();
        let timestamp = date.getTime();
        let msg = {from, to, content, type, timestamp};
        this.msg.put(hash, msg);

        let msgKey = `${from}${to}`;
        let fromToMsgList = this.fromToMsgList.get(msgKey) || [];
        fromToMsgList.push(msg);
        this.fromToMsgList.put(msgKey, fromToMsgList);
        return true
    }


    // 获取与{address}的对话
    getMsgWith(to) {
        const from = Blockchain.transaction.from;
        const fromMsgKey = from + to;
        const toMsgKey = to + from;

        let sentMsg = this.fromToMsgList.get(fromMsgKey);
        let receiveMsg = this.fromToMsgList.get(toMsgKey);
        let msgList = sentMsg.concat(receiveMsg);

        return msgList.sort((a, b) => a.timestamp > b.timestamp)
    }

}

module.exports = ShadowRaven;