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
// import 'aplayer/dist/APlayer.min.css'
// import APlayer from 'aplayer'

Vue.prototype.reqHelper = reqHelper
Vue.config.productionTip = false
Vue.use(VueAxios, axios)
Vue.use(mavonEditor)
// Vue.component('APlayer' , new APlayer({
//   autoplay : false,
//   volume : 0.5,
//   shuffle : true,
//   theme : '#0f0f0f',
//   audio : [
//     {
//       name: 'Conqueror',
//       artist: 'IA / Sendra',
//       url: 'http://music.163.com/song/media/outer/url?id=551337683.mp3',
//       cover: 'http://p2.music.126.net/PZSATAuqF4Uk9JAzgStp4Q==/109951163244804271.jpg',
//     },
//     {
//       name: 'BE QUIET ROOM',
//       artist: '雨天決行 / らっぷびと',
//       url: 'http://music.163.com/song/media/outer/url?id=1414854415.mp3',
//       cover: 'http://p1.music.126.net/TIYFAxpHrRLDtMo7Wrdrmg==/109951164608595166.jpg',
//     },
//     {
//       name: '魔軍',
//       artist: '水夏える',
//       url: 'http://music.163.com/song/media/outer/url?id=536624867.mp3',
//       cover: 'http://p2.music.126.net/UTkxbTFZRutAPD0ld1GKcw==/109951163164735586.jpg',
//     },
//     {
//       name: 'Phantomystic',
//       artist: 't+pazolite',
//       url: 'http://music.163.com/song/media/outer/url?id=28524808.mp3',
//       cover: 'http://p2.music.126.net/tzRZCXZFm5FO4cL3WWANqA==/6024224208960057.jpg',
//     }
//   ]
// }))

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
