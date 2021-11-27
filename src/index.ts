import "reflect-metadata"
import { createConnection, getRepository } from "typeorm"
import * as express from "express"
import * as bodyParser from "body-parser"
import * as cors from "cors"
import { Request, Response } from "express"
import { Routes, ProtectedRoutes } from "./routes"
import { verifyToken } from "./middlewares"
import { Follow } from "./entity/follow.entity"

createConnection()
  .then(async (connection) => {

    // create express app
    const app = express()
    app.use(cors())
    app.use(bodyParser.json())

    // register express unprotected routes from defined application routes
    Routes.forEach((route) => {
      ;(app as any)[route.method](route.route, (req: Request, res: Response, next: Function) => {
        const result = new (route.controller as any)()[route.action](req, res, next)
        if (result instanceof Promise) {
          result.then((result) => (result !== null && result !== undefined ? res.send(result) : undefined))
        } else if (result !== null && result !== undefined) {
          res.json(result)
        }
      })
    })

    // adding auth middleware 
    app.use(verifyToken);

    // register express protected routes from defined application routes
    ProtectedRoutes.forEach((route) => {
      ;(app as any)[route.method](route.route, (req: Request, res: Response, next: Function) => {
        const result = new (route.controller as any)()[route.action](req, res, next)
        if (result instanceof Promise) {
          result.then((result) => (result !== null && result !== undefined ? res.send(result) : undefined))
        } else if (result !== null && result !== undefined) {
          res.json(result)
        }
      })
    })

    // start express server
    const port = process.env.PORT || 4001
    app.listen(port)
    console.log("Express server has started on port 4001.")
  })
  .catch((error) => console.log(error))
