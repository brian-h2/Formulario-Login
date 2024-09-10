import express, {json} from 'express';
import {readJSON } from './utils/lecturaJSON.js'
import cors from 'cors';

const users =  readJSON('../user.json');

const app = express()
const port = process.env.PORT ?? 3000
app.use(json())
app.use(cors({
    origin: (origin,callback) => {
        const acceptedOrigin = [ //Lista de dominios permitidos
            "http://localhost:8080",
            "http://localhost:1234",
            "http://movies.com"
        ]
        if(acceptedOrigin.includes(origin)) {
            return callback(null,true)
        }

        if(!origin) {
            return callback(null,true)
        }

        return callback(new Error('Not allowed by CORS'))
    }
}))

app.get('/login',(req,res) => {
    res.send(users).json
})

app.get('/login:email',(req,res) =>  {
    const email = req.params
    const usuarios = users.find(user => user.email === email)
    if(usuarios) return res.json(usuarios)
    
})

app.listen(port, () => {
    console.log('Server is listening in ',port)
})