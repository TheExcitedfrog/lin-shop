/**
 * @name: sku-pending
 * @author: pkh
 * @date: 2020-07-08 15:54
 * @description：sku-pending cell模块数据状态管理
 * @update: 2020-07-08 15:54
 */
import {Cell} from "./cell";
import {Joiner} from "../../utils/joiner";

class SkuPending {
    pending = []
    size
    code

    constructor(size) {
        this.size = size
    }

    init(sku) {
        // this.size = sku.specs.length
        for (let i = 0; i < sku.specs.length; i++) {
            const cell = new Cell(sku.specs[i])
            this.insertCell(cell, i)
        }
    }

    getCurrentSpecValues() {
        const values = this.pending.map(cell => {
            return cell ? cell.spec.value : null
        })
        return values
    }

    getMissingSpecKeysIndex() {
        const keysIndex = []
        for (let i=0;i<this.size;i++){
            if (!this.pending[i]){
                keysIndex.push(i)
            }
        }
        return keysIndex
    }

    getSkuCode(spu) {
        const joiner = new Joiner('#')
        this.pending.forEach(cell => {
            const cellCode = cell.getCellCode()
            joiner.join(cellCode)
        })
        return joiner.getStr()
        //自写方法
        // if (!this.isIntact()) {
        //     return false
        // }
        // const ret = []
        // for (let i=0;i<this.size;i++){
        //     ret[i] = this.pending[i].spec.key_id + '-' + this.pending[i].spec.value_id
        //     this.code = ret.join('#')
        // }
        // this.code = spu.id + '$' + this.code
        // return this.code
    }

    isIntact() {
        // if (this.size !== this.pending.length) {
        //     return false
        // }
        for (let i = 0; i < this.size; i++) {
            if (this._isEmptyPart(i)) {
                return false
            }
        }
        return true
    }

    _isEmptyPart(index) {
        return this.pending[index] ? false : true
    }

    insertCell(cell, x) {
        this.pending[x] = cell
    }

    removeCell(cell, x) {
        this.pending[x] = null
    }

    findSelectedCellByX(x) {
        return this.pending[x]
    }

    isSelected(cell, x) {
        const pendingCell = this.pending[x]
        if (!pendingCell) {
            return false
        }
        return cell.id === pendingCell.id
    }


}

export {
    SkuPending
}