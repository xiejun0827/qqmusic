<template>
  <div>
    <div class="music">
      <!--<div>-->
        <input id="ddd" type="text" placeholder="搜索歌曲、歌单、专辑" @click="set()"
               :style="{width}" @keydown.enter="enter()" v-model="msg" ref="jiaodian">
        <span class="aaa" v-if="msg!=''" @click="xxx" >X</span>
      <!--</div>-->
      <span class="qqq" v-if="flag" @click="set1()">取消</span>
    </div>
    <p class="music-p" v-if="!flag">热门搜索</p>
    <ul class="music-ul" v-if="!flag">
      <li class="music-li" v-for="(item,ind) in arr" :key="ind" @click="iii(item.first)">{{item.first}}</li>
    </ul>
    <ul class="music-ul1" :style="{display}" v-if="!flag1">
      <li v-for="(item,ind) in crr" :key="ind" @click="go(item.id,item.name)"><em><img src="../../static/search_sprite.png" alt=""></em>
        <div>
          <p class="p-1">{{item.name}}</p>
          <p class="p-2">{{item.artists[0].name}}</p>
        </div>
      </li>
      <li class="max">点击搜索更多类容</li>
    </ul>
    <ul class="music-ul2" v-if="flag1&&flag2">
      <li v-for="(item,ind) in brr" :key="ind" v-if="ind<4">
          <img src="https://y.gtimg.cn/mediastyle/mobile/yqq_v5/img/clock_ic.png?max_age=2592000&v=105415f542a4f3bc2dca00b42e6d9c54"
               alt="">
          <p class="p-2" style="font-size: 18px; color: #333; line-height: 55px">{{item}}</p>
          <span @click="delet(ind)">x</span>
      </li>
      <li class="max" style="color: green" @click="del" v-if="brr.length >=1">点击清除搜索记录</li>
    </ul>
  </div>

</template>
<script>
//  console.log(1);

  export default{
    name:"hello",
    data(){
      return{
        msg:"",
        arr:[],
        flag:false,
        flag1:false,
        flag2:false,
        width:90+"%",
        display:"none",
        brr:[],
        crr:[],
      }
    },
    methods:{
        set(){
            this.flag=true;
            this.width=80+"%";
            if(this.display ==="none"){
              this.flag2=true;
              this.flag1=true;
            }
        },
        set1(){
            this.flag=false;
            this.width=90+"%";
            this.display="none";
            this.msg="";
            this.flag2=false;
        },
        enter(){
          this.display="block";
          this.flag1=false;
          this.brr.push(this.msg);
          this.$refs.jiaodian.blur();
          this.$http({
            url:`http://49.232.129.237:3000/search?keywords=${this.msg}&limit=5`
          })
            .then(res => {
              this.crr=res.data.result.songs;
            })
        },
        xxx(){
            this.flag1=true;
            this.flag2=true;
            this.msg ="";
          this.$refs.jiaodian.focus();
        },
        del(){
            this.brr=[];
        },
        delet(x){
            this.brr.splice(x,1);
      },
        iii(i){
          this.display="block";
          this.flag=true;
          this.flag1=false;
          this.width=80+"%";
          this.msg =i;
          this.brr.push(this.msg);
      },
        go(i,x){
          this.$router.push(
            {
              path:"/cast",
              query:{ccc:i,
                name:x}
            }
          );
        }
    },
    mounted(){
//        热门搜索
        this.$http({
          url:"http://49.232.129.237:3000/search/hot/detail"
        })
          .then(res => {
            this.arr = res.data.result.hots
          })
    }
  }

</script>
<style>
</style>
