import {getTopMv} from "../../service/video"
Page({
    data:{
        videoList:[],
        offset:0,
        hasMore:true,
    },

    onLoad(){
        this.fetchTopMv()
    },
    
    //发送网络请求函数
async fetchTopMv(){
        const res=await getTopMv(this.data.offset)
        const newVideo=[...this.data.videoList,...res.data]
        this.setData({videoList:newVideo})
        this.data.offset=this.data.videoList.length;
        this.data.hasMore=res.hasMore
    },

    //监听上拉和下拉功能
    onReachBottom(){
        if(!this.data.hasMore) {
            wx.showToast({
                icon:'error',
                title:'数据已达上限'
            })
            return ;
        } 

        this.fetchTopMv()
    },
    async onPullDownRefresh(){
        this.setData({videoList:[]})
        this.data.hasMore=true;
        this.data.offset=0;
        await this.fetchTopMv()

        wx.stopPullDownRefresh()
    }
})