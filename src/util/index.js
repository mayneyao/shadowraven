export function b64EncodeUnicode(str) {
    return btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g, function (match, p1) {
        return String.fromCharCode('0x' + p1);
    }));
}

export function b64DecodeUnicode(str) {
    return decodeURIComponent(atob(str).split('').map(function (c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
}


export function splitStr(str, len) {
    if (str.length < len) {
        return [str]
    } else {
        let res = [];
        let group_num = Math.ceil(str.length / len);
        for (let i = 0; i < group_num; i++) {
            res.push(str.slice(i * len, (i + 1) * len));
        }
        return res
    }
}

export function getNasAddress() {
    if (typeof(webExtensionWallet) === "undefined") {
        return;
    }

    window.postMessage({
        "target": "contentscript",
        "data": {},
        "method": "getAccount",
    }, "*");

    window.addEventListener('message', function (e) {
        if (e.data && e.data.data && e.data.data.account) {
            const address = e.data.data.account;
            localStorage.setItem('nasAddress', address);
        }
    });
};


export const contract = 'n1zCMbHfTp2KHamJbhpRPtsriaivQjFaBa3';

