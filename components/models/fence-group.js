/**
 * @author Peter
 * @date 2020/7/8
 * @Description: 栅栏组
 */

import {Matrix} from "./matrix";
import {Fence} from "./fence";

class FenceGroup {
    spu
    skuList = []
    fences = []

    constructor(spu) {
        this.spu = spu
        this.skuList = spu.sku_list
    }

    getDefaultSku() {
        const defaultSkuId = this.spu.default_sku_id
        if (!defaultSkuId)
            return
        return this.skuList.find(s =>
            s.id === defaultSkuId
        );
    }

    getSkuById(skuCode) {
        const fullSkuCode = this.spu.id + '$' + skuCode
        const sku = this.spu.sku_list.find(s =>
            s.code === fullSkuCode
        )
        return sku ? sku : null
        // return this.skuList.find(s => {
        //     return s.code === skuCode
        // })
    }

    /**
     * 数据整理清晰，将转置后的矩阵传入fence内部直接构造
     */
    initFences() {
        const matrix = this._createMatrix(this.skuList)
        const fences = []
        const AT = matrix.transpose()
        AT.forEach(r => {
            const fence = new Fence(r)
            fence.init()
            /**
             * 初始化fence后检测是否需要配置可视规格
             */
            if (this._hasSketchFence() && this._isSketchFence(fence.id)){
                fence.setFenceSketch(this.skuList)
            }
            fences.push(fence)
        })
        this.fences = fences
    }


    /**
     * 提取能够承载可视规格（带插图的cell）的栅栏组
     * @param fenceId
     * @returns {boolean}
     * @private
     */
    _isSketchFence(fenceId){
        return this.spu.sketch_spec_id === fenceId
    }

    /**
     * 检测是否拥有服务器返回的可视规格值
     * @returns {boolean}
     * @private
     */
    _hasSketchFence(){
        return !!this.spu.sketch_spec_id
    }

    eachCell(cb) {
        for (let i = 0; i < this.fences.length; i++) {
            for (let j = 0; j < this.fences[i].cells.length; j++) {
                const cell = this.fences[i].cells[j]
                cb(cell, i, j)
            }
        }
    }

    setCellStatusById(cellId, status) {
        this.eachCell((cell) => {
            if (cell.id === cellId) {
                cell.status = status
            }
        })
    }

    setCellStatusByXY(x, y, status) {
        this.fences[x].cells[y].status = status
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