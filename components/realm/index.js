// components/realm/index.js
import {FenceGroup} from "../models/fence-group";

Component({

   properties: {
      spu:Object
   },

   data: {

   },

   methods: {

   },

   lifetimes:{
      attached() {
      },
      ready() {
      },
      created() {
      }
   },

   observers:{
     'spu':function (spu) {
         if (!spu){
            return
         }
         const fencesGroup = new FenceGroup(spu)
        fencesGroup.initFences()
     }
   }
})
