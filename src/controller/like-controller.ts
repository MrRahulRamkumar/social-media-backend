import { getRepository } from "typeorm";
import { NextFunction, Request, Response } from "express";
import { Like } from "../entity/like.entity";
import { CreateLikeInput } from "../interface/like.interface";
import { Post } from "../entity/post.entity";

export class LikeController {
  private likeRepository = getRepository(Like);
  private postRepository = getRepository(Post);

  async createLike(request: Request, response: Response, next: NextFunction) {
    const userId = response.locals.user_id;
    const likeExists = await this.likeRepository.findOne({
      where: {
        user_id: userId,
        post_id: request.params.id,
      },
    });

    const postExists = await this.postRepository.findOne(request.params.id);

    if (likeExists === undefined && postExists !== undefined) {
      const createLikeInput: CreateLikeInput = {
        user_id: userId,
        post_id: request.params.id,
      };
      const like = new Like();
      like.prepareToCreate(createLikeInput);
      return this.likeRepository.save(like);
    } else {
      response.status(400).send("Like already exists or post does not exist");
    }
  }

  async removeLike(request: Request, response: Response, next: NextFunction) {
    const userId = response.locals.user_id;
    let likeToRemove = await this.likeRepository.findOne({
      where: {
        user_id: userId,
        post_id: request.params.id,
      },
    });

    if (likeToRemove !== undefined) {
      return this.likeRepository.remove(likeToRemove);
    } else {
      response.status(404).send("like not found");
    }
  }
}
