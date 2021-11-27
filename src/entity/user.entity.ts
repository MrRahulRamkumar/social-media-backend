import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"
import { hash, compare } from "bcrypt"
import { CreateUserInput, UpdateUserInput } from "../interface/user.interface"

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  first_name: string

  @Column()
  last_name: string

  @Column()
  email: string

  @Column()
  password: string

  public async prepareToCreate(input: CreateUserInput) {
    this.first_name = input.first_name
    this.last_name = input.last_name
    this.email = input.email
    this.password = await hash(input.password, 10)
  }

  public prepareToUpdate(input: UpdateUserInput) {
    if (input.first_name !== undefined) this.first_name = input.first_name
    if (input.last_name !== undefined) this.last_name = input.last_name
    if (input.email !== undefined) this.email = input.email
    if (input.password !== undefined) this.password = input.password
  }
}
