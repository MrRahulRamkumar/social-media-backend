import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { CreatePostInput, UpdatePostInput } from "../interface/post.interface";
import { User } from "./user.entity";
import { Comment } from "./comment.entity";

@Entity()
export class Post {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  created_at: Date;

  @Column()
  owner_id: number;
  @ManyToOne(() => User, (user) => user.posts)
  @JoinColumn({ name: "owner_id" })
  owner: User;

  @OneToMany(() => Comment, comment => comment.post)
  comments: Comment[];

  public prepareToCreate(input: CreatePostInput) {
    this.owner_id = input.owner_id;
    this.title = input.title;
    this.description = input.description;
    this.created_at = new Date();
  }

  public prepareToUpdate(input: UpdatePostInput) {
    if (input.title !== undefined) this.title = input.title;
    if (input.description !== undefined) this.description = input.description;
  }
}
