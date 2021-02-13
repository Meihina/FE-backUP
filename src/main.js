import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify';
import axios from 'axios'
import VueAxios from 'vue-axios'
import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
import reqHelper from './utils/reqhelper.js'

Vue.prototype.reqHelper = reqHelper
Vue.config.productionTip = false
Vue.use(VueAxios, axios)
Vue.use(mavonEditor)

new Vue({
    router,
    store, 
    vuetify,
    render: h => h(App)
}).$mount('#app')
