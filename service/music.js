import { hyReqInstance } from "./index.js"

export function getMusicBanner(type = 0) {
    return hyReqInstance.get({
        url: "/banner",
        data: {
            type
        }
    })
}

export function getMusiclistDetail(id) {
    return hyReqInstance.get({
        url: "/playlist/detail",
        data: {
            id
        }
    })
}

export function getSongMenuList(cat = "全部", limit = 6, offset = 0) {
    return hyReqInstance.get({
        url: '/top/playlist',
        data: {
            cat,
            limit,
            offset,
        }
    })
}

export function getSongMenuTag() {
    return hyReqInstance.get({
        url: "/playlist/hot"
    })
}