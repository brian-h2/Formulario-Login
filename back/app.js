import express, {json} from 'express';
import {readJSON } from './utils/lecturaJSON.js'
import { validateUser } from './schemas/schem.js';
import cors from 'cors';

const app = express()
app.use(json())
const port = process.env.PORT ?? 3000

const users =  readJSON('../user.json');

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

app.get('/login',(req,res) =>  { 
    const {email,password} = req.body
    if(email != "" && password != "") {
        const usuarios = users.find((element) => element.email === email && element.password.toString() === password)
        if (usuarios) {
            // Si el usuario se encuentra, devuelve el HTML y la información del usuario
           return res.sendStatus(201)
        } else {
            // Si no se encuentra el usuario, devuelve un mensaje de error
            return res.status(404).send('Usuario no encontrado');
        } 
    } 
})

app.post('/login',(req,res) =>  {
    const {email,password} = req.body;
    
    const usuarioExistente = users.find(user => user.email === email)

    if(usuarioExistente) {
        return res.status(400).send('El email ya esta registrado')
    }

    const newUser = {
        id: users.length + 1,
        email: email,
        password: password
    }

    users.push(newUser)

    res.status(201).send('Usuario registrado correctamente')
})


app.patch('/login/:id',(req,res) => {
    const result = validateUser(req.body)
    console.log(result)

    if(!result.success) {
        res.status(400).json({ error: JSON.parse(result.error.message) })
    } 

    const {id} = req.params
    const userIndex = users.findIndex(user => user.id.toString() === id)
    if (userIndex === -1) {
        return res.status(404).json({ message: 'Usuario no encontrado' })
    }

    const updateUser = {
        ...users[userIndex],
        ...result.data
    }

    users[userIndex] = updateUser;

    return res.json(updateUser)
})


app.listen(port, () => {
    console.log('Server is listening in ',port)
})