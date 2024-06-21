import {baseUrl} from "./config.js"

class HyRequest{
    constructor(baseUrl){
        this.baseUrl=baseUrl
    }
    requset(options){
       options.url=this.baseUrl+options.url
        return new Promise((resolve,reject)=>{
            wx.request({
              ...options,
              success:(res)=>{
                  resolve(res.data)
              },
              fail:(err)=>{
                  reject(err)
              }
            })
        })
    }
    get(options){
        return this.requset({...options,method:'get'})
    }
    post(options){
        return this.requset({...options,method:'post'})
    }
}

export const hyReqInstance = new HyRequest(baseUrl)