Component({
    properties: {
        data: Object
    },

    data: {
        tags: Array
    },

    methods: {
        //保持图片比例 width/height = 340rpx/h
        onImgLoad(event) {
            const {width, height} = event.detail
            this.setData({
                w:340,
                h:340*height/width
            })
        },
        onItemTap(event){
            const pid = event.currentTarget.dataset.pid
            wx.navigateTo({
                url:`/pages/detail/detail?pid=${pid}`
            })
        }
    },

    observers: {
        data: function (data) {
            if (!data) {
                return
            }
            if (!data.tags) {
                return;
            }
            const tags = data.tags.split('$')
            this.setData({
                tags
            })
        }
    }
})
