import {getMvUrl,getMvInfo,getTopMv} from '../../service/video'
Page({
    data:{
        id:0,
        url:"",
        MvInfo:{},
        relatedList:[],
    },
    onLoad(options){
        const id=options.id;
        this.fetchgetMv(id);
        this.fetchMvInfo(id);
        this.fetchTopMv();
    },

    async fetchgetMv(id){
        const res=await getMvUrl(id);
        this.setData({url:res.data.url});
    
    },
    
    async fetchMvInfo(id){
        const res=await getMvInfo(id);
        this.setData({MvInfo:res.data})
    },

    async fetchTopMv(){
        const res=await getTopMv(10,8);
        this.setData({relatedList:res.data})
    }

})