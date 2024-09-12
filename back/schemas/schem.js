import {z} from 'zod'

const userSchema = z.object({
    email: z.string().email({ message: "Invalid email address" }),
    password: z.string()
    .min(4,'La contraseña debe tener al menos 4 caracteres')
    .regex(/[A-Z]/, 'La contraseña debe tener al menos una letra mayúscula')
})


function validateUser(object) {
    return userSchema.partial().safeParse(object)
}

module.exports = {
    validateUser
}