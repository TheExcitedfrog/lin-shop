import boolean from "../miniprogram_npm/lin-ui/common/async-validator/validator/boolean";
import {Http} from "./http";

class Paging {

    start
    count
    req
    locker = false
    url
    moreData = true
    accumulator = []
    pageNum

    constructor(req, count = 10, start = 0) {
        this.start = start
        this.count = count
        this.req = req
        this.url = req.url
        this.pageNum = 1
    }

    /**
     * 在配置好url等各项参数的情况下返回一个promise数据
     * @returns {Promise<{moreData: boolean, accumulator: [], items: [], empty: boolean}|{moreData: boolean, accumulator: [], items: *, empty: boolean}>}
     */
    async getMoreData() {
        if (!this.moreData){
            return
        }
        if (!this._getLocker()) {
            return
        }
        const data = await this._actualGetData()
        this._releaseLocker()
        return data
    }

    /**
     * 发起一次请求，在函数内检测是否需要分页请求
     * @returns {Promise<{moreData: boolean, accumulator: [], items: [], empty: boolean}|{moreData: boolean, accumulator: [], items: ([]|DataTransferItemList), empty: boolean}|null>}
     * @private
     */
    async _actualGetData() {
        const req = this._getCurrentReq()
        let data = await Http.request(req)
        let paging = data[0]
        if (!paging) {
            return null
        }
        if (paging.total === 0) {
            return {
                empty: true,
                items: [],
                moreData: false,
                accumulator: []
            }
        }
        this.moreData = Paging._moreData(paging.total_page,paging.page)
        if (this.moreData){
            this.start += this.count
        }
        this._accumulate(paging.items)
        return {
            empty:false,
            items:paging.items,
            moreData:this.moreData,
            accumulator:this.accumulator
        }
    }

    static _moreData(totalPage, pageNum) {
        return pageNum < totalPage - 1
    }

    _accumulate(items){
        this.accumulator = this.accumulator.concat(items)
    }

    _getCurrentReq() {
        let url = this.url
        // const params = `start=${this.start}&count=${this.count}`
        // if (url.includes('?')) {
        //     url += '&' + params
        // } else {
        //     url += '?' + params
        // }
        // const params = `_start=${this.pageNum}&_limit=${this.count}`
        // if (url.includes('?')) {
        //     url += '&' + params
        // } else {
        //     url += '?' + params
        // }
        this.req.url = url
        return this.req
    }

    _getLocker() {
        if (this.locker) {
            return false
        }
        this.locker = true
        return true
    }

    _releaseLocker() {
        this.locker = false
    }
}

export {
    Paging
}