// components/realm/index.js
import {FenceGroup} from "../models/fence-group";
import {Judger} from "../models/judger";

Component({

    properties: {
        spu: Object
    },

    data: {
        judger: Object
    },

    methods: {
        bindInitData(fenceGroup) {
            this.setData({
                fences: fenceGroup.fences
            })
        },
        onCellTap(event) {
            const cell = event.detail.cell
            const x = event.detail.x
            const y = event.detail.y
            const judger = this.data.judger
            judger.judge(cell,x,y)
            this.setData({
                fences: judger.fenceGroup.fences
            })
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
            const fencesGroup = new FenceGroup(spu)
            fencesGroup.initFences()
            const judger = new Judger(fencesGroup)
            this.data.judger = judger
            this.bindInitData(fencesGroup)
        }
    }
})
