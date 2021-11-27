import { getRepository } from "typeorm"
import { NextFunction, Request, Response } from "express"
import { User } from "../entity/user.entity"
import { CreatePostInput, UpdatePostInput } from "../interface/post.interface"
import { Post } from "../entity/post.entity"
import { Like } from "../entity/like.entity"
import { Comment } from "../entity/comment.entity"

export class PostController {
  private postRepository = getRepository(Post);
  private likeRepository = getRepository(Like);
  private commentRepository = getRepository(Comment);
  
  async getAllPosts(request: Request, response: Response, next: NextFunction) {
    const userId = response.locals.user_id;
    const posts = await this.postRepository.find({owner_id: userId});
    return posts
  }

  async getPost(request: Request, response: Response, next: NextFunction) {

    const post = await this.postRepository.findOne(request.params.id);
    if(post !== undefined) {
      const numLikes = await this.postRepository.createQueryBuilder("post")
      .select("count(like.post_id) as number_likes")
      .innerJoin(Like, "like", "like.post_id = post.id")
      .where("post.id = :id", { id: request.params.id })
      .groupBy("like.post_id")
      .getRawOne()
  
      const numComments = await this.postRepository.createQueryBuilder("post")
      .select("count(comment.post_id) as number_comments")
      .innerJoin(Comment, "comment", "comment.post_id = post.id")
      .where("post.id = :id", { id: request.params.id })
      .groupBy("comment.post_id")
      .getRawOne()

      return {
        number_likes: numLikes === undefined ? 0 : numLikes.number_likes,
        number_comments: numComments === undefined ? 0 : numComments.number_comments,
      };
    } else {
      response.status(404).send("post not found");
    }
  }

  async createPost(request: Request, response: Response, next: NextFunction) {
    const { body: params } = request;

    const createPostInput: CreatePostInput = {
      owner_id: response.locals.user_id,
      title: params.title,
      description: params.description,
    };
    const post = new Post();
    post.prepareToCreate(createPostInput);
    return this.postRepository.save(post);
  }

  async removePost(request: Request, response: Response, next: NextFunction) {
    const userId = response.locals.user_id;
    const postToRemove = await this.postRepository.findOne({
      where: { id: request.params.id, owner_id: userId },
    });
    if (postToRemove !== undefined) {
      await this.likeRepository.delete({ post_id: postToRemove.id });
      await this.commentRepository.delete({ post_id: postToRemove.id });
      return this.postRepository.remove(postToRemove);
    } else {
      response.status(404).send("post not found");
    }
  }
}
