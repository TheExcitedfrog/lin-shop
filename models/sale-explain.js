/**
 * @name: sale-explain
 * @author: pkh
 * @date: 2020-07-11 13:55
 * @description：sale-explain
 * @update: 2020-07-11 13:55
 */
import {Http} from "../utils/http";

class SaleExplain {
    static async getFixed(){
        const explains = await Http.request({
            url:`sale-explain`
        })
        return explains.map(e=>{
            return e.text
        })
    }
}

export {
    SaleExplain
}