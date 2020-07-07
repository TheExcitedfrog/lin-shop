// pages/detail/detail.js
import {Spu} from "../../models/spu";

Page({

   data: {

   },

   onLoad: async function (options) {
      const pid = options.pid
      const spu = await Spu.getDetail(pid)
      this.setData({
         spu:spu[0]
      })
   },

   onReady: function () {

   },


   onShow: function () {

   },

   onHide: function () {

   },

   onUnload: function () {

   },

   onPullDownRefresh: function () {

   },

   onReachBottom: function () {

   },

   onShareAppMessage: function () {

   }
})