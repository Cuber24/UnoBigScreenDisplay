import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import sok from 'vue-socket.io'

Vue.use(ElementUI)
Vue.use(new sok({
  debug: false,
  connection: 'http://192.168.2.104:4000',
}))

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
