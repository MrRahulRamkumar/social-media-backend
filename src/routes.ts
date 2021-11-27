import { UserController } from "./controller/user-controller"
import { AuthController } from "./controller/auth-controller"
import { PostController } from "./controller/post-controller"
import { FollowController } from "./controller/follow-controller"
import { LikeController } from "./controller/like-controller"

export const ProtectedRoutes = [
  {
    method: "get",
    route: "/api/user",
    controller: UserController,
    action: "getUser"
  },
  {
    method: "delete",
    route: "/api/delete-user/:id",
    controller: UserController,
    action: "removeUser",
  },
  {
    method: "post",
    route: "/api/comment/:id",
    controller: UserController,
    action: "createComment"
  },
  {
    method: "post",
    route: "/api/posts",
    controller: PostController,
    action: "createPost"
  },
  {
    method: "get",
    route: "/api/all_posts",
    controller: PostController,
    action: "getAllPosts"
  },
  {
    method: "delete",
    route: "/api/posts/:id",
    controller: PostController,
    action: "removePost"
  },
  {
    method: "get",
    route: "/api/posts/:id",
    controller: PostController,
    action: "getPost"
  },
  {
    method: "post",
    route: "/api/follow/:id",
    controller: FollowController,
    action: "createFollow"
  },
  {
    method: "delete",
    route: "/api/unfollow/:id",
    controller: FollowController,
    action: "removeFollow"
  },
  {
    method: "post",
    route: "/api/like/:id",
    controller: LikeController,
    action: "createLike"
  },
  {
    method: "delete",
    route: "/api/unlike/:id",
    controller: LikeController,
    action: "removeLike"
  }
]

export const Routes = [
  {
    method: "post",
    route: "/api/authenticate",
    controller: AuthController,
    action: "authenticate"
  },
  {
    method: "post",
    route: "/api/create-user",
    controller: UserController,
    action: "createUser"
  }
]