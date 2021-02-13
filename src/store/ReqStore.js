import axios from 'axios'

export const MoudleReq = {
    state: {
        totalData: [],
        totalTags: [],
        yearPos: []
    },
    getters: {
        filterTag: (state) => (tag) => {
            return state.totalData.filter(item => {
                return item.tags.includes(tag)
            })
        }
    },
    mutations: {
        setNewDatas (state, val) {
            [state.yearPos, state.totalData, state.totalTags] = val
        }
    },
    actions: {
        getDataReq({}, payload) {
            return new Promise((resolve, reject) => {
                axios.get(payload.url).then(res => {
                    resolve(res.data)
                }).catch(err => {
                    reject(err)
                })
            })
        },
        getDatas ({ commit, dispatch }) {
            return new Promise((resolve, reject) => {
                dispatch('getDataReq', {url: 'http://blog_frontend_api.kaza.ink/getArticles'}).then((data) => {
                    data.sort((a , b) => {
                        return parseInt(b.time.split('-').join('')) - parseInt(a.time.split('-').join(''))
                    })
                    let current = '' , res = []
                    for (var i in data) {
                        let year = data[i].time.split('-')[0]
                        if (current !== year) {
                            res.push(parseInt(i))
                            current = year
                        }
                    }
                    (
                        async () => {
                            let data = await dispatch('getDataReq', {url: 'http://blog_frontend_api.kaza.ink/getTags'})
                            data.sort((a , b) => {
                                return parseInt(b.ArticleContain.length) - parseInt(a.ArticleContain.length)
                            })
                            return data
                        })().then((tagData) => {
                            commit('setNewDatas', [res , data , tagData])
                            resolve()
                        }
                    )
                }, err => {
                    reject(err)
                })
            })
        }
    }
}