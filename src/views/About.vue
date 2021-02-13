<template>
    <div class="About">
        <div v-show="totalData.length !== 0">
            <v-row
                justify="center"
                :style="{marginTop : '30px'}"
            >
                <v-col cols="10">
                    <div class="title">About</div>
                    <div class="avatar">
                        <img src="../assets/avatar.jpg" alt=""><br>
                    </div>
                    <div class="jug">wild frontend , amateur translator and gamer</div>
                    <div class="jug2">躁胜寒，静胜热</div>
                    <div class="icons">
                        <v-icon class="ic" @click="qq()">mdi-qqchat</v-icon>
                        <v-icon class="ic" @click="jump('https://github.com/Meihina')">mdi-github</v-icon>
                        <a href="mailto:Kaza024@sina.com">
                          <v-icon class="ic" >
                            mdi-email
                          </v-icon>
                        </a>
                        <v-icon class="ic" @click="jump('http://blog.kaza.ink')">mdi-link</v-icon>
                    </div>
                </v-col>
            </v-row>

            <v-row
                justify="center"
                :style="{marginTop: '30px'}"
            >
                <v-col cols="10">
                    <div class="about-depart"></div>
                </v-col>
            </v-row>

            <v-row
                justify="center"
                :style="{marginTop : '10px'}"
            >
                <!-- <v-col cols="10">
                    <div class="jug description">
                        <div>本人是某工科大学材料学院学生</div>
                        <div>大三开始自学编程</div>
                        <div>本科毕业后就职于快手主要从事前端开发</div>
                        <div>喜欢酒和电子游戏</div>
                        <div>期待与您的共事</div>
                    </div>
                </v-col> -->
            </v-row>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
    computed: {...mapState({ totalData: state => state.MoudleReq.totalData })},
    methods: {
        jump(url){
            window.open(url)
        },
        qq(){
            window.location.href = 'tencent://message/?uin=1113022939'
        }
    }
}
</script>

<style lang='scss' scoped>
.About{
  animation: fadeIn 0.5s;
  animation-fill-mode: both;
}

.blank{
  width: 100%;
  height: 100px;
}

.title{
    font-size: 38px !important;
    font-family: 'Open Sans', sans-serif;
    font-weight: 300;
    margin-bottom: 30px;
    color: rgb(39, 34, 34);
}

.avatar{
  display: flex;
  justify-content: center;
  align-items: center;
  img{
    width: 200px;
    height: 200px;
    border-radius: 200px;
    box-shadow: 0px 0px 10px black;
  }
}

.about-depart {
    background-color: rgb(214, 214, 214);
    height: 1px;
}

.jug{
  text-align: center;
  font-size: 24px;
  font-family: 'Open Sans', sans-serif;
  margin-top: 10px;
  font-weight: 300;
  color: rgb(88, 88, 88);
}

.description {
  font-size: 16px;
}

.jug2{
  text-align: center;
  font-size: 24px;
  font-family: 'Open Sans', sans-serif;
  font-weight: 300;
  color: rgb(88, 88, 88);
}

.icons{
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 10px;
  .ic{
    display: inline-block;
    margin-left: 10px;
    margin-right: 10px;
    cursor: pointer;
    &:hover{
      color: rgb(247, 54, 54);
    }
    &::after{
      display: none;
    }
  }
}
</style>