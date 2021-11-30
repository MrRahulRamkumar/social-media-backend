import { getRepository } from "typeorm";
import { NextFunction, Request, Response } from "express";
import { User } from "../entity/user.entity";
import { CreateUserInput, UpdateUserInput } from "../interface/user.interface";
import { Follow } from "../entity/follow.entity";
import { CreateFollowInput } from "../interface/follow.interface";
import { Comment } from "../entity/comment.entity";
import { CreateCommentInput } from "../interface/comment.interface";
import { Console } from "console";

export class UserController {
  private userRepository = getRepository(User);
  private followRepository = getRepository(Follow);
  private commentRepository = getRepository(Comment);

  async getUser(request: Request, response: Response, next: NextFunction) {
    const userId = response.locals.user_id;

    const user = await this.userRepository.findOne(userId);
    if (user !== undefined) {
      const numFollowers = await this.followRepository
        .createQueryBuilder("follow")
        .select("count(follow.target_id) as number_followers")
        .where("follow.target_id = :id", { id: userId })
        .groupBy("follow.target_id")
        .getRawOne();

      const numFollowing = await this.followRepository
        .createQueryBuilder("follow")
        .select("count(follow.source_id) as number_followers")
        .where("follow.source_id = :id", { id: userId })
        .groupBy("follow.source_id")
        .getRawOne();

      return {
        name: user.first_name + " " + user.last_name,
        number_followers:
          numFollowers === undefined ? 0 : numFollowers.number_followers,
        number_following:
          numFollowing === undefined ? 0 : numFollowing.number_followers,
      };
    } else {
      response.status(404).send("User not found");
    }
  }

  async createComment(
    request: Request,
    response: Response,
    next: NextFunction
  ) {
    const { body: params } = request;
    const userId = response.locals.user_id;

    const createCommentInput: CreateCommentInput = {
      owner_id: userId,
      post_id: request.params.id,
      comment_text: params.comment_text,
    };
    const comment = new Comment();
    comment.prepareToCreate(createCommentInput);
    return await this.commentRepository.save(comment);
  }

  async createUser(request: Request, response: Response, next: NextFunction) {
    const { body: params } = request;

    if(params.password === undefined && params.email === undefined) {
      response.status(400).send("Bad request");
    } else {
      const user = await this.userRepository.findOne({
        where: {
          email: params.email,
        },
      });
  
      if (user === undefined) {
        const createUserInput: CreateUserInput = {
          first_name: params.first_name,
          last_name: params.last_name,
          email: params.email,
          password: params.password,
        };
        const user = new User();
        await user.prepareToCreate(createUserInput);
        return this.userRepository.save(user);
      } else {
        response.status(400).send("User with email already exists");
      }
    }
  }

  async removeUser(request: Request, response: Response, next: NextFunction) {
    const userId = response.locals.user_id;
    let userToRemove = await this.userRepository.findOne(userId);
    if (userToRemove !== undefined) {
      return this.userRepository.remove(userToRemove);
    } else {
      response.status(404).send("user not found");
    }
  }
}
