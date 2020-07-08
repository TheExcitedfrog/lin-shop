/**
 * @name: joiner
 * @author: pkh
 * @date: 2020-07-08 16:31
 * @description：joiner 字符串拼接工具
 * @update: 2020-07-08 16:31
 */
class Joiner {
    _str = ''
    _symbol = '-'
    _cutCharNum = 1
    constructor(symbol, cutCharNum) {
        if (symbol) {
            this._symbol = symbol
        }
        if (cutCharNum){
            this._cutCharNum = cutCharNum
        }
    }
    join(part) {
        if (part) {
            this._str += `${part}${this._symbol}`;
        }
    }
    getStr() {
        return this._str.substring(0, this._str.length - this._cutCharNum)
    }
}

export {
    Joiner
}