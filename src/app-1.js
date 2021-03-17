const path = require('path')
const express = require('express')

const app = express()
const publicDirectoryPath = path.join(__dirname, '../public')

app.use(express.static(publicDirectoryPath))

app.get('*', (req, res) => {
    res.send('<h1 style="text-align: center; margin-top: 10%">404 page!</h1>')
})

app.listen(3000, () => {
    console.log('server is up to the port 3000')
})