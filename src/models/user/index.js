import nebulas from 'nebulas';


class User {
    constructor() {
        let Neb = nebulas.Neb;
        let neb = new Neb();
        neb.setRequest(new HttpRequest("https://testnet.nebulas.io"));
        this.neb = neb;

    }

    createUser(address, nickname) {

    }


}