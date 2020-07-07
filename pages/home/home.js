import {Theme} from "../../models/theme";
import {Banner} from "../../models/banner";
import {Category} from "../../models/category";
import {Activity} from "../../models/activity";
import {SpuPaging} from "../../models/spu-paging";
import {Paging} from "../../utils/paging";

Page({

    data: {
        themeA: null,
        bannerB: null,
        grid: [],
        activityD: null,
        spuPaging: null,
        loadingType: 'loading'
    },

    async onLoad(options) {
        this.initAllData()
        this.initBottomSpuList()
    },
    /**
     * 初始化瀑布流数据
     * @returns {Promise<void>}
     */
    async initBottomSpuList() {
        const paging = await SpuPaging.getLatestPaging()
        this.data.spuPaging = paging
        const data = await paging.getMoreData()
        if (!data) {
            return
        }
        wx.lin.renderWaterFlow(data.items)
    },

    /**
     * 初始化板块信息并进行数据绑定
     * @returns {Promise<void>}
     */
    async initAllData() {
        const theme = new Theme();
        await theme.getThemes()

        const themeA = theme.getHomeLocationA()
        const themeE = theme.getHomeLocationE()
        const themeF = theme.getHomeLocationF()
        const themeH = theme.getHomeLocationH()
        let themeESpu = []
        if (themeE.online) {
            const data = await Theme.getHomeLocationESpu()
            if (data) {
                themeESpu = data.slice(0, 8)
            }
        }
        const bannerB = await Banner.getHomeLocationB();
        const bannerG = await Banner.getHomeLocationG()
        const grid = await Category.getHomeLocationC();
        const activityD = await Activity.getHomeLocationD();
        const SpuList = await Theme.getHomeLocationESpu()
        this.setData({
            themeA,
            bannerB: bannerB[0],
            activityD,
            themeE,
            themeESpu,
            themeF,
            bannerG: bannerG[0],
            themeH,
            grid,
            SpuList
        })
    },

    onReady: function () {

    },

    onPullDownRefresh: function () {

    },
    /**
     * 下拉底部后下拉获取新数据
     * @returns {Promise<void>}
     */
    onReachBottom: async function () {
        const data = await this.data.spuPaging.getMoreData()

        if (!data) {
            this.setData({
                loadingType: 'end'
            })
            console.log('null')
            return
        }
        wx.lin.renderWaterFlow(data.items)
        // if (!data.moreData){
        //     this.setData({
        //         loadingType:'end'
        //     })
        // }
    },

    onShareAppMessage: function () {

    }
})