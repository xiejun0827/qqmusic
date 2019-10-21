<template>
  <div>
    <ul class="bang">
      <li class="bang1" v-for="(item,ind) in arr" :key="ind">
        <div>
          <img :src="item.brr.coverImgUrl" alt="">
        </div>
        <div class="div1">
          <p>{{item.brr.name}}</p>
          <ul>
            <li v-for="(ite,index) in item.brr.tracks" v-show="index<3" @click="ppp(item.num)"><span>{{index+1}}</span>{{ite.name}}<span>-{{ite.ar[0 ].name}}</span></li>
          </ul>
        </div>
      </li>
    </ul>
  </div>
</template>
<script>
  export default{
    name: "hello",
    data(){
      return {
        arr: [],
      }
    },
    methods: {
      ppp(i,x){
        this.$router.push({
          path: "/play",
          query:{num:i}
        });
      },
    },
    mounted(){
//        榜单歌曲
        for(let i=0;i<7;i++){
          this.$http({
            url:"http://49.232.129.237:3000/top/list?idx=" +i
          })
            .then(res => {
              let a = res.config.url.indexOf("=");
              this.arr.push({
                num:res.config.url.substr(a+1,),
                brr:res.data.playlist,
              });
            });
        }
      }
    }
</script>
<style>

</style>
