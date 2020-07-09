// components/realm/index.js
import {FenceGroup} from "../models/fence-group";
import {Judger} from "../models/judger";
import {Spu} from "../../models/spu";
import {Cell} from "../models/cell";

Component({

    properties: {
        spu: Object
    },

    data: {
        judger: Object,
        previewImg: null,
        noSpec: false
    },

    methods: {
        bindFenceGroupData(fenceGroup) {
            this.setData({
                fences: fenceGroup.fences,

            })
        },
        onCellTap(event) {
            const data = event.detail.cell
            const x = event.detail.x
            const y = event.detail.y

            const cell = new Cell(data.spec)
            cell.status = data.status

            const judger = this.data.judger
            judger.judge(cell, x, y)
            const skuIntact = judger.isSkuIntact()
            if (skuIntact){
                const currentSku = judger.getDeterminateSku()
                this.bindSkuData(currentSku)

                //直接传递judger下的spu能够避免新建一个cell状态值必须手动更新的问题
                // const skuId = judger.skuPending.getSkuCode(judger.fenceGroup.spu)
                // this.bindSkuData(judger.fenceGroup.getSkuById(skuId))
            }
            this.bindTipData()
            this.bindFenceGroupData(judger.fenceGroup)
        },

        bindTipData(){
            this.setData({
                skuIntact:this.data.judger.isSkuIntact(),
                currentValues:this.data.judger.getCurrentValues(),
                missingKeys:this.data.judger.getMissingKeys()
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
        },
        processHasSpec(spu) {
            const fencesGroup = new FenceGroup(spu)
            fencesGroup.initFences()
            const judger = new Judger(fencesGroup)
            this.data.judger = judger

            const defaultSku = fencesGroup.getDefaultSku()
            if (defaultSku) {
                this.bindSkuData(defaultSku)
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
