import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import sok from 'vue-socket.io'

// const os = require('os')
// function getIP(){
//   const interface1 = os.networkInterfaces()
//     const iface = interface1.WLAN
//     console.log(os,interface1,iface)
//     for( let i=0;i<iface.length;i++){
//       const alias = iface[i]
//       if(alias.family === 'IPv4' && alias.address !== '127.0.0.1'){
//          return alias.address
//       }
//     }

// }

// const myHost = getIP() 
// console.log(myHost)
const myHost = ['127.0.0.1','192.168.1.10'][1]

Vue.use(ElementUI)
Vue.use(new sok({
  debug: false,
  connection: `http://${myHost}:4000`,
}))

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
