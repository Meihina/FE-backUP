<template>
  <div id="search">
        <v-row justify="center" :style="{marginTop : '30px'}">
            <v-col cols="10">
                <div class="title">
                    Search : {{ this.$route.query.search }}
                    <span 
                        :style="{fontStyle: 'oblique', color: 'gray', fontSize: '18px', paddingTop: '6px', paddingLeft: '10px'}" 
                        v-show="this.$route.query.search.trim() === ''"
                    >
                        请输入关键词
                    </span>
                </div>
                <div 
                    v-show="searchDataComputed.length !== 0" 
                    :class="$store.state.isPhoneG ? 'art_phone' : 'art'" 
                    v-for="(item , index) in searchDataComputed"
                    :key="index"
                >
                    <span id="time">{{item.time}}</span>
                    <span id="title" @click="jump(item._id)">{{item.title}}</span><br/>
                    <span v-for="(item_tag, index) in item.tags" :key="index">
                        <span @click="jumpTag(item_tag)" class="tag_hold">
                            <v-icon class="tag_icon">mdi-tag</v-icon>
                            <span>{{item_tag}}</span>
                        </span>
                    </span>
                </div>
                <div class="search_empty" v-if="searchDataComputed.length === 0">暂无相关文章。</div>
            </v-col>
        </v-row>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
    computed: {
        ...mapState({ totalData: state => state.MoudleReq.totalData }),
        searchDataComputed: function() {
            let reg = new RegExp(this.$route.query.search.trim(), 'i'), res = []
            for (var i of this.totalData) if (i.title.match(reg))  res.push(i)
            return res
        },
        a: () => 10
    },
    methods:{
        jump(id) {
            let index = ''
            for (var i in this.totalData) {
                if (this.totalData[i]._id === id) {
                    index = i
                    break
                }
            }
            this.$router.push({path: '/paper', query:{id: this.totalData[index]._id}})
        },
        jumpTag(tag) {
            this.$router.push({path: '/tags', query:{tag: tag}})
        }
    }
}
</script>

<style lang='scss' scoped>
    .title{
        font-size: 38px !important;
        font-family: 'Open Sans', sans-serif;
        font-weight: 300;
        margin-bottom: 30px;
        display: flex;
        align-items: center;
    }

    .search_empty {
        height: 100px;
        width: 100%;
        font-size: 32px;
        font-family: 'Open Sans', sans-serif;
    }

    .art{
        margin-top: 5px;
        #time{
            font-size: 20px;
            font-family: 'Open Sans', sans-serif;
            font-weight: 300;
            display: inline-block;
            width: 120px;
        }
        #title{
            display: inline-block;
            font-family: 'Open Sans', sans-serif;
            font-weight: 400;
            margin-right: 8px;
            &:hover{
                transition: 0.2s;
                text-decoration: underline;
                cursor: pointer;
                color: rgb(49, 49, 49);
                text-shadow: 0px 0px 2px rgb(206, 206, 206);
            }
        }
        .tag_hold{
            display : inline-block;
            transition: 0.2s;
            &:hover{
                cursor: pointer;
                color: rgb(8, 15, 143);
                .tag_icon{
                    color: rgb(8, 15, 143);
                }
            }
            .tag_icon{
                transform: scale(0.7);
                color: rgb(73, 73, 73);
            }
        }
    }

    .art_phone{
        #time{
            font-size: 20px;
            font-family: 'Open Sans', sans-serif;
            font-weight: 300;
            margin-top: 10px;
            display: block;
        }
        #title{
            display: inline-block;
            font-family: 'Open Sans', sans-serif;
            font-weight: 400;
            &:hover{
                transition: 0.2s;
                text-decoration: underline;
                cursor: pointer;
                color: rgb(49, 49, 49);
                text-shadow: 0px 0px 2px rgb(206, 206, 206);
            }
        }
        .tag_hold{
            display : inline-block;
            transition: 0.2s;
            &:hover{
                cursor: pointer;
                color: rgb(8, 15, 143);
                .tag_icon{
                    color: rgb(8, 15, 143);
                }
            }
            .tag_icon{
                transform: scale(0.7);
                color: rgb(73, 73, 73);
            }
        }
    }
</style>