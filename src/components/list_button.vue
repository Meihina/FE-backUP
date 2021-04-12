<template>
  <div class="list_button" @click="jumpToOffset()">
      <div class="maru_out">
          <div class="maru_inner" v-show="this.$store.state.witch !== index"></div>
      </div>
      <div class="h">
          {{titleName}}
      </div>
  </div>
</template>

<script>
export default {
    props:['titleName', 'offset', 'index'],
    data(){
        return{
            height : null,
            anime : null,
            lastNow : null,
            isMoving : false
        }
    },
    methods:{
        jumpToOffset(){
            if(window.timer){
                clearInterval(window.timer)
            }
            this.Moving()
        },
        Moving(){
            let now = document.documentElement.querySelector('body').scrollTop
            let final = this.offset
            let speed = Math.floor((now - final) / 24)
            this.isMoving = true
            window.timer = setInterval(() => {
                if (Math.abs(document.documentElement.querySelector('body').scrollTop - final) < 50 ||
                this.lastNow === document.documentElement.querySelector('body').scrollTop){
                    clearInterval(window.timer)
                    this.isMoving = false
                    this.$store.state.witch = this.index
                }else{
                    this.lastNow = document.documentElement.querySelector('body').scrollTop
                    document.documentElement.querySelector('body').scrollTop -= speed
                }
            } , 16.67)
        }
    }
}
</script>

<style lang='scss' scoped>
.list_button{
    padding: 5px;
    &:hover{
        transition: 0.2s;
        cursor: pointer;
        background-color: rgb(134, 134, 134 , 0.2);
    }
    .maru_out{
        background-color: rgb(134, 134, 134);
        display: inline-block;
        width: 12px;
        height: 12px;
        border-radius: 12px;
        .maru_inner{
            margin-top: 2px;
            margin-left: 2px;
            width: 8px;
            height: 8px;
            background-color: rgb(238, 238, 238);
            border-radius: 8px;
        }
    }
    .h{
        display: inline;
        margin-left: 4px;
        color: rgb(134, 134, 134);
    }
}
</style>