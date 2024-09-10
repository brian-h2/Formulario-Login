import express from 'express';
import {readJSON } from './utils/lecturaJSON.js'

const users =  readJSON('../user.json');

const app = express()
const port = process.env.PORT ?? 3000


app.get('/login',(req,res) => {
    res.send(users).json
})

app.listen(port, () => {
    console.log('Server is listening in ',port)
})