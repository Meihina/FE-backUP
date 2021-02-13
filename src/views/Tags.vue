<template>
    <div class="Tags">
        <v-row justify="center" :style="{marginTop : '30px'}" v-show="totalData.length !== 0">
            <v-col cols="10">

                <div class="title">Tags</div>
                <span 
                    class="sq" 
                    v-for="(item, index) in totalTags"
                    :key="index"
                >
                    <v-btn 
                        @click="filterTag(item)" 
                        class="ma-2" 
                        :color='rgb[Math.floor((Math.random()*rgb.length))]' 
                        :style="{color : 'white'}"
                    >
                        <v-icon dark>mdi-minus_circle</v-icon>{{item.tagName}} {{item.ArticleContain.length}}
                    </v-btn>
                </span>

            </v-col>
        </v-row>

        <v-row 
            justify="center" 
            :style="{marginTop : '30px'}" 
            v-show="totalData.length !== 0"
        >
            <v-col cols="10">

                <div class="title">Selected : {{Selected}}</div>
                <div 
                    :class="isPhoneG ? 'art_phone' : 'art'" 
                    v-for="(item , index) in filterData"
                    :key="index"
                >
                    <span id="time">{{item.time}}</span>
                    <span id="title" @click="jump(item._id)">{{item.title}}</span>
                </div>
            </v-col>
        </v-row>

        <div class="blank"></div>
    </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
    data(){
        return{
            rgb : ['rgb(0, 0, 0)','rgb(35, 35, 35)','rgb(65, 65, 65)'],
            Selected : '',
            filterData : []
        }
    },
    computed: {
        ...mapState({
            totalData: state => state.MoudleReq.totalData,
            totalTags: state => state.MoudleReq.totalTags,
            isPhoneG: state => state.isPhoneG
        })
    },
    watch:{
        '$store.state.MoudleReq.totalTags' : function(){
            this.$nextTick(() => {
                console.log(this.totalTags[0].tagName)
                this.Selected = this.totalTags[0].tagName
                this.defaultTag()
            })
        }
    },
    mounted(){
        if(this.totalTags.length !== 0){
            console.log(this.totalTags[0].tagName)
            this.Selected = this.totalTags[0].tagName
            this.defaultTag()
        }
    },
    methods:{
        defaultTag(){
            console.log('?')
            if (this.$route.query.tag) {
                let tagobj = this.totalTags.filter((item) => {
                    return item.tagName === this.$route.query.tag
                })
                this.Selected = tagobj[0]
                this.filterTag(tagobj[0])
            } else {
                this.Selected = this.totalTags[0]
                this.filterTag(this.Selected)
            }
        },
        filterTag(tag){
            this.Selected = tag.tagName
            console.log(this.$store.getters)
            this.filterData = this.$store.getters.filterTag(tag.tagName)
        },
        jump(id){
            let index = null
            this.totalData.map((item , i) => {
                if(item._id === id){
                    index = i
                }
            })
            this.$router.push({path:'/paper' , query:{id : this.totalData[index]._id}})
        }
    }
}
</script>

<style lang='scss' scoped>
    .Tags{
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

    .art{
        margin-top: 8px;
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
    }
</style>