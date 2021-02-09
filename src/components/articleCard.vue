<template>
    <div>
        <v-row justify="center" :style="{marginTop : '10px'}">
            <v-col cols="10">
                <div :class="this.$store.state.isPhoneG ? 'article_phone' : 'article'">
                    <h1 @click="JumpToPaper()" class="title">{{title}}</h1>
                    <div class="tags" v-for="item in tags">

                        <div @click="jumpTag(item)" class="tag_hold">
                            <v-icon class="tag_icon">mdi-tag</v-icon>
                            <span>{{item}}</span>
                        </div>

                    </div>
                    <div @click="JumpToPaper()" class="content_article">{{context.split('#').join('')}}</div>
                    <div class="time">posted at {{time}}</div>
                </div>
            </v-col>
        </v-row>
    </div>
</template>

<script>
export default {
    props:['context' , 'tags' , 'title' , 'index' , 'id' , 'time'],
    methods:{
        JumpToPaper(){
            this.$router.push({path:'/paper' , query:{id : this.id}})
        },
        jumpTag(tag){
            this.$router.push({path:'/tags' , query:{tag : tag}})
        }
    }
}
</script>

<style lang='scss' scoped>
.article{
    .time{
        text-align: right;
        font-style: italic;
        margin-top: 10px;
        font-size: 14px;
        font-family:Georgia, 'Times New Roman', Times, serif;
        font-weight: 100;
    }
    .title{
        text-align: center;
        font-size: 38px !important;
        font-family: 'Open Sans', sans-serif;
        font-weight: 300;
        line-height: 42px;
        cursor: pointer;
        transition: 0.2s;
        &:hover{
            text-shadow: 0px 0px 3px rgb(221, 221, 221);
        }
    }
    .content_article{
        clear: both;
        margin-top: 50px;
        text-align: left;
        font-family: 'Open Sans', sans-serif;
        font-weight: 300;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 4;
        overflow: hidden;
        cursor: pointer;
        &:hover{
            text-shadow: 0px 0px 3px rgb(221, 221, 221);
        }
    }
    .tags{
        margin-top: 15px;
        float: right;
        font-size: 14px;
        .tag_hold{
            display : inline;
            margin-left : 8px;
            transition: 0.2s;
            &:hover{
                cursor: pointer;
                color: rgb(8, 15, 143);
                font-size: 16px;
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
}


.article_phone{
    .time{
        text-align: right;
        font-style: italic;
        margin-top: 10px;
        font-size: 14px;
        font-family:Georgia, 'Times New Roman', Times, serif;
        font-weight: 100;
    }
    .title{
        text-align: center;
        font-family: 'Open Sans', sans-serif;
        font-weight: 300;
        font-size: 25px !important;
        line-height: 28px;
        cursor: pointer;
        &:hover{
            text-shadow: 0px 0px 3px rgb(221, 221, 221);
        }
    }
    .content_article{
        clear: both;
        margin-top: 50px;
        text-align: left;
        font-family: 'Open Sans', sans-serif;
        font-weight: 300;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 6;
        overflow: hidden;
        cursor: pointer;
    }
    .tags{
        margin-top: 15px;
        float: right;
        font-size: 12px;
        .tag_hold{
            display : inline;
            margin-left : 8px;
            .tag_icon{
                transform: scale(0.7);
                color: rgb(73, 73, 73);
            }
        }
    }
}
</style>