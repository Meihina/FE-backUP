const express = require('express')
const app = express()

app.use(express.static('./dist'))

app.listen(4000, () => {
    console.log('start in http://localhost:4000/')
})