/**
 * @name: judger
 * @author: pkh
 * @date: 2020-07-08 10:26
 * @description：用于拆分SKU的可能路径和路径判断
 * @update: 2020-07-08 10:26
 */
import {SkuCode} from "./sku-code";
import {CellStatus} from "../../core/enum";
import {SkuPending} from "./sku-pending";
import {Joiner} from "../../utils/joiner";

class Judger {
    fenceGroup
    pathDict = []
    skuPending

    constructor(fenceGroup) {
        this.fenceGroup = fenceGroup
        this._initPathDict()
        this._initSkuPending()
    }

    isSkuIntact(){
        return this.skuPending.isIntact()
    }

    getCurrentValues(){
        return this.skuPending.getCurrentSpecValues()
    }

    getMissingKeys(){
        const missingKeysIndex = this.skuPending.getMissingSpecKeysIndex()
        return missingKeysIndex.map(i=>{
            return this.fenceGroup.fences[i].title
        })
    }

    _initSkuPending() {
        const specsLength = this.fenceGroup.fences.length
        this.skuPending = new SkuPending(specsLength)
        const defaultSku = this.fenceGroup.getDefaultSku()
        if (!defaultSku) {
            return
        }
        this.skuPending.init(defaultSku)
        this._initSelectedCell()
        console.log(this.skuPending)
    }

    getDeterminateSku(){
        const code = this.skuPending.getSkuCode()
        return this.fenceGroup.getSkuById(code)
    }

    _initSelectedCell(){
        this.skuPending.pending.forEach(cell => {
                this.fenceGroup.setCellStatusById(cell.id,CellStatus.SELECTED)
            }
        )
        this.judge(null, null, null, true)
    }

    /**
     * 初始化路径字典
     * @private
     */
    _initPathDict() {
        this.fenceGroup.spu.sku_list.forEach(s => {
            const skuCode = new SkuCode(s.code)
            this.pathDict = this.pathDict.concat(skuCode.totalSegments)
        })
    }

    /**
     * 判断sku点击态
     * @param cell
     * @param x
     * @param y
     * @param isInit 如果不是初始化情况，则会设置默认sku
     */
    judge(cell, x, y, isInit = false) {
        if (!isInit) {
            this._changeCurrentCellsStatus(cell, x, y)
        }

        this.fenceGroup.eachCell((cell, x, y) => {
            const path = this._findPotentialPath(cell, x, y)
            if (!path) {
                return
            }
            const isIn = this._isInDict(path)
            if (isIn) {
                this.fenceGroup.setCellStatusByXY(x, y, CellStatus.WAITING)
            } else {
                this.fenceGroup.setCellStatusByXY(x, y, CellStatus.FORBIDDEN)
            }
        })
    }

    _isInDict(path) {
        return this.pathDict.includes(path)
    }

    /**
     * 寻找可能的潜在路径算法
     * @param cell
     * @param x
     * @param y
     * @private
     */
    _findPotentialPath(cell, x, y) {
        const joiner = new Joiner('#')
        for (let i = 0; i < this.fenceGroup.fences.length; i++) {
            const selected = this.skuPending.findSelectedCellByX(i)
            if (x === i) {
                //当前行 如果用简单判断是否是已选择节点会出现同一行切换而老cell不能被更新的情况
                // cell.status === CellStatus.SELECTED
                if (this.skuPending.isSelected(cell, x)) {
                    return
                }
                const cellCode = this._getCellCode(cell.spec)
                joiner.join(cellCode)
            } else {
                //其他行
                if (selected) {
                    const selectedCellCode = this._getCellCode(selected.spec)
                    joiner.join(selectedCellCode)
                }
            }
        }
        return joiner.getStr()
    }

    _getCellCode(spec) {
        return spec.key_id + '-' + spec.value_id
    }

    /**
     * 传递cell对象和cell在矩阵的行列，通过直接修改fence矩阵下的对应cell的status，后realm中控重新绑定视图数据
     * @param cell 对象
     * @param x 行
     * @param y 列
     * @private
     */
    _changeCurrentCellsStatus(cell, x, y) {
        if (cell.status === CellStatus.WAITING) {
            this.fenceGroup.setCellStatusByXY(x, y, CellStatus.SELECTED)
            this.skuPending.insertCell(cell, x)
        }

        if (cell.status === CellStatus.SELECTED) {
            this.fenceGroup.setCellStatusByXY(x, y, CellStatus.WAITING)
            this.skuPending.removeCell(cell, x)
        }
    }
}

export {
    Judger
}