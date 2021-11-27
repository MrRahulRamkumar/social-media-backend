import { getRepository } from "typeorm"
import { NextFunction, Request, Response } from "express"
import { User } from "../entity/user.entity"
import { CreateUserInput, UpdateUserInput } from "../interface/User.interface"

export class UserController {
  private userRepository = getRepository(User)

  async getUser(request: Request, response: Response, next: NextFunction) {
    
    const userId = response.locals.user_id
    const User = await this.userRepository.findOne(userId)
    if (User !== undefined) {
      return User
    } else {
      response.status(404).send("User not found")
    }
  }

  async createUser(request: Request, response: Response, next: NextFunction) {
    const { body: params } = request

    const user = await this.userRepository.findOne({
      where: { 
        email: params.email 
      }
    })

    if(user === undefined) {
      const createUserInput: CreateUserInput = {
        first_name: params.first_name,
        last_name: params.last_name,
        email: params.email,
        password: params.password,
      }
      const user = new User()
      await user.prepareToCreate(createUserInput)
  
      return this.userRepository.save(user)
    } else {
      response.status(400).send("User with email already exists")
    }
  }

  async removeUser(request: Request, response: Response, next: NextFunction) {
    let userToRemove = await this.userRepository.findOne(request.params.id)
    if (userToRemove !== undefined) {
      return this.userRepository.remove(userToRemove)
    } else {
      response.status(404).send("user not found")
    }
  }
}
