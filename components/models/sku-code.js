/**
 * @name: sku-code
 * @author: pkh
 * @date: 2020-07-08 10:29
 * @description：sku-code
 * @update: 2020-07-08 10:29
 */
import {combination} from "../../utils/util";

class SkuCode {
    code
    spuId
    totalSegments = []
    constructor(code) {
        this.code = code
        this._splitToSegments()
    }

    _splitToSegments(){
        const spuAndSpec = this.code.split('$')
        this.spuId = spuAndSpec[0]

        const specCodeArray = spuAndSpec[1].split('#')
        const length = specCodeArray.length

        for (let i=1;i<=length;i++){
            const segments = combination(specCodeArray,i)
            const newSegments = segments.map(segs=>{
                return segs.join('#')
            })
            this.totalSegments = this.totalSegments.concat(newSegments)
        }
        //少写显式for循环
    }
}

export {
    SkuCode
}