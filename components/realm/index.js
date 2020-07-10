// components/realm/index.js
import {FenceGroup} from "../models/fence-group";
import {Judger} from "../models/judger";
import {Spu} from "../../models/spu";
import {Cell} from "../models/cell";
import {Cart} from "../../models/cart";

Component({

    properties: {
        spu: Object,
        orderWay:String
    },

    data: {
        judger: Object,
        previewImg: null,
        noSpec: false,
        currentSkuCount: Cart.SKU_MIN_COUNT
    },

    methods: {
        bindFenceGroupData(fenceGroup) {
            this.setData({
                fences: fenceGroup.fences,

            })
        },

        setStockStatus(stock, currentCount) {
            this.setData({
                outStock: this.isOutOfStock(stock, currentCount)
            })
        },

        isOutOfStock(stock, currentCount) {
            return stock < currentCount
        },

        onSelectCount(event) {
            const currentCount = event.detail.count
            this.data.currentSkuCount = currentCount

            if (this.data.judger.isSkuIntact()) {
                const sku = this.data.judger.getDeterminateSku()
                this.setStockStatus(sku.stock, currentCount)
            }
        },

        onCellTap(event) {
            const data = event.detail.cell
            const x = event.detail.x
            const y = event.detail.y

            const cell = new Cell(data.spec)
            cell.status = data.status

            const judger = this.data.judger
            judger.judge(cell, x, y)
            //判断sku已经被选择了一条完整的路径
            const skuIntact = judger.isSkuIntact()
            if (skuIntact) {
                const currentSku = judger.getDeterminateSku()
                this.bindSkuData(currentSku)
                this.setStockStatus(currentSku.stock, this.data.currentSkuCount)
                //直接传递judger下的spu能够避免新建一个cell状态值必须手动更新的问题
                // const skuId = judger.skuPending.getSkuCode(judger.fenceGroup.spu)
                // this.bindSkuData(judger.fenceGroup.getSkuById(skuId))
            }
            this.bindTipData()
            this.bindFenceGroupData(judger.fenceGroup)
        },

        bindTipData() {
            this.setData({
                skuIntact: this.data.judger.isSkuIntact(),
                currentValues: this.data.judger.getCurrentValues(),
                missingKeys: this.data.judger.getMissingKeys()
            })
        },

        bindSpuData() {
            const spu = this.properties.spu
            this.setData({
                previewImg: spu.img,
                title: spu.title,
                price: spu.price,
                discountPrice: spu.discount_price,
            })
        },
        bindSkuData(sku) {
            this.setData({
                previewImg: sku.img,
                title: sku.title,
                price: sku.price,
                discountPrice: sku.discount_price,
                stock: sku.stock,
            })
        },
        processNoSpec(spu) {
            this.setData({
                noSpec: true
            })
            this.bindSkuData(spu.sku_list[0])
            this.setStockStatus(spu.sku_list[0],this.data.currentSkuCount)
        },
        processHasSpec(spu) {
            const fencesGroup = new FenceGroup(spu)
            fencesGroup.initFences()
            const judger = new Judger(fencesGroup)
            this.data.judger = judger

            const defaultSku = fencesGroup.getDefaultSku()
            if (defaultSku) {
                this.bindSkuData(defaultSku)
                this.setStockStatus(defaultSku.stock, this.data.currentSkuCount)
            } else {
                this.bindSpuData()
            }
            this.bindTipData()
            this.bindFenceGroupData(fencesGroup)
        }
    },

    lifetimes: {
        attached() {
        },
        ready() {
        },
        created() {
        }
    },
    /**
     * 监听spu传值并初始化一个栅栏组
     */
    observers: {
        'spu': function (spu) {
            if (!spu) {
                return
            }
            if (Spu.isNoSpec(spu)) {
                this.processNoSpec(spu)
            } else {
                this.processHasSpec(spu)
            }
        }
    }
})
