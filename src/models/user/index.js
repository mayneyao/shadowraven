import nebulas from 'nebulas';
import JSEncrypt from 'jsencrypt';

import {getNasAddress} from '../../util/index';


class User {
    constructor() {
        let Neb = nebulas.Neb;
        let neb = new Neb();
        neb.setRequest(new HttpRequest("https://testnet.nebulas.io"));
        this.neb = neb;
    }


    checkUserRegistered = () => {

    };

}