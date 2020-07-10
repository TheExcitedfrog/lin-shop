// pages/detail/detail.js
import {Spu} from "../../models/spu";
import {ShoppingWay} from "../../core/enum";

Page({

   data: {
      showRealm:false
   },

   onLoad: async function (options) {
      const pid = options.pid
      const spu = await Spu.getDetail(pid)
      this.setData({
         spu:spu[0]
      })
   },

   onAddToCart(event){
     this.setData({
        showRealm:true,
        orderWay:ShoppingWay.CART
     })
   },

   onBuy(event){
      this.setData({
         showRealm:true,
         orderWay:ShoppingWay.BUY
      })
   },

   onGoToHome(event){
      wx.switchTab({
         url:'/pages/home/home'
      })
   },

   onGoToCart(event){
      wx.switchTab({
         url:'/pages/cart/cart'
      })
   },

   onReady: function () {

   },
})