import cors from 'cors';
import { usersRouter } from './routes/users.js';
import express, {json} from 'express';

const app = express()
app.disable('x-powered-by');
app.use(json())
const port = process.env.PORT ?? 3000

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

app.use('/',usersRouter)

app.listen(port, () => {
    console.log('Server is listening in ',port)
})