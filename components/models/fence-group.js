import {Matrix} from "./matrix";
import {Fence} from "./fence";

class FenceGroup {
    spu
    skuList = []

    constructor(spu) {
        this.spu = spu
        this.skuList = spu.sku_list
    }

    /**
     * 数据整理清晰，将转置后的矩阵传入fence内部直接构造
     */
    initFences(){
        const matrix = this._createMatrix(this.skuList)
        const fences = []
        const AT = matrix.transpose()
        AT.forEach(r=>{
            const fence = new Fence(r)
            fence.init()
            fences.push(fence)
        })
        console.log(fences)
    }

    _createMatrix(skuList) {
        const m = []
        skuList.forEach(sku => {
            m.push(sku.specs)
        })
        return new Matrix(m)
    }


    // _createFence(element){
    //     const fence = new Fence()
    //     return fence
    // }


    //
    // //数据十分零碎，被动将数据解析后暴力排列
    // initFences1() {
    //     const matrix = this._createMatrix(this.skuList)
    //     const fences = []
    //     let currentJ = -1
    //     //callback遍历矩阵内容，再通过列号确定是否创建一个新的fence，在同一个fence内，将ele推入数组中，完成数据初始化
    //     matrix.each((element, i, j) => {
    //         if (currentJ !== j) {
    //             //开启一个新列，需要创建一个新的fence
    //             currentJ = j
    //             fences[j] = this._createFence(element)
    //         }
    //         fences[j].pushValueTitle(element.value)
    //     })
    // }
}



export {
    FenceGroup
}