import { all } from "underscore";
import {getSongMenuTag,getSongMenuList} from "../../service/music.js"
Page({

    data:{
        songMenus:[]
    },
    onLoad(){
        this.fetchSongTag()
    },

    async fetchSongTag(){
        const tagRes=await getSongMenuTag();
        const tags=tagRes.tags;

        const allPromise=[]
        for(const tag of tags){
            const promise=getSongMenuList(tag.name);
            allPromise.push(promise)
        }

        Promise.all(allPromise).then((res)=>{
            this.setData({songMenus:res})
        })
    }
})