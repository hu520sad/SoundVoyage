// components/section-header/section-header.js
Component({

  /**
   * 组件的属性列表
   */
  properties: {
    title:{
        type:String,
        value:"默认"
    },
    hasMore:{
        type:Boolean,
        value:true,
    }
  },

  data: {
    
  },

  methods: {
    onMoreClick(){
        this.triggerEvent('onMoreEvent')
    }
  }
})