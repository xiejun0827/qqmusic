<template>
  <div>
    <div class="nav">
      <div>
        <img src="../../static/logo_ch.svg" alt="">
      </div>
      <span>下载APP</span>
    </div>
    <div class="dibu">
      <div class="foot3">安装QQ音乐 发现更多精彩</div>
    </div>
    <ul class="top">
      <li v-for="(item,ind) in arr"  @click="send(item.src,ind)" :class="ccc[ind]" :key="ind" >{{item.title}}</li>
    </ul>
    <router-view></router-view>
  </div>
</template>

<script>
  export default {
    data(){
      return{
        arr:[{title:"推荐",src:"index"},{title:"排行榜",src:"one"},{title:"搜索",src:"two"}],
        ccc:["green"],
      }
    },
    methods:{
      send(i,x){
        this.ccc=[];
        this.$set(this.ccc,x,"green");
        this.$emit("give",x);
        this.$router.push(i)
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
