<template>
    <div class="Articles">
        <v-row
            justify="center"
            :style="{marginTop : '30px'}"
            v-show="totalData.length !== 0"
        >
            <v-col cols="10">

                <div class="title">Articles</div>
                <div
                    :class="isPhoneG ? 'art_phone' : 'art'"
                    v-for="(item, index) in totalData"
                    :key="index"
                >
                    <div
                        id="year"
                        v-show="yearPos.includes(parseInt(index))"
                    >
                        {{item.time.slice().split('-')[0]}}
                        
                    </div>
                    <span id="time">{{item.time}}</span>
                    <span id="title" @click="jump(index)">{{item.title}}</span><br/>
                    <span v-for="(item_tag, index) in item.tags" :key="index">
                        <span @click="jumpTag(item_tag)" class="tag_hold">
                            <v-icon class="tag_icon">mdi-tag</v-icon>
                            <span>{{item_tag}}</span>
                        </span>
                    </span>
                </div>

            </v-col>
        </v-row>

        <div class="blank"></div>
    </div>
</template>

<script>
import { mapState } from 'vuex'


export default {
    computed: {
        ...mapState({
            totalData: state => state.MoudleReq.totalData,
            yearPos: state => state.MoudleReq.yearPos,
            isPhoneG: state => state.isPhoneG
        })
    },
    methods:{
        jump(index){
            this.$router.push({path:'/paper' , query:{id : this.totalData[index]._id}})
        },
        jumpTag(tag){
            this.$router.push({path:'/tags' , query:{tag : tag}})
        }
    },
    mounted() {
        console.log(this.yearPos)
    },
}
</script>

<style lang='scss' scoped>
.Articles{
    animation: fadeIn 0.5s;
    animation-fill-mode: both;
}

.title{
    font-size: 38px !important;
    font-family: 'Open Sans', sans-serif;
    font-weight: 300;
    margin-bottom: 30px;
}

.art{
    margin-top: 8px;
    #year{
        font-size: 32px;
        font-family: 'Open Sans', sans-serif;
        font-weight: 400;
        margin-top: 25px;
    }
    #time{
        font-size: 20px;
        font-family: 'Open Sans', sans-serif;
        font-weight: 300;
        display: inline-block;
        width: 130px;
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
    #year{
        font-size: 32px;
        font-family: 'Open Sans', sans-serif;
        font-weight: 400;
        margin-top: 25px;
    }
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