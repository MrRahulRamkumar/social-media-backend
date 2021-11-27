import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
import { CreateLikeInput } from "../interface/like.interface";

@Entity()
export class Like {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  user_id: number;

  @Column()
  post_id: number;

  public prepareToCreate(input: CreateLikeInput) {
    this.user_id = input.user_id;
    this.post_id = input.post_id;
  }
}
