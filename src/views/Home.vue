<template>
    <div class="home">
        <div v-for="(item, index) in showData" :key="index">
            <div v-show="index === 0" class = 'head'>Recent Articles</div>
                <Acard
                    :index = "index + (page - 1) * 10"
                    :title = "item.title"
                    :context = "item.article"
                    :tags = 'item.tags'
                    :id = 'item._id'
                    :time = 'item.time'
                />
            <div :class="index !== (length - 1) ? 'dispatch_line' : ''"></div>
        </div>
        <div class="blank" />
        <div class="text-center" v-show="totalData.length !== 0">
            <v-pagination
                dark
                circle
                v-model="page"
                class="pagebtn"
                :length="Math.ceil(totalData.length / 10)"
            />
        </div>
        <div class="blank" />
    </div>
</template>

<script>
import { mapState } from 'vuex'
import Acard from '../components/articleCard.vue'

export default {
    name: 'Home',
    components: { Acard: Acard },
    data() {
        return {
            length: 0,
            page: 1,
            showData: []
        }
    },
    computed: {
        ...mapState({
            totalData: state => state.MoudleReq.totalData
        }),
    },
    methods: {
        MovingToTop(now, final) {
            let speed = Math.floor((now - final) / 12), lastNow = now
            window.timer = setInterval(() => {
                if (Math.abs(lastNow - final) < 50) {
                    clearInterval(window.timer)
                    document.querySelector('Body').scrollTop = 0
                } else {
                    lastNow -= speed
                    document.querySelector('Body').scrollTop = lastNow
                }
            }, 16.67)
        }
    },
    watch: {
        page(val) {
            let arr = this.totalData.slice()
            this.showData = arr.splice((this.page - 1) * 10 , 10)
            this.MovingToTop(document.querySelector('Body').scrollHeight, 0)
        },
        '$store.state.MoudleReq.totalData': function(val) {
            let arr = this.totalData.slice(0, 10)
            this.showData = arr
        }
    },
    mounted() {
        this.length = this.totalData.length
        let arr = this.totalData.slice(0, 6)
        this.showData = arr
    }
}
</script>

<style lang="scss" scoped>
    .home{
        animation: fadeIn 0.5s;
        animation-fill-mode: both;
    }

    .blank{
        width: 100%;
        height: 70px;
    }

    .head{
        width: 90%;
        margin:0 auto;
        text-align: center;
        font-style: italic;
        margin-top: 40px;
        margin-bottom: 40px;
    }

    .dispatch_line{
        width: 90%;
        background-color: rgb(214, 214, 214);
        height: 1px;
        margin:0 auto;
        margin-top: 30px;
        margin-bottom: 30px;
    }
</style>
