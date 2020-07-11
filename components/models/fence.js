/**
 * @author Peter
 * @date 2020/7/8
 * @Description:  单行栅栏
 */
import {Cell} from "./cell";

class Fence {
    cells = []
    specs
    title
    id

    constructor(specs) {
        this.specs = specs
        this.title = specs[0].key
        this.id = specs[0].key_id
    }

    init() {
        this._initCells()
    }

    _initCells() {
        //some 符合表达式就返回true every 要求所有都符合才返回true
        this.specs.forEach(s => {
            const excited = this.cells.some(c => {
                return c.id === s.value_id
            })
            if (excited) {
                return
            }
            const cell = new Cell(s)
            this.cells.push(cell)
        })
    }

    setFenceSketch(skuList) {
        this.cells.forEach(c => {
            this._setCellSkuImg(c, skuList)
        })
    }

    _setCellSkuImg(cell, skuList) {
        const specCode = cell.getCellCode()
        const matchedSku = skuList.find(s =>
                s.code.includes(specCode)
        )
        if (matchedSku){
            cell.skuImg = matchedSku.img
        }
    }
}

export {
    Fence
}