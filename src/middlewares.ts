import { NextFunction, Request, Response } from "express"
import { verify } from "jsonwebtoken"

export function verifyToken (request: Request, response: Response, next: NextFunction) {
  const bearerHeader = request.headers.authorization
  if (bearerHeader === undefined) {
    response.status(403).send("Forbidden");
  } else {
    var token = bearerHeader.split(' ')[1]
    const payload = verify(token, "seceretKey")
    response.locals.user_id = payload.user_id
    response.locals.iat = payload.iat
    next();
  }
}
