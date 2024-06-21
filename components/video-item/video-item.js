// components/video-item/video-item.js
Component({

  properties: {
    itemData:{
        type:Object,
        value:{}
    }
  },

  methods: {
    onItemTab(){
        const id=this.properties.itemData.id
        wx.navigateTo({
          url: `/pages/detail-video/detail-video?id=${id}`,
        })
    },
  }
})