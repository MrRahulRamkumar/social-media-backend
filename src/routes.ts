import { StudentController } from "./controller/student-controller"
import { UserController } from "./controller/user-controller"
import { AuthController } from "./controller/auth-controller"

export const ProtectedRoutes = [
  {
    method: "get",
    route: "/api/user",
    controller: UserController,
    action: "getUser"
  },
  {
    method: "post",
    route: "/api/create-user",
    controller: UserController,
    action: "createUser"
  },
  {
    method: "delete",
    route: "/api/delete-user/:id",
    controller: UserController,
    action: "removeUser",
  },
  {
    method: "post",
    route: "/api/authenticate",
    controller: AuthController,
    action: "authenticate"
  },
  {
    method: "get",
    route: "/student/get-all",
    controller: StudentController,
    action: "allStudents",
  },
  {
    method: "get",
    route: "/student/get-by-id/:id",
    controller: StudentController,
    action: "getStudent",
  },
  {
    method: "post",
    route: "/student/create",
    controller: StudentController,
    action: "createStudent",
  },
  {
    method: "put",
    route: "/student/update",
    controller: StudentController,
    action: "updateStudent",
  },
  {
    method: "delete",
    route: "/student/delete/:id",
    controller: StudentController,
    action: "removeStudent",
  },
]

export const Routes = [
  {
    method: "post",
    route: "/api/authenticate",
    controller: AuthController,
    action: "authenticate"
  },
]