import axios from 'axios'

function getDataReq(url){
    return new Promise((resolve , reject) => {
        axios.get(url).then(res => {
            resolve(res.data)
        }).catch(err => {
            reject(err)
        })
    })
}

function store(){
    return new Promise((resolve , reject) => {
        getDataReq('http://blog_frontend_api.kaza.ink/getArticles').then((data) => {
            data.sort((a , b) => {
                return parseInt(b.time.split('-').join('')) - parseInt(a.time.split('-').join(''))
            })
            let current = '' , res = []
            for(var i in data){
                let year = data[i].time.split('-')[0]
                if(current !== year){
                    res.push(parseInt(i))
                    current = year
                }
            }
            (async () => {
                let data = await getDataReq('http://blog_frontend_api.kaza.ink/getTags')
                data.sort((a , b) => {
                    return parseInt(b.ArticleContain.length) - parseInt(a.ArticleContain.length)
                })
                return data
            })().then((tagData) => {
                resolve([res , data , tagData])
            })
        } , err => {
            reject(err)
        })
    })
}

export default{
    "getDataReq" : getDataReq,
    "store" : store
}