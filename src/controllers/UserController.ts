import { Request, Response } from "express";
import { DataBase } from "../DataBase";
import { User, UserData } from "../model/User";

class UserController {
    private static db = new DataBase<User>()

    static getAll = async (req: Request, res: Response) => {
        res.setHeader('Content-Type', 'application/json')
        res.end(JSON.stringify(UserController.db.getAll()))
    }

    static getOneById = async (req: Request, res: Response) => {
        res.setHeader('Content-Type', 'application/json')
        const user = UserController.db.getObject(req.params.id)
        res.end(JSON.stringify(user))
    }

    static add = async (req: Request, res: Response) => {
        const userData: UserData = req.body as UserData
        console.log(userData.email)
        const user = new User(userData.email, userData.name, [])
        if (user.isValid()) {
            UserController.db.upsertObject(user)
            res.end("OK")
        } else {
            res.status(400).send()
        }
    }
}

export default UserController