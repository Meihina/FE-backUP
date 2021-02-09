<template>
     <div class="paper">
         <v-row justify="center" :style="{marginTop : '30px'}">
            <v-col cols="10">
                <div :class="this.$store.state.isPhoneG ? 'article_phone' : 'article'">
                    <h1 class="title">{{title}}</h1>
                    <div class="tags" v-for="item in tags">
                        <div @click="jumpTag(item)" class="tag_hold">
                            <v-icon class="tag_icon">mdi-tag</v-icon>
                            <span>{{item}}</span>
                        </div>
                    </div>
                </div>
            </v-col>
        </v-row>

        <mavon-editor v-model = "value" :class="this.$store.state.isPhoneG ? 'mavon_phone' : 'mavon'"
            :defaultOpen="'preview'"
            :toolbarsFlag="false"
            :scrollStyle="true"
            :subfield="false"
            :codeStyle="code_style"
            :ishljs="true"
            :externalLink="externalLink"
        />

        <div class="btns">
            <div v-show="this.$store.state.totalData.length - 1 !== parseInt(article[1])" class="next_icon" @click="Next()">
                Next Post
                <v-icon
                    large
                    class="icon"
                >
                    mdi-chevron-right
                </v-icon>
            </div>

            <div v-show="parseInt(article[1]) !== 0" class="prev_icon" @click="Prev()">
                <v-icon
                    large
                    class="icon"
                >
                    mdi-chevron-left
                </v-icon>
                Prev Post
            </div>
        </div>
        <list v-show='!this.$store.state.isPhoneG && this.$store.state.isShowList' class="list"></list>
     </div>
</template>

<script>
import list from '../components/list.vue'
export default {
    components:{
        list
    },
    data(){
        return{
            value : '',
            tags : [],
            title : '',
            time : '',
            article : {},
            code_style: 'github',
            externalLink: {
                markdown_css: false,
                hljs_js: function() {
                    return '/highlightjs/highlight.min.js';
                },
                hljs_css: function(css) {
                    return '/highlightjs/styles/' + css + '.min.css';
                },
                hljs_lang: function(lang) {
                    return '/highlightjs/languages/' + lang + '.min.js';
                },
                katex_css: function() {
                    return '/katex/katex.min.css';
                },
                katex_js: function() {
                    return '/katex/katex.min.js';
                },
            },
        }
    },
    methods:{
        getData(){
            this.article = (() => {
                for(var i in this.$store.state.totalData){
                    if(this.$route.query.id === this.$store.state.totalData[i]._id){
                        return [this.$store.state.totalData[i] , i]
                    }
                }
            })()
            this.value = this.article[0].article
            this.title = this.article[0].title
            this.tags = this.article[0].tags
            this.time = this.article[0].time
            this.$nextTick(() => {
                let half = (nodelist) => {
                    let res = []
                    for(let i = 0 ; i < nodelist.length / 2 ; i++){
                        console.log(nodelist[i].offsetTop)
                        res.push([nodelist[i].innerText , nodelist[i].offsetTop])
                    }
                    return res
                }
                this.$store.state.h = half(document.querySelectorAll('h1:not(.title)'))
            })
        },
        Next(){
            let nextArticle = this.$store.state.totalData[++this.article[1]]
            this.$router.push({path:'/paper' , query:{id : nextArticle._id}})
            this.scroll()
            this.getData()
        },
        Prev(){
            let prevArticle = this.$store.state.totalData[--this.article[1]]
            this.$router.push({path:'/paper' , query:{id : prevArticle._id}})
            this.scroll()
            this.getData()
        },
        jumpTag(tag){
            this.$router.push({path:'/tags' , query:{tag : tag}})
        },
        scroll(){
            document.querySelector('body').scrollTop = 1
        }
    },
    mounted(){
        if(this.$store.state.totalData.length !== 0){
            this.scroll()
            this.getData()
        }
    },
    watch:{
        $route(){
            this.getData()
        },
        '$store.state.totalData' : function(){
            this.scroll()
            this.getData()
        }
    }
}
</script>

<style lang='scss' scoped>
.list{
    position: fixed;
    z-index: 10000;
    right: 40px;
    top: 50vh;
    transform: translateY(-50%);
}

.mavon{
    box-shadow: none !important;
    font-size: 18px;
}

.mavon_phone{
    box-shadow: none !important;
    font-size: 16px;
}

.paper{
    animation: fadeIn 0.5s;
    animation-fill-mode: both;
}

.article{
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

.btns{
    width: 90%;
    margin-top: 25px;
    margin-bottom: 100px;
    .next_icon{
        position: absolute;
        right: 20px;
        color: rgb(75, 74, 74);
        font-size: 20px;
        font-style: italic;
        line-height: 36px;
        cursor: pointer;
        transition: 0.2s;
        &:hover{
            color: black;
            text-shadow: 0px 0px 3px rgb(221, 221, 221);
            .icon{
                color: black;
                text-shadow: 0px 0px 3px rgb(221, 221, 221);
            }
        }
    }
    .prev_icon{
        position: absolute;
        left: 20px;
        color: rgb(75, 74, 74);
        font-size: 20px;
        font-style: italic;
        line-height: 36px;
        cursor: pointer;
        transition: 0.2s;
        &:hover{
            color: black;
            text-shadow: 0px 0px 3px rgb(221, 221, 221);
            .icon{
                color: black;
                text-shadow: 0px 0px 3px rgb(221, 221, 221);
            }
        }
    }
}
</style>