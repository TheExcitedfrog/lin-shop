import {Http} from "../utils/http";

/**
 * 获取activity的ajax请求
 */
class Activity {
    static locationD = '2'
    static async getHomeLocationD(){
        return await Http.request({
            url:`activity/${this.locationD}`
        })
    }
}

export {
    Activity
} 