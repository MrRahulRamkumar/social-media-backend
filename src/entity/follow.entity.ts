import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
import { CreateFollowInput } from "../interface/follow.interface";

@Entity()
export class Follow {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  source_id: number;

  @Column()
  target_id: number;

  public prepareToCreate(input: CreateFollowInput) {
    this.source_id = input.source_id;
    this.target_id = input.target_id;
  }
}
