<template>
  <div id="play" class="play">
    <div class="play-top">
      <img src="https://y.gtimg.cn/music/common/upload/t_playsong_ad/1207759.png?max_age=2592000"
           @click="ccc()">
      <p>更多QQ音乐排行榜</p>
      <span>戳我查看</span>
    </div>
    <div class="play-banner" :style="brr" >
      <img :src="url" alt="" style="opacity: 0.5" >
    </div>
    <div class="play-nav">
      <p class="nav-one">{{name}}</p>
      <p class="nav-two">{{creat}}</p>
      <p class="nav-three">更新时间 : 2019-09-25</p>
    </div>
    <div class="play-play" @click="iii(0)">
      <img src="../../static/sanjiao_03.jpg" alt="">
    </div>
    <dl class="play-main">
      <dt class="main-top">排行榜 共{{num}}首</dt>
      <dd v-for="(item,ind) in arr.tracks" :key="ind">
      <p class="main-one" @click="set(ind,item.name)"><span class="main-two">{{ind+1}}</span> {{item.name}}</p>
      <P class="main-three">{{item.pop}}% {{item.ar[0].name}}</P>
      <em></em>
      <span class="span"></span>
      </dd>
    </dl>
    <div class="play-foot">
      <p class="foot-top">榜单简介</p>
      <p class="foot-one">追踪全球音乐流行趋势，乐坛最热门歌曲，网络蹿红歌曲根据地
        。展示QQ音乐用户的关注热度，体现歌曲飙升程度的潮流音乐排行榜。</p>
      <p>更新时间：每天更新</p>
      <p>歌曲数量：100首</p>
      <p>统计算法：QQ音乐库内全部歌曲，根据综合数据7天前的涨幅进行排序，取前100名</p>
      <p>综合数据：登录用户在QQ音乐播放/分享/下载数据</p>
    </div>
  </div>
</template>
<script>
  export default {
    data () {
      return {
          arr:{},
        crr:{
              url:"",
              name:"",
              creat:"",
        },
        brr:{
          background:"",
          backgroundSize:"",
        },
          url:"",
          name:"",
          creat:"",
          num:0,
      }
    },
    mounted(){
      let ooo= this.$route.query;
      this.$http({
        url:"http://49.232.129.237:3000/top/list?idx="+ooo.num
      })
        .then(res => {
            this.brr.background = `url(${res.data.playlist.tracks[0].al.picUrl})`;
            this.brr.backgroundSize = "cover";
            this.url  =res.data.playlist.coverImgUrl;
            this.name =res.data.playlist.name;
            this.creat=res.data.playlist.creator.detailDescription;
            this.num = res.data.playlist.tracks.length;
            this.arr =res.data.playlist;
        })
    },
    methods:{
        ccc(){
            this.$router.push(
              {
                path:"/big/index"
              }
            )
        },
        iii(i){
        let ccc = this.arr.trackIds[i].id;
        this.$router.push(
          {
            path:"/cast",
            query:{ccc}
          }
        );
      },
        set(i,x){
          this.$router.push(
            {
              path:"/cast",
              query:{ccc:this.arr.trackIds[i].id,
                      name:x}
            }
          );
        }
    },
  }
</script>
<style scoped>
  @import "../assets/play.css";
</style>
