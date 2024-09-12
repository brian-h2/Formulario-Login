import {z} from 'zod'

const userSchema = z.object({
    email: z.string().email({ message: "Invalid email address" }),
    password: z.number().int().min(4, 'La longitud de la password debe ser mayor a 4 numeros')
})


export function validateUser(object) {
    return userSchema.partial().safeParse(object)
}
