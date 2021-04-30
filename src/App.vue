<template>
    <v-app :style="{backgroundColor : 'rgb(251, 251, 251)'}">
        <div class="fixedWrapper">
            <div :style="isPhone ? {display: 'none'} : {}" class="all_screen" @click="hide_baseBar">
              <v-icon :style="{color: 'white', fontSize: '16px'}" class="fa-arrows-alt">fa-arrows-alt</v-icon>
            </div>
            <div :style="isPhone ? {display: 'none'} : { left: '35px' }" class="all_screen">
              <v-icon :style="{color: 'white', fontSize: '13px'}" class="fa-link">fa-link</v-icon>
            </div>
            <div :class="isPhone ? 'baseBar_phone' : 'baseBar'">

                <v-row justify="center" :style="{height : '100px'}">
                    <v-col cols="9">
                        <div class="avatar">
                        <img src="./assets/avatar.jpg">
                        </div>
                    </v-col>
                </v-row>

                <v-row justify="center" :style="{height : '50px'}">
                    <v-col cols="9">
                        <div class="name">Kaza</div>
                    </v-col>
                </v-row>

                <v-row justify="center" :style="{height : '60px' , marginTop : '20px'}">
                    <v-col cols="9">
                        <div class="selction" @click="$router.push('/home')">Home</div>
                        <div class="selction" @click="$router.push('/articles')">Articles</div>
                        <div class="selction" @click="$router.push('/tags')">Tags</div>
                        <div class="selction" @click="$router.push('/about')">About</div>
                        <v-text-field :style="{color : 'white'}" v-model="search">
                        <v-icon class="search_icon" slot="append" :style="{color : 'white'}">fas fa-search</v-icon>
                        </v-text-field>
                    </v-col>
                </v-row>
                <APlayer
                    :autoplay='isAuto === true'
                    :volume='0.5'
                    :music="PlayerList[1]"
                    :list="PlayerList"
                    :shuffle='true'
                    :listFolded="true"
                />
            </div>
        </div>

        <div :class="isPhone ? 'content_phone' : 'content'">
          <div class="content_width" :style="{ width: '100%' }">
            <div class="load" v-show="this.totalData.length === 0">
                <v-icon large class="icon_load">fas fa-circle-notch fa-spin</v-icon>
            </div>

            <keep-alive>
                <router-view v-if="$route.meta.keepAlive"></router-view>
            </keep-alive>
            <router-view v-if="!$route.meta.keepAlive"></router-view>
          </div>
        </div>
    </v-app>
</template>

<script>
import APlayer from 'vue-aplayer'
import { setOnresize } from './resize.js'
import { mapActions, mapState } from 'vuex';

const PlayerList = [
    {
        title: 'インスタントヘヴン',
        artist: 'ナナヲアカリ / Eve',
        src: 'http://music.163.com/song/media/outer/url?id=866049109.mp3',
        pic: 'http://p1.music.126.net/zMSJ1Rb6zJhnmKmoQZU-ZQ==/109951163408724555.jpg',
        theme: 'pink'
    },
    {
        title: 'BE QUIET ROOM',
        artist: '雨天決行 / らっぷびと',
        src: 'http://music.163.com/song/media/outer/url?id=1414854415.mp3',
        pic: 'http://p1.music.126.net/TIYFAxpHrRLDtMo7Wrdrmg==/109951164608595166.jpg',
        theme: 'blue'
    },
    {
        title: '魔軍',
        artist: '水夏える',
        src: 'http://music.163.com/song/media/outer/url?id=536624867.mp3',
        pic: 'http://p2.music.126.net/UTkxbTFZRutAPD0ld1GKcw==/109951163164735586.jpg',
        theme: 'red'
    },
    {
        title: 'FREEDOM (Extended Mix)',
        artist: 'USAO',
        src: 'http://music.163.com/song/media/outer/url?id=544151217.mp3',
        pic: 'http://p1.music.126.net/_1QQjxIUMfgMwX2x1vfGhg==/109951163179605612.jpg',
        theme: 'orange'
    }
]

