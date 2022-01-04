import { Request, Response } from "express";
import { GameDataBase, UserDataBase } from "../DataBase";
import { User, UserData } from "../model/User";
import LibraryController from "./LibraryController";

class UserController {
    private static userDB = UserDataBase.sharedDB
    private static gameDB = GameDataBase.sharedDB

    static getAll = async (req: Request, res: Response) => {
        res.setHeader('Content-Type', 'application/json')
        res.end(JSON.stringify(UserController.userDB.getAll()))
    }

    static getOneById = async (req: Request, res: Response) => {
        res.setHeader('Content-Type', 'application/json')
        const user = UserController.userDB.getObject(req.params.id)
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

        const isEmailTaken = UserController.userDB.getUser(user.email) != undefined
        if (isEmailTaken) {
            res.status(409).send({ error: 'Email alread taken' });
            return
        }

        UserController.userDB.upsertObject(user)
        res.send("OK")
    }

    static addGame = async (req: Request, res: Response) => {

        const user = UserController.userDB.getObject(req.params.userId)
        if (user == undefined) {
            res.status(400).send({ error: "User does not exist" })
            return
        }

        const game = UserController.gameDB.getObject(req.params.gameId)
        if (game == undefined) {
            res.status(400).send({ error: "Game does not exist" })
            return
        }

        if (user.library.includes(game)) {
            res.status(409).send({ error: 'This user already owns this game.' });
            return
        }

        user.library.push(game)
        UserController.userDB.upsertObject(user)
        res.send("OK")
    }


    static removeGame = async (req: Request, res: Response) => {

        const user = UserController.userDB.getObject(req.params.userId)
        if (user == undefined) {
            res.status(400).send({ error: "User does not exist" })
            return
        }

        const removedGameIndex = user.library.findIndex(game => game.id == req.params.gameId)
        if (removedGameIndex == -1) {
            res.status(409).send({ error: 'This user deos not own this game.' });
            return
        }

        user.library.splice(removedGameIndex, 1);
        UserController.userDB.upsertObject(user)
        res.send("OK")
    }
}

export default UserController