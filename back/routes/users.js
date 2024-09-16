import { json, Router  } from "express";
import { readJSON } from "../utils/lecturaJSON.js";
import { validateUser } from "../schemas/schem.js";

const users =  readJSON('../user.json');

export const usersRouter = Router();

usersRouter.get('/login',(req,res) => {
    res.send(users).json
})

//Logear Usuario
usersRouter.post('/login',(req,res) =>  { 
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


//Registrar usuario
usersRouter.post('/register',(req,res) =>  {
    const {password,email} = req.body;
    const validacionRegister = validateUser(req.body)
    console.log(password)
    
    //Transformar password a int, porque llega como string
    const usuarioExistente = users.find(user => user.email === email)

    if(usuarioExistente) {
        return res.status(400).send('El email ya esta registrado')
    }

    const newUser = {
        id: users.length + 1,
        ...validacionRegister
    }

    users.push(newUser)
    console.log(users)
    res.status(201).send('Usuario registrado correctamente')
})


usersRouter.patch('/login/:id',(req,res) => {

    const result = validateUser(req.body)

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