import { getRepository } from "typeorm";
import { NextFunction, Request, Response } from "express";
import { Follow } from "../entity/follow.entity";
import { CreateFollowInput } from "../interface/follow.interface";

export class FollowController {
  private followRepository = getRepository(Follow);

  async createFollow(request: Request, response: Response, next: NextFunction) {
    const userId = response.locals.user_id;
    console.log(userId);
    console.log(request.params.id);

    if (parseInt(request.params.id) === parseInt(userId)) {
      response.status(400).send("You can't follow yourself");
    } else {
      let followExists = await this.followRepository.findOne({
        where: {
          source_id: userId,
          target_id: request.params.id,
        },
      });

      if (followExists === undefined) {
        const createFollowInput: CreateFollowInput = {
          source_id: userId,
          target_id: request.params.id,
        };
        const follow = new Follow();
        follow.prepareToCreate(createFollowInput);
        return this.followRepository.save(follow);
      } else {
        response.status(400).send("Follow already exists");
      }
    }
  }

  async removeFollow(request: Request, response: Response, next: NextFunction) {
    const userId = response.locals.user_id;
    let followToRemove = await this.followRepository.findOne({
      where: {
        source_id: userId,
        target_id: request.params.id,
      },
    });

    if (followToRemove !== undefined) {
      return this.followRepository.remove(followToRemove);
    } else {
      response.status(404).send("follow not found");
    }
  }
}
