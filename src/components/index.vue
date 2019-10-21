<template>
  <div>
    <div class="main">
      <div class="swiper-container">
        <div class="swiper-wrapper">
          <div class="swiper-slide" v-for="(item,ind) in banner" :key="ind">
            <img :src="item.imageUrl" alt="">
          </div>
          <div class="swiper-pagination"></div>
          <!-- Add Arrows -->
          <div class="swiper-button-next"></div>
          <div class="swiper-button-prev"></div>
        </div>
      </div>
    </div>
    <p class="one">电台</p>
    <ul class="ul1">
      <li v-for="(item,ind) in Tv" :key="ind">
        <img :src="item.picUrl" alt="">
        <p>{{item.name}}</p>
      </li>
    </ul>
    <p class="two">热门歌单</p>
    <ul class="ul2">
      <li v-for="item in arr">
        <img :src="item.coverImgUrl">
        <p>{{item.name}}</p>
        <span>下载量：{{item.playCount}}</span>
      </li>
    </ul>
    <div class="three">查看电脑版网页</div>
    <div class="foot">
      <img src="../../static/logo_ch.svg" alt="">
    </div>
    <p class="foot1">Copyright © 1998 - 2019 Tencent. All Rights Reserved.</p>
    <p class="foot2">联系电话：0755-86013388 QQ群：55209235</p>
  </div>

</template>

<script>
  import hello from "./one.vue";
  import Swiper from "swiper";
export default {
  name: 'HelloWorld',
  data () {
    return {
        banner:[],
        Tv:[],
        arr:[]
    }
  },
  mounted(){
//      banner
    this.$http({
      url:"http://49.232.129.237:3000/banner",
    })
      .then(res => {
      this.banner = res.data.banners;
      this.$nextTick(() => {
        let swiper = new Swiper('.swiper-container', {
          spaceBetween: 30,
          centeredSlides: true,
          autoplay: {
            delay: 2500,
            disableOnInteraction: false,
          },
          pagination: {
            el: '.swiper-pagination',
            clickable: true,
          },
          navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
          },
        });
      })
    });
//    电台
    this.$http({
      url:"http://49.232.129.237:3000/personalized/djprogram"
    })
      .then(res => {
          this.Tv = res.data.result.splice(0,2)
    });
//    main
    this.$http({
      url:"http://49.232.129.237:3000/top/playlist"
    })
      .then(res => {
        this.arr = res.data.playlists.splice(0,6);
      })
  },
  methods:{
      lll(){
          this.$router.push({
            path:"/play"
          })
      }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  @import "../../node_modules/swiper/css/swiper.min.css";
  html, body {
    position: relative;
    height: 100%;
  }
  body {
    background: #eee;
    font-family: Helvetica Neue, Helvetica, Arial, sans-serif;
    font-size: 14px;
    color:#000;
    margin: 0;
    padding: 0;
  }
  .swiper-container {
    width: 100%;
    height: 100%;

  }
  .swiper-slide {
    text-align: center;
    font-size: 18px;
    background: #fff;

    /* Center slide text vertically */
    display: -webkit-box;
    display: -ms-flexbox;
    display: -webkit-flex;
    display: flex;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    -webkit-justify-content: center;
    justify-content: center;
    -webkit-box-align: center;
    -ms-flex-align: center;
    -webkit-align-items: center;
    align-items: center;
  }
</style>
