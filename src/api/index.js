import {HttpRequest, Neb} from 'nebulas';
import {contract} from '../../util';


// 查询
export function api(address, action, args) {
    let neb = new Neb();
    neb.setRequest(new HttpRequest("https://testnet.nebulas.io"));
    let nebApi = neb.api;
    return nebApi.getNebState().then((state) => {
        nebApi.call({
            chainID: state.chain_id,
            from: address,
            to: contract,
            value: 0,
            gasPrice: 1000000,
            gasLimit: 2000000,
            contract: {
                function: action,
                args: JSON.stringify(args)
            }
        });
    });

}