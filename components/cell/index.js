/**
 * @author Peter
 * @date 2020/7/7 
 * @Description: 
*/
Component({

   properties: {
      cell:Object,
      y:Number,
      x:Number
   },

   data: {

   },

   methods: {
      /**
       * 创建一个事件监听器，向上冒泡到realm中控来监听cell点击态
       * @param event
       */
      onTap(event){
         this.triggerEvent('celltap',{
            cell:this.properties.cell,
            x:this.properties.x,
            y:this.properties.y
         },{
            //小程序框架限定，开启冒泡和跨域组件边界
            bubbles:true,
            composed:true
         })
      }
   }
})
