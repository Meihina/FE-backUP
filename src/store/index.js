import Vue from 'vue'
import Vuex from 'vuex'
import { MoudleReq } from './ReqStore'

Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        MoudleReq: MoudleReq
    },
    state: {
        isPhoneG : false,
        h : [],
        witch : 0,
        isShowList : false
    }
})
