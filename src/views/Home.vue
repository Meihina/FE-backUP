<template>
  <div class="home">
    <div v-for="(item , index) in showData">
      <div v-show="index === 0" class = 'head'>Recent Articles</div>
      <Acard :index = "index + (page - 1) * 6" :title = "item.title" :context = "item.article" :tags = 'item.tags' :id = 'item._id' :time = 'item.time'></Acard>
      <div :class="index !== (length - 1) ? 'dispatch_line' : ''"></div>
    </div>

    <div class="blank"></div>
    
    <div class="text-center" v-show="this.$store.state.totalData.length !== 0">
      <v-pagination
        v-model="page"
        :length="Math.ceil(this.$store.state.totalData.length / 6)"
        circle
        dark
        class="pagebtn"
      ></v-pagination>
    </div>

    <div class="blank"></div>

  </div>
</template>

<script>
import Acard from '../components/articleCard.vue'
export default {
  name: 'Home',
  components: {
    Acard : Acard
  },
  data(){
    return{
      length : this.$store.state.totalData.length,
      page : 1,
      showData : []
    }
  },
  watch:{
    page(val){
      let arr = this.$store.state.totalData.slice()
      this.showData = arr.splice((this.page - 1) * 6 , 6)
      document.querySelector('Body').scrollTop = 0
    },
    '$store.state.totalData' : function(val){
      let arr = this.$store.state.totalData.slice(0 , 6)
      this.showData = arr
    }
  },
  mounted(){
    let arr = this.$store.state.totalData.slice(0 , 6)
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
