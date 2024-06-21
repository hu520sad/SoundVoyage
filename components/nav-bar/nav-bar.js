const app=getApp()


Component({
    options:{
        multipleSlots:true
    },
  properties: {

  },

  data: {
    statusHeight:10,
  },

  lifetimes:{
      attached(){
          this.setData({statusHeight:app.globalData.statusBarHeight})
      }
  }

})