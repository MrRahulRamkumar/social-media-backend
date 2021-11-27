import { getRepository } from "typeorm"
import { NextFunction, Request, Response } from "express"
import { User } from "../entity/user.entity"
import { sign } from "jsonwebtoken"
import { compare } from "bcrypt"

export class AuthController {

    private userRepository = getRepository(User)

    async authenticate (request: Request, response: Response, next: NextFunction) {
        const { body: params } = request

        const user = await this.userRepository.findOne({
            where: { 
                email: params.email 
            }
        })

        if(user === undefined) {
            response.status(401).send("Invalid credentials")
        } else {
            const isValid = await compare(params.password, user.password)
            if (isValid) {
                const payload = {
                    user_id: user.id
                }
                const token = sign(payload, "seceretKey")
                response.json({
                    token
                })
            } else {
                response.status(401).send("Invalid credentials")
            }
        }
    }
}
