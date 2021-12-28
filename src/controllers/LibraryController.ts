import { Request, Response } from "express";
import { GameDataBase } from "../DataBase";
import { Game, GameData } from "../model/Game";

class LibraryController {
    private static db = LibraryController.makeDB()

    static getAll = async (req: Request, res: Response) => {
        res.setHeader('Content-Type', 'application/json')
        res.end(JSON.stringify(LibraryController.db.getAll()))
    }

    static getOneById = async (req: Request, res: Response) => {
        res.setHeader('Content-Type', 'application/json')
        const game = LibraryController.db.getObject(req.params.id)
        res.end(JSON.stringify(game))
    }

    static add = async (req: Request, res: Response) => {
        const gameData: GameData = req.body as GameData
        const game = new Game(gameData.title, gameData.publisher, gameData.developer)
        if (game.isValid()) {
            LibraryController.db.upsertObject(game)
            res.end("OK")
        } else {
            res.statusCode = 400
            res.send()
            // res.status(400).send()
        }
    }

    static reset = async (req: Request, res: Response) => {
        LibraryController.db.setExampleLibrary()
        console.log("reset")
        res.end("OK")
    }

    private static makeDB(): GameDataBase {
        const db = new GameDataBase()
        db.setExampleLibrary()
        return db
    }
}

export default LibraryController