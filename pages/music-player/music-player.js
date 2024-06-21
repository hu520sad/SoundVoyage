import { getSongDetail, getSongLyric } from "../../service/player"

const app = getApp()
const audioContext = wx.createInnerAudioContext()

Page({

    data: {
        pageTitles: ['歌曲', '歌词'],
        id: '',
        currentSong: {},
        lrcString: '',
        currentIndex: 0,
        contentHeight: 0,

        currentTime: 0,
        durationTime: 0,
        sliderValue: 0,
        isChanging: true
    },

    onLoad(options) {
        this.setData({ contentHeight: app.globalData.contentHeight })
        const id = options.id;

        this.setData({ id })

        getSongDetail(id).then((res) => {
            this.setData({ currentSong: res.songs[0] });
            this.setData({ durationTime: res.songs[0].dt })
        })

        getSongLyric(id).then((res) => {
            this.setData({ lrcString: res.lrc.lyric });
        }),

            audioContext.src = `https://music.163.com/song/media/outer/url?id=${id}.mp3`;
        audioContext.autoplay=true;
        audioContext.onTimeUpdate(() => {
            if (this.data.isChanging) {
                this.setData({ currentTime: audioContext.currentTime * 1000 });
                const sliderValue = this.data.currentTime / this.data.durationTime * 100;
                this.setData({ sliderValue })
            }
        })

    },

    onSliderChange(event) {
        const value = event.detail.value;

        const currentTime = value / 100 * this.data.durationTime;
        audioContext.seek(currentTime / 1000)
        this.setData({ currentTime })
    },
    onSliderChanging(event) {
        this.data.isChanging = false
        const value = event.detail.value;

        const currentTime = value / 100 * this.data.durationTime;
        this.setData({ currentTime })
    },

    onNavTap(event) {
        const index = event.currentTarget.dataset.index;
        this.setData({ currentIndex: index })
    },

    onSwiperChange(event) {
        this.data.isChanging = false
        const currentIndex = event.detail.current;
        this.setData({ currentIndex })
    }
})