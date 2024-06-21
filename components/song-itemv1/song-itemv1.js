// components/song-itemv1/song-itemv1.js
Component({
  properties: {
    songItem:{
        type:Object,
        value:{}
    }
  },
  data: {

  },

  methods: {
    onSongTap(){
        const id=this.properties.songItem.id
        wx.navigateTo({
          url: `/pages/music-player/music-player?id=${id}`,
        })
    }
  }
})