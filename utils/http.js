
import {config} from "../config/config";
import {promisic} from "../miniprogram_npm/lin-ui/utils/util";

class Http {
    /**
     * 封装ajax方法，返回一个promise
     * @param url
     * @param data
     * @param method
     * @returns {Promise<*>}
     */
    static async request({url,data,method='GET'}){
        const res = await promisic(wx.request)({
            url:`${config.apiBaseUrl}${url}`,
            data,
            method,
            header:{
            }
        })
        return res.data;
    }
}

export {
    Http
}


