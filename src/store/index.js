import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isPhoneG : false,
    totalData : [],
    totalTags : [],
    yearPos : [],
    h : [],
    witch : 0,
    isShowList : false
  },
  getters: {
    filterTag : (state) => (tag) => {
      return state.totalData.filter(item => {
        return item.tags.includes(tag)
      })
    }
  }
})
