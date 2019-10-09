import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import input from './views/uno_input.vue'

Vue.use(Router)

const router= new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      meta:{
          title:"uno展示页面"
      }
    },
    {
      path: '/in',
      name: 'input',
      component: input,
      meta:{
          title:"uno输入页面"
      }
    },
  
  ]
})
router.beforeEach((to,from,next)=>{
  if(to.meta.title){
    document.title = to.meta.title
  }
  next()
})
export default router
