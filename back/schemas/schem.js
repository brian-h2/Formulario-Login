import {z} from 'zod'

const userSchema = z.object({
    email: z.string().email({ message: "Invalid email address" }),
    password: z.string().min(6, "La contraseña debe tener al menos 6 caracteres"),
})


export function validateUser(object) {
    return userSchema.partial().safeParse(object)
}
