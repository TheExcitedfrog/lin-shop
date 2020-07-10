// components/tab-bar/index.js
Component({
   properties: {

   },

   data: {

   },

   methods: {
      onGonGoToHome(event){
         this.triggerEvent('gotohome',{

         })
      },
      onGoToCart(event){
         this.triggerEvent('gotocart',{

         })
      },
      onAddToCart(event){
         this.triggerEvent('addtocart',{

         })
      },
      onBuy(event){
         this.triggerEvent('buy',{

         })
      }
   }

})
