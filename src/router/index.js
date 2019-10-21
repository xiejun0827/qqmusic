import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/index';
import Big from '@/components/big';
import One from '@/components/one';
import Two from '@/components/two';
import Play from '@/components/play';
import Cast from '@/components/cast';
import '../assets/index.css'
// import HelloWorld from '@/components/HelloWorld';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path:"/big",
      component:Big,
      children:[
        {
          path: '/index',
          component: Index
        },
        {
          path: '/one',
          component: One
        },
        {
          path: '/two',
          component: Two
        },
      ]
    },
    {
      path: '/play',
      component: Play
    },
    {
      path: '/cast',
      component: Cast
    },
    {
      path: '/*',
      redirect: "/index"
    }
  ]
})
