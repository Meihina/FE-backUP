<template>
  <v-app :style="{backgroundColor : 'rgb(251, 251, 251)'}">
    <div class="fixedWrapper">
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
      <div class="load" v-show="this.$store.state.totalData.length === 0">
        <v-icon large class="icon_load">fas fa-circle-notch fa-spin</v-icon>
      </div>
      <keep-alive>
          <router-view v-if="$route.meta.keepAlive"></router-view>
      </keep-alive>

      <router-view v-if="!$route.meta.keepAlive"></router-view>
    </div>
  </v-app>
</template>

<script>
import APlayer from 'vue-aplayer'
export default {
  name: 'App',
  components: {
    APlayer
  },
  data: () => ({
    isPhone : false,
    search : '',
    PlayerList:[
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
      ],
    isAuto : false
  }),
  created(){
    this.reqHelper.store().then((data) => {
        [this.$store.state.yearPos , this.$store.state.totalData , this.$store.state.totalTags] = data
        console.log(data)
    } , (err) => {
        console.log(err)
    })
  },
  mounted(){
    let that = this
    document.querySelector('#input-6').addEventListener("keydown" , function(event){
      if(event.keyCode == '13' && that.search !== ''){
        that.$router.push({path:'/search' , query:{search : that.search}})
      }
    })

    let width = document.documentElement.offsetWidth || document.body.offsetWidth
		if(width < 768){
        this.isPhone = true
        this.$store.state.isPhoneG = this.isPhone
    }

    window.onresize = () => {
      if(document.documentElement.offsetWidth < 768 || document.body.offsetWidth < 768){
        this.isPhone = true
        this.$store.state.isPhoneG = this.isPhone
      }else{
        this.isPhone = false
        this.$store.state.isPhoneG = this.isPhone
      }
    }

    console.log(navigator.userAgent)
    if(
      navigator.userAgent.indexOf("Edge") > 0 ||
      navigator.userAgent.indexOf("LBBROWSER") > 0 ||
      navigator.userAgent.indexOf("msie") > 0){
          console.log('cut')
    }else{
      this.$store.state.isShowList = true
      window.addEventListener('scroll', () => {
        if(document.querySelector('body').scrollTop){
          if(this.$store.state.h.length <= 1){
            // ...
          }else if(this.$store.state.h.length === 2){
            if(this.$store.state.witch !== 1){
              if(document.querySelector('body').scrollTop - 50 > this.$store.state.h[1][1]){
                this.$store.state.witch += 1
              }
            }
            if(this.$store.state.witch !== 0){
              if(document.querySelector('body').scrollTop - 50 < this.$store.state.h[1][1]){
              this.$store.state.witch -= 1
            }
            }
          } else {
            if(this.$store.state.witch === 0){
              if(document.querySelector('body').scrollTop > this.$store.state.h[this.$store.state.witch + 1][1]){
                this.$store.state.witch += 1
              }
            }else if(this.$store.state.witch === this.$store.state.h.length - 1){
              if(document.querySelector('body').scrollTop < this.$store.state.h[this.$store.state.witch][1]){
                this.$store.state.witch -= 1
              }
            }else{
              if(document.querySelector('body').scrollTop > this.$store.state.h[this.$store.state.witch + 1][1]){
                this.$store.state.witch += 1
              }else if(document.querySelector('body').scrollTop < this.$store.state.h[this.$store.state.witch][1]){
                this.$store.state.witch -= 1
              }
            }
          }
        }
      } , true)
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
