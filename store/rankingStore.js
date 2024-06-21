import {HYEventStore} from "hy-event-store"
import {getMusiclistDetail} from "../service/music"

const rankingId={
    newRanking:3779629,
    originRanking:2884035,
    upRanking:19723756
}
const rankingStore=new HYEventStore({
    state:{
        newRanking:{},
        originRanking:{},
        upRanking:{},
    },

    actions:{
        fetchMenuDetailActions(ctx){
            for(const key in rankingId){
                const id=rankingId[key];
                getMusiclistDetail(id).then((res)=>{
                    ctx[key]=res.playlist 
                })
            }
        }
    }
})

export default rankingStore