export default {
    name: 'App',
    components: { APlayer },
    data: () => ({
        isPhone : false,
        search : (() => {
            let keyWord = window.location.href.split('?')[1]
            if (keyWord) return keyWord.includes('search') ? keyWord.split('=')[1] : ''
        })(),
        PlayerList: PlayerList,
        isAuto: false
    }),
    computed: {
        ...mapActions(['getDatas']),
        ...mapState({ totalData: state => state.MoudleReq.totalData })
    },
    watch: {
        search: function (newVal) {
            let that = this
            return that.$router.push({path:'/search' , query:{search: newVal}})
        }
    },
    created() {
        this.getDatas.then(() => {console.log(this.$store.state.MoudleReq.totalData)})
    },
    mounted() {
        setOnresize(this)
    },
    methods: {
      hide_baseBar() {
        if (document.querySelector('.baseBar').style.display !== 'none') {
          document.querySelector('.baseBar').style.display = 'none'
          document.querySelector('.content').style.width = '100%'
          document.querySelector('.content_width').style.width = '70%'
        } else {
          document.querySelector('.baseBar').style.display = 'block'
          document.querySelector('.content').style.width = 'calc(100% - 277px)'
          document.querySelector('.content_width').style.width = '100%'
        }
      }
    }
};
</script>

<style lang='scss'>
html{
  overflow-y: hidden !important;
}

button{
  outline: none !important;
}

button.v-pagination__item.v-pagination__item--active.primary {
  background-color: #0e0c0c !important;
  border-color: #5e5e5e !important;
  box-shadow: 0px 0px 5px black;
}

input#input-6 {
  color: white;
}

.v-input.theme--light.v-text-field.v-text-field--is-booted.primary--text{
  color: whitesmoke !important;
  caret-color: whitesmoke !important;
}

.theme--light.v-text-field > .v-input__control > .v-input__slot:before {
    border-color: white !important;
}

@keyframes fadeIn {
    0% {
        opacity: 0;
    }
    100% {
        opacity: 1;
    }
}

.all_screen{
  z-index: 10000;
  position: fixed;
  display: inline-block;
  top: 10px;
  left: 10px;
  background-color: rgb(54, 54, 54);
  width: 20px;
  height: 20px;
  border-radius: 20px;
  cursor: pointer;
  .fa-arrows-alt{
    position: relative;
    top: -3px;
    left: 2px;
  }
  .fa-link{
    position: relative;
    top: -2px;
    left: 3px;
  }
}

body{
  overflow-x: hidden;
  .content{
    width: calc(100% - 277px);
    position: absolute;
    right: 0;
    background-color: rgb(251, 251, 251);
    white-space:normal;
    word-break:break-all;
    word-wrap:break-word;
    display: flex;
    justify-content: center;
    .load{
      width: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      margin-top: 45vh;
    }
  }

  .content_phone{
    position: absolute;
    top: 300px;
    width: 100%;
    background-color: rgb(251, 251, 251);
    white-space:normal;
    word-break:break-all;
    word-wrap:break-word;
    .load{
      width: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      margin-top: 20vh;
    }
  }
}


.fixedWrapper{
  position: relative;
  .baseBar{
    background-color: rgb(27, 27, 27);
    height: 100vh;
    width: 275px;
    position: fixed;
    .avatar{
      width: 100px;
      height: 100px;
      float: right;
      img{
        width: 100px;
        height: 100px;
        border-radius: 100px;
      }
    }
    .name{
      font-size: 40px;
      color: white;
      text-align: right;
      font-family: 'Open Sans', sans-serif;
      font-weight: 100;
    }
    .selction{
      color: white;
      text-align: right;
      font-family: 'Open Sans', sans-serif;
      font-weight: 100;
      cursor: pointer;
      transition: 0.2s;
      &:hover{
        text-decoration:underline;
      }
    }
    .search_icon{
      cursor: pointer;
    }
    .aplayer{
      margin: 1%;
      position: absolute;
      bottom: 1px;
      width: 98%;
    }
  }
}

.baseBar_phone{
  background-color: rgb(27, 27, 27);
  height: 300px;
  width: 100vw;
  .avatar{
    width: 100px;
    height: 100px;
    margin:0px auto;
    img{
      width: 100px;
      height: 100px;
      border-radius: 100px;
    }
  }
  .name{
    font-size: 40px;
    color: white;
    text-align: center;
    font-family: 'Open Sans', sans-serif;
    font-weight: 100;
  }
  .selction{
    color: white;
    text-align: center;
    font-family: 'Open Sans', sans-serif;
    font-weight: 100;
    display: inline-block;
    width: 25%;
  }
  .search_icon{
    cursor: pointer;
  }
  .aplayer{
    display: none;
  }
}
</style>
