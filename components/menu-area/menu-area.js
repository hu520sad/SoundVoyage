
const app=getApp()

Component({

  properties: {
    title:{
        type:String,
        value:""
    },
    menuList:{
        type:Array,
        value:[]
    }
  },

  data:{
      screenWidth:375
  },

  methods: {
    onMoreClick(){
        wx.navigateTo({
          url: '/pages/detail-menu/detail-menu',
        })
    }
  },

  lifetimes:{
      attached(){
        this.setData({screenWidth:app.globalData.screenWidth})
      }
  }
})