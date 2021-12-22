
import { Request, Response, NextFunction } from "express"

export const checkAuthToken = (req: Request, res: Response, next: NextFunction) => {
  const token = <string>req.headers["auth"]
  let jwtPayload
  
  try {
    // TODO: implement a sulution for authenticating users
  } catch (error) {
    res.status(401).send()
    return
  }

//   const { userId, username } = jwtPayload;
//   const newToken = jwt.sign({ userId, username }, config.jwtSecret, {
//     expiresIn: "1h"
//   });
//   res.setHeader("token", newToken);
  console.log("Auth successul.")
  next();
};
