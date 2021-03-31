import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import VueLazyLoad from 'vue-lazyload'

import toast from 'components/common/toast/index'

Vue.config.productionTip = false

Vue.use(toast)

Vue.use(VueLazyLoad,{
  loading: require('./assets/img/common/placeholder.png')
})

Vue.prototype.$bus = new Vue

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
