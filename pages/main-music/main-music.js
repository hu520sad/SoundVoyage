import {getMusicBanner,getSongMenuList} from '../../service/music.js'
import {querySelect} from '../../utils/query-select'
import {throttle} from 'underscore';
import recommendStore from '../../store/recommendStore'
import rankingStore from "../../store/rankingStore"  


const querySelectThrottle=throttle(querySelect,100);
const app=getApp()


Page({
  data: {
    searchValue:'',
    bannerList:[],
    bannerHeight:0,
    recommandSongs:[],
    SongMenuList:[],
    screenWidth:375,
    CINSongList:[],

    isEmpty:false,
    rankingInfos:{}
  },

  onLoad(options) {
    this.onImageLoad()
    this.fetchBanner()

    recommendStore.onState('recommendSongs',this.handleRecommdSongs)
    rankingStore.dispatch('fetchMenuDetailActions');
    rankingStore.onState('newRanking',this.getRankingHandler('newRanking'))
    rankingStore.onState('originRanking',this.getRankingHandler('originRanking'))
    rankingStore.onState('upRanking',this.getRankingHandler('upRanking'))
    recommendStore.dispatch('fetchRecommandSongs');
   
    
    this.fetchMenuSongLit();

    this.setData({screenWidth:app.globalData.screenWidth})
  },
  
  handleRecommdSongs(value){
      if(!value.tracks) return 
        this.setData({recommandSongs:value.tracks.slice(0,6)})
  },

  onUnload(){
    recommendStore.offState('recommendSongs',this.handleRecommdSongs)
  },

  onSearchClick(){
      wx.navigateTo({
        url: '/pages/detail-search/detail-search',
      })
  },
  OnMoreClick(){
    wx.navigateTo({
      url: '/pages/detail-song/detail-song?type=recommend',
    })
  },

    getRankingHandler(ranking){
        return value=>{
            if(!value.name) return
            
            const newRankinginfo={...this.data.rankingInfos,[ranking]:value}
            this.setData({rankingInfos:newRankinginfo,isEmpty:true})
        }
    },


  async fetchBanner(){
    const res=await getMusicBanner()
    this.setData({bannerList:res.banners})
  },
  async onImageLoad(event){
    const bannerHeight=await querySelectThrottle('.banner-image');
    this.setData({bannerHeight})
  },
  fetchMenuSongLit(){
        getSongMenuList().then((res)=>{
        this.setData({SongMenuList:res.playlists}) 
        })
        getSongMenuList('华语').then((res)=>{
            this.setData({CINSongList:res.playlists})
        })
  }
})