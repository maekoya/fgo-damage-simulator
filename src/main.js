import Vue from 'vue'
import App from '@/App.vue'
import Tooltip from 'vue-directive-tooltip'
import 'vue-directive-tooltip/css/index.css'

Vue.config.productionTip = false

Vue.use(Tooltip, {
  delay: 200,
  placement: 'auto',
  class: 'tooltip-custom',
  triggers: ['hover', 'focus'],
  offset: 5
})

new Vue({
  render: h => h(App)
}).$mount('#app')
