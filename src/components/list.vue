<template>
    <div id="list_main">
        <div id="list_botton" :class="ispackUp ? 'packUped' : 'notpackUp'" @click="ispackUp = !ispackUp"></div>
        <div id="list">
            <div v-for="(item , index) in this.$store.state.h">
                <listButton :titleName='item[0]' :offset='item[1]' :index='index'></listButton>
            </div>
        </div>
    </div>
</template>

<script>
import listButton from './list_button.vue'
export default {
    components:{
        listButton
    },
    data(){
        return{
            ispackUp : false
        }
    },
    watch:{
        ispackUp : function(){
            if(this.ispackUp){
                document.querySelector('#list').style.width = '0px'
                document.querySelector('#list').style.maxHeight = '0px'
                document.querySelector('#list').style.padding = '0px'
            }else{
                document.querySelector('#list').style.width = '250px'
                document.querySelector('#list').style.maxHeight = '400px'
                document.querySelector('#list').style.padding = '8px'
            }
        }
    },
}
</script>
<style lang='scss' scoped>
#list{
    padding: 8px;
    overflow-y: scroll;
    transition: 0.2s;
    max-height: 400px;
    width: 250px;
    background-color: rgba(185, 185, 185, 0.1);
    border-radius: 5px;
    box-shadow: rgb(214, 214, 214) 5px 5px 5px;
}

.notpackUp{
    -webkit-clip-path: polygon(0 0, 0% 100%, 100% 50%);
    clip-path: polygon(0 0, 0% 100%, 100% 50%);
}

.packUped{
    -webkit-clip-path: polygon(100% 0, 100% 100%, 0 50%);
    clip-path: polygon(100% 0, 100% 100%, 0 50%);
}

#list_botton{
    transition: 0.4s;
    cursor: pointer;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    right: -15px;
    border-radius: 50px;
    height: 70px;
    width: 8px;
    background-color: rgb(107, 107, 107);
}

::-webkit-scrollbar {
  width:5px;
  background-color: rgb(238, 238, 238);
  border-radius: 10px;
}

/* 滚动槽 */
::-webkit-scrollbar-track {
  border-radius:10px;
}

/* 滚动条滑块 */
::-webkit-scrollbar-thumb {
  border-radius:10px;
  background:rgb(146, 146, 146);
}
</style>