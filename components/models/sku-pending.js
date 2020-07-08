/**
 * @name: sku-pending
 * @author: pkh
 * @date: 2020-07-08 15:54
 * @description：sku-pending cell模块数据状态管理
 * @update: 2020-07-08 15:54
 */

class SkuPending {
    pending = []
    constructor() {

    }

    insertCell(cell,x){
        this.pending[x] = cell
    }

    removeCell(cell,x){
        this.pending[x] = null
    }

    findSelectedCellByX(x){
        return this.pending[x]
    }

    isSelected(cell,x){
        const pendingCell = this.pending[x]
        if (!pendingCell){
            return false
        }
        return cell.id === pendingCell.id
    }
}

export {
    SkuPending
}