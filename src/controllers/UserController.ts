import { Request, Response } from "express";
import { UserDataBase } from "../DataBase";
import { User, UserData } from "../model/User";

class UserController {
    private static db = new UserDataBase()

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

        if (!user.isValid()) {
            res.status(400).send()
            return
        } 

        const isEmailTaken = UserController.db.getUser(user.email) != undefined
        if (isEmailTaken) {
            res.status(409).send({ error: 'Email alread taken' });
            return
        }
        
        UserController.db.upsertObject(user)
        res.send("OK")
    }
}

export default UserController