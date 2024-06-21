import recommendStore from "../../store/recommendStore.js"
import rankingStore from "../../store/rankingStore"
import {getMusiclistDetail} from "../../service/music"
Page({

  data: {
    songInfos:{},
    type:"ranking",
    key:"newRanking",
    id:"",
  },

  handleRanking(value){
      if(this.data.type==="recommend"){
          value.name="推荐歌曲"
      }
        this.setData({songInfos:value})
        wx.setNavigationBarTitle({
          title: value.name,
        })
  },
  onLoad(options){
    const type = options.type
    this.setData({type})
    if(type==='ranking'){
        const key=options.key;
        this.data.key=key
        rankingStore.onState(key,this.handleRanking)
    }else if(type==='recommend'){
        recommendStore.onState("recommendSongs",this.handleRanking)
    }else if(type==='menu'){
        const id=options.id;
        this.data.id=id
        this.fetchMenuInfo(id)
    }
  },

  async fetchMenuInfo(id){
    const res =  await getMusiclistDetail(id)
    this.setData({songInfos:res.playlist})
  },
  onUnload(){
      if(this.data.type==='ranking'){
        rankingStore.offState(key,this.handleRanking)
      }else if(this.data.type==="recommend"){
          recommendStore.offState('recommendSongs',this.handleRanking)
      }
  }
  
})