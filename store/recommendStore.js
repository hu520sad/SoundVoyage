import {HYEventStore} from "hy-event-store"
import {getMusiclistDetail} from '../service/music.js';

const recommendStore=new HYEventStore({
    state:{
        recommendSongs:{}
    },
    actions:{
        async fetchRecommandSongs(ctx){
            const res=await getMusiclistDetail(3778678)
            ctx.recommendSongs=res.playlist
        }
    }
})

export default recommendStore