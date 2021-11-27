import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { CreateCommentInput } from "../interface/comment.interface";
import { Post } from "./post.entity";
import { User } from "./user.entity";

@Entity("Comment")
export class Comment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  comment_text: string;
  
  @Column()
  post_id: number;
  @ManyToOne(() => Post, (post) => post.comments)
  @JoinColumn({ name: "post_id" })
  post: Post;

  @Column()
  owner_id: number;
  @ManyToOne(() => User, (user) => user.comments)
  @JoinColumn({ name: "owner_id" })
  owner: User;

  public prepareToCreate(input: CreateCommentInput) {
    this.comment_text = input.comment_text;
    this.post_id = input.post_id;
    this.owner_id = input.owner_id;
  }
}
