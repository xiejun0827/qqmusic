<template>
  <div style="overflow: hidden;">
    <div class="play-top">
      <img src="https://y.gtimg.cn/music/common/upload/t_playsong_ad/1207759.png?max_age=2592000"
           @click="ccc()">
      <p>更多QQ音乐排行榜</p>
      <span>戳我查看</span>
    </div>
    <div class="bei" :style="sty" style="width: 100%;height: 412px;margin-top: 45px;">
      <div style="background:rgba(255,255,255,.9);width: 100%;height: 100%">
        <p style="margin-top: 65px; text-align: center; font-size: 19px;">{{name}}</p>
        <p style="text-align: center;font-size: 14px; color: #808080;margin-top: 7px">{{name1}}</p>
        <img :src="picUrl" alt="" style="margin-left: 70px;width: 234px;height: 234px" v-if="flag" @click="flag=false">
        <div style="width: 250px;height:234px;margin: 0 auto;
         text-align: center;color: yellowgreen;overflow: hidden" v-if="!flag" @click="flag=true">
          <p v-for="(item,ind) in msg" style="font-size: 12px">{{item}}</p>
        </div>
        <div style="overflow: hidden;width: 100%;margin: 25px 0 0 0">
          <img src="../../static/images/mv_03.jpg" alt="" style="float: left;margin:0 15px 0 100px;">
          <div class="btn-audio" style="float: left;margin: 0 15px;">
            <audio id="mp3Btn" :src="url" autoplay>
              <source src="../../static/images/audio1_03.png" type="audio/mpeg" />
            </audio>
          </div>
          <img src="../../static/images/love_05.jpg" alt="" style="float: left;margin: 0 15px;">
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import $ from "jquery";

  export default{
    data(){
      return {
          flag:true,
          arr:{},
          name:"",
        name1:"",
        picUrl:"",
          url:"",
          msg:[],
        sty:{
              background:"",
          backgroundSize:"",
        }
      }
    },
    methods: {
      ccc(){
        this.$router.go(-1);
      },
    },
    mounted(){
//        图片
      this.$http({
        url:`http://49.232.129.237:3000/song/detail?ids=${this.$route.query.ccc}`
      })
        .then(res => {
//          console.log(res);
          this.name = res.data.songs[0].name;
          this.name1 = res.data.songs[0].ar[0].name;
          this.picUrl = res.data.songs[0].al.picUrl;
          this.sty.background = `url(${res.data.songs[0].al.picUrl})`;
          this.sty.backgroundSize = "cover";
          this.arr=res.data.songs[0];

        });
//      mp3路径
      this.$http({
        url:`http://49.232.129.237:3000/song/url?id=${this.$route.query.ccc}`
      })
        .then(res => {
          this.url = res.data.data[0].url;
        });
//      歌词${this.$route.query.name}
      this.$http({
        url:`http://49.232.129.237:3000/search?keywords=${this.$route.query.name}&type=1006&limit=1`
      })
        .then(res => {
          this.msg =res.data.result.songs[0].lyrics.txt.split("\n")
        });
      $(function() {
        //播放完毕
        $('#mp3Btn').on('ended', function () {
          $('.btn-audio').css({
            'background': 'url(../../static/images/audio_03.jpg) no-repeat center bottom',
            'background-size': 'cover'
          });
        });
        //播放器控制
        let audio = document.getElementById('mp3Btn');
        audio.volume = .3;
        $('.btn-audio').click(function () {
          event.stopPropagation();//防止冒泡
          if (audio.paused) { //如果当前是暂停状态
            $('.btn-audio').css({
              'background': 'url(../../static/images/audio_03.jpg) no-repeat center bottom',
              'background-size': 'cover'
            });
            audio.play(); //播放
            return;
          } else {//当前是播放状态
            $('.btn-audio').css({
              'background': 'url(../../static/images/audio1_03.png) no-repeat center bottom',
              'background-size': 'cover'
            });
            audio.pause(); //暂停
          }
        })
      });
    }
  }
</script>
<style scoped="">
  @import "../assets/cast.css";
  .btn-audio{
    margin: 9px auto;
    width: 40px;
    height: 40px;
    background:url(../../static/images/audio_03.jpg) no-repeat center bottom;
    background-size:cover;
  }
</style>
