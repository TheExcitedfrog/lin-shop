import {Http} from "../utils/http";

class Spu {
    static getDetail(id){
        return Http.request({
            url:`maoyi`
        })
    }
}

export {
    Spu
}