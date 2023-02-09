import { z } from "zod"
const CreateUserDto = z.object({
   
    email: z.string().email(),

    password: z.string().min(1).max(10),
})
export default CreateUserDto